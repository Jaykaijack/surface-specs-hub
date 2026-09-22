/**
 * Microsoft Surface Specs Hub - Auxiliary Tools Engine
 * 3:2 屏幕对比器、芯片与 NPU 天梯榜、双向配件兼容性查询系统
 */

const ToolsEngine = {
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
    const excelRowsGain = Math.round(heightDiffPercent * 1.15);

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
                <div class="metric-val">+${excelRowsGain}%</div>
                <div class="metric-label">网页/Excel多显行数</div>
              </div>
            </div>

            <div style="font-size:12.5px; line-height:1.55; color:var(--ms-text-secondary); background:var(--ms-bg-card-secondary); padding:12px; border-radius:var(--ms-radius-md); border-left:3px solid var(--ms-accent);">
              <strong>💡 直播培训核心论点：</strong> 同为 ${diag.toFixed(1)} 英寸，Surface 的 3:2 屏幕纵向高度足足高出了 <strong>${(h32_cm - hComp_cm).toFixed(1)} 厘米</strong>！看财报表格和Word文档少滑滚动条，这才是专为严肃办公定制的“黄金长宽比”！
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

  // 2. 渲染微软定制芯片架构与 NPU AI 算力天梯图
  renderChipLadder() {
    let chips = [...SURFACE_DATA.chips];
    if (this.chipFilter === 'arm') chips = chips.filter(c => c.architecture.includes('ARM'));
    else if (this.chipFilter === 'x86') chips = chips.filter(c => c.architecture.includes('x86'));
    else if (this.chipFilter === 'copilot') chips = chips.filter(c => c.copilotPlus);

    chips.sort((a, b) => b.npuTops - a.npuTops);
    const maxTops = 80;

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
            全面解析 Surface 搭载的高通骁龙 X 平台、微软 SQ 系列以及 Intel / AMD 处理器的 CPU 架构、GPU 浮点与 NPU 硬件算力。
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
      const npuTops = Number(chip.npuTops) || 0;
      const fillPercent = Math.max(3, (npuTops / maxTops) * 100);
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
            <span class="chip-meta">${chip.vendor || '芯片'} · ${chip.processNode || chip.process || '先进制程'}</span>
          </div>

          <div class="chip-bar-track">
            <div class="chip-baseline-marker" style="left:50%;" title="Copilot+ PC 官方 40 TOPS 准入门槛"></div>
            <div class="${barClass}" style="width:${fillPercent}%;"></div>
          </div>

          <div class="chip-score-cell">
            ${npuTops > 0 ? `${npuTops} <span style="font-size:11px; font-weight:normal;">TOPS</span>` : '<span style="font-size:11px; color:var(--ms-text-tertiary);">无独立NPU</span>'}
          </div>
        </div>

        <div style="font-size:12px; color:var(--ms-text-secondary); margin:-6px 0 14px 14px; padding-left:12px; border-left:2px solid var(--ms-border-subtle); line-height:1.5;">
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
              ${flagshipCols.map(col => `
                <th>${col.name}<br><span style="font-size:10.5px; font-weight:normal; color:var(--ms-text-tertiary);">${col.sub}</span></th>
              `).join('')}
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

        <div style="background:var(--ms-bg-card-secondary); padding:16px; border-radius:var(--ms-radius-md); border-left:3px solid var(--ms-accent);">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
            <span style="font-size:20px;">${acc.icon || '📦'}</span>
            <span style="font-weight:700; font-size:16px;">${acc.name}</span>
            <span class="spec-badge" style="background:var(--ms-accent-subtle); color:var(--ms-accent); border:1px solid var(--ms-accent-border); font-size:11px;">
              ${acc.categoryName || acc.category}
            </span>
          </div>
          <div style="font-size:13px; color:var(--ms-text-secondary); margin-bottom:10px; line-height:1.5;">${acc.tagline}</div>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            ${(acc.features || []).map(f => `<span class="spec-badge">${f}</span>`).join('')}
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
                  <td>${this.formatBadgeByStatus(item.status)}</td>
                  <td style="text-align:left; color:var(--ms-text-secondary); font-size:12.5px;">${item.note}</td>
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

        <div style="background:var(--ms-bg-card-secondary); padding:16px; border-radius:var(--ms-radius-md); border-left:3px solid var(--ms-accent);">
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
                    const match = (acc.compatibilityList || []).find(c => c.deviceId === dev.id);
                    const status = match ? match.status : 'UNSUPPORTED';
                    const note = match ? match.note : '官方白皮书暂未列入适配名单';
                    return `
                      <tr>
                        <td class="compat-device-label">
                          ${acc.icon ? acc.icon + ' ' : ''}${acc.name}
                          <div style="font-size:11px; color:var(--ms-text-tertiary); font-weight:normal;">${acc.categoryName}</div>
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
    return (acc.compatibilityList || []).find(c => c.deviceId === devId) || { status: 'UNSUPPORTED', note: '不支持' };
  },

  formatStatusObj(obj) {
    if (!obj) return '<span style="color:var(--ms-text-tertiary);">—</span>';
    return `
      <div>${this.formatBadgeByStatus(obj.status)}</div>
      <div style="font-size:11px; color:var(--ms-text-tertiary); margin-top:3px;">${obj.note}</div>
    `;
  },

  formatBadgeByStatus(status) {
    if (status === 'FULL') return '<span class="compat-status-yes">✓ 完美支持</span>';
    if (status === 'PARTIAL') return '<span class="compat-status-partial">● 部分支持</span>';
    return '<span class="compat-status-no">✕ 不支持</span>';
  }
};

if (typeof window !== 'undefined') {
  window.ToolsEngine = ToolsEngine;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ToolsEngine;
}
