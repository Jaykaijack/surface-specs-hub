#!/usr/bin/env node
const fs = require('fs');
const path = 'tests/test-runner.js';
let src = fs.readFileSync(path, 'utf8');
const importLine = "const { runImageMappingP0Tests } = require('./image-mapping-p0.test.js');";
if (!src.includes(importLine)) {
  if (src.includes("official-historical-lineup-facts.js');")) {
    src = src.replace(
      "const OFFICIAL_HISTORICAL_LINEUP_FACTS = require('./official-historical-lineup-facts.js');",
      "const OFFICIAL_HISTORICAL_LINEUP_FACTS = require('./official-historical-lineup-facts.js');\n" + importLine
    );
  } else {
    src = src.replace(
      "const App = require('../js/app.js');",
      "const App = require('../js/app.js');\n" + importLine
    );
  }
}
if (!src.includes('runImageMappingP0Tests(')) {
  src = src.replace(
    '// ----------------------------------------------------\n// 最终汇总',
    "runImageMappingP0Tests({ assert, assertEqual });\n\n// ----------------------------------------------------\n// 最终汇总"
  );
}
fs.writeFileSync(path, src);
console.log('ensure-img-p0-test-hook: updated', path);
