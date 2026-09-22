/**
 * P0 规格回归：出处表与 surface-data 电池 Wh 口径一致
 * 独立运行: node tests/p0-spec-battery-regression.test.js
 */
const SURFACE_DATA = require('../js/surface-data.js');

function runP0SpecBatteryRegressionTests(helpers) {
  const { assert } = helpers;
  console.log('\n🔋 Test Suite P0: 规格电池 Wh 出处一致性');

  const snap = SURFACE_DATA.devices.find((d) => d.id === 'pro-12-13-snap');
  assert(Boolean(snap), 'P0-batt: 收录 pro-12-13-snap');
  const wh = (snap && snap.specs && snap.specs.batteryCapacityWh) || '';
  // 只核验额定值前缀（说明文可提及全球页冲突口径）
  const snapRated = String(wh).split('（')[0];
  assert(
    /LCD[^0-9]*53/.test(snapRated) && /OLED[^0-9]*47/.test(snapRated),
    `P0-batt: pro-12-13-snap 额定为 LCD53/OLED47（中国商城口径）(Actual: ${snapRated})`
  );
  assert(
    !(/LCD[^0-9]*47/.test(snapRated) && /OLED[^0-9]*53/.test(snapRated)),
    `P0-batt: pro-12-13-snap 额定不得写成 LCD47/OLED53 (Actual: ${snapRated})`
  );

  const intel = SURFACE_DATA.devices.find((d) => d.id === 'pro-12-13-intel');
  assert(Boolean(intel), 'P0-batt: 收录 pro-12-13-intel');
  const iwh = (intel && intel.specs && intel.specs.batteryCapacityWh) || '';
  assert(
    /LCD[^0-9]*47/.test(iwh) && /OLED[^0-9]*53/.test(iwh),
    `P0-batt: pro-12-13-intel 为 LCD47/OLED53 (Actual: ${iwh})`
  );
}

if (require.main === module) {
  let passed = 0;
  let failed = 0;
  const assert = (cond, msg) => {
    if (cond) {
      passed += 1;
      console.log('  ✅ PASS:', msg);
    } else {
      failed += 1;
      console.log('  ❌ FAIL:', msg);
    }
  };
  runP0SpecBatteryRegressionTests({ assert });
  console.log(`\n🏁 P0-batt: ${passed} pass / ${failed} fail`);
  process.exit(failed ? 1 : 0);
}

module.exports = { runP0SpecBatteryRegressionTests };
