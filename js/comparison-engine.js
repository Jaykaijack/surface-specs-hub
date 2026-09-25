/**
 * Microsoft Surface Specs Hub - Master Comparison Engine
 * 驱动 13 大类专业横向对比大表、双轴粘性吸附、差异高亮、仅看差异、列换序与未知状态渲染
 */

const ComparisonEngine = {
  // 选中的对比设备 ID 列表 (跨品类支持)
  selectedIds: ['pro-12-13-intel', 'laptop-8-138-intel'],
  highlightDiff: true,
  diffOnly: false,
  maxCompareLimit: 5,

  init() {
    this.restoreFromStorage();
    this.bindEvents();
    this.updateDockUI();
  },

  restoreFromStorage() {
    if (typeof localStorage === 'undefined') return;
    try {
      const saved = localStorage.getItem('surface-compare-ids');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // 校验合法性
          this.selectedIds = parsed.filter(id => !!Catalog.getDevice(id));
          if (this.selectedIds.length === 0) {
            this.selectedIds = ['pro-12-13-intel', 'laptop-8-138-intel'];
          }
        }
      }
    } catch (e) {}
  },

  saveToStorage() {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem('surface-compare-ids', JSON.stringify(this.selectedIds));
    } catch (e) {}
  },

  bindEvents() {
    if (typeof document === 'undefined') return;
    // 监听 Shift + 鼠标滚轮横向滚动，或在超宽表格上直接滚轮滚动辅助横向
    document.addEventListener('wheel', (e) => {
      const container = document.querySelector('.spec-table-container');
      if (container && container.contains(e.target)) {
        if (!e.shiftKey && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          if (container.scrollWidth > container.clientWidth) {
            container.scrollLeft += e.deltaY * 0.85;
          }
        }
      }
    }, { passive: true });
  },

  toggleDevice(id) {
    const idx = this.selectedIds.indexOf(id);
    if (idx > -1) {
      this.selectedIds.splice(idx, 1);
    } else {
      if (this.selectedIds.length >= this.maxCompareLimit) {
        if (typeof alert !== 'undefined') {
          alert(`对比托盘最多支持同时对比 ${this.maxCompareLimit} 款设备，请先移除部分机型。`);
        }
        return false;
      }
      this.selectedIds.push(id);
    }
    this.saveToStorage();
    this.updateDockUI();
    this.syncUrlParams();
    this.renderCurrentView();
    return true;
  },

  addDevice(id) {
    if (!this.selectedIds.includes(id)) {
      if (this.selectedIds.length >= this.maxCompareLimit) {
        if (typeof alert !== 'undefined') {
          alert(`对比托盘最多支持同时对比 ${this.maxCompareLimit} 款设备。`);
        }
        return false;
      }
      this.selectedIds.push(id);
      this.saveToStorage();
      this.updateDockUI();
      this.syncUrlParams();
      this.renderCurrentView();
    }
    return true;
  },

  removeDevice(id) {
    const idx = this.selectedIds.indexOf(id);
    if (idx > -1) {
      this.selectedIds.splice(idx, 1);
      this.saveToStorage();
      this.updateDockUI();
      this.syncUrlParams();
      this.renderCurrentView();
    }
  },

  getSessionIds() {
    return this.selectedIds.slice();
  },

  renderSpecTable(devicesToCompare) {
    return this.renderComparisonTable(devicesToCompare);
  },

  clearAll() {
    this.selectedIds = [];
    this.saveToStorage();
    this.updateDockUI();
    this.syncUrlParams();
    this.renderCurrentView();
  },

  swapDeviceOrder(fromIdx, toIdx) {
    if (fromIdx < 0 || fromIdx >= this.selectedIds.length || toIdx < 0 || toIdx >= this.selectedIds.length) return;
    const temp = this.selectedIds[fromIdx];
    this.selectedIds[fromIdx] = this.selectedIds[toIdx];
    this.selectedIds[toIdx] = temp;
    this.saveToStorage();
    this.updateDockUI();
    this.syncUrlParams();
    this.renderCurrentView();
  },

  setHighlightDiff(enable) {
    this.highlightDiff = enable;
    if (typeof document === 'undefined') return;
    const table = document.querySelector('.spec-table');
    if (table) {
      if (enable) table.classList.add('highlight-diff');
      else table.classList.remove('highlight-diff');
    }
  },

  setDiffOnly(enable) {
    this.diffOnly = enable;
    if (typeof document === 'undefined') return;
    const table = document.querySelector('.spec-table');
    if (table) {
      if (enable) table.classList.add('diff-only');
      else table.classList.remove('diff-only');
    }
  },

  syncUrlParams() {
    if (typeof window === 'undefined' || !window.location || !window.location.hash) return;
    if (window.location.hash.startsWith('#/compare')) {
      window.location.hash = `#/compare?products=${this.selectedIds.join(',')}`;
    }
  },

  // 刷新常驻托盘 UI
  updateDockUI() {
    if (typeof document === 'undefined') return;
    const dock = document.getElementById('comparison-dock');
    const dockPills = document.getElementById('dock-pills');

    const dockCount = document.getElementById('dock-count');
    if (!dock || !dockPills) return;

    if (this.selectedIds.length === 0) {
      dock.classList.add('hidden');
      return;
    }

    dock.classList.remove('hidden');
    dockCount.textContent = this.selectedIds.length;

    let html = '';
    this.selectedIds.forEach((id, idx) => {
      const dev = Catalog.getDevice(id);
      if (dev) {
        html += `
          <div class="dock-item-pill">
            <span>${dev.name}</span>
            <button class="dock-item-remove" onclick="ComparisonEngine.removeDevice('${dev.id}')" title="移除">✕</button>
          </div>
        `;
      }
    });
    dockPills.innerHTML = html;

    // 勾选状态同步
    document.querySelectorAll('.device-card-mini').forEach(card => {
      const devId = card.getAttribute('data-id');
      if (this.selectedIds.includes(devId)) {
        card.classList.add('selected');
        const chk = card.querySelector('.card-checkbox');
        if (chk) chk.innerHTML = '✓';
      } else {
        card.classList.remove('selected');
        const chk = card.querySelector('.card-checkbox');
        if (chk) chk.innerHTML = '';
      }
    });
  },

  // 渲染完整的 13 大类横向对比大表
  renderComparisonTable(devicesToCompare) {
    if (!devicesToCompare || devicesToCompare.length === 0) {
      return `
        <div class="spec-table-empty">
          <div style="font-size:32px; margin-bottom:12px;">📊</div>
          <h3>未选择任何 Surface 设备</h3>
          <p>请点击上方机型卡片或在左侧导航选择设备加入对比，最多支持 5 款跨品类同屏深度比对。</p>
        </div>
      `;
    }

    const isSingleDevice = devicesToCompare.length === 1;

    let html = `
      <div class="spec-table-container">
        <table class="spec-table ${this.highlightDiff ? 'highlight-diff' : ''} ${this.diffOnly ? 'diff-only' : ''}">
          <thead>
            <tr>
              <th class="corner-header ${isSingleDevice ? 'single-mode' : ''}">
                <div style="font-weight:700; font-size:13px; color:var(--ms-text-brand); margin-bottom:4px;">
                  ${isSingleDevice ? '技术规格分类' : '参数规格索引'}
                </div>
                <div style="font-size:11px; color:var(--ms-text-tertiary);">
                  ${isSingleDevice ? '13 大核心体系深度参数' : `共 ${devicesToCompare.length} 款设备横向比对`}
                </div>
              </th>
    `;

    // 渲染表头：单机详情页采用轻量紧凑表头，对比模式保留卡片与交互操作
    devicesToCompare.forEach((dev, colIdx) => {
      if (isSingleDevice) {
        html += `
          <th class="table-single-header-th">
            <div class="table-single-header-wrap">
              <div class="table-single-header-title">${dev.name} 官方技术规格全览</div>
              <div class="table-single-header-sub">
                <span class="table-single-meta-pill">${dev.generation}</span>
                <span class="table-single-meta-desc">${Catalog.getSpec(dev, 'cpuModel') ? `架构：${Catalog.getSpec(dev, 'cpuModel')}` : (dev.tagline || '')}</span>
              </div>
            </div>
          </th>
        `;
      } else {
        html += `
          <th>
            <div class="table-device-card">
              <button class="table-device-remove-btn" onclick="ComparisonEngine.removeDevice('${dev.id}')" title="从对比中移除">✕</button>
              
              <div class="table-device-img" onclick="App.navigateToDetail('${dev.categoryId}', '${dev.id}')" style="cursor:pointer;" title="点击查看单机详情页">
                ${Catalog.frame(Catalog.portrait(dev), {
                  slot: 'table',
                  id: `table-thumb-${dev.id}-${colIdx}`,
                  className: 'table-thumb-img',
                  alt: dev.name,
                  loading: 'eager',
                  onerror: 'App.hideBrokenImage(this)'
                })}
                ${Catalog.portrait(dev).identity === 'shared' ? '<span class="portrait-stand-in" id="portrait-mark-' + dev.id + '-' + colIdx + '">同系列示意</span>' : '<span class="portrait-stand-in" id="portrait-mark-' + dev.id + '-' + colIdx + '" hidden>同系列示意</span>'}
                <div style="display:none; width:100%; height:100%;">
                  ${this.getDeviceSvgIcon(dev.categoryId)}
                </div>
              </div>

              <!-- 表头多配色快速预览 -->
              ${(Array.isArray(Catalog.getSpec(dev, 'colors')) && Catalog.getSpec(dev, 'colors').length > 1) ? `
                <div class="table-color-dots" onclick="event.stopPropagation();">
                  ${Catalog.getSpec(dev, 'colors').map(c => `
                    <span class="table-color-dot" style="background:${c.hex};" title="${c.name}"
                      onclick="ComparisonEngine.switchTableDeviceColor('${dev.id}', ${colIdx}, '${c.name}', this)"></span>
                  `).join('')}
                </div>
              ` : ''}

              <div class="table-device-title" onclick="App.navigateToDetail('${dev.categoryId}', '${dev.id}')" style="cursor:pointer;" title="${dev.name}">
                ${dev.name.replace('Surface ', '').replace(/[（(]第[^）)]+[）)]/g, '').replace(/ +/g, ' ').trim()}
              </div>
              <div class="table-device-subtitle">${dev.generation}</div>

              <!-- 列顺序调整按钮 (PRD 十三章) -->
              <div style="display:flex; gap:4px; margin-bottom:6px;">
                ${colIdx > 0 ? `<button class="fluent-btn-sm" onclick="ComparisonEngine.swapDeviceOrder(${colIdx}, ${colIdx - 1})" title="向左移动一列">◀</button>` : ''}
                ${colIdx < devicesToCompare.length - 1 ? `<button class="fluent-btn-sm" onclick="ComparisonEngine.swapDeviceOrder(${colIdx}, ${colIdx + 1})" title="向右移动一列">▶</button>` : ''}
              </div>

              <div class="table-device-badge-row">
                ${this.renderStatusBadge(dev.status)}
                ${dev.flagship ? '<span class="spec-badge gold">最新旗舰</span>' : ''}
                ${String(Catalog.getSpec(dev, 'npuTops') || '').includes('80 TOPS') ? '<span class="spec-badge copilot">80 TOPS</span>' : ''}
                ${String(Catalog.getSpec(dev, 'panelTech') || '').includes('OLED') ? '<span class="spec-badge green">OLED</span>' : ''}
              </div>
            </div>
          </th>
        `;
      }
    });

    html += `
            </tr>
          </thead>
          <tbody>
    `;

    // 渲染 13 大类参数分组
    SURFACE_DATA.specGroups.forEach(group => {
      html += `
        <tr class="spec-group-row" id="group-row-${group.id}">
          <td colspan="${devicesToCompare.length + 1}">
            <div class="spec-group-toggle" onclick="ComparisonEngine.toggleGroup('${group.id}')">
              <span id="group-icon-${group.id}">▼</span>
              <span>${group.name}</span>
            </div>
          </td>
        </tr>
      `;

      group.fields.forEach(field => {
        // 差异比对算法
        const isDiff = this.checkFieldDiff(devicesToCompare, field.key);
        const rowClass = isDiff ? 'row-diff' : 'row-same';


        html += `
          <tr class="field-row field-row-${group.id} ${rowClass}">
            <td class="spec-param-name">${field.label}</td>
        `;

        devicesToCompare.forEach(dev => {
          const rawVal = Catalog.getSpec(dev, field.key);
          const formattedVal = this.formatFieldValue(rawVal, field.type, dev, field.key);
          html += `<td class="spec-val-cell">${formattedVal}</td>`;
        });

        html += `</tr>`;
      });
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    return html;
  },

  checkFieldDiff(devices, fieldKey) {
    if (!devices || devices.length <= 1) return false;
    const values = devices.map(d => {
      const raw = Catalog.getSpec(d, fieldKey);
      return raw !== undefined ? raw : 'null';
    });
    const firstVal = JSON.stringify(values[0]);
    for (let i = 1; i < values.length; i++) {
      if (JSON.stringify(values[i]) !== firstVal) {
        return true;
      }
    }
    return false;
  },

  // 严格根据 PRD 第九、十章处理字段格式化与未知参数治理 (Zero-Hallucination)
  formatFieldValue(val, type, dev, fieldKey) {
    if (typeof Catalog !== 'undefined' && Catalog.specState) {
      const state = Catalog.specState(val);
      if (state !== 'VALID') return Catalog.presentSpec(val);
    } else if (val === undefined || val === null || val === '' || val === 'null') {
      return '<span class="spec-state null" title="暂未录入或缺失">—</span>';
    } else if (val === 'not_disclosed') {
      return '<span class="spec-state not-disclosed" title="微软官方白皮书从未对外正式披露">官方未披露</span>';
    } else if (val === 'not_applicable') {
      return '<span class="spec-state not-applicable" title="该产品物理形态不具备此属性">不适用</span>';
    }

    // 配色调色盘
    if (type === 'colors' && Array.isArray(val)) {
      let colorDots = '<div class="color-palette-wrap">';
      val.forEach(c => {
        colorDots += `
          <div class="color-dot-item" title="${c.name}">
            <span class="color-dot" style="background-color:${c.hex};"></span>
            <span>${c.name}</span>
          </div>
        `;
      });
      colorDots += '</div>';
      return colorDots;
    }

    // 销售状态标签
    if (type === 'status_badge') {
      return this.renderStatusBadge(val);
    }

    // 用户群体标签
    if (type === 'audience_badge') {
      if (val.includes('商业') || val === 'commercial') return '<span class="spec-badge" style="background:#e8edf5; color:#1a5fb4;">商业与政企</span>';
      return '<span class="spec-badge" style="background:#eef6ee; color:#26a269;">个人与消费者</span>';
    }

    // NPU 算力高亮
    if (type === 'npu_badge') {
      if (typeof val === 'string' && val.includes('80 TOPS')) {
        return `<span class="spec-badge gold" style="font-size:12px; padding:3px 8px;">★ ${val}</span>`;
      }
      if (typeof val === 'string' && val.includes('45 TOPS')) {
        return `<span class="spec-badge copilot" style="font-size:12px; padding:3px 8px;">${val}</span>`;
      }
      return `<span class="spec-badge">${val}</span>`;
    }

    // Copilot+ 认证
    if (type === 'copilot_badge') {
      if (typeof val === 'string' && val.includes('认证 Copilot+')) {
        return `<span class="spec-badge copilot" style="font-weight:700;">✓ ${val}</span>`;
      }
      return val;
    }

    // 官方链接与技术文档定制渲染 (第13类：资料与价格来源)
    if (fieldKey === 'officialDocUrl' || (typeof val === 'string' && (val.startsWith('http://') || val.startsWith('https://')))) {
      const isCommercial = dev ? !!dev.isCommercial : false;
      const configureUrl = (dev && Catalog.getSpec(dev, 'officialConfigureUrl')) ? Catalog.getSpec(dev, 'officialConfigureUrl') : val;
      const learnUrl = dev ? dev.learnDocUrl : null;

      let linksHtml = '<div style="display:flex; flex-direction:column; gap:6px; align-items:flex-start;">';
      
      if (isCommercial) {
        linksHtml += `
          <a href="${configureUrl}" target="_blank" rel="noopener noreferrer" 
            style="display:inline-flex; align-items:center; gap:5px; color:#0078d4; background:rgba(0,120,212,0.08); border:1px solid rgba(0,120,212,0.25); border-radius:6px; padding:4px 9px; font-size:12px; font-weight:600; text-decoration:none;" title="直达微软中国官方商用商城选配页">
            <span>🏢</span> 微软商用官方选配直达 ↗
          </a>
        `;
      } else {
        linksHtml += `
          <a href="${configureUrl}" target="_blank" rel="noopener noreferrer" 
            style="display:inline-flex; align-items:center; gap:5px; color:#107c10; background:rgba(16,124,16,0.08); border:1px solid rgba(16,124,16,0.25); border-radius:6px; padding:4px 9px; font-size:12px; font-weight:600; text-decoration:none;" title="直达微软官方商城零售选配页">
            <span>🛒</span> 微软官方商城选配直达 ↗
          </a>
        `;
      }

      if (learnUrl) {
        linksHtml += `
          <a href="${learnUrl}" target="_blank" rel="noopener noreferrer" 
            style="display:inline-flex; align-items:center; gap:5px; color:var(--ms-text-secondary); background:var(--ms-bg-card); border:1px solid var(--ms-border-subtle); border-radius:6px; padding:3px 8px; font-size:11.5px; text-decoration:none;" title="查阅微软官方 Microsoft Learn 技术文档">
            <span>📘</span> 微软 Learn 技术文档 ↗
          </a>
        `;
      }

      linksHtml += '</div>';
      return linksHtml;
    }

    return String(val);
  },

  renderStatusBadge(status) {
    switch (status) {
      case 'current_cn':
        return '<span class="spec-badge green">国行在售</span>';
      case 'current_global':
        return '<span class="spec-badge" style="background:#fff3cd; color:#856404;">海外在售</span>';
      case 'upcoming':
        return '<span class="spec-badge gold">即将发售</span>';
      case 'discontinued':
        return '<span class="spec-badge" style="background:#e2e3e5; color:#383d41;">已停售</span>';
      case 'legacy':
        return '<span class="spec-badge" style="background:#f8f9fa; color:#6c757d; border:1px solid #dee2e6;">历史机型</span>';
      default:
        return `<span class="spec-badge">${status}</span>`;
    }
  },

  toggleGroup(groupId) {
    const rows = document.querySelectorAll(`.field-row-${groupId}`);
    const icon = document.getElementById(`group-icon-${groupId}`);
    let isHidden = false;
    rows.forEach(r => {
      if (r.style.display === 'none') {
        r.style.display = '';
        isHidden = false;
      } else {
        r.style.display = 'none';
        isHidden = true;
      }
    });
    if (icon) icon.textContent = isHidden ? '▶' : '▼';
  },

  expandAllGroups() {
    document.querySelectorAll('.field-row').forEach(r => r.style.display = '');
    document.querySelectorAll('[id^="group-icon-"]').forEach(i => i.textContent = '▼');
  },

  collapseAllGroups() {
    document.querySelectorAll('.field-row').forEach(r => r.style.display = 'none');
    document.querySelectorAll('[id^="group-icon-"]').forEach(i => i.textContent = '▶');
  },

  getDeviceSvgIcon(categoryId) {
    switch (categoryId) {
      case 'pro':
        return `
          <svg viewBox="0 0 100 70" width="80" height="56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="8" width="70" height="50" rx="3" fill="#0078D4" fill-opacity="0.12" stroke="#0078D4" stroke-width="2"/>
            <line x1="28" y1="58" x2="10" y2="66" stroke="#0078D4" stroke-width="2" stroke-linecap="round"/>
            <line x1="10" y1="66" x2="90" y2="66" stroke="#0078D4" stroke-width="2" stroke-linecap="round"/>
            <rect x="22" y="15" width="56" height="36" rx="1.5" fill="#0078D4" fill-opacity="0.2"/>
          </svg>
        `;
      case 'laptop':
        return `
          <svg viewBox="0 0 100 70" width="80" height="56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="22" y="10" width="56" height="40" rx="2" fill="#0078D4" fill-opacity="0.12" stroke="#0078D4" stroke-width="2"/>
            <rect x="28" y="16" width="44" height="28" rx="1" fill="#0078D4" fill-opacity="0.25"/>
            <path d="M10 54H90L82 62H18L10 54Z" fill="#0078D4" fill-opacity="0.15" stroke="#0078D4" stroke-width="1.8"/>
            <rect x="42" y="55.5" width="16" height="4.5" rx="1" fill="#0078D4" fill-opacity="0.4"/>
          </svg>
        `;
      case 'sls':
        return `
          <svg viewBox="0 0 100 70" width="80" height="56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="54" width="76" height="8" rx="1.5" fill="#0078D4" fill-opacity="0.15" stroke="#0078D4" stroke-width="2"/>
            <path d="M24 16L76 28L68 54L16 42Z" fill="#0078D4" fill-opacity="0.2" stroke="#0078D4" stroke-width="2"/>
          </svg>
        `;
      case 'book':
        return `
          <svg viewBox="0 0 100 70" width="80" height="56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="22" y="10" width="56" height="38" rx="2" fill="#0078D4" fill-opacity="0.12" stroke="#0078D4" stroke-width="2"/>
            <circle cx="20" cy="52" r="3" fill="#0078D4"/>
            <path d="M12 52H88L80 60H20L12 52Z" fill="#0078D4" fill-opacity="0.15" stroke="#0078D4" stroke-width="2"/>
          </svg>
        `;
      case 'go':
      case 'laptopgo':
        return `
          <svg viewBox="0 0 100 70" width="80" height="56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="24" y="14" width="52" height="38" rx="3" fill="#107C41" fill-opacity="0.12" stroke="#107C41" stroke-width="2"/>
            <circle cx="50" cy="18" r="1.5" fill="#107C41"/>
            <path d="M16 56H84" stroke="#107C41" stroke-width="2"/>
          </svg>
        `;
      case 'studio':
        return `
          <svg viewBox="0 0 100 70" width="80" height="56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="14" y="6" width="72" height="46" rx="2" fill="#8764B8" fill-opacity="0.15" stroke="#8764B8" stroke-width="2"/>
            <line x1="42" y1="52" x2="36" y2="64" stroke="#8764B8" stroke-width="2"/>
            <line x1="58" y1="52" x2="64" y2="64" stroke="#8764B8" stroke-width="2"/>
            <rect x="30" y="62" width="40" height="5" rx="1" fill="#8764B8" stroke="#8764B8" stroke-width="1.5"/>
          </svg>
        `;
      case 'duo':
        return `
          <svg viewBox="0 0 100 70" width="80" height="56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="12" width="28" height="46" rx="2" fill="#D13438" fill-opacity="0.15" stroke="#D13438" stroke-width="1.8"/>
            <rect x="52" y="12" width="28" height="46" rx="2" fill="#D13438" fill-opacity="0.15" stroke="#D13438" stroke-width="1.8"/>
            <line x1="49" y1="14" x2="49" y2="56" stroke="#D13438" stroke-width="2"/>
          </svg>
        `;
      default:
        return `
          <svg viewBox="0 0 100 70" width="80" height="56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="12" width="60" height="44" rx="3" stroke="#0078D4" stroke-width="2"/>
          </svg>
        `;
    }
  },

  switchTableDeviceColor(devId, colIdx, colorName, dotEl) {
    const shot = Catalog.portrait(Catalog.getDevice(devId), colorName);
    if (!shot.src) return;
    const imgEl = document.getElementById(`table-thumb-${devId}-${colIdx}`);
    if (imgEl) {
      Catalog.paint(imgEl, shot, 'table');
    }
    const mark = document.getElementById(`portrait-mark-${devId}-${colIdx}`);
    if (mark) mark.hidden = shot.identity !== 'shared';
    if (dotEl) {
      const parent = dotEl.parentElement;
      if (parent) {
        parent.querySelectorAll('.table-color-dot').forEach(d => d.classList.remove('active'));
        dotEl.classList.add('active');
      }
    }
  },

  renderCurrentView() {
    if (typeof App !== 'undefined' && App.renderActiveView) {
      App.renderActiveView();
    }
  }
};

if (typeof window !== 'undefined') {
  window.ComparisonEngine = ComparisonEngine;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ComparisonEngine;
}
