const fs = require('fs');
let text = fs.readFileSync('js/app.js', 'utf-8');

// 1. Update previous/next links in detail view to preserve consumer/business isolation
const oldNav = `<div>上一代：\${prevDev ? \`<a href="#/surface/\${prevDev.categoryId}/\${prevDev.id}" style="color:var(--ms-accent); font-weight:600; text-decoration:none;">\${prevDev.name}</a>\` : '— (首代产品)'}</div>
            <div>下一代：\${nextDev ? \`<a href="#/surface/\${nextDev.categoryId}/\${nextDev.id}" style="color:var(--ms-accent); font-weight:600; text-decoration:none;">\${nextDev.name}</a>\` : '— (当前最新代)'}</div>`;

const newNav = `<div>上一代：\${prevDev ? \`<a href="#/\${(prevDev.segment === 'commercial' || prevDev.isCommercial) ? 'business' : 'consumer'}/\${prevDev.categoryId}/\${prevDev.id}" style="color:var(--ms-accent); font-weight:600; text-decoration:none;">\${prevDev.name}</a>\` : '— (首代产品)'}</div>
            <div>下一代：\${nextDev ? \`<a href="#/\${(nextDev.segment === 'commercial' || nextDev.isCommercial) ? 'business' : 'consumer'}/\${nextDev.categoryId}/\${nextDev.id}" style="color:var(--ms-accent); font-weight:600; text-decoration:none;">\${nextDev.name}</a>\` : '— (当前最新代)'}</div>`;

if (text.includes(oldNav)) {
  text = text.replace(oldNav, newNav);
  console.log('Fixed detail view prev/next generation links');
} else {
  console.log('Warning: oldNav not found exactly, checking with regex');
  text = text.replace(
    /href="#\/surface\/\${prevDev\.categoryId}\/\${prevDev\.id}"/g,
    'href="#/${(prevDev.segment === \'commercial\' || prevDev.isCommercial) ? \'business\' : \'consumer\'}/${prevDev.categoryId}/${prevDev.id}"'
  );
  text = text.replace(
    /href="#\/surface\/\${nextDev\.categoryId}\/\${nextDev\.id}"/g,
    'href="#/${(nextDev.segment === \'commercial\' || nextDev.isCommercial) ? \'business\' : \'consumer\'}/${nextDev.categoryId}/${nextDev.id}"'
  );
  console.log('Replaced prev/next links via regex');
}

// 2. Update audit link count
text = text.replace('查阅全系 43 款核验总账与 Excel ↗', '查阅全系 ${SURFACE_DATA.devices.length} 款核验总账与 Excel ↗');

// 3. Add official store / docs direct button in detail hero actions
const oldBtn = `<button class="fluent-btn" onclick="App.scrollToSpecsBottom()" style="display:inline-flex; align-items:center; gap:6px;">
              📋 官方商城直达与技术文档 (查阅大表底部) ↓
            </button>`;

const newBtn = `\${(dev.isCommercial || dev.segment === 'commercial') ? \`
              <a href="\${dev.specs.officialConfigureUrl || dev.specs.officialDocUrl || 'https://www.microsoftstore.com.cn/commercial'}" target="_blank" rel="noopener noreferrer" class="fluent-btn primary" style="display:inline-flex; align-items:center; gap:6px; background:#107c41; border-color:#107c41; color:#fff; text-decoration:none;" title="直达微软官方商用商城选配">
                <span>🏢</span> 微软商用商城选配 ↗
              </a>
              \${dev.learnDocUrl ? \`
                <a href="\${dev.learnDocUrl}" target="_blank" rel="noopener noreferrer" class="fluent-btn" style="display:inline-flex; align-items:center; gap:6px; text-decoration:none;" title="查看微软官方技术规格书">
                  <span>📘</span> 官方规格说明书 ↗
                </a>
              \` : ''}
            \` : \`
              <a href="\${dev.specs.officialConfigureUrl || dev.specs.officialDocUrl || 'https://www.microsoftstore.com.cn/surface'}" target="_blank" rel="noopener noreferrer" class="fluent-btn primary" style="display:inline-flex; align-items:center; gap:6px; background:#0078d4; border-color:#0078d4; color:#fff; text-decoration:none;" title="直达微软官方商城零售选配">
                <span>🛒</span> 微软官方商城选配 ↗
              </a>
              \${dev.learnDocUrl ? \`
                <a href="\${dev.learnDocUrl}" target="_blank" rel="noopener noreferrer" class="fluent-btn" style="display:inline-flex; align-items:center; gap:6px; text-decoration:none;" title="查看微软官方技术规格书">
                  <span>📘</span> 官方规格说明书 ↗
                </a>
              \` : ''}
            \`}
            <button class="fluent-btn" onclick="App.scrollToSpecsBottom()" style="display:inline-flex; align-items:center; gap:6px;">
              📋 查看全量大表参数 ↓
            </button>`;

if (text.includes(oldBtn)) {
  text = text.replace(oldBtn, newBtn);
  console.log('Enhanced detail view hero action buttons with official links');
} else {
  console.log('Warning: oldBtn not found');
}

fs.writeFileSync('js/app.js', text, 'utf-8');
console.log('Saved js/app.js');
