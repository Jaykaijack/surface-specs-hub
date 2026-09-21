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

  const listeners = [];
  let version = 0;
  let frozenSnapshot = null;
  let overlay = null;

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

  function composePorts(specs) {
    const parts = [];
    if (!isEmpty(specs.usbC)) parts.push(specs.usbC);
    else if (!isEmpty(specs.usbCPorts)) parts.push(specs.usbCPorts);
    if (!isEmpty(specs.usbA) && specs.usbA !== 'not_applicable') parts.push(specs.usbA);
    else if (!isEmpty(specs.usbAPorts) && specs.usbAPorts !== 'not_applicable') parts.push(specs.usbAPorts);
    if (!isEmpty(specs.sdSlot) && specs.sdSlot !== 'not_applicable') parts.push(specs.sdSlot);
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
    onChange: onChange
  };
})();

if (typeof window !== 'undefined') {
  window.Catalog = Catalog;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Catalog;
}
