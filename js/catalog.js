/**
 * Catalog — 产品档案的唯一读取 seam。
 * 本地基线与云端载荷都是 adapter；调用方只通过本 interface 取数。
 */
const Catalog = (function () {
  const DATA_KEYS = [
    'categories',
    'consumerCategories',
    'commercialCategories',
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

  const PORTRAIT_REV = '20260923';
  const DELIVERY_REV = '20260923img';
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
    return './assets/delivery/' + kind + '/w' + width + '/' + fileStem(src) + '.' + kind + '?v=' + DELIVERY_REV;
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
    return (typeof SURFACE_DATA !== 'undefined') ? SURFACE_DATA : null;
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
    if (device.segment === 'commercial' || device.segment === 'consumer') return device.segment;
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
      return '<span class="spec-state not-disclosed" title="微软官方白皮书从未对外正式披露">官方未披露</span>';
    }
    if (state === 'NOT_APPLICABLE') {
      return '<span class="spec-state not-applicable" title="该产品物理形态不具备此属性">不适用</span>';
    }
    return val;
  }

  function presentDeviceSpec(device, fieldKey) {
    return presentSpec(getSpec(device, fieldKey));
  }

  function isNpuDisplayable(val) {
    const state = specState(val);
    return state === 'VALID';
  }

  function getDevice(id) {
    return devices().find(function (d) { return d.id === id; }) || null;
  }

  function listDevices(query) {
    const q = query || {};
    return devices().filter(function (d) {
      if (q.segment && segmentOf(d) !== q.segment) return false;
      if (q.seriesId) {
        if (q.seriesId === 'hub') return d.categoryId === 'studio' || d.categoryId === 'hub';
        return d.categoryId === q.seriesId;
      }
      return true;
    });
  }

  function listSeries(segment) {
    const data = store();
    if (!data) return [];
    if (segment === 'commercial') return data.commercialCategories || [];
    if (segment === 'consumer') return data.consumerCategories || [];
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
    if (!base || !payload) return false;
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

  function portrait(device, colorName) {
    if (!device) {
      return { src: withPortraitRev(PORTRAIT_FALLBACK), identity: 'missing' };
    }
    let raw = '';
    if (colorName) {
      const found = colorList(device).find(function (color) { return color && color.name === colorName; });
      if (found && found.image) raw = found.image;
    }
    if (!raw) raw = device.heroImage || '';
    if (!raw) {
      return { src: withPortraitRev(PORTRAIT_FALLBACK), identity: 'missing' };
    }
    const owners = ensurePortraitIndex().get(pathKey(raw));
    let shared = false;
    if (owners) {
      owners.forEach(function (id) {
        if (id !== device.id) shared = true;
      });
    }
    return { src: withPortraitRev(raw), identity: shared ? 'shared' : 'official' };
  }

  function portraitMark(device, colorName) {
    const shot = portrait(device, colorName);
    if (shot.identity !== 'shared') return '';
    return '<span class="portrait-stand-in">同系列示意</span>';
  }

  function frame(shot, options) {
    const opts = options || {};
    const slotName = IMAGE_SLOTS[opts.slot] ? opts.slot : 'card';
    const slot = IMAGE_SLOTS[slotName];
    const src = shot && shot.src ? shot.src : withPortraitRev(PORTRAIT_FALLBACK);
    const loading = opts.loading || (slotName === 'detail' ? 'eager' : 'lazy');
    const priority = (slotName === 'detail' || opts.priority === 'high') ? ' fetchpriority="high"' : '';
    const decoding = slotName === 'detail' ? 'auto' : 'async';
    const id = opts.id ? ' id="' + escAttr(opts.id) + '"' : '';
    const cls = opts.className ? ' class="' + escAttr(opts.className) + '"' : '';
    const alt = escAttr(opts.alt || '');
    const onerror = opts.onerror ? ' onerror="' + opts.onerror + '"' : '';
    const sizes = opts.sizes || slot.sizes;
    const widths = deliveryWidths(src);
    if (!widths) {
      return '<img' + id + cls + ' src="' + escAttr(src) + '" alt="' + alt + '" width="' + slot.boxW + '" height="' + slot.boxH + '" loading="' + loading + '" decoding="' + decoding + '"' + priority + onerror + '>';
    }
    const fallback = deliveryUrl(src, 'webp', pickWidth(widths, slotName));
    return '<picture>'
      + '<source type="image/avif" srcset="' + srcsetFor(src, 'avif', widths) + '" sizes="' + sizes + '">'
      + '<source type="image/webp" srcset="' + srcsetFor(src, 'webp', widths) + '" sizes="' + sizes + '">'
      + '<img' + id + cls + ' src="' + fallback + '" alt="' + alt + '" width="' + slot.boxW + '" height="' + slot.boxH + '" loading="' + loading + '" decoding="' + decoding + '"' + priority + onerror + '>'
      + '</picture>';
  }

  function paint(img, shot, slotName) {
    if (!img || !shot || !shot.src) return;
    const slot = IMAGE_SLOTS[slotName] || IMAGE_SLOTS.card;
    const name = IMAGE_SLOTS[slotName] ? slotName : 'card';
    const widths = deliveryWidths(shot.src);
    if (!widths || String(shot.src).indexOf('data:') === 0) {
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

  return {
    version: function () { return version; },
    getDevice: getDevice,
    listDevices: listDevices,
    listSeries: listSeries,
    accessories: accessories,
    getSpec: getSpec,
    specState: specState,
    presentSpec: presentSpec,
    presentDeviceSpec: presentDeviceSpec,
    isNpuDisplayable: isNpuDisplayable,
    segmentOf: segmentOf,
    getSnapshot: getSnapshot,
    applySnapshot: applySnapshot,
    resetToBaseline: resetToBaseline,
    baselineVersion: baselineVersion,
    acceptsCloudVersion: acceptsCloudVersion,
    onChange: onChange,
    portrait: portrait,
    portraitMark: portraitMark,
    frame: frame,
    paint: paint
  };
})();

if (typeof window !== 'undefined') {
  window.Catalog = Catalog;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Catalog;
}
