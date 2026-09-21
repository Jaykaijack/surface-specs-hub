/**
 * Microsoft Surface Specs Hub — Cloud UI
 *
 * 只负责「界面与交互」，所有网络动作都委托给 window.SurfaceCloud（见 cloud-client.js）。
 *
 * 提供三块能力：
 *   1. 顶部栏账号按钮（登录 / 账号菜单）
 *   2. 登录弹窗：密码登录 · 邮箱验证码登录 · 注册（验证码 + 设置密码）· 忘记密码
 *   3. 云端素材中心视图（#/assets）：上传、列表、签名预览、下载、删除
 *
 * 安全约定：云端存储不提供公开桶，素材一律通过短时效签名地址访问；
 * 未登录时任何存储/私有数据操作都在此层被拦截并引导登录。
 */
(function () {
  'use strict';

  var Cloud = null; // 惰性获取 window.SurfaceCloud

  var CATEGORY_OPTIONS = [
    { value: 'product-image', label: '产品图 / 渲染图' },
    { value: 'marketing', label: '营销物料 / 海报' },
    { value: 'manual', label: '说明书 / 白皮书附件' },
    { value: 'other', label: '其他资料' }
  ];

  var CATEGORY_LABEL = {};
  CATEGORY_OPTIONS.forEach(function (o) { CATEGORY_LABEL[o.value] = o.label; });

  /** 当前弹窗状态 */
  var modalState = {
    tab: 'password',
    busy: false,
    message: null,      // { type: 'error'|'ok'|'info', text }
    otp: {
      email: '',
      verificationId: null,
      isExistingUser: false,
      mode: null        // 'login' | 'signup' | 'recover'
    }
  };

  /** 素材中心当前状态 */
  var assetsState = {
    loading: false,
    items: [],
    urls: {},
    error: null,
    uploading: false,
    selectedFile: null,
    form: { title: '', category: 'product-image', deviceId: '', note: '' }
  };

  function cloud() {
    if (!Cloud) Cloud = (typeof window !== 'undefined' && window.SurfaceCloud) || null;
    return Cloud;
  }

  function esc(s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function bytes(n) {
    var v = Number(n) || 0;
    if (v < 1024) return v + ' B';
    if (v < 1024 * 1024) return (v / 1024).toFixed(1) + ' KB';
    return (v / 1024 / 1024).toFixed(2) + ' MB';
  }

  function timeText(iso) {
    if (!iso) return '';
    try {
      var d = new Date(iso);
      if (isNaN(d.getTime())) return '';
      var p = function (n) { return n < 10 ? '0' + n : String(n); };
      return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) +
        ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
    } catch (e) { return ''; }
  }

  function isImage(mime, path) {
    if (mime && /^image\//.test(mime)) return true;
    return /\.(png|jpe?g|gif|webp|bmp|svg|avif)$/i.test(path || '');
  }

  function deviceOptions() {
    var data = (typeof window !== 'undefined' && window.SURFACE_DATA) || null;
    if (!data || !Array.isArray(data.devices)) return [];
    return data.devices
      .filter(function (d) { return d && d.id && d.name; })
      .map(function (d) { return { id: d.id, name: d.name }; })
      .sort(function (a, b) { return String(b.name).localeCompare(String(a.name)); });
  }

  /* ================================================================== *
   * A. 顶栏账号按钮
   * ================================================================== */

  function renderAccountButton() {
    var btn = document.getElementById('cloud-account-btn');
    if (!btn) return;

    var c = cloud();
    var session = c && c.session;

    if (session && session.user) {
      var name = (c.displayName && c.displayName()) || '成员';
      btn.innerHTML =
        '<span class="cloud-avatar">' + esc(name.slice(0, 1).toUpperCase()) + '</span>' +
        '<span class="cloud-account-name">' + esc(name) + '</span>';
      btn.title = '已登录：' + name + '（点击查看账号与退出）';
    } else {
      btn.innerHTML =
        '<svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">' +
        '<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"/></svg>' +
        '<span class="cloud-account-name">成员登录</span>';
      btn.title = '登录后可上传并管理云端素材';
    }
  }

  function onAccountClick() {
    var c = cloud();
    if (c && c.session && c.session.user) {
      openAccountModal();
    } else {
      openLoginModal('password');
    }
  }

  /* ================================================================== *
   * B. 弹窗骨架
   * ================================================================== */

  function closeModal() {
    var el = document.getElementById('cloud-modal-root');
    if (el) el.remove();
    if (document.body) document.body.style.overflow = '';
    renderAccountButton();
  }

  function mountModal(innerHtml) {
    closeModal();
    var wrap = document.createElement('div');
    wrap.id = 'cloud-modal-root';
    wrap.className = 'cloud-modal-backdrop';
    wrap.innerHTML = '<div class="cloud-modal-card" role="dialog" aria-modal="true">' + innerHtml + '</div>';

    wrap.addEventListener('click', function (e) {
      if (e.target === wrap) closeModal();
    });
    document.addEventListener('keydown', onModalKeydown, true);

    document.body.appendChild(wrap);
    document.body.style.overflow = 'hidden';
    return wrap;
  }

  function onModalKeydown(e) {
    if (e.key === 'Escape') {
      document.removeEventListener('keydown', onModalKeydown, true);
      closeModal();
    }
  }

  function messageHtml() {
    if (!modalState.message) return '';
    var m = modalState.message;
    var cls = m.type === 'error' ? 'error' : (m.type === 'ok' ? 'ok' : 'info');
    return '<div class="cloud-msg ' + cls + '">' + esc(m.text) + '</div>';
  }

  function setMessage(type, text) {
    modalState.message = text ? { type: type, text: text } : null;
  }

  function sdkNoticeHtml() {
    var c = cloud();
    if (!c) return '';
    if (c.sdkReady) return '';
    return '<div class="cloud-msg info">云端服务组件未能加载（可能处于离线环境）。' +
      '登录与素材功能需要在联网并已发布的环境下使用。</div>';
  }

  function originNoticeHtml() {
    var host = (typeof window !== 'undefined' && window.location) ? window.location.hostname : '';
    if (!host) return '';
    var isReleased = /\.workbuddy\.(host|link|cn)$/i.test(host) || /\.workbuddy\./i.test(host);
    if (isReleased) return '';
    return '<div class="cloud-msg info">当前访问域名（' + esc(host) + '）不是应用的正式发布域，' +
      '云端账号能力仅在正式发布域名下生效。</div>';
  }

  /* ================================================================== *
   * C. 登录弹窗
   * ================================================================== */

  function tabsHtml() {
    var tabs = [
      { key: 'password', label: '密码登录' },
      { key: 'otp', label: '验证码登录' },
      { key: 'signup', label: '注册账号' },
      { key: 'recover', label: '忘记密码' }
    ];
    return '<div class="m3-segmented-control" style="margin-bottom:16px;width:100%;display:flex;">' +
      tabs.map(function (t) {
        return '<button type="button" class="m3-segmented-btn' + (modalState.tab === t.key ? ' active' : '') +
          '" data-cloud-tab="' + t.key + '" style="flex:1 1 0;">' + t.label + '</button>';
      }).join('') + '</div>';
  }

  function busyBtn(label, cls) {
    var spinning = modalState.busy ? '<span class="cloud-spinner"></span>' : '';
    return '<button type="button" class="fluent-btn ' + (cls || 'primary') + '" style="width:100%;justify-content:center;"' +
      (modalState.busy ? ' disabled' : '') + '>' + spinning + esc(label) + '</button>';
  }

  function renderLoginModal() {
    var body = '';

    if (modalState.tab === 'password') {
      body =
        '<form data-cloud-form="password">' +
        '<div class="cloud-field"><label for="cloud-email">邮箱</label>' +
        '<input class="cloud-input" id="cloud-email" type="email" autocomplete="username" required placeholder="you@example.com"></div>' +
        '<div class="cloud-field"><label for="cloud-password">密码</label>' +
        '<input class="cloud-input" id="cloud-password" type="password" autocomplete="current-password" required placeholder="请输入密码"></div>' +
        busyBtn('登录') +
        '</form>' +
        '<div class="cloud-hint" style="margin-top:12px;">尚未注册？切换到「注册账号」，' +
        '需先通过邮箱验证码验证邮箱，再设置密码。</div>';

    } else if (modalState.tab === 'otp') {
      var sent = !!modalState.otp.verificationId;
      body =
        '<form data-cloud-form="otp">' +
        '<div class="cloud-field"><label for="cloud-email">邮箱</label>' +
        '<input class="cloud-input" id="cloud-email" type="email" autocomplete="username" required placeholder="you@example.com"' +
        (sent ? ' value="' + esc(modalState.otp.email) + '" readonly' : '') + '></div>' +
        (sent
          ? '<div class="cloud-field"><label for="cloud-token">邮箱收到的验证码</label>' +
            '<input class="cloud-input" id="cloud-token" type="text" inputmode="numeric" autocomplete="one-time-code" required placeholder="6 位验证码"></div>' +
            busyBtn('验证并登录') +
            '<div style="margin-top:10px;"><button type="button" class="fluent-btn-sm" data-cloud-action="otp-restart" style="width:100%;">换个邮箱重发</button></div>'
          : busyBtn('发送验证码')) +
        '</form>';

    } else if (modalState.tab === 'signup') {
      var signupSent = !!modalState.otp.verificationId;
      body =
        '<form data-cloud-form="signup">' +
        '<div class="cloud-field"><label for="cloud-email">邮箱</label>' +
        '<input class="cloud-input" id="cloud-email" type="email" autocomplete="username" required placeholder="you@example.com"' +
        (signupSent ? ' value="' + esc(modalState.otp.email) + '" readonly' : '') + '></div>' +
        (signupSent
          ? '<div class="cloud-field"><label for="cloud-token">邮箱验证码</label>' +
            '<input class="cloud-input" id="cloud-token" type="text" inputmode="numeric" autocomplete="one-time-code" required placeholder="6 位验证码"></div>' +
            '<div class="cloud-field"><label for="cloud-password">设置登录密码</label>' +
            '<input class="cloud-input" id="cloud-password" type="password" autocomplete="new-password" required minlength="6" placeholder="至少 6 位"></div>' +
            '<div class="cloud-field"><label for="cloud-password2">确认密码</label>' +
            '<input class="cloud-input" id="cloud-password2" type="password" autocomplete="new-password" required minlength="6" placeholder="再次输入密码"></div>' +
            busyBtn('完成注册并登录') +
            '<div style="margin-top:10px;"><button type="button" class="fluent-btn-sm" data-cloud-action="otp-restart" style="width:100%;">换个邮箱重发</button></div>'
          : busyBtn('发送验证码')) +
        '</form>' +
        '<div class="cloud-hint" style="margin-top:12px;">注册需先验证邮箱归属：' +
        '收到验证码后填写并设置密码，即可用密码或验证码登录。</div>';

    } else if (modalState.tab === 'recover') {
      var recSent = !!modalState.otp.verificationId;
      body =
        '<form data-cloud-form="recover">' +
        '<div class="cloud-field"><label for="cloud-email">邮箱</label>' +
        '<input class="cloud-input" id="cloud-email" type="email" autocomplete="username" required placeholder="you@example.com"' +
        (recSent ? ' value="' + esc(modalState.otp.email) + '" readonly' : '') + '></div>' +
        (recSent
          ? '<div class="cloud-field"><label for="cloud-token">邮件中的重置验证码</label>' +
            '<input class="cloud-input" id="cloud-token" type="text" inputmode="numeric" autocomplete="one-time-code" required placeholder="验证码"></div>' +
            '<div class="cloud-field"><label for="cloud-password">新密码</label>' +
            '<input class="cloud-input" id="cloud-password" type="password" autocomplete="new-password" required minlength="6" placeholder="至少 6 位"></div>' +
            '<div class="cloud-field"><label for="cloud-password2">确认新密码</label>' +
            '<input class="cloud-input" id="cloud-password2" type="password" autocomplete="new-password" required minlength="6" placeholder="再次输入新密码"></div>' +
            busyBtn('重置密码') +
            '<div style="margin-top:10px;"><button type="button" class="fluent-btn-sm" data-cloud-action="otp-restart" style="width:100%;">重新发送验证码</button></div>'
          : busyBtn('发送重置验证码')) +
        '</form>';
    }

    mountModal(
      '<div class="cloud-modal-head">' +
      '<h2 class="cloud-modal-title">Surface 参数中枢 · 成员中心</h2>' +
      '<button type="button" class="cloud-modal-close" data-cloud-action="close" aria-label="关闭">✕</button>' +
      '</div>' +
      '<p class="cloud-modal-sub">登录后可将产品图片与资料附件上传到云端存储，供团队成员共享查阅。</p>' +
      sdkNoticeHtml() + originNoticeHtml() + messageHtml() + tabsHtml() + body
    );

    bindModalEvents();
  }

  function openLoginModal(tab) {
    if (tab) modalState.tab = tab;
    setMessage(null);
    modalState.otp.verificationId = null;
    modalState.otp.expired = false;
    renderLoginModal();
    focusFirstInput();
  }

  function focusFirstInput() {
    var el = document.querySelector('#cloud-modal-root input:not([readonly])');
    if (el) el.focus();
  }

  function bindModalEvents() {
    var root = document.getElementById('cloud-modal-root');
    if (!root) return;

    root.querySelectorAll('[data-cloud-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setMessage(null);
        modalState.tab = btn.getAttribute('data-cloud-tab');
        modalState.otp.verificationId = null;
        renderLoginModal();
        focusFirstInput();
      });
    });

    root.querySelector('[data-cloud-action="close"]') &&
      root.querySelector('[data-cloud-action="close"]').addEventListener('click', closeModal);

    var restart = root.querySelector('[data-cloud-action="otp-restart"]');
    if (restart) {
      restart.addEventListener('click', function () {
        modalState.otp.verificationId = null;
        setMessage(null);
        renderLoginModal();
        focusFirstInput();
      });
    }

    var form = root.querySelector('form[data-cloud-form]');
    if (form) form.addEventListener('submit', onModalSubmit);

    // 账号弹窗
    var signOutBtn = root.querySelector('[data-cloud-action="signout"]');
    if (signOutBtn) signOutBtn.addEventListener('click', onSignOut);

    var pwdBtn = root.querySelector('[data-cloud-action="change-password"]');
    if (pwdBtn) pwdBtn.addEventListener('click', onChangePasswordSubmit);
  }

  function val(id) {
    var el = document.getElementById(id);
    return el ? String(el.value || '').trim() : '';
  }

  function onModalSubmit(e) {
    e.preventDefault();
    if (modalState.busy) return;

    var kind = e.currentTarget.getAttribute('data-cloud-form');
    if (kind === 'password') return submitPassword();
    if (kind === 'otp') return submitOtp();
    if (kind === 'signup') return submitSignup();
    if (kind === 'recover') return submitRecover();
  }

  function withBusy(fn) {
    modalState.busy = true;
    var root = document.getElementById('cloud-modal-root');
    if (root) root.classList.add('is-busy');
    return fn().then(function (r) {
      modalState.busy = false;
      return r;
    }, function (err) {
      modalState.busy = false;
      throw err;
    });
  }

  function submitPassword() {
    var email = val('cloud-email');
    var password = val('cloud-password');
    if (!email || !password) return setMessage('error', '请填写邮箱与密码') || renderLoginModal();

    withBusy(function () {
      return cloud().auth.signInWithPassword(email, password);
    }).then(function (res) {
      if (res && res.error) {
        setMessage('error', errOf(res.error, '账号或密码不正确'));
        renderLoginModal();
        return;
      }
      closeModal();
      renderAccountButton();
      if (isAssetsRoute()) refreshAssetsView();
    }).catch(function (err) {
      setMessage('error', errText(err));
      renderLoginModal();
    });
  }

  function submitOtp() {
    var email = val('cloud-email');
    if (!email) { setMessage('error', '请输入邮箱'); renderLoginModal(); return; }

    if (!modalState.otp.verificationId) {
      withBusy(function () {
        return cloud().auth.signInWithOtp(email);
      }).then(function (res) {
        if (res && res.error) {
          setMessage('error', errOf(res.error, '验证码发送失败'));
          renderLoginModal();
          return;
        }
        modalState.otp.email = email;
        modalState.otp.pending = res.data;
        setMessage('ok', '验证码已发送，请查收邮箱。');
        renderLoginModal();
      }).catch(function (err) {
        setMessage('error', errText(err));
        renderLoginModal();
      });
      return;
    }

    var token = val('cloud-token');
    if (!token) { setMessage('error', '请输入邮箱收到的验证码'); renderLoginModal(); return; }

    withBusy(function () {
      var pending = modalState.otp.pending;
      if (pending && typeof pending.verify === 'function') {
        return pending.verify({ token: token });
      }
      return cloud().auth.verifyOtp({
        verificationId: modalState.otp.verificationId,
        token: token,
        email: modalState.otp.email,
        isExistingUser: true
      });
    }).then(function (res) {
      if (res && res.error) {
        setMessage('error', errOf(res.error, '验证码不正确或已过期'));
        renderLoginModal();
        return;
      }
      closeModal();
      renderAccountButton();
      if (isAssetsRoute()) refreshAssetsView();
    }).catch(function (err) {
      setMessage('error', errText(err));
      renderLoginModal();
    });
  }

  function submitSignup() {
    var email = val('cloud-email');
    if (!email) { setMessage('error', '请输入邮箱'); renderLoginModal(); return; }

    if (!modalState.otp.verificationId) {
      withBusy(function () {
        return cloud().auth.sendOtp(email);
      }).then(function (res) {
        if (res && res.error) {
          setMessage('error', errOf(res.error, '验证码发送失败'));
          renderLoginModal();
          return;
        }
        var d = res.data || {};
        modalState.otp.email = email;
        modalState.otp.verificationId = d.verificationId;
        modalState.otp.isExistingUser = !!d.isExistingUser;
        setMessage('ok', '验证码已发送，请查收邮箱。');
        renderLoginModal();
      }).catch(function (err) {
        setMessage('error', errText(err));
        renderLoginModal();
      });
      return;
    }

    var token = val('cloud-token');
    var pwd = val('cloud-password');
    var pwd2 = val('cloud-password2');

    if (!token) { setMessage('error', '请输入邮箱验证码'); renderLoginModal(); return; }
    if (!pwd || pwd.length < 6) { setMessage('error', '密码至少 6 位'); renderLoginModal(); return; }
    if (pwd !== pwd2) { setMessage('error', '两次输入的密码不一致'); renderLoginModal(); return; }

    // 该邮箱已是注册用户时，中立引导到登录，不暴露账号是否存在的具体信息
    if (modalState.otp.isExistingUser) {
      modalState.tab = 'password';
      modalState.otp.verificationId = null;
      setMessage('info', '该邮箱已完成验证，请直接登录或使用验证码登录。');
      renderLoginModal();
      return;
    }

    withBusy(function () {
      return cloud().auth.verifyOtp({
        verificationId: modalState.otp.verificationId,
        token: token,
        email: modalState.otp.email,
        isExistingUser: false,
        password: pwd
      });
    }).then(function (res) {
      if (res && res.error) {
        setMessage('error', errOf(res.error, '注册失败，请检查验证码是否正确'));
        renderLoginModal();
        return;
      }
      closeModal();
      renderAccountButton();
      if (isAssetsRoute()) refreshAssetsView();
    }).catch(function (err) {
      setMessage('error', errText(err));
      renderLoginModal();
    });
  }

  function submitRecover() {
    var email = val('cloud-email');
    if (!email) { setMessage('error', '请输入邮箱'); renderLoginModal(); return; }

    if (!modalState.otp.verificationId) {
      withBusy(function () {
        return cloud().auth.resetPasswordForEmail(email);
      }).then(function (res) {
        if (res && res.error) {
          setMessage('error', errOf(res.error, '重置邮件发送失败'));
          renderLoginModal();
          return;
        }
        modalState.otp.email = email;
        modalState.otp.pendingReset = res.data;
        // 进入第二步：需要用户填写验证码与新密码
        modalState.otp.verificationId = 'pending';
        setMessage('ok', '重置验证码已发送，请查收邮箱。');
        renderLoginModal();
      }).catch(function (err) {
        setMessage('error', errText(err));
        renderLoginModal();
      });
      return;
    }

    var token = val('cloud-token');
    var pwd = val('cloud-password');
    var pwd2 = val('cloud-password2');
    if (!token) { setMessage('error', '请输入邮件中的重置验证码'); renderLoginModal(); return; }
    if (!pwd || pwd.length < 6) { setMessage('error', '新密码至少 6 位'); renderLoginModal(); return; }
    if (pwd !== pwd2) { setMessage('error', '两次输入的密码不一致'); renderLoginModal(); return; }

    withBusy(function () {
      var pending = modalState.otp.pendingReset;
      if (pending && typeof pending.updateUser === 'function') {
        return pending.updateUser({ nonce: token, password: pwd });
      }
      throw new Error('重置流程不可用，请重新发送验证码');
    }).then(function (res) {
      if (res && res.error) {
        setMessage('error', errOf(res.error, '重置失败，请检查验证码'));
        renderLoginModal();
        return;
      }
      closeModal();
      renderAccountButton();
      if (isAssetsRoute()) refreshAssetsView();
    }).catch(function (err) {
      setMessage('error', errText(err));
      renderLoginModal();
    });
  }

  function onSignOut() {
    withBusy(function () {
      return cloud().auth.signOut();
    }).then(function () {
      closeModal();
      renderAccountButton();
      if (isAssetsRoute()) refreshAssetsView();
    }).catch(function (err) {
      setMessage('error', errText(err));
      renderAccountModal();
    });
  }

  function onChangePasswordSubmit() {
    var oldPwd = val('cloud-old-password');
    var pwd = val('cloud-new-password');
    var pwd2 = val('cloud-new-password2');
    if (!oldPwd || !pwd) { setMessage('error', '请填写当前密码与新密码'); renderAccountModal(); return; }
    if (pwd.length < 6) { setMessage('error', '新密码至少 6 位'); renderAccountModal(); return; }
    if (pwd !== pwd2) { setMessage('error', '两次输入的新密码不一致'); renderAccountModal(); return; }

    withBusy(function () {
      return cloud().auth.changePassword(oldPwd, pwd);
    }).then(function (res) {
      if (res && res.error) {
        setMessage('error', errOf(res.error, '修改密码失败'));
        renderAccountModal();
        return;
      }
      setMessage('ok', '密码已更新。');
      renderAccountModal();
    }).catch(function (err) {
      setMessage('error', errText(err));
      renderAccountModal();
    });
  }

  function renderAccountModal() {
    var c = cloud();
    var name = (c && c.displayName && c.displayName()) || '成员';
    var email = (c && c.session && c.session.user && c.session.user.email) || '';

    mountModal(
      '<div class="cloud-modal-head">' +
      '<h2 class="cloud-modal-title">成员账号</h2>' +
      '<button type="button" class="cloud-modal-close" data-cloud-action="close" aria-label="关闭">✕</button>' +
      '</div>' +
      '<p class="cloud-modal-sub">' + esc(name) + (email ? ' · ' + esc(email) : '') + '</p>' +
      messageHtml() +
      '<div style="display:flex;gap:10px;margin-bottom:18px;flex-wrap:wrap;">' +
      '<button type="button" class="fluent-btn primary" data-cloud-action="goto-assets">进入云端素材中心</button>' +
      '<button type="button" class="fluent-btn" data-cloud-action="signout">退出登录</button>' +
      '</div>' +
      '<details style="border-top:1px solid var(--ms-border-subtle);padding-top:14px;">' +
      '<summary style="cursor:pointer;font-weight:600;font-size:var(--ms-font-size-md);">修改密码</summary>' +
      '<div style="margin-top:12px;">' +
      '<div class="cloud-field"><label for="cloud-old-password">当前密码</label>' +
      '<input class="cloud-input" id="cloud-old-password" type="password" autocomplete="current-password"></div>' +
      '<div class="cloud-field"><label for="cloud-new-password">新密码</label>' +
      '<input class="cloud-input" id="cloud-new-password" type="password" autocomplete="new-password"></div>' +
      '<div class="cloud-field"><label for="cloud-new-password2">确认新密码</label>' +
      '<input class="cloud-input" id="cloud-new-password2" type="password" autocomplete="new-password"></div>' +
      busyBtn('保存新密码') +
      '</div></details>'
    );

    bindModalEvents();
    var goto = document.querySelector('[data-cloud-action="goto-assets"]');
    if (goto) {
      goto.addEventListener('click', function () {
        closeModal();
        if (window.App && App.navigate) App.navigate('#/assets');
      });
    }
  }

  function openAccountModal() {
    setMessage(null);
    renderAccountModal();
  }

  /* ================================================================== *
   * D. 云端素材中心视图
   * ================================================================== */

  function isAssetsRoute() {
    return (typeof window !== 'undefined' && window.location.hash || '').indexOf('#/assets') === 0;
  }

  function signedIn() {
    var c = cloud();
    return !!(c && c.session && c.session.user);
  }

  function renderAssetsShell(main) {
    if (!signedIn()) {
      main.innerHTML =
        '<div class="cloud-page-head">' +
        '<div><h1 class="cloud-page-title">云端素材中心</h1>' +
        '<p class="cloud-page-desc">产品图片与资料附件统一存放在云端存储，团队成员登录后可共享查阅。' +
        '未登录状态下不会读取任何成员数据。</p></div>' +
        dataSourceBadgeHtml() +
        '</div>' +
        sdkNoticeHtml() + originNoticeHtml() +
        '<div class="cloud-lock-panel">' +
        '<h2 class="cloud-lock-title">需要登录</h2>' +
        '<p class="cloud-lock-desc">上传与查看素材需要成员身份。登录支持邮箱密码、邮箱验证码两种方式，' +
        '也可直接注册新账号。</p>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap;">' +
        '<button type="button" class="fluent-btn primary" data-cloud-action="open-login">登录 / 注册</button>' +
        '<button type="button" class="fluent-btn" onclick="App.navigate(\'#/\')">返回参数总览</button>' +
        '</div></div>';

      var openBtn = main.querySelector('[data-cloud-action="open-login"]');
      if (openBtn) openBtn.addEventListener('click', function () { openLoginModal('password'); });
      return;
    }
    renderAssetsBody(main);
  }

  function dataSourceBadgeHtml() {
    var c = cloud();
    if (!c) return '';
    if (c.dataSource === 'cloud') {
      return '<span class="cloud-src-badge is-cloud"><span class="cloud-dot"></span>参数数据来自云端数据库 · v' +
        esc(c.datasetVersion || c.config.datasetVersion || '') + '</span>';
    }
    return '<span class="cloud-src-badge is-local"><span class="cloud-dot"></span>当前使用本地基线数据</span>';
  }

  function renderAssetsBody(main) {
    var devs = deviceOptions();
    var devOpts = '<option value="">（不关联具体机型）</option>' + devs.map(function (d) {
      return '<option value="' + esc(d.id) + '"' + (assetsState.form.deviceId === d.id ? ' selected' : '') + '>' +
        esc(d.name) + '</option>';
    }).join('');

    main.innerHTML =
      '<div class="cloud-page-head">' +
      '<div><h1 class="cloud-page-title">云端素材中心</h1>' +
      '<p class="cloud-page-desc">上传的产品图片与资料附件保存在云端存储中，所有登录成员可共享查阅；' +
      '仅上传者本人可删除。所有文件均通过短时效签名地址访问。</p></div>' +
      '<div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end;">' +
      dataSourceBadgeHtml() +
      '<span class="cloud-tag">存储用量：' + assetsState.items.length + ' 个素材</span>' +
      '</div>' +
      '</div>' +

      '<div class="cloud-toolbar">' +
      '<button type="button" class="fluent-btn-sm" data-cloud-action="reload-assets">刷新列表</button>' +
      '<button type="button" class="fluent-btn-sm" onclick="App.navigate(\'#/\')">返回参数总览</button>' +
      '</div>' +

      messageHtml() +

      '<div style="display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:18px;align-items:start;" class="cloud-upload-layout">' +
      '<div class="cloud-drop" id="cloud-drop-zone">' +
      '<div class="cloud-drop-title">选择或拖拽文件到此处上传</div>' +
      '<div class="cloud-drop-hint">支持图片与常见文档附件，单个文件不超过 ' +
      Math.round((cloud() && cloud().config.maxUploadBytes || 26214400) / 1024 / 1024) + 'MB</div>' +
      (assetsState.selectedFile
        ? '<div class="cloud-drop-hint" style="margin-top:10px;font-weight:600;">已选择：' +
          esc(assetsState.selectedFile.name) + '（' + bytes(assetsState.selectedFile.size) + '）</div>'
        : '') +
      '<input type="file" id="cloud-file-input" style="display:none;">' +
      '</div>' +

      '<div class="cloud-lock-panel" style="padding:16px;">' +
      '<div class="cloud-field"><label for="cloud-asset-title">素材标题</label>' +
      '<input class="cloud-input" id="cloud-asset-title" type="text" placeholder="例如：Surface Pro 13 商用版产品图" value="' + esc(assetsState.form.title) + '"></div>' +
      '<div class="cloud-field"><label for="cloud-asset-category">分类</label>' +
      '<select class="cloud-input" id="cloud-asset-category">' +
      CATEGORY_OPTIONS.map(function (o) {
        return '<option value="' + o.value + '"' + (assetsState.form.category === o.value ? ' selected' : '') + '>' + esc(o.label) + '</option>';
      }).join('') + '</select></div>' +
      '<div class="cloud-field"><label for="cloud-asset-device">关联机型（可选）</label>' +
      '<select class="cloud-input" id="cloud-asset-device">' + devOpts + '</select></div>' +
      '<div class="cloud-field"><label for="cloud-asset-note">备注（可选）</label>' +
      '<input class="cloud-input" id="cloud-asset-note" type="text" placeholder="用途说明" value="' + esc(assetsState.form.note) + '"></div>' +
      '<button type="button" class="fluent-btn primary" style="width:100%;justify-content:center;" data-cloud-action="upload"' +
      (assetsState.uploading || !assetsState.selectedFile ? ' disabled' : '') + '>' +
      (assetsState.uploading ? '<span class="cloud-spinner"></span>' : '') + '上传到云端</button>' +
      '</div></div>' +

      '<h2 style="font-size:var(--ms-font-size-lg);margin:22px 0 12px;">已上传素材</h2>' +
      assetsGridHtml();

    bindAssetsEvents(main);
  }

  function assetsGridHtml() {
    if (assetsState.loading) {
      return '<div class="cloud-empty"><span class="cloud-spinner"></span>正在读取素材列表…</div>';
    }
    if (assetsState.error) {
      return '<div class="cloud-empty">' + esc(assetsState.error) + '</div>';
    }
    if (!assetsState.items.length) {
      return '<div class="cloud-empty">还没有素材。选择左侧文件并填写标题即可上传第一个素材。</div>';
    }

    return '<div class="cloud-grid">' + assetsState.items.map(function (a) {
      var url = assetsState.urls[a.storage_path];
      var img = isImage(a.mime_type, a.storage_path);
      var thumb = '';
      if (img && url) {
        thumb = '<img src="' + esc(url) + '" alt="' + esc(a.title) + '" loading="lazy">';
      } else if (img) {
        thumb = '<span class="cloud-file-icon">🖼️</span>';
      } else {
        thumb = '<span class="cloud-file-icon">📄</span>';
      }

      var mine = (cloud() && cloud().session && cloud().session.user && a.owner_id === cloud().session.user.id);

      return '<div class="cloud-asset-card">' +
        '<div class="cloud-asset-thumb">' + thumb + '</div>' +
        '<div class="cloud-asset-body">' +
        '<div class="cloud-asset-title">' + esc(a.title) + '</div>' +
        '<div class="cloud-asset-meta">' +
        '<span class="cloud-tag">' + esc(CATEGORY_LABEL[a.category] || a.category || '未分类') + '</span>' +
        (a.device_id ? ' <span class="cloud-tag">' + esc(a.device_id) + '</span>' : '') +
        '</div>' +
        '<div class="cloud-asset-meta">' + esc(bytes(a.file_size)) +
        (a.owner_name ? ' · ' + esc(a.owner_name) : '') +
        (a.created_at ? ' · ' + esc(timeText(a.created_at)) : '') + '</div>' +
        '<div class="cloud-asset-actions">' +
        (url ? '<button type="button" class="fluent-btn-sm" data-cloud-open="' + esc(url) + '">打开</button>' : '') +
        '<button type="button" class="fluent-btn-sm" data-cloud-download="' + esc(a.id) + '">下载</button>' +
        (mine ? '<button type="button" class="fluent-btn-sm" data-cloud-del="' + esc(a.id) + '">删除</button>' : '') +
        '</div></div></div>';
    }).join('') + '</div>';
  }

  function bindAssetsEvents(main) {
    var reload = main.querySelector('[data-cloud-action="reload-assets"]');
    if (reload) reload.addEventListener('click', function () {
      captureFormState();          // 保住在编辑中的表单内容
      refreshAssetsView(true);
    });

    var drop = main.querySelector('#cloud-drop-zone');
    var input = main.querySelector('#cloud-file-input');
    if (drop && input) {
      drop.addEventListener('click', function () { input.click(); });
      input.addEventListener('change', function () {
        if (input.files && input.files[0]) {
          assetsState.selectedFile = input.files[0];
          if (!assetsState.form.title) assetsState.form.title = input.files[0].name;
          renderAssetsBody(main);
        }
      });
      ['dragenter', 'dragover'].forEach(function (ev) {
        drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('is-over'); });
      });
      ['dragleave', 'drop'].forEach(function (ev) {
        drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('is-over'); });
      });
      drop.addEventListener('drop', function (e) {
        var f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) {
          assetsState.selectedFile = f;
          if (!assetsState.form.title) assetsState.form.title = f.name;
          renderAssetsBody(main);
        }
      });
    }

    var upload = main.querySelector('[data-cloud-action="upload"]');
    if (upload) upload.addEventListener('click', function () { doUpload(main); });

    main.querySelectorAll('[data-cloud-open]').forEach(function (b) {
      b.addEventListener('click', function () {
        window.open(b.getAttribute('data-cloud-open'), '_blank', 'noopener');
      });
    });

    main.querySelectorAll('[data-cloud-download]').forEach(function (b) {
      b.addEventListener('click', function () { doDownload(b.getAttribute('data-cloud-download')); });
    });

    main.querySelectorAll('[data-cloud-del]').forEach(function (b) {
      b.addEventListener('click', function () { doDelete(b.getAttribute('data-cloud-del'), main); });
    });
  }

  function captureFormState() {
    var t = document.getElementById('cloud-asset-title');
    var c = document.getElementById('cloud-asset-category');
    var d = document.getElementById('cloud-asset-device');
    var n = document.getElementById('cloud-asset-note');
    if (t) assetsState.form.title = t.value;
    if (c) assetsState.form.category = c.value;
    if (d) assetsState.form.deviceId = d.value;
    if (n) assetsState.form.note = n.value;
  }

  function doUpload(main) {
    captureFormState();
    if (!assetsState.selectedFile) {
      setMessage('error', '请先选择要上传的文件');
      renderAssetsBody(main);
      return;
    }
    if (!assetsState.form.title) {
      setMessage('error', '请填写素材标题');
      renderAssetsBody(main);
      return;
    }

    assetsState.uploading = true;
    setMessage(null);
    renderAssetsBody(main);

    cloud().uploadAsset(assetsState.selectedFile, {
      title: assetsState.form.title,
      category: assetsState.form.category,
      deviceId: assetsState.form.deviceId,
      note: assetsState.form.note
    }).then(function () {
      assetsState.uploading = false;
      assetsState.selectedFile = null;
      assetsState.form.title = '';
      assetsState.form.note = '';
      setMessage('ok', '上传成功，素材已保存到云端。');
      return loadAssets(true);
    }).catch(function (err) {
      assetsState.uploading = false;
      setMessage('error', errText(err));
      renderAssetsBody(main);
    });
  }

  function doDownload(id) {
    var asset = assetsState.items.filter(function (a) { return String(a.id) === String(id); })[0];
    if (!asset) return;
    cloud().assetUrl(asset.storage_path, 600).then(function (url) {
      if (url) window.open(url, '_blank', 'noopener');
      else {
        setMessage('error', '暂时无法生成下载地址，请稍后重试');
        renderAssetsView();
      }
    });
  }

  function doDelete(id, main) {
    var asset = assetsState.items.filter(function (a) { return String(a.id) === String(id); })[0];
    if (!asset) return;
    var ok = window.confirm('确定删除素材「' + asset.title + '」吗？\n\n该操作会同时移除云端文件，且不可撤销。');
    if (!ok) return;

    cloud().removeAsset(asset).then(function () {
      setMessage('ok', '素材已删除。');
      return loadAssets(true);
    }).catch(function (err) {
      setMessage('error', errText(err));
      renderAssetsBody(main);
    });
  }

  /** 拉取素材列表并申请签名预览地址 */
  function loadAssets(force) {
    if (assetsState.loading && !force) return Promise.resolve();
    assetsState.loading = true;
    assetsState.error = null;

    return cloud().listAssets().then(function (items) {
      assetsState.items = items;
      var paths = items
        .filter(function (a) { return isImage(a.mime_type, a.storage_path); })
        .map(function (a) { return a.storage_path; })
        .slice(0, 60);
      if (!paths.length) {
        assetsState.urls = {};
        return;
      }
      return cloud().signAssetUrls(paths, 600).then(function (map) {
        assetsState.urls = map || {};
      }).catch(function () {
        assetsState.urls = {}; // 签名失败不阻断列表展示
      });
    }).catch(function (err) {
      assetsState.error = errText(err, '素材列表读取失败');
      assetsState.items = [];
    }).then(function () {
      assetsState.loading = false;
    });
  }

  /** 视图刷新入口：由 app.js 的 #/assets 路由调用 */
  function renderAssetsView(main) {
    if (!main) return;
    if (!signedIn()) {
      setMessage(null);
      renderAssetsShell(main);
      // 首次进入时静默确认一次会话，避免刷新后误判为未登录
      cloud() && cloud().auth.getSession().then(function (s) {
        if (s && s.user) renderAssetsView(main);
      });
      return;
    }
    renderAssetsShell(main);
    loadAssets(true).then(function () {
      if (isAssetsRoute()) renderAssetsBody(main);
    });
  }

  function refreshAssetsView(force) {
    var main = document.getElementById('hub-main-content');
    if (!main || !isAssetsRoute()) return;
    if (!signedIn()) { renderAssetsShell(main); return; }
    loadAssets(force).then(function () { renderAssetsBody(main); });
  }

  /* ================================================================== *
   * E. 初始化
   * ================================================================== */

  function mountHeaderButton() {
    if (document.getElementById('cloud-account-btn')) return;
    var host = document.querySelector('.header-right');
    if (!host) return;

    var btn = document.createElement('button');
    btn.className = 'header-btn cloud-account-btn';
    btn.id = 'cloud-account-btn';
    btn.type = 'button';
    btn.addEventListener('click', onAccountClick);

    var anchor = document.getElementById('theme-toggle-btn');
    if (anchor && anchor.parentNode === host) host.insertBefore(btn, anchor);
    else host.appendChild(btn);

    renderAccountButton();
  }

  function mountFooterStatus() {
    var footer = document.querySelector('.hub-footer');
    if (!footer || document.getElementById('cloud-footer-status')) return;
    var div = document.createElement('div');
    div.id = 'cloud-footer-status';
    div.style.marginTop = '8px';
    footer.appendChild(div);
    renderFooterStatus();
  }

  function renderFooterStatus() {
    var el = document.getElementById('cloud-footer-status');
    if (!el) return;
    var c = cloud();

    var map = {
      cloud: '参数数据源：云端数据库 (surface_dataset v' + esc(c.datasetVersion || '') + '，' +
        c.chunkCount + ' 个分片 / ' + c.cloudDeviceCount + ' 款机型)',
      local: '参数数据源：随包内置基线（离线可用）'
    };
    var text = (c && map[c.dataSource]) || map.local;
    var tip = (c && c.fallbackReason) ? ' · 回退原因：' + esc(c.fallbackReason) : '';
    var assetsLink = signedIn()
      ? ' · <a href="#/assets" style="color:inherit;">云端素材中心</a>'
      : ' · <a href="#/assets" style="color:inherit;">成员登录 / 素材中心</a>';

    el.innerHTML = esc(text) + esc(tip) + assetsLink +
      ' · 最后核验：2026-09-18 · <a href="#/" style="color:inherit;">返回首页</a>';
  }

  var SurfaceCloudUI = {
    init: function () {
      mountHeaderButton();
      mountFooterStatus();

      var c = cloud();
      if (c) {
        c.onChange(function () {
          renderAccountButton();
          renderFooterStatus();
          if (isAssetsRoute()) refreshAssetsView();
        });
        // 会话可能在 ready 之后才恢复，这里补一次渲染
        if (c.session) {
          renderAccountButton();
          renderFooterStatus();
        }
      }
    },

    renderAssetsView: renderAssetsView,
    openLoginModal: openLoginModal,
    openAccountModal: openAccountModal,
    refreshDataBadges: function () {
      renderFooterStatus();
      renderAccountButton();
    }
  };

  if (typeof window !== 'undefined') {
    window.SurfaceCloudUI = SurfaceCloudUI;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SurfaceCloudUI;
  }
})();
