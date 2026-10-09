/**
 * Catalog — 产品档案的唯一读取 seam。
 * 本地基线与云端载荷都是 adapter；调用方只通过本 interface 取数。
 */
const Catalog = (function () {
  const DATA_KEYS = [
    'categories',
    'consumerCategories',
    'commercialCategories',
    'xboxCategories',
    'specGroups',
    'devices',
    'chips',
    'accessories'
  ];

  const SPEC_ALIASES = {
    batteryCapacityWh: ['batteryWh', 'batteryCapacity'],
    batteryLifeOffice: ['batteryLifeWeb'],
    batteryLifeVideo: ['batteryLifeLocalVideo'],
    usbPorts: ['usbC', 'usbCPorts'],
    headphoneJack: ['audioJack'],
    wireless: ['wifi'],
    colorSupport: ['colorGamut'],
    touchAndPenProtocol: ['penSupport', 'touchAndPenProtocol'],
    microphones: ['mics'],
    videoFeatures: ['studioEffects'],
    chargingPower: ['charger', 'chargingSpeed'],
    compatibleKeyboard: ['keyboardCompatibility', 'keyboardCompat'],
    expandableStorage: ['sdSlot'],
    dimensions: ['dimensionsMm'],
    weight: ['weightGrams']
  };

  // Visual review: docs/evidence/image-verification-20261009.json. Never substitute another product.
  const BLOCKED_IMAGES = ['surface-pro-1-hero.png', 'surface-pro-2-hero.png', 'surface-hub-3-hero.png', 'surface-pro-9-forest.png', 'surface-duo-2-obsidian.png', 'surface-duo-2-glacier.png'];
  const IMAGE_PLACEHOLDER = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="320" height="220" viewBox="0 0 320 220"><rect width="320" height="220" fill="#eee"/><text x="160" y="110" text-anchor="middle" fill="#555" font-size="16">图片待核验，暂不展示</text></svg>');
  const PORTRAIT_REV = '20261009-review';
  const DELIVERY_REV = '20260925pic2';
  const PORTRAIT_FALLBACK = './assets/products/surface-new-pro-hero.png';

  const IMAGE_SLOTS = {
    icon: { sizes: '64px', boxW: 64, boxH: 64 },
    audit: { sizes: '36px', boxW: 36, boxH: 28 },
    guide: { sizes: '100px', boxW: 100, boxH: 75 },
    table: { sizes: '140px', boxW: 140, boxH: 85 },
    card: { sizes: '(max-width: 768px) 46vw, 260px', boxW: 320, boxH: 140 },
    detail: { sizes: '(max-width: 900px) 92vw, 380px', boxW: 380, boxH: 250 }
  };

  function deliveryTable() {
    if (typeof window !== 'undefined' && window.IMAGE_DELIVERY) return window.IMAGE_DELIVERY;
    if (typeof require === 'function') {
      try { return require('./image-delivery.js'); } catch (err) { return null; }
    }
    return null;
  }

  function fileStem(src) {
    const clean = String(src || '').split('?')[0].split('#')[0];
    const base = clean.split('/').pop() || '';
    return base.replace(/\.(png|jpe?g|webp|avif)$/i, '');
  }

  function deliveryWidths(src) {
    if (!src || String(src).indexOf('data:') === 0) return null;
    const table = deliveryTable();
    if (!table) return null;
    const widths = table[fileStem(src) + '.png'] || table[fileStem(src) + '.jpg'] || table[fileStem(src) + '.jpeg'];
    return Array.isArray(widths) && widths.length ? widths.slice().sort(function (a, b) { return a - b; }) : null;
  }

  function deliveryUrl(src, kind, width) {
    const isFileProto = (typeof location !== 'undefined' && location.protocol === 'file:');
    const ver = isFileProto ? '' : ('?v=' + DELIVERY_REV);
    return './assets/delivery/' + kind + '/w' + width + '/' + fileStem(src) + '.' + kind + ver;
  }

  function srcsetFor(src, kind, widths) {
    return widths.map(function (width) {
      return deliveryUrl(src, kind, width) + ' ' + width + 'w';
    }).join(', ');
  }

  function pickWidth(widths, slotName) {
    const prefer = slotName === 'detail' ? 1280 : (slotName === 'card' || slotName === 'table' ? 640 : 320);
    const enough = widths.filter(function (width) { return width >= prefer; });
    return enough.length ? enough[0] : widths[widths.length - 1];
  }

  function escAttr(value) {
    return String(value || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  const listeners = [];
  let version = 0;
  let frozenSnapshot = null;
  let overlay = null;
  let portraitIndex = null;

  function baseline() {
    if (typeof SURFACE_DATA !== 'undefined' && SURFACE_DATA) return SURFACE_DATA;
    if (typeof global !== 'undefined' && global.SURFACE_DATA) return global.SURFACE_DATA;
    if (typeof window !== 'undefined' && window.SURFACE_DATA) return window.SURFACE_DATA;
    if (typeof require === 'function') {
      try { return require('./surface-data.js'); } catch (err) { return null; }
    }
    return null;
  }

  function store() {
    return overlay || baseline();
  }

  function devices() {
    const data = store();
    return (data && Array.isArray(data.devices)) ? data.devices : [];
  }

  function segmentOf(device) {
    if (!device) return 'consumer';
    if (device.segment === 'commercial' || device.segment === 'consumer' || device.segment === 'xbox') return device.segment;
    if (device.categoryId === 'xbox') return 'xbox';
    return device.isCommercial ? 'commercial' : 'consumer';
  }

  function isEmpty(val) {
    return val === undefined || val === null || val === '' || val === 'null';
  }

  function specState(val) {
    if (val === 'not_disclosed') return 'NOT_DISCLOSED';
    if (val === 'not_applicable') return 'NOT_APPLICABLE';
    if (isEmpty(val)) return 'NULL';
    return 'VALID';
  }

  function mentions(hay, needles) {
    const text = String(hay || '');
    return needles.some((needle) => text.indexOf(needle) !== -1);
  }

  function composePorts(specs) {
    const parts = [];
    const usbC = !isEmpty(specs.usbC) ? specs.usbC : (!isEmpty(specs.usbCPorts) ? specs.usbCPorts : '');
    if (usbC) parts.push(usbC);
    const usbA = (!isEmpty(specs.usbA) && specs.usbA !== 'not_applicable')
      ? specs.usbA
      : ((!isEmpty(specs.usbAPorts) && specs.usbAPorts !== 'not_applicable') ? specs.usbAPorts : '');
    if (usbA && !mentions(usbC, ['USB-A', 'USB A'])) parts.push(usbA);
    const sdSlot = (!isEmpty(specs.sdSlot) && specs.sdSlot !== 'not_applicable') ? specs.sdSlot : '';
    if (sdSlot && !mentions(parts.join('；'), ['MicroSD', 'SDXC', 'SD 卡', '读卡器'])) parts.push(sdSlot);
    return parts.length ? parts.join('；') : undefined;
  }

  function composeWireless(specs) {
    const parts = [];
    if (!isEmpty(specs.wifi)) parts.push(specs.wifi);
    if (!isEmpty(specs.bluetooth)) parts.push(specs.bluetooth);
    return parts.length ? parts.join(' + ') : undefined;
  }

  function getSpec(device, fieldKey) {
    if (!device || !device.specs || !fieldKey) return undefined;
    const specs = device.specs;
    const blocked = device.unverifiedFields || [];
    if (blocked.includes(fieldKey) || (SPEC_ALIASES[fieldKey] || []).some(key => blocked.includes(key))) return null;
    if (fieldKey === 'usbPorts') {
      if (!isEmpty(specs.usbPorts) || specs.usbPorts === 'not_disclosed' || specs.usbPorts === 'not_applicable') {
        return specs.usbPorts;
      }
      const composed = composePorts(specs);
      if (composed) return composed;
    }
    if (fieldKey === 'wireless') {
      if (!isEmpty(specs.wireless) || specs.wireless === 'not_disclosed' || specs.wireless === 'not_applicable') {
        return specs.wireless;
      }
      const composed = composeWireless(specs);
      if (composed) return composed;
    }
    if (!isEmpty(specs[fieldKey]) || specs[fieldKey] === 'not_disclosed' || specs[fieldKey] === 'not_applicable') {
      return specs[fieldKey];
    }
    const aliases = SPEC_ALIASES[fieldKey] || [];
    for (let i = 0; i < aliases.length; i++) {
      const alt = aliases[i];
      if (!isEmpty(specs[alt]) || specs[alt] === 'not_disclosed' || specs[alt] === 'not_applicable') {
        return specs[alt];
      }
    }
    return specs[fieldKey];
  }

  function presentSpec(val) {
    const state = specState(val);
    if (state === 'NULL') {
      return '<span class="spec-state null" title="暂未录入或缺失">—</span>';
    }
    if (state === 'NOT_DISCLOSED') {
      return '<span class="spec-state not-disclosed" title="原记录标为未披露；须由适用来源逐项核验，抓取失败不能证明未披露">官方未披露（原记录，待核验）</span>';
    }
    if (state === 'NOT_APPLICABLE') {
      return '<span class="spec-state not-applicable" title="记录状态；是否适用于具体配置须查对应字段证据">不适用</span>';
    }
    return val;
  }

  function presentDeviceSpec(device, fieldKey) {
    return presentSpec(getSpec(device, fieldKey));
  }

  function npuScore(val) {
    if (val && typeof val === 'object') {
      return val.scope === 'npu' && val.precision === 'INT8' && val.unit === 'TOPS' && Number.isFinite(val.value) ? val.value : null;
    }
    if (typeof val === 'number') return Number.isFinite(val) && val >= 0 ? val : null;
    const text = String(val || '');
    if (/FP4|petaflop|平台|GPU/i.test(text)) return null;
    const m = text.match(/^(\d+(?:\.\d+)?)\s*TOPS(?:\s*\(INT8\))?$/i);
    return m ? Number(m[1]) : null;
  }

  function isNpuDisplayable(val) {
    const state = specState(val);
    return state === 'VALID';
  }

  function getDevice(id) {
    return devices().find(function (d) { return d.id === id; }) || null;
  }

  function parseReleaseTimestamp(dev) {
    const dateStr = String((dev.specs && (dev.specs.releaseDate || dev.specs.releaseDateCny)) || '');
    let y = 0, m = 1, d = 1;
    const ymMatch = dateStr.match(/(\d{4})\s*年\s*(\d{1,2})\s*月(?:\s*(\d{1,2})\s*日)?/);
    if (ymMatch) {
      y = parseInt(ymMatch[1], 10);
      m = parseInt(ymMatch[2], 10);
      d = ymMatch[3] ? parseInt(ymMatch[3], 10) : 1;
    } else {
      const yMatch = dateStr.match(/(\d{4})\s*年/);
      if (yMatch) {
        y = parseInt(yMatch[1], 10);
      } else {
        y = parseInt(dev.year, 10) || 2000;
      }
      if (/秋季/i.test(dateStr)) m = 9;
      else if (/春季/i.test(dateStr)) m = 3;
      else if (/夏季/i.test(dateStr)) m = 6;
      else if (/冬季/i.test(dateStr)) m = 12;
    }
    return y * 10000 + m * 100 + d;
  }

  function compareDeviceRecency(a, b) {
    const timeA = parseReleaseTimestamp(a);
    const timeB = parseReleaseTimestamp(b);
    if (timeB !== timeA) return timeB - timeA;

    const statusRank = { upcoming: 4, current_cn: 3, current_global: 2, discontinued: 1, legacy: 1 };
    const rankA = statusRank[a.status] || 1;
    const rankB = statusRank[b.status] || 1;
    if (rankB !== rankA) return rankB - rankA;

    const flagshipWeight = (dev) => {
      let w = 0;
      const id = dev.id || '';
      if (id.includes('pro-12-13') || id.includes('laptop-8-138') || id.includes('laptop-8-150')) w += 35;
      if (id.includes('pro-12-inch-2') || id.includes('laptop-13-inch-2')) w += 30;
      if (id.includes('pro-12-inch') || id.includes('laptop-13-inch')) w += 20;
      if (id.includes('pro-11') || id.includes('laptop-7')) w += 15;
      if (id.includes('snap') || id.includes('intel')) w += 5;
      return w;
    };
    const weightDiff = flagshipWeight(b) - flagshipWeight(a);
    if (weightDiff !== 0) return weightDiff;

    return (a.id || '').localeCompare(b.id || '');
  }

  function listDevices(query) {
    const q = query || {};
    const filtered = devices().filter(function (d) {
      if (q.segment && segmentOf(d) !== q.segment) return false;
      if (q.seriesId) {
        if (q.seriesId === 'hub') return d.categoryId === 'studio' || d.categoryId === 'hub';
        if (q.seriesId === 'xbox' || q.seriesId === 'consoles') return d.categoryId === 'xbox';
        return d.categoryId === q.seriesId;
      }
      return true;
    });
    if (q.sort === false || q.sort === 'raw') return filtered;
    return filtered.slice().sort(compareDeviceRecency);
  }

  function listSeries(segment) {
    const data = store();
    if (!data) return [];
    if (segment === 'commercial') return data.commercialCategories || [];
    if (segment === 'consumer') return data.consumerCategories || [];
    if (segment === 'xbox') return data.xboxCategories || [];
    return data.categories || [];
  }

  function accessories() {
    const data = store();
    return (data && Array.isArray(data.accessories)) ? data.accessories : [];
  }

  function getSnapshot() {
    if (!frozenSnapshot) {
      frozenSnapshot = Object.freeze({
        version: version,
        deviceIds: devices().map(function (d) { return d.id; })
      });
    }
    return frozenSnapshot;
  }

  function applySnapshot(payload) {
    const base = baseline();
    if (!base || !payload || typeof payload !== 'object' || Array.isArray(payload)) return false;
    // Reject malformed/untrusted snapshots atomically before changing the active catalog.
    try {
      const json = JSON.stringify(payload);
      if (json.length > 10 * 1024 * 1024 || /"(?:__proto__|prototype|constructor)"\s*:/.test(json) || /<\s*\/?[a-z!]|javascript:/i.test(json)) return false;
      for (const key of DATA_KEYS) {
        if (payload[key] === undefined) continue;
        if (!Array.isArray(payload[key])) return false;
        const ids = new Set();
        for (const row of payload[key]) {
          if (!row || typeof row !== 'object' || Array.isArray(row) || typeof row.id !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(row.id) || ids.has(row.id)) return false;
          ids.add(row.id);
          if (key === 'devices' && row.status !== undefined && !['current_cn','current_global','discontinued','legacy','upcoming','pending'].includes(row.status)) return false;
          for (const source of [row.sourceUrl, row.officialDocUrl, row.specs && row.specs.officialDocUrl]) {
            if (source !== undefined && source !== null && source !== '' && (typeof source !== 'string' || !/^https:\/\/[^\s<>]+$/.test(source))) return false;
          }
          if (row.specs !== undefined && (!row.specs || typeof row.specs !== 'object' || Array.isArray(row.specs))) return false;
        }
      }
    } catch (_) { return false; }
    const current = store();
    let applied = 0;
    const next = {};
    DATA_KEYS.forEach(function (key) {
      if (payload[key] !== undefined) {
        next[key] = payload[key];
        applied++;
      } else {
        next[key] = current[key];
      }
    });
    if (applied === 0) return false;
    overlay = next;
    portraitIndex = null;
    version += 1;
    frozenSnapshot = Object.freeze({
      version: version,
      deviceIds: devices().map(function (d) { return d.id; })
    });
    listeners.slice().forEach(function (cb) {
      try { cb({ version: version, source: 'snapshot' }); } catch (e) { /* 单个订阅者失败不影响其他 */ }
    });
    return true;
  }

  function resetToBaseline() {
    if (!overlay) return false;
    overlay = null;
    portraitIndex = null;
    version += 1;
    frozenSnapshot = Object.freeze({
      version: version,
      deviceIds: devices().map(function (d) { return d.id; })
    });
    listeners.slice().forEach(function (cb) {
      try { cb({ version: version, source: 'baseline' }); } catch (e) { /* 单个订阅者失败不影响其他 */ }
    });
    return true;
  }

  function baselineVersion() {
    const data = baseline();
    return (data && data.datasetVersion) ? String(data.datasetVersion) : '';
  }

  function acceptsCloudVersion(cloudVersion) {
    const local = baselineVersion();
    if (!local) return true;
    if (!cloudVersion) return false;
    return String(cloudVersion) >= local;
  }

  function onChange(cb) {
    if (typeof cb === 'function') listeners.push(cb);
  }

  function pathKey(rel) {
    return String(rel || '').split('?')[0].replace(/^\.\//, '');
  }

  function colorList(device) {
    const colors = device && device.specs && device.specs.colors;
    return Array.isArray(colors) ? colors : [];
  }

  function declaredPaths(device) {
    const paths = [];
    if (device && device.heroImage) paths.push(pathKey(device.heroImage));
    colorList(device).forEach(function (color) {
      if (color && color.image) paths.push(pathKey(color.image));
    });
    return paths;
  }

  function ensurePortraitIndex() {
    if (portraitIndex) return portraitIndex;
    portraitIndex = new Map();
    devices().forEach(function (device) {
      declaredPaths(device).forEach(function (file) {
        if (!portraitIndex.has(file)) portraitIndex.set(file, new Set());
        portraitIndex.get(file).add(device.id);
      });
    });
    return portraitIndex;
  }

  function withPortraitRev(src) {
    const raw = String(src || '');
    if (!raw || raw.indexOf('data:') === 0 || raw.indexOf('?v=') !== -1) return raw;
    return raw + '?v=' + PORTRAIT_REV;
  }

  // Same pixels saved under more than one file name.
  const CONTENT_GROUPS = [];

  // Shared pixels that are not the real photo of any device still using them.
  const UNATTRIBUTED = [];

  function fileBase(file) {
    return String(file || '').split('/').pop().toLowerCase();
  }

  function contentBases(file) {
    const base = fileBase(file);
    for (let i = 0; i < CONTENT_GROUPS.length; i++) {
      if (CONTENT_GROUPS[i].indexOf(base) !== -1) return CONTENT_GROUPS[i];
    }
    return [base];
  }

  function rawGenerationToken(text) {
    const plus = String(text || '').match(/第\s*(\d+)\s*\+\s*代/);
    if (plus) return plus[1] + '+';
    if (/2\s*\+/.test(text)) return '2+';
    if (/Hub\s*2S/i.test(text)) return '2s';
    if (String(text || '').indexOf('初代') !== -1) return 'original';
    const numbered = String(text || '').match(/第\s*(\d+)\s*代/);
    if (numbered) return numbered[1];
    return String(text || '');
  }

  function generationFamily(device) {
    const text = String(device && device.generation || '');
    let token = rawGenerationToken(text);
    // 「初代」和「第 1 代」只有同一年、同一条产品线才是同一代（如 Laptop Studio 初代与商用第 1 代）。
    // 2013 年的 Pro 初代不能并进 2026 年的 12 英寸「第 1 代」。
    if (token === 'original' && device) {
      const year = Number(device.year) || 0;
      const cat = device.categoryId || '';
      const sameYearFirst = devices().some(function (other) {
        return other && other.categoryId === cat && (Number(other.year) || 0) === year && rawGenerationToken(other.generation) === '1';
      });
      if (sameYearFirst) token = '1';
    }
    return (device && device.categoryId ? device.categoryId : '') + '|' + token;
  }

  function devicesForPicture(file) {
    const bases = contentBases(file);
    const seen = new Map();
    ensurePortraitIndex().forEach(function (ids, path) {
      if (bases.indexOf(fileBase(path)) === -1) return;
      ids.forEach(function (id) {
        const found = getDevice(id);
        if (found) seen.set(found.id, found);
      });
    });
    return Array.from(seen.values());
  }

  function familiesAtNewestYear(pool) {
    let bestYear = -1;
    pool.forEach(function (device) {
      const year = Number(device.year) || 0;
      if (year > bestYear) bestYear = year;
    });
    const families = [];
    pool.forEach(function (device) {
      if ((Number(device.year) || 0) !== bestYear) return;
      const family = generationFamily(device);
      if (families.indexOf(family) === -1) families.push(family);
    });
    return families;
  }

  function familyNamedByFile(file, owners) {
    const base = String(file || '').split('/').pop().toLowerCase();
    const hits = owners.filter(function (device) {
      const id = String(device.id || '').toLowerCase();
      if (!id) return false;
      const at = base.indexOf(id);
      if (at < 0) return false;
      const beforeOk = at === 0 || /[^a-z0-9]/.test(base.charAt(at - 1));
      const after = base.charAt(at + id.length);
      return beforeOk && (!after || /[^a-z0-9]/.test(after));
    });
    if (!hits.length) return '';
    const longest = hits.reduce(function (max, device) {
      return Math.max(max, String(device.id).length);
    }, 0);
    const named = hits.filter(function (device) {
      return String(device.id).length === longest;
    });
    return generationFamily(named[0]);
  }

  function homeFamilies(file, owners) {
    const bases = contentBases(file);
    if (bases.length === 1) {
      const named = familyNamedByFile(file, owners);
      if (named) return [named];
      const heroUsers = owners.filter(function (device) {
        return fileBase(device.heroImage) === fileBase(file);
      });
      return familiesAtNewestYear(heroUsers.length ? heroUsers : owners);
    }
    // Several filenames, one picture. An old filename such as pro-1-hero must not
    // keep the picture when a newer model is showing those same pixels.
    return familiesAtNewestYear(owners);
  }

  function isStandIn(device, raw) {
    const file = pathKey(raw);
    const bases = contentBases(file);
    for (let i = 0; i < bases.length; i++) {
      if (UNATTRIBUTED.indexOf(bases[i]) !== -1) return true;
    }
    const owners = devicesForPicture(file);
    if (owners.length < 2) return false;
    const mine = generationFamily(device);
    let sameFamily = true;
    owners.forEach(function (other) {
      if (generationFamily(other) !== mine) sameFamily = false;
    });
    if (sameFamily) return false;
    const homes = homeFamilies(file, owners);
    if (!homes.length) return false;
    return homes.indexOf(mine) === -1;
  }

  function deviceAlt(device, colorName) {
    if (!device) return '';
    const name = String(device.name || '').trim();
    const colorPart = colorName ? ` (${colorName})` : '';
    return `${name}${colorPart}`;
  }

  function portrait(device, colorName) {
    if (!device) {
      return { src: IMAGE_PLACEHOLDER, identity: 'missing', alt: '' };
    }
    let raw = '';
    if (colorName) {
      const found = colorList(device).find(function (color) { return color && color.name === colorName; });
      if (found && found.image) raw = found.image;
    }
    if (!raw) raw = device.heroImage || '';
    if (!raw) {
      if (device.categoryId === 'xbox') return { src: '', identity: 'missing', alt: deviceAlt(device, colorName) };
      return { src: IMAGE_PLACEHOLDER, identity: 'missing', alt: deviceAlt(device, colorName) };
    }
    // Keep the same block in single-file builds, where original paths become data URIs.
    const blockedMapping = ['pro-1','pro-2','hub-3','duo-2'].includes(device.id) || (device.id === 'pro-9' && colorName === '森野绿');
    if (blockedMapping || BLOCKED_IMAGES.includes(raw.split('/').pop().split('?')[0])) return {src: IMAGE_PLACEHOLDER, identity: 'blocked', alt: deviceAlt(device, colorName) + '：图片存在错配或裁切问题，暂不展示'};
    const review = device.imageVerification || {};
    const explicitIdentity = ['pending', 'diagram', 'shared'].indexOf(review.status) !== -1;
    return {
      src: withPortraitRev(raw),
      identity: explicitIdentity ? review.status : (isStandIn(device, raw) ? 'shared' : 'pending'),
      kind: review.kind || (review.status === 'diagram' ? 'diagram' : ''),
      alt: deviceAlt(device, colorName)
    };
  }

  function accessoryPortrait(accessory) {
    return {src: accessory && accessory.image ? withPortraitRev(accessory.image) : IMAGE_PLACEHOLDER,
      identity: 'pending', kind: 'accessory', alt: accessory ? accessory.name : '配件图片待核验'};
  }

  function portraitLabel(shot) {
    if (!shot) return '';
    if (shot.identity === 'blocked' || shot.identity === 'missing') return '图片待核验，暂不展示';
    if (shot.identity === 'pending') return '图片型号、配色与视角待核验';
    if (shot.identity === 'diagram') return '结构图待核验（非配色照片）';
    if (shot.identity === 'shared') {
      return shot.kind === 'diagram' ? '其他机型结构图示意，待核验' : '同系列示意，型号与配色待核验';
    }
    return '';
  }

  function portraitMark(device, colorName) {
    const shot = portrait(device, colorName);
    const label = portraitLabel(shot);
    return label ? '<span class="portrait-stand-in">' + label + '</span>' : '';
  }

  function frame(shot, options) {
    if (shot && shot.identity === 'missing' && !shot.src) return '';
    const opts = options || {};
    const slotName = IMAGE_SLOTS[opts.slot] ? opts.slot : 'card';
    const slot = IMAGE_SLOTS[slotName];
    const src = shot && shot.src ? shot.src : withPortraitRev(PORTRAIT_FALLBACK);
    const isData = String(src).indexOf('data:') === 0;
    const cleanSrc = isData ? '' : String(src).split('?')[0];
    const loading = opts.loading || (slotName === 'detail' ? 'eager' : 'lazy');
    const priority = (slotName === 'detail' || opts.priority === 'high') ? ' fetchpriority="high"' : '';
    const decoding = slotName === 'detail' ? 'auto' : 'async';
    const id = opts.id ? ' id="' + escAttr(opts.id) + '"' : '';
    const cls = opts.className ? ' class="' + escAttr(opts.className) + '"' : '';
    const effectiveAlt = (opts.alt !== undefined && opts.alt !== null && opts.alt !== '')
      ? opts.alt
      : (shot && shot.alt ? shot.alt : '');
    const alt = escAttr(effectiveAlt);
    const evidenceMark = shot && shot.kind === 'accessory' ? '<span class="portrait-stand-in">配件型号与视角待核验</span>' : '';
    const onerror = opts.onerror ? ' onerror="' + opts.onerror + '"' : '';
    const rawAttr = cleanSrc ? ' data-fallback-path="' + escAttr(cleanSrc) + '"' : '';
    const sizes = opts.sizes || slot.sizes;
    const widths = deliveryWidths(src);
    if (!widths) {
      return '<img' + id + cls + ' src="' + escAttr(src) + '"' + rawAttr + ' alt="' + alt + '" width="' + slot.boxW + '" height="' + slot.boxH + '" loading="' + loading + '" decoding="' + decoding + '"' + priority + onerror + '>' + evidenceMark;
    }
    const fallback = deliveryUrl(src, 'webp', pickWidth(widths, slotName));
    return '<picture>'
      + '<source type="image/avif" srcset="' + srcsetFor(src, 'avif', widths) + '" sizes="' + sizes + '">'
      + '<source type="image/webp" srcset="' + srcsetFor(src, 'webp', widths) + '" sizes="' + sizes + '">'
      + '<img' + id + cls + ' src="' + fallback + '"' + rawAttr + ' alt="' + alt + '" width="' + slot.boxW + '" height="' + slot.boxH + '" loading="' + loading + '" decoding="' + decoding + '"' + priority + onerror + '>'
      + '</picture>' + evidenceMark;
  }

  function audience(device) {
    const raw = getSpec(device, 'targetAudience');
    const text = String(raw || '').trim();
    if (text && text !== 'consumer' && text !== 'commercial' && specState(text) === 'VALID') return text;
    if (segmentOf(device) === 'commercial') return '企业采购与商用办公';
    return '个人使用';
  }

  function highlights(device) {
    const plain = function (key) {
      const value = getSpec(device, key);
      if (specState(value) !== 'VALID' || Array.isArray(value)) return '';
      return String(value);
    };
    const out = [];
    const push = function (line) {
      if (line && out.length < 4 && out.indexOf(line) === -1) out.push(line);
    };
    const weight = plain('weight') || plain('weightGrams');
    if (weight) push('重量 ' + weight);
    push(plain('batteryLifeVideo') || plain('batteryLifeLocalVideo'));
    const npu = plain('npuTops');
    if (npu) push('NPU ' + npu);
    const screen = [plain('screenSize'), plain('brightness')].filter(Boolean).join('，');
    if (screen) push(screen);
    if (out.length < 4) push(plain('osAtLaunch'));
    if (out.length < 4) push(plain('touchAndPenProtocol') || plain('penSupport'));
    return out;
  }

  function isRecentLaunch(device, asOf) {
    if (device && device.status === 'upcoming') return false;
    const text = String(getSpec(device, 'releaseDate') || '');
    const match = text.match(/(\d{4})\s*年\s*(\d{1,2})\s*月/);
    if (!match) return false;
    const month = Number(match[2]);
    if (month < 1 || month > 12) return false;
    const launched = Number(match[1]) * 12 + (month - 1);
    const clock = asOf instanceof Date && !isNaN(asOf.getTime()) ? asOf : new Date();
    const age = clock.getFullYear() * 12 + clock.getMonth() - launched;
    return age >= 0 && age <= 6;
  }

  function paint(img, shot, slotName) {
    if (!img || !shot || !shot.src) return;
    const slot = IMAGE_SLOTS[slotName] || IMAGE_SLOTS.card;
    const name = IMAGE_SLOTS[slotName] ? slotName : 'card';
    const widths = deliveryWidths(shot.src);
    if (!widths || String(shot.src).indexOf('data:') === 0) {
      const picture = img.closest ? img.closest('picture') : null;
      if (picture) picture.querySelectorAll('source').forEach(source => source.remove());
      img.removeAttribute('srcset');
      img.src = shot.src;
      return;
    }
    const picture = img.closest ? img.closest('picture') : null;
    if (picture) {
      picture.querySelectorAll('source').forEach(function (source) {
        const kind = source.type === 'image/avif' ? 'avif' : 'webp';
        source.srcset = srcsetFor(shot.src, kind, widths);
      });
    }
    img.removeAttribute('srcset');
    img.src = deliveryUrl(shot.src, 'webp', pickWidth(widths, name));
  }

  function evidenceFor(device, field) {
    if (!device) return null;
    const value = getSpec(device, field);
    if (value == null) return null;
    const keys = [field].concat(SPEC_ALIASES[field] || []);
    for (const key of keys) {
      const e = (device.specEvidence || {})[key];
      if (!e || JSON.stringify(e.value) !== JSON.stringify(value)) continue;
      if (e.sourceUrl !== device.specs.officialDocUrl && !(device.evidenceSources || []).includes(e.sourceUrl)) continue;
      try {
        const url = new URL(e.sourceUrl);
        if (url.protocol !== 'https:' || !/^(?:[a-z0-9-]+\.)?(?:microsoft\.com|microsoftstore\.com\.cn|xbox\.com)$/.test(url.hostname)) continue;
      } catch (_) { continue; }
      return e;
    }
    return null;
  }

  function evidenceMarkup(device, field) {
    const e = evidenceFor(device, field);
    if (!e) return '<small class="field-evidence pending">当前值待绑定证据</small>';
    const escape = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const region = e.region === 'CN' ? '中国来源' : '海外/全球来源，非国行认证';
    return `<details class="field-evidence"><summary>${region} · 已核对限定值</summary><p>${escape(e.configurationScope)}</p><a href="${escape(e.sourceUrl)}" target="_blank" rel="noopener noreferrer">官方来源</a> · ${escape(e.reviewedAt)}</details>`;
  }

  return {
    version: function () { return version; },
    getDevice: getDevice,
    listDevices: listDevices,
    listSeries: listSeries,
    accessories: accessories,
    getSpec: getSpec,
    specKeys: device => Object.keys((device && device.specs) || {}),
    rawSpec: (device, field) => device && device.specs ? device.specs[field] : undefined,
    evidenceFor: evidenceFor,
    evidenceMarkup: evidenceMarkup,
    specState: specState,
    presentSpec: presentSpec,
    presentDeviceSpec: presentDeviceSpec,
    isNpuDisplayable: isNpuDisplayable,
    npuScore: npuScore,
    segmentOf: segmentOf,
    getSnapshot: getSnapshot,
    applySnapshot: applySnapshot,
    resetToBaseline: resetToBaseline,
    baselineVersion: baselineVersion,
    acceptsCloudVersion: acceptsCloudVersion,
    onChange: onChange,
    portrait: portrait,
    accessoryPortrait: accessoryPortrait,
    portraitLabel: portraitLabel,
    portraitMark: portraitMark,
    isRecentLaunch: isRecentLaunch,
    audience: audience,
    highlights: highlights,
    frame: frame,
    paint: paint,
    parseReleaseTimestamp: parseReleaseTimestamp,
    deviceAlt: deviceAlt
  };
})();

if (typeof window !== 'undefined') {
  window.Catalog = Catalog;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Catalog;
}
