const SURFACE_DATA = require('../js/surface-data.js');
const Catalog = require('../js/catalog.js');
const CURRENT = require('../tests/official-current-lineup-facts.js');
const HIST = require('../tests/official-historical-lineup-facts.js');
global.SURFACE_DATA = SURFACE_DATA;
global.Catalog = Catalog;

const CORE_KEYS = [
  'batteryCapacityWh',
  'batteryLifeVideo',
  'batteryLifeOffice',
  'chargingPower',
  'brightness',
  'dimensions',
  'weight',
  'npuTops'
];

const EXTRA_KEYS = [
  'startingPriceCny',
  'cpuModel',
  'ramSpec',
  'storageOptions',
  'resolution',
  'usbPorts',
  'wireless',
  'screenSize',
  'refreshRate'
];

const MORE_KEYS = [
  'warranty',
  'osAtLaunch',
  'frontCamera',
  'rearCamera',
  'speakers',
  'cellular',
  'repairabilityScore',
  'totalWeightWithKeyboard'
];

const facts = Object.assign({}, HIST.devices, CURRENT.devices);
const currentIds = new Set(CURRENT.currentCnDeviceIds || []);

function factLocks(id, key) {
  const f = facts[id] || {};
  const map = {
    batteryCapacityWh: ['batteryCapacityContains', 'batteryCapacityState'],
    batteryLifeVideo: ['batteryLifeVideoContains', 'batteryLifeVideoState'],
    batteryLifeOffice: ['batteryLifeOfficeContains', 'batteryLifeOfficeState'],
    chargingPower: ['chargingPowerContains', 'chargingPowerState'],
    brightness: ['brightnessContains', 'brightnessState'],
    dimensions: ['dimensionsContains', 'dimensionsState'],
    weight: ['weightContains', 'weightState'],
    npuTops: ['npuTopsContains', 'npuTopsState'],
    startingPriceCny: ['startingPriceContains', 'startingPriceState'],
    cpuModel: ['cpuMustInclude'],
    ramSpec: ['ramMustInclude'],
    storageOptions: ['storageMustInclude'],
    resolution: ['resolutionContains', 'resolutionState'],
    usbPorts: ['usbMustInclude'],
    wireless: ['wifiMustInclude', 'wifiState'],
    screenSize: ['screenSizeContains'],
    refreshRate: ['refreshRateContains', 'refreshRateState'],
    warranty: ['warrantyContains', 'warrantyState'],
    osAtLaunch: ['osMustInclude', 'osState'],
    frontCamera: ['frontCameraContains', 'frontCameraState'],
    rearCamera: ['rearCameraContains', 'rearCameraMustNotInclude', 'rearCameraState'],
    speakers: ['speakersContains', 'speakersMustNotInclude', 'speakersState'],
    cellular: ['cellularContains', 'cellularState'],
    repairabilityScore: ['repairabilityState'],
    totalWeightWithKeyboard: ['keyboardWeightState', 'keyboardWeightContains']
  };
  if (f.specContains && f.specContains[key] != null) return true;
  if (f.specState && f.specState[key]) return true;
  if (key === 'surfaceConnect' && f.surfaceConnectState) return true;
  return (map[key] || []).some((k) => f[k]);
}

const REST_KEYS = [
  'gpuModel',
  'ppi',
  'colorSupport',
  'headphoneJack',
  'expandableStorage',
  'thunderboltSupport',
  'surfaceConnect',
  'aspectRatio',
  'ssdRemovable',
  'windowsHello',
  'microphones',
  'audioTech',
  'npuModel',
  'copilotPlus',
  'touchAndPenProtocol',
  'fastCharging',
  'chassisMaterial',
  'kickstandType',
  'panelTech',
  'cpuCores',
  'cpuArch'
];

function scan(keys, label) {
  const rows = [];
  for (const d of Catalog.listDevices()) {
    for (const key of keys) {
      const val = Catalog.getSpec(d, key);
      const state = Catalog.specState(val);
      if (state !== 'VALID') continue;
      if (factLocks(d.id, key)) continue;
      rows.push({
        bucket: currentIds.has(d.id) ? 'current' : 'historical',
        id: d.id,
        key,
        val: String(val).slice(0, 80)
      });
    }
  }
  const byKey = {};
  for (const r of rows) byKey[r.key] = (byKey[r.key] || 0) + 1;
  console.log(label + ' UNLOCKED VALID counts:', JSON.stringify(byKey, null, 2));
  console.log(label + ' total', rows.length);
  for (const key of keys) {
    const list = rows.filter((r) => r.key === key);
    if (!list.length) continue;
    console.log('\n=== ' + key + ' (' + list.length + ') ===');
    for (const r of list) console.log(r.bucket + '\t' + r.id + '\t' + r.val);
  }
  return rows;
}

scan(CORE_KEYS, 'CORE8');
console.log('\n========== EXTRA ==========\n');
scan(EXTRA_KEYS, 'EXTRA');
console.log('\n========== MORE ==========\n');
scan(MORE_KEYS, 'MORE');
console.log('\n========== REST ==========\n');
scan(REST_KEYS, 'REST');
