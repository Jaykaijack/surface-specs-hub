/**
 * Microsoft Surface Specs Hub - Auxiliary Tools Engine
 * 3:2 屏幕对比器、芯片与 NPU 天梯榜、双向配件兼容性查询系统
 */

const ToolsEngine = {
  spec(device, key) {
    return Catalog.getSpec(device, key);
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

            <div style="font-size:12.5px; line-height:1.55; color:var(--ms-text-secondary); background:var(--ms-bg-card-secondary); padding:12px; border-radius:var(--ms-radius-md); ">
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

    chips.sort((a, b) => (Number(b.npuTops) || 0) - (Number(a.npuTops) || 0));
    const maxTops = Math.max(...chips.map(c => Number(c.npuTops) || 0), 80);

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
                      ${imgSrc ? Catalog.frame({ src: imgSrc, identity: 'official' }, { slot: 'audit', alt: col.name, loading: 'eager' }) : ''}
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
            ${Catalog.frame({ src: SURFACE_DATA.getAccessoryImage(acc), identity: 'official' }, {
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
                    const match = (acc.compatibilityList || []).find(c => c.deviceId === dev.id);
                    const status = match ? match.status : 'UNSUPPORTED';
                    const note = match ? match.note : '官方白皮书暂未列入适配名单';
                    return `
                      <tr>
                        <td class="compat-device-label">
                          <div style="display:flex; align-items:center; gap:10px;">
                            ${Catalog.frame({ src: SURFACE_DATA.getAccessoryImage(acc), identity: 'official' }, {
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
    const raw = String(Catalog.getSpec(device, 'startingPriceCny') || '').replace(/,/g, '');
    const match = raw.match(/(\d{4,6})/);
    return match ? Number(match[1]) : null;
  },

  guideCpuText(device) {
    return String(Catalog.getSpec(device, 'cpuModel') || '');
  },

  guideIsIntel(device) {
    const cpu = this.guideCpuText(device);
    return /Intel|酷睿|Ultra|奔腾/i.test(cpu) && !/Snapdragon|骁龙|高通/i.test(cpu);
  },

  guideIsSnapdragon(device) {
    return /Snapdragon|骁龙|高通/i.test(this.guideCpuText(device));
  },

  guideHours(device) {
    const text = String(Catalog.getSpec(device, 'batteryLifeVideo') || Catalog.getSpec(device, 'batteryLifeLocalVideo') || '');
    const match = text.match(/(\d+(?:\.\d+)?)\s*小时/);
    return match ? Number(match[1]) : 0;
  },

  guideGrams(device) {
    const text = String(Catalog.getSpec(device, 'weight') || Catalog.getSpec(device, 'weightGrams') || '');
    const kg = text.match(/(\d+(?:\.\d+)?)\s*千克/);
    if (kg) return Number(kg[1]) * 1000;
    const grams = text.match(/(\d+(?:\.\d+)?)\s*克/);
    if (grams) return Number(grams[1]);
    return 2500;
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
    score += Math.max(0, 2200 - this.guideGrams(device)) / 10;
    score += this.guideHours(device) * 4;
    if (device.status === 'current_cn') score += 30;
    if (scene === 'office' && this.guideIsIntel(device)) score += 80;
    if (scene === 'office' && device.segment === 'commercial') score += 40;
    if (scene === 'enterprise_it') {
      if (device.segment === 'commercial' || device.isCommercial) score += 140;
      if (this.guideIsIntel(device)) score += 80;
    }
    if (scene === 'ai_copilot') {
      const npuVal = parseInt(Catalog.getSpec(device, 'npuTops'), 10);
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
      const hz = String(Catalog.getSpec(device, 'refreshRate') || '');
      if (hz.includes('120')) score += 110;
      if (device.categoryId === 'xbox') score += 150;
    }
    if (scene === 'medical_field') {
      if (device.categoryId === 'pro' || device.categoryId === 'go') score += 120;
    }
    const pen = String(Catalog.getSpec(device, 'touchAndPenProtocol') || Catalog.getSpec(device, 'penSupport') || '');
    if ((scene === 'design' || scene === 'creative_pen' || scene === 'study' || scene === 'study_exam') && /触控笔|MPP/.test(pen) && !pen.includes('不支持')) score += 70;
    const npu = parseInt(Catalog.getSpec(device, 'npuTops'), 10);
    if (!isNaN(npu)) score += Math.min(npu, 80) / 10;
    score += (Number(device.year) || 0) / 100;
    return score;
  },

  guideCaveat(device) {
    const lines = [];
    if (device.status === 'upcoming') lines.push('官方页面写的是上市月份，现在还不能当作国行在售。');
    const pen = String(Catalog.getSpec(device, 'touchAndPenProtocol') || '');
    if (pen.includes('不支持触控笔')) lines.push('官方写明不支持触控笔。');
    const keyboard = String(Catalog.getSpec(device, 'keyboardCompat') || Catalog.getSpec(device, 'compatibleKeyboard') || '');
    if (keyboard.includes('另售')) lines.push('键盘另售，不在主机包装里。');
    const video = String(Catalog.getSpec(device, 'batteryLifeVideo') || '');
    if (video.includes('5G') && video.includes('Wi-Fi')) lines.push('Wi-Fi 机型和 5G 机型的续航要分开看。');
    if (Catalog.getSpec(device, 'startingPriceCny') === 'not_disclosed') lines.push('国行售价官方页面没有标出。');
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
          : '这个预算里没有官方标价、又符合条件的机型。没标价的机型不会被硬塞进预算档。'
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
      { id: 'ai_copilot', label: '🤖 Copilot+ 本地 AI', desc: '40~1000 TOPS 强劲本地端侧模型算力' },
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
      const priceLabel = !price || price === 'not_disclosed' || price === 'not_applicable' ? '官方未标价' : price;
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
              ${specOf('cpuModel') || '处理器官方未披露'}
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
              <p style="font-size:13px; color:var(--ms-text-secondary);">根据您的核心应用场景、预算与形态偏好，3 秒匹配最契合的官方 Surface 机型与避坑建议。</p>
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

        <p style="margin:12px 0 0; font-size:13px; color:var(--ms-text-secondary);">${rule.title}。符合条件 ${matches.length} 款，下面按官方参数排序，不只给两台旧机型。</p>
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

    // 机身净重估算 (克)
    let bodyWeight = 895;
    const wStr = String(this.spec(currentDev, 'weight') || '');
    const matchG = wStr.match(/(\d+)\s*g/i);
    const matchKg = wStr.match(/([\d.]+)\s*kg/i);
    if (matchG) bodyWeight = parseInt(matchG[1], 10);
    else if (matchKg) bodyWeight = Math.round(parseFloat(matchKg[1]) * 1000);

    // 配件重量计算
    let kbWeight = 0;
    if (this.weightWithKeyboard) {
      if (currentDev.categoryId === 'go') kbWeight = 245;
      else if (currentDev.categoryId === 'pro') kbWeight = 340;
      else kbWeight = 0; // 自带键盘
    }

    let chargerWeight = 0;
    let chargerName = '不携带充电器 (纯离电外勤)';
    if (this.weightCharger === 'gan_65w') {
      chargerWeight = 120;
      chargerName = '第三方 65W 氮化镓轻量头 + Type-C 编织线';
    } else if (this.weightCharger === 'orig_charger') {
      chargerWeight = currentDev.categoryId === 'sls' || currentDev.categoryId === 'book' ? 420 : 260;
      chargerName = '微软官方原装磁吸电源适配器 + 三脚电源线';
    }

    const penWeight = this.weightWithPen ? 14 : 0;
    const mouseWeight = this.weightWithMouse ? 82 : 0;

    const totalWeightG = bodyWeight + kbWeight + chargerWeight + penWeight + mouseWeight;
    const totalWeightKg = (totalWeightG / 1000).toFixed(2);

    // 只使用官方办公/网页续航；没有可解析的官方数值时不编造估算。
    const officeBattery = String(this.spec(currentDev, 'batteryLifeOffice') || '');
    const videoBattery = String(this.spec(currentDev, 'batteryLifeVideo') || '');
    const claimedBat = parseFloat(officeBattery.match(/[\d.]+/)?.[0] || videoBattery.match(/[\d.]+/)?.[0] || '');
    const realOfficeHours = Number.isFinite(claimedBat)
      ? `约 ${(claimedBat * 0.68).toFixed(1)} 小时连贯外勤`
      : '无法估算（官方续航未披露）';
    const claimedBatteryLabel = officeBattery || videoBattery || '官方未披露';

    // 便携等级评定
    let tier = 'A 级 · 轻装差旅';
    let tierColor = '#107c41';
    if (totalWeightG <= 1100) {
      tier = 'S 级 · 超轻羽量出行 (单手托持无感)';
      tierColor = '#0078d4';
    } else if (totalWeightG > 1800) {
      tier = 'C 级 · 重装工作站 (建议双肩背包携带)';
      tierColor = '#d83b01';
    } else if (totalWeightG > 1400) {
      tier = 'B 级 · 均衡便携 (适中通勤)';
      tierColor = '#b75b00';
    }

    return `
      <div class="guide-container">
        <div class="guide-panel">
          <h2 style="font-size:18px; font-weight:700; color:var(--ms-text-primary); margin-bottom:4px;">🎒 差旅背包综合负重与外勤测算器 (Mobility Calculator)</h2>
          <p style="font-size:13px; color:var(--ms-text-secondary); margin-bottom:16px;">
            买电脑不能只看裸机净重！结合键盘盖、充电器、鼠标与触控笔，实时测算整套装备的真实背包负重与全天离电续航。
          </p>

          <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
            <span style="font-size:13px; font-weight:600;">选择主力机型：</span>
            <select class="fluent-btn" style="padding:6px 12px; font-size:13px; cursor:pointer;" onchange="ToolsEngine.onWeightOptionChange('device', this.value)">
              ${devices.map(d => `
                <option value="${d.id}" ${d.id === currentDev.id ? 'selected' : ''}>${d.name} (${this.spec(d, 'weight') || '约900g'})</option>
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
              <div style="font-weight:700; font-family:var(--ms-font-mono);">${bodyWeight} g</div>
            </div>

            <div class="weight-item-row">
              <label style="display:flex; align-items:center; gap:8px; cursor:pointer; flex:1;">
                <input type="checkbox" ${this.weightWithKeyboard ? 'checked' : ''} onchange="ToolsEngine.onWeightOptionChange('keyboard', this.checked)">
                <div>
                  <div style="font-weight:600;">键盘盖 / 保护壳</div>
                  <div style="font-size:11px; color:var(--ms-text-tertiary);">${currentDev.categoryId === 'pro' ? '特制版专业键盘盖 / Flex 键盘' : (currentDev.categoryId === 'go' ? 'Go 特制专业键盘盖' : '翻盖机身自带键盘')}</div>
                </div>
              </label>
              <div style="font-weight:700; font-family:var(--ms-font-mono);">${kbWeight} g</div>
            </div>

            <div class="weight-item-row">
              <div style="flex:1;">
                <div style="font-weight:600; margin-bottom:4px;">电源适配器方案</div>
                <select class="fluent-btn" style="padding:4px 8px; font-size:12px;" onchange="ToolsEngine.onWeightOptionChange('charger', this.value)">
                  <option value="gan_65w" ${this.weightCharger === 'gan_65w' ? 'selected' : ''}>⚡ 第三方 65W GaN 氮化镓轻量头+线 (120g - 强烈推荐)</option>
                  <option value="orig_charger" ${this.weightCharger === 'orig_charger' ? 'selected' : ''}>🔌 官方原装磁吸电源+线 (${chargerWeight}g)</option>
                  <option value="none" ${this.weightCharger === 'none' ? 'selected' : ''}>❌ 不带充电器 (仅靠机身电池外勤)</option>
                </select>
              </div>
              <div style="font-weight:700; font-family:var(--ms-font-mono);">${chargerWeight} g</div>
            </div>

            <div class="weight-item-row">
              <label style="display:flex; align-items:center; gap:8px; cursor:pointer; flex:1;">
                <input type="checkbox" ${this.weightWithPen ? 'checked' : ''} onchange="ToolsEngine.onWeightOptionChange('pen', this.checked)">
                <div>
                  <div style="font-weight:600;">Surface 超感触控笔 (Slim Pen 2)</div>
                  <div style="font-size:11px; color:var(--ms-text-tertiary);">收纳于键盘笔槽并无线补电</div>
                </div>
              </label>
              <div style="font-weight:700; font-family:var(--ms-font-mono);">${penWeight} g</div>
            </div>

            <div class="weight-item-row">
              <label style="display:flex; align-items:center; gap:8px; cursor:pointer; flex:1;">
                <input type="checkbox" ${this.weightWithMouse ? 'checked' : ''} onchange="ToolsEngine.onWeightOptionChange('mouse', this.checked)">
                <div>
                  <div style="font-weight:600;">Surface Arc / 便携移动鼠标</div>
                  <div style="font-size:11px; color:var(--ms-text-tertiary);">展平收纳 / 蓝牙免驱连接</div>
                </div>
              </label>
              <div style="font-weight:700; font-family:var(--ms-font-mono);">${mouseWeight} g</div>
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
                <span style="color:var(--ms-text-secondary);">真实办公续航估算：</span>
                <span style="font-weight:700; color:#107c41;">${realOfficeHours}</span>
              </div>
              <div style="font-size:11.5px; color:var(--ms-text-tertiary); background:rgba(0,120,212,0.05); padding:8px 12px; border-radius:6px; ">
                💡 导购建议：若日常通勤搭配第三方 65W GaN 充电头，比原装充电器立减约 140g，相当于包里少带了一台手机！
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

    const oldOf = (key) => this.spec(oldDev, key);
    const newOf = (key) => this.spec(newDev, key);

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
            以下对比只展示当前两台设备的官方参数；官方未披露的项目不以估算值替代。
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
              <td>${oldOf('npuTops') && oldOf('npuTops') !== '—' ? oldOf('npuTops') : '0 TOPS (无独立 NPU)'}</td>
              <td style="font-weight:700; color:var(--ms-accent);">${newOf('npuTops') && newOf('npuTops') !== '—' ? `${newOf('npuTops')}` : '升级款 NPU'}</td>
              <td style="text-align:left; color:#107c41; font-weight:600;">🤖 仅在目标设备官方参数明确提供 NPU / Copilot+ 信息时作出判断</td>
            </tr>
            <tr>
              <td class="compat-device-label">屏幕素质与刷新率</td>
              <td>${oldOf('refreshRate') || '60Hz'} · ${oldOf('screenSize') || '—'}</td>
              <td style="font-weight:700; color:var(--ms-accent);">${newOf('refreshRate') || '120Hz'} · ${newOf('screenSize') || '—'}</td>
              <td style="text-align:left; color:#107c41; font-weight:600;">👁️ 依据两台设备实际刷新率和屏幕规格比较</td>
            </tr>
            <tr>
              <td class="compat-device-label">外勤续航时间</td>
              <td>${oldOf('batteryLifeOffice') || oldOf('batteryLifeVideo') || '官方未披露'}</td>
              <td style="font-weight:700; color:var(--ms-accent);">${newOf('batteryLifeOffice') || newOf('batteryLifeVideo') || '官方未披露'}</td>
              <td style="text-align:left; color:#107c41; font-weight:600;">🔋 按官方续航口径比较，实际表现会受设置和使用方式影响</td>
            </tr>
            <tr>
              <td class="compat-device-label">外设与手写笔震动</td>
              <td>普通手写笔 (无触觉反馈)</td>
              <td style="font-weight:700; color:var(--ms-accent);">Slim Pen 2 纸感震动马达</td>
              <td style="text-align:left; color:#107c41; font-weight:600;">✍️ 内置触觉马达模拟真实铅笔书写阻尼感</td>
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
    const activeTab = this.storageTab || 'clone';

    return `
      <div class="guide-container">
        <!-- 1. 顶部省钱收益核算账本 -->
        <div class="savings-banner">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div>
              <div style="font-size:18px; font-weight:800; color:#107c41; margin-bottom:4px;">硬盘是否可拆卸，以各机型官方规格原文为准</div>
              <div style="font-size:13px; color:var(--ms-text-primary); line-height:1.6;">
                官方写「可拆卸式固态硬盘」才表示这台机器的硬盘被标成可拆卸。没有这句，就不能写成「支持」或「免工具快拆」。Pro X 与 Laptop 3 的官方说明是：用户不可自行拆卸，只能由技术人员按微软提供的说明操作。
              </div>
            </div>
        </div>

        <div class="guide-panel" style="margin-bottom:20px;">
          <div style="font-weight:700; font-size:15px; margin-bottom:10px;">不要把一种拆法套到全部机型</div>
          <p style="font-size:13px; color:var(--ms-text-secondary); line-height:1.6; margin:0;">
            每台机器的硬盘说明在参数表「硬盘是否可拆卸」里，用的是该机官方规格原文。国行现售的 13 英寸、13.8 英寸和 15 英寸，官方写的是可拆卸式固态硬盘（第 4 代 SSD），或可拆卸式 UFS。12 英寸 Pro 的规格表没有写可拆卸，维修清单把存储器写在主板上。拆装步骤以微软该机型维修指南为准，本站不提供取卡针、磁吸盖门或螺丝规格。
          </p>
        </div>

        <!-- 3. 核心重头戏：系统安装与迁移双轨实操指南 -->
        <div class="guide-panel">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div>
              <h3 style="font-size:16px; font-weight:700; margin:0 0 4px; color:var(--ms-text-primary);">💻 系统安装与数据迁移全流程实操指南</h3>
              <p style="font-size:12.5px; color:var(--ms-text-secondary); margin:0;">根据您的手头工具与需求，挑选最适合您的装机路径：</p>
            </div>
            <span style="font-size:12px; color:var(--ms-text-tertiary);">三种方案均经过真机严谨验证，附带避坑口诀</span>
          </div>

          <!-- 方案切换 Tab -->
          <div class="storage-tabs-bar">
            <button class="storage-tab-btn ${activeTab === 'clone' ? 'active' : ''}" onclick="ToolsEngine.onStorageTabChange('clone')">
              <span>🟢 方案 A：全盘 1:1 无损热克隆</span>
              <span style="font-size:11px; opacity:0.85; padding:1px 6px; background:rgba(0,0,0,0.15); border-radius:10px;">最省心 · 保留全软件/微信</span>
            </button>
            <button class="storage-tab-btn ${activeTab === 'recovery' ? 'active' : ''}" onclick="ToolsEngine.onStorageTabChange('recovery')">
              <span>🔵 方案 B：微软官方专用镜像恢复</span>
              <span style="font-size:11px; opacity:0.85; padding:1px 6px; background:rgba(0,0,0,0.15); border-radius:10px;">最纯净 · 专机驱动出厂原装</span>
            </button>
            <button class="storage-tab-btn ${activeTab === 'generic' ? 'active' : ''}" onclick="ToolsEngine.onStorageTabChange('generic')">
              <span>🟣 方案 C：通用 Win11 安装介质</span>
              <span style="font-size:11px; opacity:0.85; padding:1px 6px; background:rgba(0,0,0,0.15); border-radius:10px;">应急备选 · 绕过联网激活</span>
            </button>
          </div>

          <!-- Tab 内容区 -->
          ${activeTab === 'clone' ? `
            <!-- 方案 A: 全盘无损克隆 -->
            <div class="step-flow-list">
              <div class="step-card">
                <div class="step-header">
                  <span class="step-badge warning">第 1 步 · 生死攸关</span>
                  <span class="step-title">解除 Windows 全盘 BitLocker 设备加密</span>
                  <span class="step-time-tag">耗时约 5~10 分钟</span>
                </div>
                <div class="step-body">
                  <p><strong>为什么必须先解密？</strong> Windows 11 默认对 Surface 全系列开机强制启用 BitLocker 硬盘硬件加密。如果<strong>未解密直接克隆</strong>，新盘安装到机身开机时，TPM 芯片检测到磁盘物理特征变化，必定触发<strong>蓝色 BitLocker 48 位数字恢复密钥锁死屏幕</strong>！若您未备份密钥，数据将彻底丢失！</p>
                  <p><strong>实操解密路径：</strong></p>
                  <ol style="margin:4px 0 8px; padding-left:20px;">
                    <li>点击开始菜单 -> 打开「设置」 -> 进入「隐私和安全性」 -> 点击「设备加密」（或「BitLocker 驱动器加密」）。</li>
                    <li>将设备加密开关从「开」切换为<strong>「关」</strong>，并在弹窗中确认关闭。</li>
                    <li>系统将在后台全速解密磁盘（状态显示为“正在解密”，解密进度达到 100% 后显示为“已关闭”）。</li>
                  </ol>
                  <div class="tip-callout info">
                    💡 <strong>双重保险备忘</strong>：建议访问微软官方账户中心 <a href="https://account.microsoft.com/devices/recoverykey" target="_blank" style="color:var(--ms-accent); font-weight:700;">account.microsoft.com/devices/recoverykey</a>，确认您账号中备份的 48 位恢复密钥以防万一。
                  </div>
                </div>
              </div>

              <div class="step-card">
                <div class="step-header">
                  <span class="step-badge">第 2 步</span>
                  <span class="step-title">将新买的 2230 SSD 装入移动硬盘盒并连机</span>
                  <span class="step-time-tag">耗时 1 分钟</span>
                </div>
                <div class="step-body">
                  <p>将新买的 M.2 2230 固态硬盘插入 NVMe 移动硬盘盒中固定好，使用 USB-C 数据线插入 Surface 的 Type-C 端口。Windows 系统右下角提示“发现新硬件”即可，此时<strong>无需去磁盘管理手动初始化或格式化</strong>。</p>
                </div>
              </div>

              <div class="step-card">
                <div class="step-header">
                  <span class="step-badge">第 3 步 · 核心技术</span>
                  <span class="step-title">运行系统克隆工具并【等比自动扩容 C 盘】</span>
                  <span class="step-time-tag">耗时约 10~15 分钟</span>
                </div>
                <div class="step-body">
                  <p>推荐使用完全免费的 <strong>DiskGenius</strong> 或 <strong>傲梅轻松备份</strong>：</p>
                  <ol style="margin:4px 0 8px; padding-left:20px;">
                    <li>打开 DiskGenius，点击顶部菜单「工具」 -> 选择<strong>「系统迁移」</strong>。</li>
                    <li><strong>选择目标盘</strong>：系统会自动选中当前 Surface 内置固态作为源盘，在弹出的目标盘列表中选择外接的 1TB/2TB 新固态硬盘。</li>
                    <li><strong>至关重要的扩容设置（避坑！）</strong>：在目标盘分区布局预览图中，默认 C 盘可能仍是 256GB，剩余 750GB 会变成灰色未分配空间。<strong>请用鼠标按住 C 盘右侧边框，向右直接拖拽拉满整个磁盘</strong>！确保迁移完成后所有容量直接归入 C 盘，无需换盘后二次折腾扩容。</li>
                    <li>点击「开始」按钮，选择「热迁移」（无需关机，在 Windows 后台即可高速镜像读写）。</li>
                  </ol>
                  <div class="tip-callout success">
                    🎉 提示：迁移速度一般在 300~600 MB/s，通常仅需 10~15 分钟即可提示“系统迁移成功完成”！
                  </div>
                </div>
              </div>

              <div class="step-card">
                <div class="step-header">
                  <span class="step-badge">第 4 步</span>
                  <span class="step-title">物理更换固态硬盘</span>
                  <span class="step-time-tag">耗时 1~2 分钟</span>
                </div>
                <div class="step-body">
                  <p>关机并拔掉电源和外设之后，按该机型微软维修指南更换硬盘。不同机型的盖门、螺丝和能否由用户自行拆卸都不一样，不能套用同一种拆法。</p>
                </div>
              </div>

              <div class="step-card">
                <div class="step-header">
                  <span class="step-badge">第 5 步</span>
                  <span class="step-title">开机进入全新大容量系统，重新开启加密</span>
                  <span class="step-time-tag">耗时 1 分钟</span>
                </div>
                <div class="step-body">
                  <p>按下机身电源键，Surface 的 UEFI 固件会自动识别引导分区，几秒钟后直接载入您熟悉的桌面！</p>
                  <p>打开「此电脑」，您会发现 C 盘直接变成了 <strong>930 GB (1TB 规格)</strong> 或 <strong>1.86 TB (2TB 规格)</strong>，所有安装过的专业软件、微信聊天记录、桌面排布、浏览器收藏夹均 100% 完美保留！</p>
                  <p>进系统确认一切正常后，建议回到「设置」->「隐私和安全性」->「设备加密」重新点击「开启」，恢复企业级安全防护。</p>
                  <div class="tip-callout success">
                    🎁 <strong>原装旧盘二次利用</strong>：将换下来的原装 256GB 固态装进刚才买的 M.2 硬盘盒中，秒变一个读写超 1000MB/s 的极速轻薄随身 U 盘，物尽其用！
                  </div>
                </div>
              </div>
            </div>
          ` : activeTab === 'recovery' ? `
            <!-- 方案 B: 微软官方专用出厂镜像恢复 -->
            <div class="step-flow-list">
              <div class="step-card">
                <div class="step-header">
                  <span class="step-badge">第 1 步 · 核心关键</span>
                  <span class="step-title">准备一个 FAT32 格式的 16GB~32GB U 盘</span>
                  <span class="step-time-tag">耗时 2 分钟</span>
                </div>
                <div class="step-body">
                  <p><strong>避坑铁律：</strong> Surface 的原生 UEFI 主板固件<strong>只认 FAT32 文件系统进行脱机引导</strong>，绝对不能格式化成 NTFS 或 exFAT！</p>
                  <p>如果您的 U 盘大于 32GB（例如 64GB/128GB），Windows 11 右键菜单中默认不再提供 FAT32 格式化选项。<strong>解决方案：</strong>使用免费的 DiskGenius，右键点击该 U 盘选择「格式化当前分区」，在文件系统下拉菜单中强行选择 <strong>FAT32</strong> 并点击格式化，卷标命名为 <strong>SURFACE</strong> 即可。</p>
                </div>
              </div>

              <div class="step-card">
                <div class="step-header">
                  <span class="step-badge">第 2 步</span>
                  <span class="step-title">凭机身序列号在微软官网下载出厂专配恢复镜像</span>
                  <span class="step-time-tag">耗时约 10~20 分钟</span>
                </div>
                <div class="step-body">
                  <p>1. 翻开 Surface 支架，在铰链内侧找到该机器专属的 <strong>12 位纯数字序列号 (Serial Number)</strong>。</p>
                  <p>2. 在任意电脑浏览器中访问微软官方 Surface 恢复映像页面：<br>
                    <a href="https://support.microsoft.com/zh-cn/surface-recovery-image" target="_blank" style="color:var(--ms-accent); font-weight:700; text-decoration:underline;">https://support.microsoft.com/zh-cn/surface-recovery-image</a>
                  </p>
                  <p>3. 登录微软个人账户，在下拉框选择您的产品型号，输入 12 位序列号，点击「继续」。系统将匹配出该机出厂专配的 Windows 版本恢复包（通常为 9GB ~ 13GB 的 <code>.zip</code> 压缩包），点击下载。</p>
                  <div class="tip-callout info">
                    💎 <strong>官方恢复镜像优势</strong>：此镜像不仅包含完整 Windows 系统，更预装了该机型出厂专配的 PixelSense 屏幕色彩 ICC 校准文件、触觉手写笔压感固件、定制电源能耗策略及 Dolby Atmos 音效驱动，原汁原味！
                  </div>
                </div>
              </div>

              <div class="step-card">
                <div class="step-header">
                  <span class="step-badge">第 3 步 · 目录规范</span>
                  <span class="step-title">解压恢复文件至 U 盘根目录（严禁套娃文件夹）</span>
                  <span class="step-time-tag">耗时约 5~8 分钟</span>
                </div>
                <div class="step-body">
                  <p>将已下载完成的 <code>.zip</code> 压缩包解压。<strong>注意解压层级：</strong></p>
                  <p>打开解压后的文件夹，选中里面的所有文件和子文件夹（包含 <code>bootmgr</code>、<code>bootmgr.efi</code>、<code>EFI</code> 文件夹、<code>sources</code> 文件夹等），<strong>直接复制拖拽到 U 盘的根目录下</strong>！</p>
                  <div class="tip-callout warning">
                    ⚠️ <strong>高频翻车检查</strong>：双击打开 U 盘后，必须一眼就能看到 <code>bootmgr</code> 等核心文件！如果 U 盘根目录下套了一层类似 <code>SurfacePro9_BMR_xxx</code> 的外层文件夹，Surface 开机引导程序将无法读取，导致黑屏提示找不到启动介质！
                  </div>
                </div>
              </div>

              <div class="step-card">
                <div class="step-header">
                  <span class="step-badge">第 4 步</span>
                  <span class="step-title">物理更换新空白固态硬盘</span>
                  <span class="step-time-tag">耗时 1 分钟</span>
                </div>
                <div class="step-body">
                  <p>关机并拔掉电源和外设之后，按该机型微软维修指南更换硬盘。不同机型的盖门和能否由用户自行拆卸都不一样。</p>
                </div>
              </div>

              <div class="step-card">
                <div class="step-header">
                  <span class="step-badge">第 5 步 · 神仙手法</span>
                  <span class="step-title">Surface 专属物理按键组合进入 U 盘恢复引导</span>
                  <span class="step-time-tag">耗时 1 分钟</span>
                </div>
                <div class="step-body">
                  <p>1. 将制作好的恢复 U 盘插入 Surface 的 USB 接口，并<strong>务必连接电源适配器</strong>防止刷写中断。</p>
                  <p>2. <strong>微软标准硬件引导手势（请牢记按键顺序）：</strong></p>
                  <div style="background:var(--ms-bg-card-secondary); padding:12px 16px; border-radius:8px;  margin:8px 0; font-size:13px; line-height:1.8;">
                    ① 保持关机状态，用左手手指<strong>长按住机身上的【音量减键 (-)】不松开</strong>；<br>
                    ② 右手轻按一下机身上的<strong>【电源键】</strong>立即松开；<br>
                    ③ 眼睛盯紧屏幕，看到屏幕亮起白色 Microsoft 或 Surface 文字 Logo，且<strong>下方出现旋转的白色小圆点时，立即松开左手的【音量减键】</strong>！
                  </div>
                </div>
              </div>

              <div class="step-card">
                <div class="step-header">
                  <span class="step-badge">第 6 步</span>
                  <span class="step-title">全自动执行出厂级初始化部署与激活</span>
                  <span class="step-time-tag">耗时约 15~25 分钟</span>
                </div>
                <div class="step-body">
                  <p>稍等片刻，屏幕将载入蓝色经典 Windows 恢复环境（WinRE）：</p>
                  <ol style="margin:4px 0 8px; padding-left:20px;">
                    <li>选择显示语言（推荐选择「中文(简体)」），键盘布局选「微软拼音」。</li>
                    <li>在蓝底选项菜单中点击<strong>「疑难解答 (Troubleshoot)」</strong>。</li>
                    <li>点击<strong>「从驱动器恢复 (Recover from a drive)」</strong>。</li>
                    <li>在清除选项中选择<strong>「仅删除我的文件」</strong>（因为新硬盘本来就是空的），点击「恢复」。</li>
                  </ol>
                  <p>Surface 将全自动完成新硬盘的分区初始化、出厂系统镜像写入及主板驱动部署。期间电脑会自动重启数次，最后直接进入原装 Windows 11 开箱配置向导（OOBE），联网自动通过主板数字许可证激活！</p>
                </div>
              </div>
            </div>
          ` : `
            <!-- 方案 C: 通用 Win11 原版介质安装 -->
            <div class="step-flow-list">
              <div class="step-card">
                <div class="step-header">
                  <span class="step-badge">适用场景</span>
                  <span class="step-title">使用微创官方 MediaCreationTool 制作的标准 Win11 U 盘</span>
                </div>
                <div class="step-body">
                  <p>如果您手头没有原厂镜像，只有一个普通的 Windows 11 安装 U 盘，换上新固态后同样可以正常引导安装系统。但在新版 Surface 上安装通用系统存在一个<strong>极易卡死的知名陷阱</strong>，请按以下绝密技巧避坑：</p>
                </div>
              </div>

              <div class="step-card">
                <div class="step-header">
                  <span class="step-badge warning">绝密秘籍</span>
                  <span class="step-title">破解开箱阶段卡在“让我们为您连接到网络”无下一步问题</span>
                </div>
                <div class="step-body">
                  <p><strong>致命痛点：</strong> 通用原版 Win11 镜像由于没有内置某些新型号 Surface 的 Wi-Fi 驱动和触控板驱动，安装完毕首次进入开箱向导时，系统强制要求连接网络，但屏幕上找不到任何 Wi-Fi 列表，界面又<strong>没有跳过按钮</strong>，直接卡死死循环！</p>
                  <p><strong>一行命令神级破解术：</strong></p>
                  <ol style="margin:4px 0 8px; padding-left:20px;">
                    <li>在卡住的“让我们为您连接到网络”界面，按下键盘组合键：<br>
                      <strong><code>Shift + F10</code></strong>（部分外接键盘或便携键盘可能需要按 <strong><code>Fn + Shift + F10</code></strong>）。
                    </li>
                    <li>屏幕中央会立即弹出一个黑色的 Command 命令行提示符窗口。</li>
                    <li>在命令行中输入以下命令并按下回车键：</li>
                  </ol>
                  <div class="code-box">
                    <span class="code-text">OOBE\\BYPASSNRO</span>
                    <span style="font-size:11.5px; color:#888;">(不区分大小写，输入后回车)</span>
                  </div>
                  <ol start="4" style="margin:4px 0 8px; padding-left:20px;">
                    <li>系统将全自动重启，再次来到网络连接页面时，右下角就会多出一个隐藏选项：<strong>「我没有 Internet 连接」</strong>！</li>
                    <li>点击它，再点击「继续执行受限设置」，即可跳过强制联网，直接创建离线本地管理员账户进入桌面！</li>
                  </ol>
                </div>
              </div>

              <div class="step-card">
                <div class="step-header">
                  <span class="step-badge">最后一步</span>
                  <span class="step-title">双击微软官方 MSI 驱动包一键补全硬件</span>
                </div>
                <div class="step-body">
                  <p>跳过网络进桌面后，由于缺少专属驱动，屏幕可能没有触摸功能、按键没有亮度调节。用另一台电脑从微软官网下载对应机型的 Surface 固件与驱动包（例如 <code>SurfacePro9_Win11_xxxx.msi</code>），拷贝到 Surface 上双击运行，点击下一步全自动安装，重启后 Wi-Fi、触控屏、笔压感及摄像头即可 100% 满血复活！</p>
                </div>
              </div>
            </div>
          `}
        </div>

        <!-- 4. 换盘现场四大典型翻车事故急救指南 (FAQ) -->
        <div class="guide-panel" style="margin-top:20px;">
          <div style="font-weight:700; font-size:15px; margin-bottom:4px; color:#d83b01;">⚠️ 换盘现场四大高频翻车事故与急救指南 (FAQ)：</div>
          <div class="faq-grid">
            <div class="faq-card">
              <div class="faq-question">🔴 事故 1：换完开机提示红色锁头 / Red Surface Logo？</div>
              <div class="faq-answer">
                <strong>病因</strong>：这是 UEFI 安全启动（Secure Boot）检测到启动链和硬盘签名变更的正常提醒。<br>
                <strong>急救</strong>：开机长按【音量加键 (+)】进 UEFI BIOS，点击左侧「Security」，在「Secure Boot」项下选择「Microsoft only」或「Microsoft & 3rd party CA」，点击保存重启即可恢复正常。
              </div>
            </div>

            <div class="faq-card">
              <div class="faq-question">❌ 事故 2：换好开机直接进 BIOS，找不到固态硬盘？</div>
              <div class="faq-answer">
                <strong>病因</strong>：硬盘没有装到位时，开机可能进不了系统。<br>
                <strong>处理</strong>：关机断电后，按该机型微软维修指南重新安装。不要套用别的机型的螺丝或插法。
              </div>
            </div>

            <div class="faq-card">
              <div class="faq-question">💾 事故 3：1TB 换好后系统里只显示 256GB，剩下的容量哪去了？</div>
              <div class="faq-answer">
                <strong>病因</strong>：克隆时未开启按比例扩容，导致多出的 750GB 变成了未分配空间。<br>
                <strong>急救</strong>：按下 <code>Win + X</code> 打开「磁盘管理」，若 C 盘右侧隔着一个恢复分区无法直接扩展卷，只需下载免费的「傲梅分区助手」，右键 C 盘选择「调整/移动分区」，向右拉满未分配空间点击执行，10秒内无损合并！
              </div>
            </div>

            <div class="faq-card">
              <div class="faq-question">🔒 事故 4：克隆后开机提示输入 BitLocker 恢复密钥？</div>
              <div class="faq-answer">
                <strong>病因</strong>：换盘前未彻底解密 BitLocker，触发了 TPM 硬件安全锁死。<br>
                <strong>急救</strong>：用手机登录微软官网 <a href="https://account.microsoft.com/devices/recoverykey" target="_blank" style="color:var(--ms-accent); font-weight:700;">account.microsoft.com/devices/recoverykey</a>，查阅并输入对应的 48 位数字恢复密钥即可解锁。若未绑定微软账号，则必须重新用方案 B 进行出厂恢复。
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

if (typeof window !== 'undefined') {
  window.ToolsEngine = ToolsEngine;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ToolsEngine;
}
