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
    touchAndPenProtocol: ['touchAndPenProtocol'],
    microphones: ['mics'],
    // Recording, Studio effects and console output are independent public fields.
    chargingPower: ['charger', 'chargingSpeed'],
    compatibleKeyboard: ['keyboardCompatibility', 'keyboardCompat'],
    expandableStorage: ['sdSlot'],
    dimensions: ['dimensionsMm'],
    weight: ['weightGrams']
  };

  // Visual review: docs/sources/image-mappings.json. Never substitute another product.
  const BLOCKED_IMAGES = ['surface-pro-1-hero.png', 'surface-pro-2-hero.png', 'surface-hub-3-hero.png', 'surface-pro-9-forest.png', 'surface-duo-2-obsidian.png', 'surface-duo-2-glacier.png'];
  const IMAGE_PLACEHOLDER = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="320" height="220" viewBox="0 0 320 220"><rect width="320" height="220" fill="#f3f3f3"/><rect x="128" y="78" width="64" height="48" rx="4" fill="none" stroke="#888" stroke-width="2"/><path d="m133 119 17-18 13 13 10-9 14 14" fill="none" stroke="#888" stroke-width="2"/></svg>');
  const PORTRAIT_REV = '20261011-official';
  const DELIVERY_REV = '20261011-official';
  const portraitSizes = new Map();

  function setPortraitSize(deviceId, size) {
    const device = getDevice(deviceId);
    if (!(device && device.portraitVariants || []).some(v => v.size === size)) return false;
    portraitSizes.set(deviceId, size);
    return true;
  }

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
    const blocked = [...(device.unverifiedFields || []), ...(device.dataConflicts || []).map(c => c.field)];
    if (blocked.includes(fieldKey)) return null;
    // Pen compatibility does not establish touch points or pen protocol.
    if (fieldKey === 'penSupport') {
      const e = (device.specEvidence || {}).penSupport;
      if (!e || e.configuration !== device.id || JSON.stringify(e.value) !== JSON.stringify(specs.penSupport) ||
          (e.sourceUrl !== specs.officialDocUrl && !(device.evidenceSources || []).includes(e.sourceUrl))) return null;
    }
    if (fieldKey === 'usbPorts') {
      if (!isEmpty(specs.usbPorts) || specs.usbPorts === 'not_disclosed' || specs.usbPorts === 'not_applicable') {
        return specs.usbPorts;
      }
      const composed = composePorts(Object.fromEntries(Object.entries(specs).filter(([key]) => !blocked.includes(key))));
      if (composed) return composed;
    }
    if (fieldKey === 'wireless') {
      if (!isEmpty(specs.wireless) || specs.wireless === 'not_disclosed' || specs.wireless === 'not_applicable') {
        return specs.wireless;
      }
      const composed = composeWireless(Object.fromEntries(Object.entries(specs).filter(([key]) => !blocked.includes(key))));
      if (composed) return composed;
    }
    if (!isEmpty(specs[fieldKey]) || specs[fieldKey] === 'not_disclosed' || specs[fieldKey] === 'not_applicable') {
      return specs[fieldKey];
    }
    const aliases = SPEC_ALIASES[fieldKey] || [];
    for (let i = 0; i < aliases.length; i++) {
      const alt = aliases[i];
      if (blocked.includes(alt)) continue;
      if (!isEmpty(specs[alt]) || specs[alt] === 'not_disclosed' || specs[alt] === 'not_applicable') {
        return specs[alt];
      }
    }
    return specs[fieldKey];
  }

  function presentSpec(val, confirmed) {
    const state = specState(val);
    if (state === 'NULL') {
      return '<span class="spec-state null" title="暂未录入或缺失">—</span>';
    }
    if (state === 'NOT_DISCLOSED') {
      return confirmed ? '<span class="spec-state not-disclosed">官方未披露</span>' : '<span class="spec-state null" title="该配置尚无已确认值">—</span>';
    }
    if (state === 'NOT_APPLICABLE') {
      return confirmed ? '<span class="spec-state not-applicable">不适用</span>' : '<span class="spec-state null" title="该配置尚无已确认值">—</span>';
    }
    return val;
  }

  function presentDeviceSpec(device, fieldKey) {
    return presentSpec(getSpec(device, fieldKey), !!evidenceFor(device, fieldKey)) + evidenceMarkup(device, fieldKey);
  }

  function npuScore(val) {
    if (val && typeof val === 'object') {
      return val.scope === 'npu' && val.precision === 'INT8' && val.unit === 'TOPS' && Number.isFinite(val.value) && val.value >= 0 ? val.value : null;
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
    const dateStr = String(confirmedSpec(dev, 'releaseDate') || confirmedSpec(dev, 'releaseDateCny') || '').trim();
    const match = dateStr.match(/^(\d{4})\s*年(?:\s*(\d{1,2})\s*月(?:\s*(\d{1,2})\s*日)?)?$/);
    if (!match) return null;
    const y = Number(match[1]), m = Number(match[2] || 0), d = Number(match[3] || 0);
    if ((match[2] && (m < 1 || m > 12)) || (match[3] && (d < 1 || d > new Date(y, m, 0).getDate()))) return null;
    // Zero suffixes represent date precision only; never invent January 1 for a missing date.
    return y * 10000 + m * 100 + d;
  }

  function compareDeviceRecency(a, b) {
    const timeA = parseReleaseTimestamp(a);
    const timeB = parseReleaseTimestamp(b);
    if (timeA === null && timeB !== null) return 1;
    if (timeB === null && timeA !== null) return -1;
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
    if (String(cloudVersion) === local) return true;
    const localDate = local.match(/^\d{4}\.\d{2}\.\d{2}/);
    const cloudDate = String(cloudVersion).match(/^\d{4}\.\d{2}\.\d{2}/);
    // Same-day descriptive suffixes are not chronological version numbers.
    return !!localDate && !!cloudDate && cloudDate[0] > localDate[0];
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
    const variants = device.portraitVariants || [];
    const variant = variants.find(v => v.size === portraitSizes.get(device.id)) || variants[0];
    let variantBound = !!variant;
    let showVariants = true;
    if (colorName) {
      const found = colorList(device).find(function (color) { return color && color.name === colorName; });
      if (found && variant && Array.isArray(found.availableSizes) && !found.availableSizes.includes(variant.size)) {
        return {src: IMAGE_PLACEHOLDER, identity: 'missing', alt: deviceAlt(device, colorName) + '：该配色不属于当前尺寸', scopeLabel:'该配色仅列于 ' + found.availableSizes.join(' / ') + ' 英寸'};
      }
      if (!found || !found.image) return {src: IMAGE_PLACEHOLDER, identity: 'missing', alt: deviceAlt(device, colorName)};
      showVariants = !!found.imageBySize;
      variantBound = !!(variant && found.imageBySize && found.imageBySize[variant.size]);
      raw = variant && found.imageBySize ? found.imageBySize[variant.size] : found.image;
    }
    if (!raw) raw = variant ? variant.image : device.heroImage || '';
    if (!raw) {
      if (device.categoryId === 'xbox') return { src: '', identity: 'missing', alt: deviceAlt(device, colorName) };
      return { src: IMAGE_PLACEHOLDER, identity: 'missing', alt: deviceAlt(device, colorName) };
    }
    // Keep the same block in single-file builds, where original paths become data URIs.
    const proof = (device.officialPortraits || []).find(p => p.image === raw);
    const blockedMapping = (!proof && (['pro-1','pro-2','hub-3','duo-2'].includes(device.id) || (device.id === 'pro-9' && colorName === '森野绿'))) ||
      (colorName ? (device.imageBlockedColors || []).includes(colorName) : device.heroImageBlocked);
    if (blockedMapping || BLOCKED_IMAGES.includes(raw.split('/').pop().split('?')[0])) return {src: IMAGE_PLACEHOLDER, identity: 'blocked', alt: deviceAlt(device, colorName) + '：图片存在错配或裁切问题，暂不展示'};
    const review = device.imageVerification || {};
    const explicitIdentity = ['pending', 'diagram', 'shared'].indexOf(review.status) !== -1;
    return {
      src: withPortraitRev(raw),
      identity: proof ? 'official' : explicitIdentity ? review.status : (isStandIn(device, raw) ? 'shared' : 'pending'),
      kind: review.kind || (review.status === 'diagram' ? 'diagram' : ''),
      alt: deviceAlt(device, colorName) + (variantBound ? ' · ' + variant.label : ''),
      deviceId: device.id, variants: showVariants ? variants : [], size: variant && variant.size,
      nativeWidth: proof && proof.width,
      scopeLabel: variant ? (variantBound ? variant.label : '该配色图尺寸未确认') : proof && proof.width === 762 ? '原图 762×429' : ''
    };
  }

  function accessoryPortrait(accessory) {
    return {src: accessory && accessory.image ? withPortraitRev(accessory.image) : IMAGE_PLACEHOLDER,
      identity: 'pending', kind: 'accessory', alt: accessory ? accessory.name : '配件图片'};
  }

  function portraitLabel(shot) {
    if (!shot) return '';
    if (shot.scopeLabel) return shot.scopeLabel;
    if (shot.identity === 'blocked' || shot.identity === 'missing' || shot.identity === 'pending') return '';
    if (shot.identity === 'diagram') return '结构示意';
    if (shot.identity === 'shared') {
      return '参考示意';
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
    const src = shot && shot.src ? shot.src : IMAGE_PLACEHOLDER;
    const isData = String(src).indexOf('data:') === 0;
    const cleanSrc = isData ? '' : String(src).split('?')[0];
    const loading = opts.loading || (slotName === 'detail' ? 'eager' : 'lazy');
    const priority = (slotName === 'detail' || opts.priority === 'high') ? ' fetchpriority="high"' : '';
    const decoding = slotName === 'detail' ? 'auto' : 'async';
    const id = opts.id ? ' id="' + escAttr(opts.id) + '"' : '';
    const cls = opts.className ? ' class="' + escAttr(opts.className) + '"' : '';
    const nativeCap = shot && shot.nativeWidth ? ' style="max-width:' + Number(shot.nativeWidth) + 'px"' : '';
    const effectiveAlt = (opts.alt !== undefined && opts.alt !== null && opts.alt !== '')
      ? opts.alt
      : (shot && shot.alt ? shot.alt : '');
    const alt = escAttr(effectiveAlt);
    const showSizeControl = (slotName === 'detail' && opts.id === 'detail-main-img') || slotName === 'table';
    const evidenceMark = showSizeControl && shot && shot.variants && shot.variants.length > 1 ? '<label class="portrait-size-control">' + (shot.deviceId === 'laptop-5' ? '亮铂金图片尺寸' : '图片尺寸') + ' <select aria-label="图片尺寸" onclick="event.stopPropagation()" onchange="App.switchImageSize(\'' + escAttr(shot.deviceId) + '\',this.value)">' + shot.variants.map(v => '<option value="' + escAttr(v.size) + '"' + (v.size === shot.size ? ' selected' : '') + '>' + escAttr(v.label) + '</option>').join('') + '</select></label>' : '';
    const onerror = ' onerror="' + (opts.onerror || 'App.hideBrokenImage(this)') + '"';
    const widths = deliveryWidths(src);
    const fallbackPath = widths ? deliveryUrl(src, 'webp', pickWidth(widths, slotName)) : cleanSrc;
    const rawAttr = fallbackPath ? ' data-fallback-path="' + escAttr(fallbackPath) + '"' : '';
    const sizes = opts.sizes || slot.sizes;
    if (!widths) {
      return '<img' + id + cls + nativeCap + ' src="' + escAttr(src) + '"' + rawAttr + ' alt="' + alt + '" width="' + slot.boxW + '" height="' + slot.boxH + '" loading="' + loading + '" decoding="' + decoding + '"' + priority + onerror + '>' + evidenceMark;
    }
    const fallback = deliveryUrl(src, 'webp', pickWidth(widths, slotName));
    return '<picture>'
      + '<source type="image/avif" srcset="' + srcsetFor(src, 'avif', widths) + '" sizes="' + sizes + '">'
      + '<source type="image/webp" srcset="' + srcsetFor(src, 'webp', widths) + '" sizes="' + sizes + '">'
      + '<img' + id + cls + nativeCap + ' src="' + fallback + '"' + rawAttr + ' alt="' + alt + '" width="' + slot.boxW + '" height="' + slot.boxH + '" loading="' + loading + '" decoding="' + decoding + '"' + priority + onerror + '>'
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
      const value = confirmedSpec(device, key);
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
    const proof = evidenceFor(device, 'releaseDate');
    if (!proof || proof.region !== 'CN') return false;
    const text = String(confirmedSpec(device, 'releaseDate') || '');
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
    // A switched colour owns every part of its fallback chain, including after a previous failure.
    delete img.dataset.retryClean;
    delete img.dataset.retryFallback;
    img.style.display = '';
    img.style.maxWidth = shot.nativeWidth ? Number(shot.nativeWidth) + 'px' : '';
    img.alt = shot.alt || '';
    if (String(shot.src).indexOf('data:') === 0) img.removeAttribute('data-fallback-path');
    else img.setAttribute('data-fallback-path', widths ? deliveryUrl(shot.src, 'webp', pickWidth(widths, name)) : String(shot.src).split('?')[0]);
    if (!widths || String(shot.src).indexOf('data:') === 0) {
      const picture = img.closest ? img.closest('picture') : null;
      if (picture) picture.querySelectorAll('source').forEach(source => source.remove());
      img.removeAttribute('srcset');
      img.src = shot.src;
      return;
    }
    const picture = img.closest ? img.closest('picture') : null;
    if (picture) {
      // A failed or blocked colour removes source nodes; recreate them when returning to a real image.
      if (!picture.querySelector('source')) {
        ['avif', 'webp'].forEach(function (kind) {
          const source = img.ownerDocument.createElement('source');
          source.type = 'image/' + kind;
          picture.insertBefore(source, img);
        });
      }
      picture.querySelectorAll('source').forEach(function (source) {
        const kind = source.type === 'image/avif' ? 'avif' : 'webp';
        source.srcset = srcsetFor(shot.src, kind, widths);
        source.sizes = slot.sizes;
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
      if (!e || e.configuration !== device.id || JSON.stringify(e.value) !== JSON.stringify(value)) continue;
      if (e.sourceUrl !== device.specs.officialDocUrl && !(device.evidenceSources || []).includes(e.sourceUrl)) continue;
      try {
        const url = new URL(e.sourceUrl);
        const microsoft = /^(?:(?:[a-z0-9-]+\.)?(?:microsoft\.com|microsoftstore\.com\.cn|xbox\.com)|blogs\.windows\.com)$/.test(url.hostname);
        const reviewedPrimary = ['docs/sources/verified-fields.json'].includes(e.sourcePath) && primarySourceIdentity(e.sourceUrl);
        if (url.protocol !== 'https:' || !(microsoft || reviewedPrimary)) continue;
      } catch (_) { continue; }
      return e;
    }
    return null;
  }

  function accessoryEvidenceMarkup(accessory) {
    const escape = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const official = url => /^https:\/\/(?:[a-z0-9-]+\.)?(?:microsoft\.com|microsoftstore\.com\.cn|xbox\.com)\//i.test(url || '');
    const proofs = Object.entries((accessory && accessory.fieldEvidence) || {}).filter(([field, e]) => {
      const match = /^(\w+)\[(\d+)\]$/.exec(field);
      const value = match ? (accessory[match[1]] || [])[Number(match[2])] : accessory[field];
      return e && e.configuration === accessory.id && JSON.stringify(e.value) === JSON.stringify(value) &&
        official(e.sourceUrl);
    });
    if (!proofs.length) return '';
    return `<details class="field-evidence accessory-source-details"><summary>来源与适用范围</summary>${proofs.map(([field, e]) =>
      `<p>${escape(e.value)}<br>${escape(e.configurationScope)}<br>${(e.sourceUrls || [e.sourceUrl]).filter(official).map((url, i) =>
        `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">官方来源${i ? ' ' + (i + 1) : ''}</a>`).join(' · ')}</p>`).join('')}</details>`;
  }

  function chipNpuScore(chip) {
    const e = chip && chip.npuEvidence;
    if (!e || e.configuration !== chip.id || e.value !== chip.npuTops || e.scope !== 'npu' || e.precision !== 'INT8' || !e.reviewedAt) return null;
    try { if (!/^https:\/\/(?:[a-z0-9-]+\.)?(?:microsoft\.com|qualcomm\.com|intel\.com)\//.test(e.sourceUrl)) return null; } catch (_) { return null; }
    return npuScore(chip.npuTops);
  }

  function deviceNpuScore(device) {
    const e = evidenceFor(device, 'npuTops');
    if (!e || e.scope !== 'npu' || e.precision !== 'INT8' || e.unit !== 'TOPS') return null;
    return npuScore(getSpec(device, 'npuTops'));
  }

  function confirmedSpec(device, key) {
    return evidenceFor(device, key) ? getSpec(device, key) : null;
  }

  function pendingEvidenceAsset() {
    const data = baseline();
    if (!data || !data.evidenceDeferred) return null;
    return /^\.\/js\/field-evidence\.[a-f0-9]{12}\.js$/.test(data.evidenceAsset || '') ? data.evidenceAsset : null;
  }

  function installEvidence(expectedVersion, evidence) {
    const data = baseline();
    if (!data || !data.evidenceDeferred || expectedVersion !== data.evidenceVersion || !evidence || typeof evidence !== 'object') return false;
    // Reject a partial/mismatched chunk before changing any record.
    if (!data.devices.every(d => Object.prototype.hasOwnProperty.call(evidence, d.id) && evidence[d.id] && typeof evidence[d.id] === 'object' && !Array.isArray(evidence[d.id]))) return false;
    data.devices.forEach(d => { d.specEvidence = evidence[d.id]; });
    data.evidenceDeferred = false;
    return true;
  }

  function primarySourceIdentity(url) {
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== 'https:') return null;
      if (/^(?:www\.|zh\.|[a-z]{2}\.)?ifixit\.com$/.test(parsed.hostname)) return 'ifixit';
      return /^(?:(?:[a-z0-9-]+\.)?(?:microsoft\.com|microsoftstore\.com\.cn|xbox\.com|intel\.com|qualcomm\.com|amd\.com|sandisk\.com|intel\.co\.jp|nvidia\.com)|blogs\.windows\.com)$/.test(parsed.hostname) ? 'manufacturer' : null;
    } catch (_) { return null; }
  }

  function primarySourceLabel(url, index, alreadyRead) {
    const label = primarySourceIdentity(url) === 'ifixit' ? 'iFixit原始资料' : '官方来源';
    return (alreadyRead ? '已读' : '') + label + (index ? ' ' + index : '');
  }

  function evidenceMarkup(device, field) {
    const e = evidenceFor(device, field);
    const gap = reviewGapMarkup(device, field);
    if (!e) return gap || (specState(getSpec(device, field)) === 'VALID' ? '<details class="field-evidence"><summary>来源</summary><p>历史记录，尚无适用于当前配置的逐字段来源。</p></details>' : '');
    const escape = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const region = e.region === 'CN' ? '中国来源' : '海外/全球来源，非国行认证';
    const official = primarySourceIdentity;
    const urls = [...new Set([e.sourceUrl, ...(e.sourceUrls || [])])].filter(official);
    return `<details class="field-evidence"><summary>来源 · ${primarySourceIdentity(e.sourceUrl) === 'ifixit' ? 'iFixit' : e.region === 'CN' ? '中国' : '全球/海外'}</summary><p>${region}。${escape(e.configurationScope)}</p>${urls.map((url,i) => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${primarySourceLabel(url,i ? i + 1 : 0)}</a>`).join(' · ')} · ${escape(e.reviewedAt)}</details>${gap}`;
  }

  function reviewGapMarkup(object, field, location) {
    const escape = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const gaps = Object.entries(object && object.fieldReviewGaps || {}).filter(([key,g]) => g && (!field || key === field) && (!location || g.location === location));
    if (!gaps.length) return '';
    const official = primarySourceIdentity;
    const fields = (baseline().specGroups || []).flatMap(g => g.fields || []);
    return `<details class="field-evidence field-confirmation-conditions"><summary>尚需确认的条件</summary>${gaps.map(([key,g]) => `<p><strong>${escape(fields.find(f=>f.key===key)?.label || '型号与配置条件')}</strong>。${escape(g.scope)}<br>${escape(g.reason)}${(g.parallelClaims || []).map(claim=>`<br>${escape(claim)}`).join('')}<br>尚需原文：${escape(g.needed)} ${(g.sourceUrls || []).filter(official).map(url => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${primarySourceLabel(url,0,true)}</a>`).join(' · ')}</p>`).join('')}</details>`;
  }

  function objectEvidenceMarkup(object, proofKey) {
    if (!object) return '';
    const proofs = object[proofKey] || {}, escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const labels = {name:'产品名称',nameEn:'英文名称',vendor:'芯片厂商',processNode:'制程',architecture:'架构',cores:'核心与频率',gpu:'GPU',memorySupport:'芯片内存支持',tdp:'芯片平台功耗',npuTops:'专用NPU算力',npuDesc:'NPU原厂口径',copilotPlus:'整机资格条件',equippedDevices:'已证搭载关系',highlights:'硬件概述',generation:'目录分类（本站）',generationName:'分类名称（本站）',status:'资料收录与供货',statusLabel:'供货状态说明',salesRegion:'地区供应范围',colorName:'配色与定制选项',weight:'装配重量',battery:'供电与续航',connectivity:'连接方式',compatibility:'设备与系统兼容',dpad:'方向键',triggers:'扳机',msrp:'地区与历史参考价',description:'设计与包装说明',headphoneJack:'音频与扩展接口',shareBtn:'分享键与映射',year:'公布与发售日期'};
    const official = primarySourceIdentity;
    labels.dimensions = '版本与尺寸说明';
    labels.price = '地区与日期参考价';
    Object.assign(labels, {tagline:'型号概述',aliases:'型号别名',systemSku:'系统型号标识',releaseDate:'日期与事件范围'});
    const entries = Object.entries(proofs).filter(([field,e]) => e && e.configuration === object.id && e.reviewedAt &&
      JSON.stringify(e.value) === JSON.stringify(object[field]) && official(e.sourceUrl));
    const gaps = reviewGapMarkup(object, null, proofKey === 'metadataEvidence' ? 'root' : proofKey === 'detailEvidence' ? 'details' : null);
    if (!entries.length) return gaps;
    return `<details class="field-evidence object-field-sources" data-source-object="${escape(object.id)}"><summary>逐字段来源与适用条件</summary>${entries.map(([field,e]) => {
      const urls = [...new Set([e.sourceUrl, ...(e.sourceUrls || [])])].filter(official);
      const value = field === 'status' ? ({current_global:'海外官网列售（库存未核验）',current_cn:'国行目录',upcoming:'即将发售',legacy:'历史机型',pending:'—'}[e.value] || '') : field === 'salesRegion' ? ({cn_official:'中国官方历史收录',cn_recorded:'中国目录记录（原网页待复核）',global_recorded:'海外资料收录（中国供应另核）',legacy:'历史资料收录',us_only:'美国限定（适用条件见来源）'}[e.value] || e.value) : Array.isArray(e.value) ? e.value.join('、') : e.value;
      const sourceKind = e.sourceAuthority === 'user-provided-structured-record' ? '资料记录引用，厂商原文待复核' : e.region === 'CN' ? '中国适用来源' : '海外/全球来源';
      return `<p data-source-field="${escape(field)}"><strong>${escape(labels[field] || '参数条件')}</strong>：${escape(value)}<br>${sourceKind}。${escape(e.configurationScope)} ${urls.map((url,i) => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${e.sourceAuthority === 'user-provided-structured-record' ? `资料所引链接 ${i+1}（原文待复核）` : primarySourceLabel(url,i+1)}</a>`).join(' ')}</p>`;
    }).join('')}</details>${gaps}`;
  }

  return {
    version: function () { return version; },
    getDevice: getDevice,
    listDevices: listDevices,
    listSeries: listSeries,
    accessories: accessories,
    accessoryEvidenceMarkup: accessoryEvidenceMarkup,
    getSpec: getSpec,
    confirmedSpec: confirmedSpec,
    chipNpuScore: chipNpuScore,
    specKeys: device => Object.keys((device && device.specs) || {}),
    rawSpec: (device, field) => device && device.specs ? device.specs[field] : undefined,
    evidenceFor: evidenceFor,
    pendingEvidenceAsset: pendingEvidenceAsset,
    installEvidence: installEvidence,
    evidenceMarkup: evidenceMarkup,
    objectEvidenceMarkup: objectEvidenceMarkup,
    specState: specState,
    presentSpec: presentSpec,
    presentDeviceSpec: presentDeviceSpec,
    isNpuDisplayable: isNpuDisplayable,
    npuScore: npuScore,
    deviceNpuScore: deviceNpuScore,
    segmentOf: segmentOf,
    getSnapshot: getSnapshot,
    applySnapshot: applySnapshot,
    resetToBaseline: resetToBaseline,
    baselineVersion: baselineVersion,
    acceptsCloudVersion: acceptsCloudVersion,
    onChange: onChange,
    portrait: portrait,
    setPortraitSize: setPortraitSize,
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
