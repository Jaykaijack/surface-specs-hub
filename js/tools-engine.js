/**
 * Microsoft Surface Specs Hub - Auxiliary Tools Engine
 * 3:2 屏幕对比器、芯片与 NPU 天梯榜、双向配件兼容性查询系统
 */

const ToolsEngine = {
  spec(device, key) {
    return Catalog.evidenceFor(device, key) ? Catalog.getSpec(device, key) : null;
  },

  parseMass(value) {
    if (value && typeof value === 'object') {
      if (!Number.isFinite(value.value) || value.value < 0) return null;
      const factor = { g: 1, kg: 1000, lb: 453.59237, lbs: 453.59237, '磅': 453.59237, '克': 1, '千克': 1000 }[value.unit];
      return factor ? value.value * factor : null;
    }
    // 多配置、范围及没有单位的值不能选一个数字冒充整机重量。
    const text = String(value ?? '').trim();
    const equivalent = text.match(/^(.+?)\s*[（(]\s*([\d.]+\s*(?:kg|g|千克|克))\s*[）)]$/i);
    if (equivalent) {
      const first = this.parseMass(equivalent[1]);
      const second = this.parseMass(equivalent[2]);
      return first !== null && second !== null && Math.abs(first - second) < 0.01 ? first : null;
    }
    const match = text.match(/^(?:约\s*)?(\d+(?:\.\d+)?)\s*(kg|g|lb|lbs|千克|克|磅)$/i);
    return match ? this.parseMass({ value: Number(match[1]), unit: match[2].toLowerCase() }) : null;
  },

  sumMass(parts) {
    return parts.every(v => Number.isFinite(v) && v >= 0) ? parts.reduce((a, b) => a + b, 0) : null;
  },

  // 3:2 计算器状态
  screenSize: 13.0,
  compareRatio: '16:9',

  // 芯片天梯筛选状态
  chipFilter: 'all',

  // 配件兼容模式：'matrix' (全景矩阵) | 'by_accessory' (按配件查设备) | 'by_device' (按设备查配件)
  compatViewMode: 'matrix',
  selectedAccessoryId: 'flex-keyboard',
  selectedDeviceId: 'pro-12-13-intel',
  selectedAccCategory: 'all',

  calculateDimensions(diag, wRatio, hRatio) {
    const diagCm = diag * 2.54;
    const rad = Math.atan(hRatio / wRatio);
    const widthCm = diagCm * Math.cos(rad);
    const heightCm = diagCm * Math.sin(rad);
    const areaCm2 = widthCm * heightCm;
    const widthIn = diag * Math.cos(rad);
    const heightIn = diag * Math.sin(rad);
    const areaIn2 = widthIn * heightIn;
    return {
      widthCm: parseFloat(widthCm.toFixed(2)),
      heightCm: parseFloat(heightCm.toFixed(2)),
      areaCm2: parseFloat(areaCm2.toFixed(2)),
      widthIn: parseFloat(widthIn.toFixed(2)),
      heightIn: parseFloat(heightIn.toFixed(2)),
      areaIn2: parseFloat(areaIn2.toFixed(2))
    };
  },

  // 1. 渲染 3:2 黄金比例屏幕生产力交互对比器
  renderScreenCalculator() {
    const diag = this.screenSize;
    const s32 = this.calculateDimensions(diag, 3, 2);
    const w32_cm = s32.widthCm;
    const h32_cm = s32.heightCm;
    const area32 = s32.areaCm2;

    let sComp, ratioName;
    if (this.compareRatio === '16:9') {
      ratioName = '16:9 传统宽屏';
      sComp = this.calculateDimensions(diag, 16, 9);
    } else {
      ratioName = '16:10 宽屏';
      sComp = this.calculateDimensions(diag, 16, 10);
    }
    const wComp_cm = sComp.widthCm;
    const hComp_cm = sComp.heightCm;
    const areaComp = sComp.areaCm2;


    const areaDiffPercent = (((area32 - areaComp) / areaComp) * 100).toFixed(1);
    const heightDiffPercent = (((h32_cm - hComp_cm) / hComp_cm) * 100).toFixed(1);


    const scale = 8.5;
    const stageW32 = Math.round(w32_cm * scale);
    const stageH32 = Math.round(h32_cm * scale);
    const stageWComp = Math.round(wComp_cm * scale);
    const stageHComp = Math.round(hComp_cm * scale);

    return `
      <div class="tool-view-card">
        <div class="tool-header-block">
          <div class="tool-title">
            <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor">
              <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13zM1.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5H7V1H1.5z"/>
            </svg>
            3:2 黄金生产力屏幕比例与物理面积交互对比器
          </div>
          <div class="tool-desc">
            实时演算 Surface 3:2 显示屏相比传统 16:9 / 16:10 笔记本多出的物理显示面积与纵向文档显示行数。
          </div>
        </div>

        <div class="screen-calc-grid">
          <div class="screen-ctrl-panel">
            <div class="screen-slider-group">
              <div class="slider-label-row">
                <span>屏幕对角线尺寸</span>
                <span style="color:var(--ms-text-brand); font-weight:700;">${diag.toFixed(1)} 英寸</span>
              </div>
              <input type="range" class="screen-range-input" min="10" max="28" step="0.1" value="${diag}"
                oninput="ToolsEngine.onScreenSizeChange(this.value)" />
              <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--ms-text-tertiary); margin-top:4px;">
                <span onclick="ToolsEngine.onScreenSizeChange(10.5)" style="cursor:pointer;">10.5" (Go)</span>
                <span onclick="ToolsEngine.onScreenSizeChange(12.4)" style="cursor:pointer;">12.4" (Laptop Go)</span>
                <span onclick="ToolsEngine.onScreenSizeChange(13.0)" style="cursor:pointer; font-weight:bold; color:var(--ms-text-brand);">13.0" (Pro)</span>
                <span onclick="ToolsEngine.onScreenSizeChange(13.8)" style="cursor:pointer; font-weight:bold; color:var(--ms-text-brand);">13.8" (Laptop)</span>
                <span onclick="ToolsEngine.onScreenSizeChange(15.0)" style="cursor:pointer;">15.0"</span>
                <span onclick="ToolsEngine.onScreenSizeChange(28.0)" style="cursor:pointer;">28.0" (Studio)</span>
              </div>
            </div>

            <div class="screen-slider-group">
              <div class="slider-label-row">
                <span>对比基准屏幕长宽比</span>
                <span style="color:var(--ms-text-secondary);">${ratioName}</span>
              </div>
              <div class="aspect-ratio-selector">
                <button class="ratio-btn ${this.compareRatio === '16:9' ? 'active' : ''}" onclick="ToolsEngine.onCompareRatioChange('16:9')">
                  对比 16:9 (传统主流比例)
                </button>
                <button class="ratio-btn ${this.compareRatio === '16:10' ? 'active' : ''}" onclick="ToolsEngine.onCompareRatioChange('16:10')">
                  对比 16:10 (轻薄办公本)
                </button>
              </div>
            </div>

            <div class="screen-metrics-grid">
              <div class="metric-box">
                <div class="metric-val">+${areaDiffPercent}%</div>
                <div class="metric-label">物理显示面积多出</div>
              </div>
              <div class="metric-box">
                <div class="metric-val">+${heightDiffPercent}%</div>
                <div class="metric-label">纵向可视高度多出</div>
              </div>
              <div class="metric-box">
                <div class="metric-val">几何计算</div>
                <div class="metric-label">同对角线、矩形显示区域；不推导办公收益</div>
              </div>
            </div>

            <div style="font-size:12.5px; line-height:1.55; color:var(--ms-text-secondary); background:var(--ms-bg-card-secondary); padding:12px; border-radius:var(--ms-radius-md); ">
              计算方法：宽 = 对角线 × 宽比例 / √(宽比例² + 高比例²)，高同理，面积 = 宽 × 高。忽略圆角、系统缩放和应用界面；不能据此推出 Excel 行数或生产力提升。
            </div>
          </div>

          <div class="screen-visual-stage">
            <div class="screen-wireframe-wrap" style="width:${Math.max(stageW32, stageWComp)}px; height:${Math.max(stageH32, stageHComp)}px;">
              <div class="wireframe-surface-32" style="width:${stageW32}px; height:${stageH32}px; left:${(Math.max(stageW32, stageWComp) - stageW32) / 2}px; top:${(Math.max(stageH32, stageHComp) - stageH32) / 2}px;">
                Surface 3:2 (${w32_cm.toFixed(1)} × ${h32_cm.toFixed(1)} cm / ${area32.toFixed(0)} cm²)
              </div>
              <div class="wireframe-comp-169" style="width:${stageWComp}px; height:${stageHComp}px; left:${(Math.max(stageW32, stageWComp) - stageWComp) / 2}px; top:${(Math.max(stageH32, stageHComp) - stageHComp) / 2}px;">
                ${ratioName} (${wComp_cm.toFixed(1)} × ${hComp_cm.toFixed(1)} cm / ${areaComp.toFixed(0)} cm²)
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  onScreenSizeChange(val) {
    this.screenSize = parseFloat(val);
    const container = document.getElementById('tool-screen-calc-container');
    if (container) container.innerHTML = this.renderScreenCalculator();
  },

  onCompareRatioChange(ratio) {
    this.compareRatio = ratio;
    const container = document.getElementById('tool-screen-calc-container');
    if (container) container.innerHTML = this.renderScreenCalculator();
  },

  chipNpuScore(chip) {
    if (/FP4|petaflop|RTX Spark/i.test([chip.name, chip.npuDesc, chip.highlights, chip.precision].join(' '))) return null;
    return Catalog.chipNpuScore(chip);
  },

  // 2. 渲染微软定制芯片架构与 NPU AI 算力天梯图
  renderChipLadder() {
    let chips = [...SURFACE_DATA.chips];
    if (this.chipFilter === 'arm') chips = chips.filter(c => c.architecture.includes('ARM'));
    else if (this.chipFilter === 'x86') chips = chips.filter(c => c.architecture.includes('x86'));
    else if (this.chipFilter === 'copilot') chips = chips.filter(c => (this.chipNpuScore(c) ?? -1) >= 40);

    chips.sort((a, b) => (this.chipNpuScore(b) ?? -1) - (this.chipNpuScore(a) ?? -1));
    const maxTops = Math.max(...chips.map(chip => this.chipNpuScore(chip) || 0), 80);

    let html = `
      <div class="tool-view-card">
        <div class="tool-header-block">
          <div class="tool-title">
            <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14A2.5 2.5 0 0 1 11.5 14v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zM3 4.5A1.5 1.5 0 0 0 4.5 6h7A1.5 1.5 0 0 0 13 4.5v-1A1.5 1.5 0 0 0 11.5 2h-7A1.5 1.5 0 0 0 3 3.5v1z"/>
            </svg>
            微软定制处理器架构与 NPU AI 硬件算力天梯榜 (TOPS)
          </div>
          <div class="tool-desc">
            芯片历史记录尚未逐字段绑定证据；未核验 NPU 数值不参与排序或筛选，其他文字仅作待核验记录。
          </div>
        </div>

        <div class="chip-filter-bar">
          <button class="fluent-btn ${this.chipFilter === 'all' ? 'active' : ''}" onclick="ToolsEngine.onChipFilterChange('all')">全部芯片 (${SURFACE_DATA.chips.length})</button>
          <button class="fluent-btn ${this.chipFilter === 'arm' ? 'active' : ''}" onclick="ToolsEngine.onChipFilterChange('arm')">仅看 ARM 高能效架构</button>
          <button class="fluent-btn ${this.chipFilter === 'x86' ? 'active' : ''}" onclick="ToolsEngine.onChipFilterChange('x86')">仅看 x86 传统架构</button>
          <button class="fluent-btn ${this.chipFilter === 'copilot' ? 'active' : ''}" onclick="ToolsEngine.onChipFilterChange('copilot')">✨ 认证 Copilot+ PC (≥40 TOPS)</button>
        </div>

        <div class="chip-ladder-container">
    `;

    chips.forEach(chip => {
      const npuTops = this.chipNpuScore(chip);
      const fillPercent = npuTops === null ? 0 : Math.max(3, (npuTops / maxTops) * 100);
      const isTop = npuTops >= 80;
      const isX86 = (chip.architecture || '').includes('x86');

      let barClass = 'chip-bar-fill';
      if (isTop) barClass += ' gold';
      else if (isX86) barClass += ' x86';

      const equippedList = Array.isArray(chip.equippedDevices) ? chip.equippedDevices
        : (Array.isArray(chip.devices) ? chip.devices : []);

      html += `
        <div class="chip-ladder-row">
          <div class="chip-name-cell">
            <span class="chip-model">${chip.name}</span>
            <span class="chip-meta">${chip.vendor || '芯片'} · ${chip.processNode || chip.process || '制程待核验'}</span>
          </div>

          <div class="chip-bar-track">
            <div class="chip-baseline-marker" style="left:${40 / maxTops * 100}%;" title="Copilot+ PC 官方 40 TOPS 准入门槛"></div>
            <div class="${barClass}" style="width:${fillPercent}%;"></div>
          </div>

          <div class="chip-score-cell">
            ${npuTops > 0 ? `${npuTops} <span style="font-size:11px; font-weight:normal;">TOPS</span>` : '<span style="font-size:11px; color:var(--ms-text-tertiary);">未确认专用 NPU INT8 算力</span>'}
          </div>
        </div>

        <div style="font-size:12px; color:var(--ms-text-secondary); margin:-6px 0 14px 14px; padding-left:12px;  line-height:1.5;">
          <span style="color:var(--ms-text-tertiary);">装备机型：</span><strong>${equippedList.join('、') || '—'}</strong><br>
          <span style="color:var(--ms-text-tertiary);">架构亮点：</span>${chip.highlights || chip.desc || '—'}
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    return html;
  },

  onChipFilterChange(filter) {
    this.chipFilter = filter;
    const container = document.getElementById('tool-chip-ladder-container');
    if (container) container.innerHTML = this.renderChipLadder();
  },

  // 3. 渲染双向配件兼容性查询系统 (PRD 第二十章)
  renderAccessoryMatrix() {
    let subViewHtml = '';

    if (this.compatViewMode === 'matrix') {
      subViewHtml = this.renderFullCompatTable();
    } else if (this.compatViewMode === 'by_accessory') {
      subViewHtml = this.renderByAccessoryView();
    } else {
      subViewHtml = this.renderByDeviceView();
    }

    return `
      <div class="tool-view-card">
        <div class="tool-header-block">
          <div class="tool-title">
            <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor">
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
              <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
            </svg>
            Surface 配件生态双向兼容性查询中心
          </div>
          <div class="tool-desc">
            解决主播与选型客户最核心的配件疑虑：既支持“按配件查看支持哪些机型”，也支持“按某台 Surface 查看适配哪些键盘与手写笔”。
          </div>
        </div>

        <div style="display:flex; gap:8px; margin-bottom:16px;">
          <button class="fluent-btn ${this.compatViewMode === 'matrix' ? 'active' : ''}" onclick="ToolsEngine.setCompatView('matrix')">
            全景兼容总表
          </button>
          <button class="fluent-btn ${this.compatViewMode === 'by_accessory' ? 'active' : ''}" onclick="ToolsEngine.setCompatView('by_accessory')">
            按配件查支持设备
          </button>
          <button class="fluent-btn ${this.compatViewMode === 'by_device' ? 'active' : ''}" onclick="ToolsEngine.setCompatView('by_device')">
            按设备查兼容配件
          </button>
        </div>

        <div id="compat-subview-container">
          ${subViewHtml}
        </div>
      </div>
    `;
  },

  setCompatView(mode) {
    this.compatViewMode = mode;
    if (typeof App !== 'undefined' && App.renderActiveView) {
      App.renderActiveView();
      return;
    }
    const container = document.getElementById('hub-main-content');
    if (container) container.innerHTML = this.renderAccessoryMatrix();
  },

  // 全景总表
  renderFullCompatTable() {
    const devices = Catalog.listDevices().filter(d => ['pro', 'sls', 'go', 'book', 'laptop'].includes(d.categoryId));
    const preferredIds = [
      'flex-keyboard', 'pro-classic-type-cover', 'slim-pen-2', 'surface-pen-classic',
      'surface-arc-mouse', 'surface-precision-mouse', 'surface-dock-2', 'surface-dock-1'
    ];
    const flagshipCols = preferredIds.map(id => {
      const acc = Catalog.accessories().find(a => a.id === id);
      return acc ? { id: acc.id, name: acc.name, sub: acc.tagline || acc.category || '' } : null;
    }).filter(Boolean);

    return `
      <div style="overflow-x:auto;">
        <table class="compat-matrix-table">
          <thead>
            <tr>
              <th style="width:200px; text-align:left;">Surface 主机型号</th>
              ${flagshipCols.map(col => {
                const accObj = Catalog.accessories().find(a => a.id === col.id);
                const imgSrc = accObj ? (accObj.image || `./assets/accessories/${col.id}.png`) : '';
                return `
                  <th>
                    <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
                      ${imgSrc ? Catalog.frame(Catalog.accessoryPortrait(col), { slot: 'audit', alt: col.name, loading: 'eager' }) : ''}
                      <div>${col.name}</div>
                      <span style="font-size:10.5px; font-weight:normal; color:var(--ms-text-tertiary);">${col.sub}</span>
                    </div>
                  </th>
                `;
              }).join('')}
            </tr>
          </thead>
          <tbody>
            ${devices.map(dev => {
              return `
                <tr>
                  <td class="compat-device-label">
                    ${dev.name}
                    <div style="font-size:11px; font-weight:normal; color:var(--ms-text-tertiary);">${dev.generation}</div>
                  </td>
                  ${flagshipCols.map(col => {
                    const compat = this.getCompatStatus(col.id, dev.id);
                    return `<td>${this.formatStatusObj(compat)}</td>`;
                  }).join('')}
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  // 按配件查看
  renderByAccessoryView() {
    const allAccessories = Catalog.accessories();
    let accessories = allAccessories;
    if (this.selectedAccCategory && this.selectedAccCategory !== 'all') {
      accessories = accessories.filter(a => a.category === this.selectedAccCategory);
    }
    const acc = accessories.find(a => a.id === this.selectedAccessoryId) || accessories[0] || allAccessories[0];
    if (!acc) {
      return `<div class="spec-table-empty"><h3>当前配件目录为空</h3><p>兼容矩阵只读取 Catalog 配件快照，本地基线未被改写。</p></div>`;
    }

    // 品类统计
    const catCounts = {};
    allAccessories.forEach(a => {
      catCounts[a.category] = (catCounts[a.category] || 0) + 1;
    });

    return `
      <div style="display:flex; flex-direction:column; gap:16px;">
        <!-- 品类快速筛选 Tabs -->
        <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:4px;">
          <button class="fluent-btn ${this.selectedAccCategory === 'all' ? 'active' : ''}" onclick="ToolsEngine.onSelectAccCategory('all')">
            ⚡ 全部配件 (${allAccessories.length})
          </button>
          <button class="fluent-btn ${this.selectedAccCategory === 'mouse' ? 'active' : ''}" onclick="ToolsEngine.onSelectAccCategory('mouse')">
            🖱️ 鼠标与触控 (${catCounts.mouse || 0})
          </button>
          <button class="fluent-btn ${this.selectedAccCategory === 'keyboard' ? 'active' : ''}" onclick="ToolsEngine.onSelectAccCategory('keyboard')">
            ⌨️ 键盘与保护盖 (${catCounts.keyboard || 0})
          </button>
          <button class="fluent-btn ${this.selectedAccCategory === 'pen' ? 'active' : ''}" onclick="ToolsEngine.onSelectAccCategory('pen')">
            ✏️ 手写笔与压感 (${catCounts.pen || 0})
          </button>
          <button class="fluent-btn ${this.selectedAccCategory === 'dock' ? 'active' : ''}" onclick="ToolsEngine.onSelectAccCategory('dock')">
            🔌 拓展坞与转换器 (${catCounts.dock || 0})
          </button>
          <button class="fluent-btn ${this.selectedAccCategory === 'audio' ? 'active' : ''}" onclick="ToolsEngine.onSelectAccCategory('audio')">
            🎧 音频与会议外设 (${catCounts.audio || 0})
          </button>
          <button class="fluent-btn ${this.selectedAccCategory === 'creative' ? 'active' : ''}" onclick="ToolsEngine.onSelectAccCategory('creative')">
            🎨 创意交互外设 (${catCounts.creative || 0})
          </button>
        </div>

        <div style="display:flex; gap:10px; align-items:center;">
          <span style="font-size:13px; font-weight:600; white-space:nowrap;">选择具体配件：</span>
          <select class="fluent-btn" style="padding:6px 12px; font-size:13px; cursor:pointer;" onchange="ToolsEngine.onSelectAccessory(this.value)">
            ${this.renderAccessoryOptionsGrouped(acc.id)}
          </select>
        </div>

        <div style="background:var(--ms-bg-card-secondary); padding:16px 20px; border-radius:var(--ms-radius-md);  display:flex; gap:20px; align-items:center;">
          <div style="flex-shrink:0; width:120px; height:90px; display:flex; align-items:center; justify-content:center; background:var(--ms-bg-card); border-radius:var(--ms-radius-sm); border:1px solid var(--ms-border-subtle); padding:6px;">
            ${Catalog.frame(Catalog.accessoryPortrait(acc), {
              slot: 'guide',
              alt: acc.name,
              loading: 'eager'
            })}
          </div>
          <div style="flex:1; min-width:0;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
              <span style="font-weight:700; font-size:16px;">${acc.name}</span>
              <span class="spec-badge" style="background:var(--ms-accent-subtle); color:var(--ms-accent); border:1px solid var(--ms-accent-border); font-size:11px;">
                ${acc.categoryName || acc.category}
              </span>
            </div>
            <div style="font-size:13px; color:var(--ms-text-secondary); margin-bottom:8px; line-height:1.5;">${acc.tagline}</div>
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              ${(acc.features || []).map(f => `<span class="spec-badge">${f}</span>`).join('')}
            </div>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
          <div style="font-weight:600; font-size:14px;">适配 Surface 全系设备判定清单 (${(acc.compatibilityList || []).length} 款机型)</div>
          <div style="font-size:12px; color:var(--ms-text-tertiary);">
            绿色：原生完美 · 橙色：部分/功能受限 · 红色：不兼容
          </div>
        </div>

        <table class="compat-matrix-table">
          <thead>
            <tr>
              <th style="width:260px; text-align:left;">适配 Surface 设备</th>
              <th style="width:130px;">兼容级别</th>
              <th style="text-align:left;">特性与注意事项</th>
            </tr>
          </thead>
          <tbody>
            ${(acc.compatibilityList || []).map(item => {
              const dev = Catalog.getDevice(item.deviceId);
              return `
                <tr>
                  <td class="compat-device-label">
                    ${dev ? dev.name : item.deviceId}
                    ${dev ? `<div style="font-size:11px; color:var(--ms-text-tertiary); font-weight:normal;">${dev.generation}</div>` : ''}
                  </td>
                  <td>${this.formatBadgeByStatus(this.getCompatStatus(acc.id, item.deviceId).status)}</td>
                  <td style="text-align:left; color:var(--ms-text-secondary); font-size:12.5px;">${this.getCompatStatus(acc.id, item.deviceId).note}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  renderAccessoryOptionsGrouped(selectedId) {
    const categories = [
      { id: 'mouse', label: '🖱️ 鼠标与触控外设' },
      { id: 'keyboard', label: '⌨️ 键盘与保护盖' },
      { id: 'pen', label: '✏️ 手写笔与压感' },
      { id: 'dock', label: '🔌 拓展坞与转换器' },
      { id: 'audio', label: '🎧 音频与会议外设' },
      { id: 'creative', label: '🎨 创意交互外设' }
    ];

    let html = '';
    categories.forEach(cat => {
      let items = Catalog.accessories().filter(a => a.category === cat.id);
      if (this.selectedAccCategory && this.selectedAccCategory !== 'all') {
        if (cat.id !== this.selectedAccCategory) items = [];
      }
      if (items.length > 0) {
        html += `<optgroup label="${cat.label}">`;
        items.forEach(a => {
          html += `<option value="${a.id}" ${a.id === selectedId ? 'selected' : ''}>${a.name}</option>`;
        });
        html += `</optgroup>`;
      }
    });
    return html;
  },

  // 按设备查看
  renderByDeviceView() {
    const allDevices = Catalog.listDevices();
    const dev = Catalog.getDevice(this.selectedDeviceId) || allDevices[0];

    const categories = [
      { id: 'mouse', label: '🖱️ 鼠标与触控外设' },
      { id: 'keyboard', label: '⌨️ 键盘与保护盖外设' },
      { id: 'pen', label: '✏️ 手写笔与压感外设' },
      { id: 'dock', label: '🔌 拓展坞与转换器外设' },
      { id: 'audio', label: '🎧 音频与会议外设' },
      { id: 'creative', label: '🎨 创意交互外设' }
    ];

    return `
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div style="display:flex; gap:10px; align-items:center;">
          <span style="font-size:13px; font-weight:600; white-space:nowrap;">当前选择 Surface 设备：</span>
          <select class="fluent-btn" style="padding:6px 12px; font-size:13px; cursor:pointer;" onchange="ToolsEngine.onSelectDevice(this.value)">
            ${allDevices.map(d => `
              <option value="${d.id}" ${d.id === dev.id ? 'selected' : ''}>${d.name} (${d.generation})</option>
            `).join('')}
          </select>
        </div>

        <div style="background:var(--ms-bg-card-secondary); padding:16px; border-radius:var(--ms-radius-md); ">
          <div style="font-weight:700; font-size:16px; margin-bottom:4px;">${dev.name}</div>
          <div style="font-size:13px; color:var(--ms-text-secondary); line-height:1.5;">${dev.tagline || dev.desc || 'Microsoft Surface 官方系列硬件'}</div>
        </div>

        <!-- 按品类分组展示全系配件兼容表现 -->
        ${categories.map(cat => {
          const accs = Catalog.accessories().filter(a => a.category === cat.id);
          if (accs.length === 0) return '';
          return `
            <div style="margin-top:8px;">
              <div style="font-weight:700; font-size:14.5px; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
                <span>${cat.label}</span>
                <span style="font-size:12px; font-weight:normal; color:var(--ms-text-tertiary);">(${accs.length} 款配件)</span>
              </div>
              <table class="compat-matrix-table">
                <thead>
                  <tr>
                    <th style="width:260px; text-align:left;">配件型号</th>
                    <th style="width:130px;">兼容级别</th>
                    <th style="text-align:left;">详细兼容表现说明</th>
                  </tr>
                </thead>
                <tbody>
                  ${accs.map(acc => {
                    const match = this.getCompatStatus(acc.id, dev.id);
                    const status = match ? match.status : 'UNKNOWN';
                    const note = match ? match.note : '官方白皮书暂未列入适配名单';
                    return `
                      <tr>
                        <td class="compat-device-label">
                          <div style="display:flex; align-items:center; gap:10px;">
                            ${Catalog.frame(Catalog.accessoryPortrait(acc), {
                              slot: 'audit',
                              alt: acc.name,
                              loading: 'lazy'
                            })}
                            <div>
                              <div style="font-weight:600;">${acc.name}</div>
                              <div style="font-size:11px; color:var(--ms-text-tertiary); font-weight:normal;">${acc.categoryName}</div>
                            </div>
                          </div>
                        </td>
                        <td>${this.formatBadgeByStatus(status)}</td>
                        <td style="text-align:left; color:var(--ms-text-secondary); font-size:12.5px;">${note}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  onSelectAccCategory(cat) {
    this.selectedAccCategory = cat;
    if (cat !== 'all') {
      const firstAcc = Catalog.accessories().find(a => a.category === cat);
      if (firstAcc) this.selectedAccessoryId = firstAcc.id;
    }
    this.setCompatView('by_accessory');
  },

  onSelectAccessory(id) {
    this.selectedAccessoryId = id;
    this.setCompatView('by_accessory');
  },

  onSelectDevice(id) {
    this.selectedDeviceId = id;
    this.setCompatView('by_device');
  },

  getCompatStatus(accId, devId) {
    const acc = Catalog.accessories().find(a => a.id === accId);
    if (!acc) return null;
    const row = (acc.compatibilityList || []).find(c => c.deviceId === devId);
    const e = row && row.evidence;
    if (!e || e.deviceId !== devId || e.accessoryId !== accId || e.status !== row.status || e.note !== row.note || !e.configuration || !e.verifiedAt || !/^https:\/\//.test(e.sourceUrl || '')) {
      return {status:'UNKNOWN', note:'尚无绑定此型号、配件和配置的有效证据，无法判断兼容；历史说明不作结论'};
    }
    return row;
  },

  formatStatusObj(obj) {
    if (!obj) return '<span style="color:var(--ms-text-tertiary);">—</span>';
    return `
      <div>${this.formatBadgeByStatus(obj.status)}</div>
      <div style="font-size:11px; color:var(--ms-text-tertiary); margin-top:3px;">${obj.note}</div>
    `;
  },

  formatBadgeByStatus(status) {
    if (status === 'UNKNOWN') return '<span class="compat-status-partial">待核验</span>';
    if (status === 'FULL') return '<span class="compat-status-yes">✓ 完美支持</span>';
    if (status === 'PARTIAL') return '<span class="compat-status-partial">● 部分支持</span>';
    return '<span class="compat-status-no">✕ 不支持</span>';
  },

  // ========================================================
  // 4. 🎯 场景化智能选型向导 (Smart Guide)
  // ========================================================
  guideBudget: 'all',
  guideScene: 'commute',
  guideForm: 'all',
  guideArch: 'all',

  onGuideFilterChange(type, value) {
    if (type === 'budget') this.guideBudget = value;
    if (type === 'scene') this.guideScene = value;
    if (type === 'form') this.guideForm = value;
    if (type === 'arch') this.guideArch = value;

    const container = document.getElementById('tool-smart-guide-container');
    if (container) container.innerHTML = this.renderSmartGuide();
  },

  guidePriceYuan(device) {
    const raw = String(this.spec(device, 'startingPriceCny') || '').replace(/,/g, '');
    const match = raw.match(/(\d{4,6})/);
    return match ? Number(match[1]) : null;
  },

  guideCpuText(device) {
    return String(this.spec(device, 'cpuModel') || '');
  },

  guideIsIntel(device) {
    const cpu = this.guideCpuText(device);
    return /Intel|酷睿|Ultra|奔腾/i.test(cpu) && !/Snapdragon|骁龙|高通/i.test(cpu);
  },

  guideIsSnapdragon(device) {
    return /Snapdragon|骁龙|高通/i.test(this.guideCpuText(device));
  },

  guideHours(device) {
    const text = String(this.spec(device, 'batteryLifeVideo') || this.spec(device, 'batteryLifeLocalVideo') || '');
    const match = text.match(/(\d+(?:\.\d+)?)\s*小时/);
    return match ? Number(match[1]) : 0;
  },

  guideGrams(device) {
    return this.parseMass(this.spec(device, 'weight'));
  },

  guidePassesFilters(device) {
    if (device.categoryId === 'xbox') return false;
    if (device.status !== 'current_cn' && device.status !== 'upcoming') return false;
    const price = this.guidePriceYuan(device);
    if (this.guideBudget === 'budget_entry' && !(price !== null && price < 6000)) return false;
    if (this.guideBudget === 'budget_mid' && !(price !== null && price >= 6000 && price <= 10000)) return false;
    if (this.guideBudget === 'budget_high' && !(price !== null && price > 10000 && price <= 16000)) return false;
    if (this.guideBudget === 'budget_pro' && !(price !== null && price > 16000)) return false;
    const category = device.categoryId;
    if (this.guideForm === '2in1' && category !== 'pro' && category !== 'go') return false;
    if (this.guideForm === 'laptop' && category !== 'laptop' && category !== 'laptopgo') return false;
    if (this.guideForm === 'studio' && category !== 'sls') return false;
    if (this.guideArch === 'intel' && !this.guideIsIntel(device)) return false;
    if (this.guideArch === 'snapdragon' && !this.guideIsSnapdragon(device)) return false;
    return true;
  },

  guideScore(device) {
    const scene = this.guideScene || 'commute';
    const categoryBoost = {
      commute: { pro: 140, laptopgo: 110, go: 90, laptop: 50 },
      office: { laptop: 160, pro: 50, laptopgo: 40 },
      design: { sls: 220, pro: 140 },
      creative_pen: { sls: 220, pro: 160 },
      enterprise_it: { laptop: 150, pro: 120, sls: 80 },
      ai_copilot: { laptop: 160, pro: 160 },
      conference: { sls: 180, pro: 150, laptop: 140 },
      engineering: { sls: 260, laptop: 160 },
      study: { go: 120, laptopgo: 100, pro: 80, laptop: 30 },
      study_exam: { go: 120, laptopgo: 100, pro: 80, laptop: 30 },
      medical_field: { pro: 200, go: 180, laptopgo: 40 }
    }[scene] || {};
    let score = categoryBoost[device.categoryId] || 0;
    const mass = this.guideGrams(device);
    if (mass !== null) score += Math.max(0, 2200 - mass) / 10;
    score += this.guideHours(device) * 4;
    if (device.status === 'current_cn') score += 30;
    if (scene === 'office' && this.guideIsIntel(device)) score += 80;
    if (scene === 'office' && device.segment === 'commercial') score += 40;
    if (scene === 'enterprise_it') {
      if (device.segment === 'commercial' || device.isCommercial) score += 140;
      if (this.guideIsIntel(device)) score += 80;
    }
    if (scene === 'ai_copilot') {
      const npuVal = Catalog.npuScore(this.spec(device, 'npuTops'));
      if (npuVal >= 80) score += 220;
      else if (npuVal >= 40) score += 140;
      if (this.guideIsSnapdragon(device)) score += 80;
    }
    if (scene === 'engineering') {
      if (device.categoryId === 'sls') score += 140;
      if (String(device.name).includes('15') || String(device.name).includes('14.4')) score += 50;
      if (/Ultra|i7|RTX|dGPU/i.test(this.guideCpuText(device))) score += 80;
    }
    if (scene === 'media_3d') {
      if (device.categoryId === 'sls' || device.categoryId === 'studio') score += 150;
      if (/RTX|dGPU/i.test(this.guideCpuText(device))) score += 90;
    }
    if (scene === 'finance') {
      if (device.categoryId === 'laptop' && (String(device.name).includes('15') || String(device.name).includes('13.8'))) score += 100;
      if (device.segment === 'commercial') score += 50;
    }
    if (scene === 'cloud_gaming') {
      const hz = String(this.spec(device, 'refreshRate') || '');
      if (hz.includes('120')) score += 110;
      if (device.categoryId === 'xbox') score += 150;
    }
    if (scene === 'medical_field') {
      if (device.categoryId === 'pro' || device.categoryId === 'go') score += 120;
    }
    const pen = String(this.spec(device, 'touchAndPenProtocol') || this.spec(device, 'penSupport') || '');
    if ((scene === 'design' || scene === 'creative_pen' || scene === 'study' || scene === 'study_exam') && /触控笔|MPP/.test(pen) && !pen.includes('不支持')) score += 70;
    const npu = Catalog.npuScore(this.spec(device, 'npuTops'));
    if (!isNaN(npu)) score += Math.min(npu, 80) / 10;
    score += (Number(device.year) || 0) / 100;
    return score;
  },

  guideCaveat(device) {
    const lines = [];
    if (device.status === 'upcoming') lines.push('官方页面写的是上市月份，现在还不能当作国行在售。');
    const pen = String(this.spec(device, 'touchAndPenProtocol') || '');
    if (pen.includes('不支持触控笔')) lines.push('官方写明不支持触控笔。');
    const keyboard = String(this.spec(device, 'keyboardCompat') || this.spec(device, 'compatibleKeyboard') || '');
    if (keyboard.includes('另售')) lines.push('键盘另售，不在主机包装里。');
    const video = String(this.spec(device, 'batteryLifeVideo') || '');
    if (video.includes('5G') && video.includes('Wi-Fi')) lines.push('Wi-Fi 机型和 5G 机型的续航要分开看。');
    if (this.spec(device, 'startingPriceCny') === 'not_disclosed') lines.push('当前售价尚未绑定地区、配置和日期证据。');
    return lines.join('');
  },

  matchRecommendedDevices() {
    const titles = {
      commute: '极轻差旅与全天移动外勤',
      office: '现代商务行政与高负荷多任务',
      enterprise_it: '企业 IT 统采与高等级安全信创',
      ai_copilot: 'Copilot+ 本地端侧 AI 生产力旗舰',
      design: '原笔迹触控手绘与数码创作',
      creative_pen: '原笔迹触控手绘与数码创作',
      conference: '高清音视频会务与跨国协作',
      engineering: '专业工程研发、编译与重度建模',
      media_3d: '3D 建模渲染与影视后期创作',
      finance: '金融投研分析与巨幅报表处理',
      study: '高校学习考研与无纸化自习',
      study_exam: '高校学习考研与无纸化自习',
      medical_field: '医疗查房、车间现场与特种巡检',
      cloud_gaming: '掌上轻差旅与沉浸影音娱乐'
    };
    const ranked = Catalog.listDevices()
      .filter(device => this.guidePassesFilters(device))
      .sort((a, b) => this.guideScore(b) - this.guideScore(a) || String(a.name).localeCompare(String(b.name), 'zh'));
    const rule = { title: titles[this.guideScene] || titles.commute };
    if (!ranked.length) {
      return {
        rule,
        best: null,
        alt: null,
        rest: [],
        matches: [],
        emptyNote: this.guideBudget === 'all'
          ? '当前形态和芯片条件下，没有在售或即将发售的机型。'
          : '当前没有已核验价格且符合此预算的机型。未核验的历史价格不参与预算筛选，可选择全部预算查看参数。'
      };
    }
    const leaders = ranked.slice(0, 2);
    const upcoming = ranked.filter(device => device.status === 'upcoming' && leaders.indexOf(device) === -1);
    const others = ranked.slice(2).filter(device => device.status !== 'upcoming');
    const visible = leaders.concat(upcoming, others).slice(0, 8);
    return {
      rule,
      best: visible[0],
      alt: visible[1] || null,
      rest: visible.slice(2),
      matches: ranked,
      emptyNote: ''
    };
  },

  renderSmartGuide() {
    const { rule, best, alt, rest, matches, emptyNote } = this.matchRecommendedDevices();

    const budgets = [
      { id: 'all', label: '全部预算' },
      { id: 'budget_entry', label: '入门便携 (<¥6,000)' },
      { id: 'budget_mid', label: '主流进阶 (¥6,000~¥10,000)' },
      { id: 'budget_high', label: '旗舰高端 (¥10,000~¥16,000)' },
      { id: 'budget_pro', label: '专业顶配 (>¥16,000)' }
    ];

    const scenes = [
      { id: 'commute', label: '🚄 极轻差旅商旅', desc: '羽量便携随行、超长续航与可选 5G' },
      { id: 'office', label: '💼 现代行政办公', desc: '轻薄一体形态、高舒适全尺寸键程' },
      { id: 'enterprise_it', label: '🛡️ 企业统采与信创合规', desc: 'Intel vPro 硬件盾与 Secured-core' },
      { id: 'ai_copilot', label: '🤖 Copilot+ 本地 AI', desc: '专用 NPU 算力与适用功能须分别核验' },
      { id: 'design', label: '🎨 原笔迹手绘数码设计', desc: 'PixelSense 4096 级压感与触感笔反馈' },
      { id: 'engineering', label: '⚡ 专业软件研发与重度工程', desc: '强悍 CPU 多核算力与高速编译散热冗余' },
      { id: 'media_3d', label: '🔬 3D 渲染与影视特效后期', desc: 'NVIDIA 独立显卡与超高色准 Mini-LED 屏' },
      { id: 'finance', label: '📊 金融投研与巨幅报表分析', desc: '3:2 纵向视界、多任务快速核算比对' },
      { id: 'conference', label: '🎙️ 高清音视频会务与协同', desc: 'Studio 远场双摄与 AI 双向降噪' },
      { id: 'study', label: '📚 高教学术与无纸化研读', desc: '轻巧长续航、静音打字与 PDF 手写批注' },
      { id: 'medical_field', label: '🏥 智慧医疗与特种现场巡检', desc: '二合一分离平板、防尘坚固、单手巡查' },
      { id: 'cloud_gaming', label: '🎮 掌上影音娱乐与云游戏', desc: '120Hz 高刷屏、杜比全景声、Xbox 手柄直连' }
    ];

    const forms = [
      { id: 'all', label: '不限形态' },
      { id: '2in1', label: '二合一分离平板 (Pro/Go)' },
      { id: 'laptop', label: '传统极简轻薄本 (Laptop)' },
      { id: 'studio', label: '多形态变形工作站 (SLS)' }
    ];

    const archs = [
      { id: 'all', label: '不限芯片架构' },
      { id: 'snapdragon', label: '骁龙 Copilot+ (超长续航/80 TOPS AI)' },
      { id: 'intel', label: 'Intel 酷睿 (极高行业软件兼容性)' }
    ];

    const renderCard = (dev, badgeClass, badgeText) => {
      if (!dev) return '';
      const specOf = (key) => this.spec(dev, key);
      const shot = Catalog.portrait(dev);
      const price = specOf('startingPriceCny');
      const priceLabel = !price || price === 'not_disclosed' || price === 'not_applicable' ? '价格待核验' : price;
      const points = (typeof Catalog.highlights === 'function' ? Catalog.highlights(dev) : []).map(item => `<li>${item}</li>`).join('');
      const audience = typeof Catalog.audience === 'function' ? Catalog.audience(dev) : '';
      const caveat = this.guideCaveat(dev);
      const cardClass = badgeClass.includes('gold') ? 'best-pick' : 'alt-pick';
      return `
        <div class="guide-card ${cardClass}">
          <div class="guide-card-badge ${badgeClass}">${badgeText}</div>
          
          <div class="guide-card-hero">
            <span style="position:relative; display:inline-block;">
              ${Catalog.frame(shot, {
                slot: 'guide',
                className: 'guide-hero-img',
                alt: dev.name,
                loading: 'lazy'
              })}
              ${shot.identity === 'shared' ? '<span class="portrait-stand-in">同系列示意</span>' : ''}
            </span>
            <div>
              <div style="font-weight:700; font-size:16px; color:var(--ms-text-primary);">${dev.name}</div>
              <div style="font-size:12px; color:var(--ms-text-tertiary); margin:2px 0 6px;">${dev.nameEn} · ${dev.generation}</div>
              <div style="font-weight:800; font-size:15px; color:var(--ms-accent);">${priceLabel}</div>
            </div>
          </div>

          <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:12px;">
            ${ComparisonEngine.renderStatusBadge(dev.status)}
            <span class="spec-badge" style="background:var(--ms-accent-subtle); color:var(--ms-accent); border:1px solid var(--ms-accent-border);">
              ${specOf('cpuModel') || '处理器待核验'}
            </span>
            ${specOf('npuTops') && specOf('npuTops') !== '—' ? `<span class="spec-badge">NPU ${specOf('npuTops')}</span>` : ''}
          </div>

          <div class="device-audience">推荐人群：${audience}</div>
          <div class="guide-feature-box reasons">
            <div style="font-weight:700; margin-bottom:4px;">亮点</div>
            <ul style="margin:0; padding-left:18px;">${points}</ul>
          </div>
          ${caveat ? `
            <div class="guide-feature-box warnings">
              <div style="font-weight:700; margin-bottom:4px;">选之前看清楚</div>
              <div>${caveat}</div>
            </div>
          ` : ''}

          <div style="display:flex; gap:8px; margin-top:auto; padding-top:10px;">
            <button class="fluent-btn-sm" style="flex:1;" onclick="ComparisonEngine.addDevice('${dev.id}')" title="加入对比台同屏比对">
              + 加入对比
            </button>
            <a href="#/surface/${dev.categoryId}/${dev.id}" class="fluent-btn-sm" style="flex:1; text-align:center; text-decoration:none;" title="查看单机全量规格">
              全量规格 ↗
            </a>
            ${specOf('officialDocUrl') ? `
              <a href="${specOf('officialDocUrl')}" target="_blank" rel="noopener noreferrer" class="fluent-btn-sm primary" style="flex:1; text-align:center; text-decoration:none;" title="直达微软官方页面">
                官网 ↗
              </a>
            ` : ''}
          </div>
        </div>
      `;
    };

    return `
      <div class="guide-container">
        <!-- 顶部智能联动控制面板 -->
        <div class="guide-panel">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px;">
            <div>
              <h2 style="font-size:18px; font-weight:700; color:var(--ms-text-primary); margin-bottom:4px;">🎯 场景化智能选型向导 (Surface Smart Guide)</h2>
              <p style="font-size:13px; color:var(--ms-text-secondary);">按场景与形态查找设备，数值筛选只使用已绑定来源的限定参数。请核对地区与具体配置。</p>
            </div>
            <button class="fluent-btn-sm" onclick="ToolsEngine.guideBudget='all'; ToolsEngine.guideScene='commute'; ToolsEngine.guideForm='all'; ToolsEngine.guideArch='all'; document.getElementById('tool-smart-guide-container').innerHTML = ToolsEngine.renderSmartGuide();">
              重置条件 ↺
            </button>
          </div>

          <!-- 1. 核心使用场景 -->
          <div class="guide-filter-row">
            <div class="guide-filter-label">📌 核心使用场景：</div>
            <div class="guide-filter-pills">
              ${scenes.map(s => `
                <button class="guide-pill-btn ${this.guideScene === s.id ? 'active' : ''}" onclick="ToolsEngine.onGuideFilterChange('scene', '${s.id}')">
                  ${s.label}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- 2. 预算区间 -->
          <div class="guide-filter-row">
            <div class="guide-filter-label">💰 预算范围：</div>
            <div class="guide-filter-pills">
              ${budgets.map(b => `
                <button class="guide-pill-btn ${this.guideBudget === b.id ? 'active' : ''}" onclick="ToolsEngine.onGuideFilterChange('budget', '${b.id}')">
                  ${b.label}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- 3. 形态与芯片 -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:8px;">
            <div class="guide-filter-row">
              <div class="guide-filter-label">📐 产品形态：</div>
              <div class="guide-filter-pills">
                ${forms.map(f => `
                  <button class="guide-pill-btn ${this.guideForm === f.id ? 'active' : ''}" onclick="ToolsEngine.onGuideFilterChange('form', '${f.id}')">
                    ${f.label}
                  </button>
                `).join('')}
              </div>
            </div>

            <div class="guide-filter-row">
              <div class="guide-filter-label">⚡ 芯片与架构偏好：</div>
              <div class="guide-filter-pills">
                ${archs.map(a => `
                  <button class="guide-pill-btn ${this.guideArch === a.id ? 'active' : ''}" onclick="ToolsEngine.onGuideFilterChange('arch', '${a.id}')">
                    ${a.label}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <p role="status" aria-live="polite" style="margin:12px 0 0; font-size:13px; color:var(--ms-text-secondary);">${rule.title}。符合条件 ${matches.length} 款，按已核对参数筛选；未知值不参与数值计算。</p>
        ${emptyNote ? `<p style="margin:12px 0 0; font-size:13px; color:var(--ms-text-secondary);">${emptyNote}</p>` : ''}

        <!-- 推荐结果卡片区 -->
        <div class="guide-results-grid">
          ${renderCard(best, 'gold', '场景最佳首选')}
          ${renderCard(alt, 'green', '高性价比/均衡备选')}
          ${(rest || []).map(dev => renderCard(dev, 'green', '同场景还可看')).join('')}
        </div>
      </div>
    `;
  },

  // ========================================================
  // 5. 🎒 差旅背包综合负重与外勤测算器
  // ========================================================
  weightDeviceId: 'pro-11-13',
  weightCharger: 'gan_65w',
  weightWithKeyboard: true,
  weightWithPen: true,
  weightWithMouse: true,

  onWeightOptionChange(opt, val) {
    if (opt === 'device') this.weightDeviceId = val;
    if (opt === 'charger') this.weightCharger = val;
    if (opt === 'keyboard') this.weightWithKeyboard = val;
    if (opt === 'pen') this.weightWithPen = val;
    if (opt === 'mouse') this.weightWithMouse = val;

    const container = document.getElementById('tool-weight-calc-container');
    if (container) container.innerHTML = this.renderWeightCalculator();
  },

  renderWeightCalculator() {
    const devices = Catalog.listDevices();
    const currentDev = Catalog.getDevice(this.weightDeviceId) || devices[0];

    const bodyWeight = this.parseMass(this.spec(currentDev, 'weight'));
    // 未指定配件型号、线材和适用配置时，不虚构重量或充电兼容性。
    const kbWeight = this.weightWithKeyboard && ['pro', 'go'].includes(currentDev.categoryId) ? null : 0;
    const chargerWeight = this.weightCharger === 'none' ? 0 : null;
    const chargerName = '请按具体充电器型号、线材和设备配置核对';
    const penWeight = this.weightWithPen ? null : 0;
    const mouseWeight = this.weightWithMouse ? null : 0;
    const parts = [bodyWeight, kbWeight, chargerWeight, penWeight, mouseWeight];
    const total = this.sumMass(parts);
    const totalWeightG = total === null ? '待确认配置' : total;
    const totalWeightKg = total === null ? '—' : (total / 1000).toFixed(2);
    const realOfficeHours = '暂无该配置办公实测，不由视频续航换算';
    const claimedBatteryLabel = this.spec(currentDev, 'batteryLifeOffice') || this.spec(currentDev, 'batteryLifeVideo') || '待核验';
    const tier = total === null ? '配件或机身重量待核验，无法计算总重' : '所选已知重量合计';
    const tierColor = 'var(--ms-text-secondary)';

    return `
      <div class="guide-container">
        <div class="guide-panel">
          <h2 style="font-size:18px; font-weight:700; color:var(--ms-text-primary); margin-bottom:4px;">🎒 差旅背包综合负重与外勤测算器 (Mobility Calculator)</h2>
          <p style="font-size:13px; color:var(--ms-text-secondary); margin-bottom:16px;">
            买电脑不能只看裸机净重！结合键盘盖、充电器、鼠标与触控笔，仅在机身与配件配置重量均明确时计算合计；办公续航需独立实测。
          </p>

          <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
            <span style="font-size:13px; font-weight:600;">选择主力机型：</span>
            <select class="fluent-btn" style="padding:6px 12px; font-size:13px; cursor:pointer;" onchange="ToolsEngine.onWeightOptionChange('device', this.value)">
              ${devices.map(d => `
                <option value="${d.id}" ${d.id === currentDev.id ? 'selected' : ''}>${d.name} (${this.spec(d, 'weight') || '重量待核验'})</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="weight-dashboard">
          <!-- 左侧：配件搭配勾选清单 -->
          <div class="guide-panel" style="display:flex; flex-direction:column; gap:12px;">
            <div style="font-weight:700; font-size:14px; margin-bottom:4px;">📦 随行外设搭配方案：</div>

            <div class="weight-item-row">
              <div>
                <div style="font-weight:600;">Surface 主机裸机净重</div>
                <div style="font-size:11px; color:var(--ms-text-tertiary);">${currentDev.name} 铝合金/镁合金一体机身</div>
              </div>
              <div style="font-weight:700; font-family:var(--ms-font-mono);">${bodyWeight === null ? '待核验' : bodyWeight} g</div>${Catalog.evidenceMarkup(currentDev, 'weight')}
            </div>

            <div class="weight-item-row">
              <label style="display:flex; align-items:center; gap:8px; cursor:pointer; flex:1;">
                <input type="checkbox" ${this.weightWithKeyboard ? 'checked' : ''} onchange="ToolsEngine.onWeightOptionChange('keyboard', this.checked)">
                <div>
                  <div style="font-weight:600;">键盘盖 / 保护壳</div>
                  <div style="font-size:11px; color:var(--ms-text-tertiary);">${currentDev.categoryId === 'pro' ? '特制版专业键盘盖 / Flex 键盘' : (currentDev.categoryId === 'go' ? 'Go 特制专业键盘盖' : '翻盖机身自带键盘')}</div>
                </div>
              </label>
              <div style="font-weight:700; font-family:var(--ms-font-mono);">${kbWeight === null ? '待确认配置' : kbWeight} g</div>
            </div>

            <div class="weight-item-row">
              <div style="flex:1;">
                <div style="font-weight:600; margin-bottom:4px;">电源适配器方案</div>
                <select class="fluent-btn" style="padding:4px 8px; font-size:12px;" onchange="ToolsEngine.onWeightOptionChange('charger', this.value)">
                  <option value="gan_65w" ${this.weightCharger === 'gan_65w' ? 'selected' : ''}>⚡ 第三方 65W GaN 充电器（型号、线材、兼容性待确认）</option>
                  <option value="orig_charger" ${this.weightCharger === 'orig_charger' ? 'selected' : ''}>🔌 官方原装磁吸电源+线 (${chargerWeight === null ? '待确认配置' : chargerWeight}g)</option>
                  <option value="none" ${this.weightCharger === 'none' ? 'selected' : ''}>❌ 不带充电器 (仅靠机身电池外勤)</option>
                </select>
              </div>
              <div style="font-weight:700; font-family:var(--ms-font-mono);">${chargerWeight === null ? '待确认配置' : chargerWeight} g</div>
            </div>

            <div class="weight-item-row">
              <label style="display:flex; align-items:center; gap:8px; cursor:pointer; flex:1;">
                <input type="checkbox" ${this.weightWithPen ? 'checked' : ''} onchange="ToolsEngine.onWeightOptionChange('pen', this.checked)">
                <div>
                  <div style="font-weight:600;">携带触控笔（型号待确认）</div>
                  <div style="font-size:11px; color:var(--ms-text-tertiary);">型号、主机兼容性与充电方式须单独确认</div>
                </div>
              </label>
              <div style="font-weight:700; font-family:var(--ms-font-mono);">${penWeight === null ? '待确认配置' : penWeight} g</div>
            </div>

            <div class="weight-item-row">
              <label style="display:flex; align-items:center; gap:8px; cursor:pointer; flex:1;">
                <input type="checkbox" ${this.weightWithMouse ? 'checked' : ''} onchange="ToolsEngine.onWeightOptionChange('mouse', this.checked)">
                <div>
                  <div style="font-weight:600;">携带鼠标（型号待确认）</div>
                  <div style="font-size:11px; color:var(--ms-text-tertiary);">须确认具体型号及包含电池的重量</div>
                </div>
              </label>
              <div style="font-weight:700; font-family:var(--ms-font-mono);">${mouseWeight === null ? '待确认配置' : mouseWeight} g</div>
            </div>
          </div>

          <!-- 右侧：测算结果大仪表卡 -->
          <div class="weight-meter-card">
            <div style="font-size:13px; font-weight:700; color:var(--ms-text-secondary); text-transform:uppercase; letter-spacing:0.5px;">背包差旅整套装机总重量</div>
            <div class="weight-big-num">${totalWeightG} <span style="font-size:20px; font-weight:600;">g</span></div>
            <div style="font-size:14px; font-weight:700; color:var(--ms-text-primary); margin-bottom:14px;">约合 ${totalWeightKg} 千克 (kg)</div>

            <div style="background:var(--ms-bg-card-secondary); padding:10px 16px; border-radius:var(--ms-radius-full); font-size:12.5px; font-weight:700; color:${tierColor}; margin-bottom:16px; border:1px solid var(--ms-border-subtle);">
              ${tier}
            </div>

            <div style="width:100%; border-top:1px solid var(--ms-border-subtle); padding-top:16px; text-align:left; font-size:12.5px; line-height:1.7;">
              <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <span style="color:var(--ms-text-secondary);">官方续航依据：</span>
                <span style="font-weight:700;">${claimedBatteryLabel}</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <span style="color:var(--ms-text-secondary);">办公实测状态：</span>
                <span style="font-weight:700; color:#107c41;">${realOfficeHours}</span>
              </div>
              <div style="font-size:11.5px; color:var(--ms-text-tertiary); background:rgba(0,120,212,0.05); padding:8px 12px; border-radius:6px; ">
                请核对配件具体型号、重量及设备所需功率；未确认的配件不会被计为零克。
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ========================================================
  // 6. ⚖️ 跨代升级价值评估透视镜 (Upgrade Advisor)
  // ========================================================
  upgradeOldId: 'pro-7',
  upgradeNewId: 'pro-11-13',

  onUpgradeSelect(type, id) {
    if (type === 'old') this.upgradeOldId = id;
    if (type === 'new') this.upgradeNewId = id;

    const container = document.getElementById('tool-upgrade-advisor-container');
    if (container) container.innerHTML = this.renderUpgradeAdvisor();
  },

  renderUpgradeAdvisor() {
    const devices = Catalog.listDevices();
    const oldDev = Catalog.getDevice(this.upgradeOldId) || devices.find(d => d.id === 'pro-7') || devices[0];
    const newDev = Catalog.getDevice(this.upgradeNewId) || devices.find(d => d.id === 'pro-11-13') || devices[1];

    const oldOf = (key) => Catalog.presentSpec(this.spec(oldDev, key));
    const newOf = (key) => Catalog.presentSpec(this.spec(newDev, key));

    return `
      <div class="guide-container">
        <div class="guide-panel">
          <h2 style="font-size:18px; font-weight:700; color:var(--ms-text-primary); margin-bottom:4px;">⚖️ 跨代升级价值评估透视镜 (Upgrade Advisor)</h2>
          <p style="font-size:13px; color:var(--ms-text-secondary); margin-bottom:16px;">
            犹豫手上的老机器要不要换？对比两代硬件的算力跃迁、屏幕刷新率、接口与续航升级幅度，给出最务实的换机评级。
          </p>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
            <div>
              <div style="font-size:12.5px; font-weight:700; margin-bottom:6px;">👴 您手头正持有的老机型：</div>
              <select class="fluent-btn" style="width:100%; padding:8px 12px; font-size:13px;" onchange="ToolsEngine.onUpgradeSelect('old', this.value)">
                ${devices.map(d => `
                  <option value="${d.id}" ${d.id === oldDev.id ? 'selected' : ''}>${d.name} (${d.generation})</option>
                `).join('')}
              </select>
            </div>

            <div>
              <div style="font-size:12.5px; font-weight:700; margin-bottom:6px;">🚀 您正在考虑换购的新旗舰：</div>
              <select class="fluent-btn" style="width:100%; padding:8px 12px; font-size:13px;" onchange="ToolsEngine.onUpgradeSelect('new', this.value)">
                ${devices.map(d => `
                  <option value="${d.id}" ${d.id === newDev.id ? 'selected' : ''}>${d.name} (${d.generation})</option>
                `).join('')}
              </select>
            </div>
          </div>
        </div>

        <div class="guide-panel" style="margin-top:16px; margin-bottom:16px;">
          <div style="font-size:16px; font-weight:700; color:var(--ms-accent);">性能与算力跃迁</div>
          <div style="font-size:13px; color:var(--ms-text-secondary); margin-top:4px;">
            以下只展示已绑定当前值的限定来源参数；未核验项保留未知，不能据此推断升级优势。
          </div>
        </div>

        <!-- 关键代际硬件指标对比大表 -->
        <table class="compat-matrix-table" style="background:var(--ms-bg-card);">
          <thead>
            <tr>
              <th style="width:200px; text-align:left;">对比维度</th>
              <th style="width:280px;">原设备：${oldDev.name}</th>
              <th style="width:280px; background:rgba(0,120,212,0.08); color:var(--ms-accent);">目标设备：${newDev.name}</th>
              <th style="text-align:left;">提升幅度与核心体验感知</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="compat-device-label">核心芯片与制程</td>
              <td>${oldOf('cpuModel') || '—'}</td>
              <td style="font-weight:700; color:var(--ms-accent);">${newOf('cpuModel') || '—'}</td>
              <td style="text-align:left; color:#107c41; font-weight:600;">⚡ 以两台设备的官方处理器型号为依据，具体性能差异需结合实际工作负载判断</td>
            </tr>
            <tr>
              <td class="compat-device-label">端侧 AI / NPU 算力</td>
              <td>${oldOf('npuTops') && oldOf('npuTops') !== '—' ? oldOf('npuTops') : '待核验'}</td>
              <td style="font-weight:700; color:var(--ms-accent);">${newOf('npuTops') && newOf('npuTops') !== '—' ? `${newOf('npuTops')}` : '待核验'}</td>
              <td style="text-align:left; color:#107c41; font-weight:600;">🤖 仅在目标设备官方参数明确提供 NPU / Copilot+ 信息时作出判断</td>
            </tr>
            <tr>
              <td class="compat-device-label">屏幕素质与刷新率</td>
              <td>${oldOf('refreshRate') || '待核验'} · ${oldOf('screenSize') || '—'}</td>
              <td style="font-weight:700; color:var(--ms-accent);">${newOf('refreshRate') || '待核验'} · ${newOf('screenSize') || '—'}</td>
              <td style="text-align:left; color:#107c41; font-weight:600;">👁️ 依据两台设备实际刷新率和屏幕规格比较</td>
            </tr>
            <tr>
              <td class="compat-device-label">外勤续航时间</td>
              <td>${oldOf('batteryLifeOffice') || oldOf('batteryLifeVideo') || '待核验'}</td>
              <td style="font-weight:700; color:var(--ms-accent);">${newOf('batteryLifeOffice') || newOf('batteryLifeVideo') || '待核验'}</td>
              <td style="text-align:left; color:#107c41; font-weight:600;">🔋 按官方续航口径比较，实际表现会受设置和使用方式影响</td>
            </tr>
            <tr>
              <td class="compat-device-label">外设与手写笔震动</td>
              <td>${oldOf('penHapticFeedback') || '待核验'}</td>
              <td style="font-weight:700; color:var(--ms-accent);">${newOf('penHapticFeedback') || '待核验'}</td>
              <td style="text-align:left; color:#107c41; font-weight:600;">${oldDev.id === newDev.id ? '同一设备，无升级差异' : '须结合具体触控笔、主机与应用兼容性核对'}</td>
            </tr>
          </tbody>
        </table>

        <div class="guide-panel" style=" background:rgba(16,124,65,0.04);">
          <div style="font-size:16px; font-weight:700; color:#107c41; margin-bottom:6px;">升级价值与置换建议</div>
          <div style="font-size:13px; color:var(--ms-text-secondary); line-height:1.6;">
            从 <strong>${oldDev.name}</strong> 升级到 <strong>${newDev.name}</strong> 的价值，应根据上方已核实的处理器、NPU、屏幕、接口和续航差异，以及你的实际工作负载判断；表中未披露项目不会被当作升级卖点。
          </div>
        </div>
      </div>
    `;
  },

  // ========================================================
  // 7. 🛠️ 可拆卸 SSD 升级与系统安装迁移终极指南 (Storage Guide)
  // ========================================================
  storageTab: 'clone', // 'clone' | 'recovery' | 'generic'

  onStorageTabChange(tab) {
    this.storageTab = tab;
    const container = document.getElementById('tool-storage-guide-container');
    if (container) container.innerHTML = this.renderStorageGuide();
  },

  renderStorageGuide() {
    return `<div class="guide-container"><div class="savings-banner"><h2>SSD 与系统恢复指南</h2></div>
      <div class="guide-panel"><p>可拆卸不等于用户可以自行更换。接口、尺寸、容量和维修资格须按具体机型官方维修说明核对。</p>
      <p>操作前验证独立备份可恢复，并保存 BitLocker 恢复密钥。克隆、分区调整及恢复操作均可能丢失数据，本站不作无损保证。</p>
      <p>不要照搬其他机型的启动按键、关闭安全启动或解密设置。企业设备应联系管理员。</p>
      <p><a href="https://support.microsoft.com/zh-cn/surface" target="_blank" rel="noopener noreferrer">微软 Surface 支持：选择自己的机型后查阅维修与恢复说明</a></p></div></div>`;
  }
};

if (typeof window !== 'undefined') {
  window.ToolsEngine = ToolsEngine;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ToolsEngine;
}
