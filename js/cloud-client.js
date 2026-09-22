/**
 * Microsoft Surface Specs Hub — Cloud Client (数据 / 账号 / 素材)
 *
 * 单一云端客户端实例，同时服务于 Database、Auth、Storage 三个模块。
 * SDK 以 CDN <script> 形式加载（本工程为纯 HTML，无构建步骤），
 * 通过全局 WorkBuddyCloud 访问，不使用 import。
 *
 * 设计原则：
 *   1. 云端数集（surface_dataset）为在线首选数据源；任何环节失败都静默回退到
 *      随包发布的本地基线 js/surface-data.js，保证离线仍可 100% 使用。
 *   2. 登录与素材属"已登录成员"能力，未登录时 UI 层负责拦截，数据层直接拒绝。
 *   3. 前端从不发送 owner_id —— 由表默认值 auth.uid() 与服务端 RLS 决定归属。
 */
(function () {
  'use strict';

  var cfg = (typeof window !== 'undefined' && window.SURFACE_CLOUD_CONFIG) || {};

  /** surface_dataset 载荷覆盖的顶层数据键（函数型方法不在载荷内，保持本地版本） */
  var DATA_KEYS = [
    'categories',
    'consumerCategories',
    'commercialCategories',
    'specGroups',
    'devices',
    'chips',
    'accessories'
  ];

  var SurfaceCloud = {
    config: cfg,

    /** @type {any} 云端客户端实例（懒创建，全局唯一） */
    client: null,

    /** SDK 是否成功从 CDN 加载 */
    sdkReady: false,

    /** 'cloud' | 'local' —— 当前实际生效的数据来源 */
    dataSource: 'local',

    /** 云端数据集版本号（来自 surface_dataset.version） */
    datasetVersion: null,

    /** 云端数据集分片数 */
    chunkCount: 0,

    /** 云端设备条目数，用于与本地基线比对 */
    cloudDeviceCount: 0,

    /** 回退到本地基线时的原因（用于界面提示与排障） */
    fallbackReason: null,

    /** 当前会话（由 onAuthStateChange 维护） */
    session: null,

    /** 数据准备完成的 Promise —— app.js 启动前必须等待 */
    ready: null,

    /** 事件订阅：onChange(cb) */
    _listeners: []
  };

  /* ================================================================== *
   * 0. 小工具
   * ================================================================== */

  function sdk() {
    return (typeof window !== 'undefined' && window.WorkBuddyCloud) || null;
  }

  function errText(err, fallback) {
    if (!err) return fallback || '未知错误';
    if (typeof err === 'string') return err;
    if (err.message) return err.message;
    if (err.error_description) return err.error_description;
    return fallback || '未知错误';
  }

  function uuid() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    return 'x' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  }

  /** 上传文件名净化：仅保留安全字符，杜绝路径穿越与非法字符 */
  function safeFileName(name) {
    var base = String(name || 'file').replace(/[\\/]/g, '_');
    base = base.replace(/[^A-Za-z0-9._\u4e00-\u9fa5-]/g, '_');
    if (base.length > 90) {
      var dot = base.lastIndexOf('.');
      var ext = dot > 0 ? base.slice(dot) : '';
      base = base.slice(0, 90 - ext.length) + ext;
    }
    return base || 'file';
  }

  /** 从邮箱推导展示名，避免在界面上暴露完整邮箱 */
  function displayNameFromSession(session) {
    var email = (session && session.user && session.user.email) || '';
    var local = email.split('@')[0] || '成员';
    return local.slice(0, 40);
  }

  function notify() {
    SurfaceCloud._listeners.slice().forEach(function (cb) {
      try { cb(SurfaceCloud); } catch (e) { /* 单个订阅者异常不影响其他订阅者 */ }
    });
  }

  /**
   * 把云端数据集交给 Catalog 快照 seam。
   * 禁止原地改 SURFACE_DATA：Catalog.applySnapshot 写 overlay，
   * 调用方通过 Catalog.onChange 刷新界面。
   * 仅当 Catalog 不存在时才回退到本地对象（测试/离线降级）。
   */
  function applyDataset(payload) {
    if (typeof Catalog !== 'undefined' && typeof Catalog.applySnapshot === 'function') {
      return Catalog.applySnapshot(payload);
    }
    var target = (typeof window !== 'undefined' && window.SURFACE_DATA) || null;
    if (!target) return false;

    var applied = 0;
    for (var i = 0; i < DATA_KEYS.length; i++) {
      var key = DATA_KEYS[i];
      if (payload && payload[key] !== undefined) {
        target[key] = payload[key];
        applied++;
      }
    }
    return applied > 0;
  }

  /**
   * base64(gzip(JSON)) -> JSON 文本。
   * 使用浏览器原生 DecompressionStream('gzip')，不引入任何解压库。
   * gzip 自带 CRC32 校验，载荷被截断或篡改时此步会直接抛错。
   */
  function inflateBase64Gzip(b64) {
    if (typeof atob !== 'function') {
      return Promise.reject(new Error('当前环境不支持 atob'));
    }
    if (typeof DecompressionStream !== 'function') {
      return Promise.reject(new Error('当前浏览器不支持 DecompressionStream'));
    }

    var bin = atob(b64);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);

    var stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    return new Response(stream).text();
  }

  /* ================================================================== *
   * 1. 客户端初始化
   * ================================================================== */

  function ensureClient() {
    if (SurfaceCloud.client) return SurfaceCloud.client;

    var lib = sdk();
    if (!lib || typeof lib.createWorkBuddyCloud !== 'function') return null;
    if (!cfg.endpoint || !cfg.publishableKey) return null;

    var cfgGate = (typeof window !== 'undefined' && window.SURFACE_CLOUD_CONFIG) || {};
    if (cfgGate.enabled !== true || !cfgGate.endpoint || !cfgGate.publishableKey) {
      return null;
    }
    SurfaceCloud.client = lib.createWorkBuddyCloud({
      endpoint: cfg.endpoint,
      publishableKey: cfg.publishableKey
    });
    return SurfaceCloud.client;
  }

  SurfaceCloud.getClient = ensureClient;

  /* ================================================================== *
   * 2. 数据集：从云数据库加载
   * ================================================================== */

  /**
   * 读取 surface_dataset 全部分片，按 id 顺序拼接后解压为数据集对象。
   * @returns {Promise<{payload: object, version: string, chunks: number}>}
   */
  function fetchCloudDataset() {
    var cloud = ensureClient();
    if (!cloud) return Promise.reject(new Error('云端客户端不可用'));

    var query = cloud.database
      .from('surface_dataset')
      .select('id, version, payload')
      .order('id', { ascending: true });

    var timer;
    if (typeof query.abortSignal === 'function' && typeof AbortController !== 'undefined') {
      var abortCtrl = new AbortController();
      timer = setTimeout(function () {
        try { abortCtrl.abort(); } catch (e) {}
      }, 2500);
      query = query.abortSignal(abortCtrl.signal);
    }

    return query
      .then(function (res) {
        if (timer) clearTimeout(timer);
        if (res.error) throw new Error(errText(res.error, '云数据库读取失败'));
        var rows = res.data;
        if (!Array.isArray(rows) || rows.length === 0) {
          throw new Error('云端数据集为空');
        }

        var parts = [];
        for (var i = 0; i < rows.length; i++) {
          var p = rows[i] && rows[i].payload;
          if (typeof p !== 'string' || p.length === 0) {
            throw new Error('云端数据集存在空分片: ' + (rows[i] && rows[i].id));
          }
          parts.push(p);
        }

        return inflateBase64Gzip(parts.join('')).then(function (json) {
          var parsed = JSON.parse(json);
          if (!parsed || !Array.isArray(parsed.devices) || parsed.devices.length === 0) {
            throw new Error('云端数据集结构不合法');
          }
          return {
            payload: parsed,
            version: (rows[0] && rows[0].version) || cfg.datasetVersion || '',
            chunks: rows.length
          };
        });
      })
      .catch(function (err) {
        if (timer) clearTimeout(timer);
        throw err;
      });
  }

  function adoptCloudDataset(res) {
    var localVer = (typeof Catalog !== 'undefined' && Catalog.baselineVersion)
      ? Catalog.baselineVersion()
      : ((typeof SURFACE_DATA !== 'undefined' && SURFACE_DATA.datasetVersion) || '');
    if (typeof Catalog !== 'undefined' && Catalog.acceptsCloudVersion &&
        !Catalog.acceptsCloudVersion(res.version)) {
      if (typeof Catalog.resetToBaseline === 'function') Catalog.resetToBaseline();
      SurfaceCloud.dataSource = 'local';
      SurfaceCloud.datasetVersion = localVer;
      SurfaceCloud.chunkCount = res.chunks;
      SurfaceCloud.cloudDeviceCount = res.payload.devices.length;
      SurfaceCloud.fallbackReason = '云端数据集 v' + (res.version || '未知') +
        ' 早于本地核验基线 v' + localVer + '，已拒绝覆盖以保证参数准确';
      return SurfaceCloud;
    }
    if (!applyDataset(res.payload)) throw new Error('本地基线对象缺失，无法应用云端数据');
    SurfaceCloud.dataSource = 'cloud';
    SurfaceCloud.datasetVersion = res.version;
    SurfaceCloud.chunkCount = res.chunks;
    SurfaceCloud.cloudDeviceCount = res.payload.devices.length;
    SurfaceCloud.fallbackReason = null;
    return SurfaceCloud;
  }

  SurfaceCloud.reloadDataset = function () {
    return fetchCloudDataset().then(function (res) {
      adoptCloudDataset(res);
      notify();
      return SurfaceCloud;
    });
  };

  /* ================================================================== *
   * 3. 账号（Auth）
   * ================================================================== */

  function requireClient() {
    var cloud = ensureClient();
    if (!cloud) return null;
    return cloud;
  }

  function refreshSession() {
    var cloud = requireClient();
    if (!cloud) return Promise.resolve(null);
    return cloud.auth.getSession().then(function (res) {
      SurfaceCloud.session = (res && res.data) || null;
      notify();
      return SurfaceCloud.session;
    }).catch(function () {
      SurfaceCloud.session = null;
      return null;
    });
  }

  SurfaceCloud.auth = {
    /** 当前会话；无会话返回 null */
    getSession: function () {
      var cloud = requireClient();
      if (!cloud) return Promise.resolve(null);
      return cloud.auth.getSession().then(function (res) {
        SurfaceCloud.session = (res && res.data) || null;
        return SurfaceCloud.session;
      });
    },

    /** 服务端校验当前用户 */
    getUser: function () {
      var cloud = requireClient();
      if (!cloud) return Promise.resolve(null);
      return cloud.auth.getUser().then(function (res) {
        return (res && res.data) || null;
      });
    },

    /** 邮箱 + 密码登录 */
    signInWithPassword: function (email, password) {
      var cloud = requireClient();
      if (!cloud) return Promise.resolve({ error: '云端客户端不可用' });
      return cloud.auth.signInWithPassword({ email: email, password: password })
        .then(function (res) {
          if (!res.error) return refreshSession().then(function () { return res; });
          return res;
        });
    },

    /** 邮箱验证码登录：返回 { verificationId, verify(token) } 形态的结果 */
    signInWithOtp: function (email) {
      var cloud = requireClient();
      if (!cloud) return Promise.resolve({ error: '云端客户端不可用' });
      return cloud.auth.signInWithOtp({ email: email });
    },

    /** 低阶发送验证码（注册流程用，需拿到 verificationId 与 isExistingUser） */
    sendOtp: function (email) {
      var cloud = requireClient();
      if (!cloud) return Promise.resolve({ error: '云端客户端不可用' });
      return cloud.auth.sendOtp({ email: email });
    },

    /** 低阶校验验证码；注册时带上 password 即完成"验证邮箱 + 设置密码" */
    verifyOtp: function (params) {
      var cloud = requireClient();
      if (!cloud) return Promise.resolve({ error: '云端客户端不可用' });
      return cloud.auth.verifyOtp(params).then(function (res) {
        if (!res.error) return refreshSession().then(function () { return res; });
        return res;
      });
    },

    /** 忘记密码：发送找回验证码，返回 { updateUser({ nonce, password }) } */
    resetPasswordForEmail: function (email) {
      var cloud = requireClient();
      if (!cloud) return Promise.resolve({ error: '云端客户端不可用' });
      return cloud.auth.resetPasswordForEmail(email);
    },

    /** 已登录状态下修改密码 */
    changePassword: function (oldPassword, newPassword) {
      var cloud = requireClient();
      if (!cloud) return Promise.resolve({ error: '云端客户端不可用' });
      return cloud.auth.resetPasswordForOld({ oldPassword: oldPassword, newPassword: newPassword });
    },

    /** 退出登录 */
    signOut: function () {
      var cloud = requireClient();
      if (!cloud) return Promise.resolve();
      return cloud.auth.signOut().then(function (res) {
        SurfaceCloud.session = null;
        notify();
        return res;
      });
    }
  };

  SurfaceCloud.displayName = function () {
    return displayNameFromSession(SurfaceCloud.session);
  };

  /* ================================================================== *
   * 4. 素材（Storage + surface_assets 索引表）
   * ================================================================== */

  /**
   * 上传一个文件到云端存储，并在 surface_assets 写入索引行。
   *
   * 存储位置：shared/<uid>/<category>/... —— 所有已登录成员可读，仅本人可改删。
   * 采用签名 URL 访问（云端不提供公开桶 / 公开 URL）。
   *
   * @param {File} file
   * @param {{title?:string, category?:string, deviceId?:string, note?:string}} meta
   */
  SurfaceCloud.uploadAsset = function (file, meta) {
    meta = meta || {};
    var cloud = requireClient();
    if (!cloud) return Promise.reject(new Error('云端客户端不可用'));

    if (!file) return Promise.reject(new Error('未选择文件'));
    if (cfg.maxUploadBytes && file.size > cfg.maxUploadBytes) {
      return Promise.reject(new Error('文件超过 ' + Math.round(cfg.maxUploadBytes / 1024 / 1024) + 'MB 上限'));
    }

    return cloud.auth.getSession().then(function (res) {
      var session = (res && res.data) || null;
      if (!session || !session.user) {
        var e = new Error('请先登录后再上传素材');
        e.kind = 'unauthenticated';
        throw e;
      }

      var category = String(meta.category || 'other');
      var objectPath = cloud.storage.sharedPath(
        session.user.id,
        category + '/' + uuid() + '-' + safeFileName(file.name)
      );

      return cloud.storage
        .upload(objectPath, file, {
          contentType: file.type || 'application/octet-stream',
          cacheControl: '3600',
          upsert: false
        })
        .then(function (up) {
          if (up && up.error) throw new Error(errText(up.error, '文件上传失败'));
          return objectPath;
        })
        .then(function (path) {
          var row = {
            owner_name: displayNameFromSession(session),
            title: String(meta.title || file.name || '未命名素材').slice(0, 200),
            category: category,
            storage_path: path,
            mime_type: file.type || null,
            file_size: file.size
          };
          if (meta.deviceId) row.device_id = String(meta.deviceId);
          if (meta.note) row.note = String(meta.note).slice(0, 500);

          // 注意：绝不发送 owner_id —— 由 DEFAULT auth.uid() 填充，RLS WITH CHECK 校验
          return cloud.database.from('surface_assets').insert(row).select().then(function (ins) {
            if (ins && ins.error) {
              // 索引写入失败则回滚已上传对象，避免产生孤儿文件
              return cloud.storage.remove([path]).catch(function () { /* 回滚失败不阻断报错 */ })
                .then(function () {
                  throw new Error(errText(ins.error, '素材索引写入失败'));
                });
            }
            return (ins && ins.data && ins.data[0]) || row;
          });
        });
    });
  };

  /** 列出全部素材索引行（表策略为登录成员可读） */
  SurfaceCloud.listAssets = function () {
    var cloud = requireClient();
    if (!cloud) return Promise.resolve([]);
    return cloud.database
      .from('surface_assets')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200)
      .then(function (res) {
        if (res.error) throw new Error(errText(res.error, '素材列表读取失败'));
        return Array.isArray(res.data) ? res.data : [];
      });
  };

  /** 批量为素材申请签名访问地址（默认 600 秒） */
  SurfaceCloud.signAssetUrls = function (paths, ttl) {
    var cloud = requireClient();
    if (!cloud || !paths || !paths.length) return Promise.resolve({});

    return cloud.storage.createSignedUrls(paths, ttl || 600).then(function (res) {
      if (res.error) throw new Error(errText(res.error, '签名地址生成失败'));

      // 兼容多种返回结构：数组 / {items:[]} / {urls:[]}；元素可能是字符串或对象
      var d = res.data;
      var list = [];
      if (Array.isArray(d)) list = d;
      else if (d && Array.isArray(d.items)) list = d.items;
      else if (d && Array.isArray(d.urls)) list = d.urls;

      var out = {};
      list.forEach(function (item, idx) {
        if (typeof item === 'string') {
          // 纯字符串数组时按入参顺序回填
          if (paths[idx]) out[paths[idx]] = item;
          return;
        }
        if (item && typeof item === 'object') {
          var url = item.signedUrl || item.signed_url || item.url || item.publicUrl;
          var p = item.path || item.key || item.name || paths[idx];
          if (url && p) out[p] = url;
        }
      });
      return out;
    });
  };

  /** 删除一个素材：先删存储对象，再删索引行 */
  SurfaceCloud.removeAsset = function (asset) {
    var cloud = requireClient();
    if (!cloud) return Promise.reject(new Error('云端客户端不可用'));
    if (!asset || !asset.id || !asset.storage_path) {
      return Promise.reject(new Error('素材信息不完整'));
    }

    return cloud.storage.remove([asset.storage_path]).then(function (rm) {
      if (rm && rm.error) throw new Error(errText(rm.error, '文件删除失败'));
      return cloud.database.from('surface_assets').delete().eq('id', asset.id).select();
    }).then(function (del) {
      if (del && del.error) throw new Error(errText(del.error, '索引删除失败'));
      var affected = (del && Array.isArray(del.data)) ? del.data : [];
      if (affected.length === 0) {
        throw new Error('该素材不属于当前账号，未执行删除');
      }
      return affected[0];
    });
  };

  /** 签名下载地址，用于在新标签页打开附件 */
  SurfaceCloud.assetUrl = function (path, ttl) {
    var cloud = requireClient();
    if (!cloud) return Promise.resolve(null);
    return cloud.storage.createSignedUrl(path, ttl || 600).then(function (res) {
      if (res.error) return null;
      var d = res.data || {};
      if (typeof d === 'string') return d;
      return d.signedUrl || d.signed_url || d.url || null;
    });
  };

  /* ================================================================== *
   * 5. 订阅
   * ================================================================== */

  SurfaceCloud.onChange = function (cb) {
    if (typeof cb === 'function') SurfaceCloud._listeners.push(cb);
  };

  /* ================================================================== *
   * 6. 启动：SDK -> 数据集 -> 会话监听
   * ================================================================== */

  SurfaceCloud.ready = (function boot() {
    var lib = sdk();
    SurfaceCloud.sdkReady = !!(lib && typeof lib.createWorkBuddyCloud === 'function');

    if (!SurfaceCloud.sdkReady) {
      SurfaceCloud.dataSource = 'local';
      SurfaceCloud.fallbackReason = '云端 SDK 未加载（离线或 CDN 不可达），已使用随包内置基线数据';
      return Promise.resolve(SurfaceCloud);
    }

    if (!ensureClient()) {
      SurfaceCloud.dataSource = 'local';
      SurfaceCloud.fallbackReason = '云端公开配置缺失，已使用随包内置基线数据';
      return Promise.resolve(SurfaceCloud);
    }

    // 会话状态监听：登录/登出/续期时同步本地缓存并通知界面
    try {
      SurfaceCloud.client.auth.onAuthStateChange(function (event, session) {
        SurfaceCloud.session = session || null;
        notify();
      });
    } catch (e) { /* 监听注册失败不影响数据加载 */ }

    return fetchCloudDataset()
      .then(function (res) {
        adoptCloudDataset(res);
        return refreshSession();
      })
      .catch(function (err) {
        SurfaceCloud.dataSource = 'local';
        SurfaceCloud.fallbackReason = errText(err, '云端数据集加载失败，已回退到本地基线');
        return null;
      })
      .then(function () {
        notify();
        return SurfaceCloud;
      });
  })();

  if (typeof window !== 'undefined') {
    window.SurfaceCloud = SurfaceCloud;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SurfaceCloud;
  }
})();
