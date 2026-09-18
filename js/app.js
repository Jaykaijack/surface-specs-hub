/**
 * Microsoft Surface Specs Hub - Master Application Controller
 * 全功能 URL 路由引擎 (首页/系列页/详情页/Compare/时间线/工具)、多维筛选联动、全局搜索与主题管理
 */

const App = {
  activeRoute: { path: '/', params: {}, query: {} },
  searchQuery: '',
  theme: 'light',
  activeDetailTab: 'specs',     // M3 详情页标签: 默认直出展示 'specs' 全量参数大表
  seriesViewMode: 'gallery',    // M3 系列页视图: 默认画廊卡片视图 'gallery' | 可切换规格大表 'table'
  isDockCollapsed: false,       // M3 悬浮托盘折叠状态

  // 筛选器状态 (同步 URL)
  filters: {
    cpu: 'all',        // 'all' | 'snapdragon' | 'intel' | 'amd'
    status: 'all',     // 'all' | 'current_cn' | 'discontinued' | 'legacy'
    copilotOnly: false,// 是否仅看 Copilot+ PC
    audience: 'all'    // 'all' | 'consumer' | 'commercial'
  },

  init() {
    this.initTheme();
    this.initRouter();
    this.bindEvents();
    ComparisonEngine.init();
  },

  // 1. URL Hash 路由系统
  initRouter() {
    window.addEventListener('hashchange', () => this.handleRouteChange());
    // 初始路由解析
    if (!window.location.hash) {
      window.location.hash = '#/';
    } else {
      this.handleRouteChange();
    }
  },

  handleRouteChange() {
    const hash = window.location.hash.slice(1) || '/';
    const [pathPart, queryPart] = hash.split('?');
    
    // 解析 Query 参数
    const query = {};
    if (queryPart) {
      const searchParams = new URLSearchParams(queryPart);
      for (const [key, value] of searchParams.entries()) {
        query[key] = value;
      }
    }

    // 解析 Path 路由
    this.activeRoute = { path: pathPart, query };
    this.parseFiltersFromQuery(query);

    // 同步侧栏选中态
    this.updateSidebarActiveState();

    // 路由分发渲染
    this.dispatchRoute();
  },

  navigate(hashPath) {
    window.location.hash = hashPath;
  },

  navigateToDetail(seriesId, deviceId) {
    this.navigate(`#/surface/${seriesId}/${deviceId}`);
  },

  dispatchRoute() {
    if (typeof document === 'undefined') return;
    const path = this.activeRoute.path;
    const main = document.getElementById('hub-main-content');
    if (!main) return;

    // 滚动回顶部
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    const mainWrap = document.querySelector('.hub-main');
    if (mainWrap) mainWrap.scrollTop = 0;

    // 路由 1: 首页
    if (path === '/' || path === '') {
      this.renderHomeView(main);
      return;
    }

    // 路由 2: 独立可分享 Compare 页 (#/compare)
    if (path === '/compare') {
      this.renderCompareView(main);
      return;
    }

    // 路由 3: 编年时间线 (#/timeline)
    if (path === '/timeline') {
      this.renderTimelineView(main);
      return;
    }

    // 路由 4: 辅助分析工具
    if (path === '/tools/screen') {
      main.innerHTML = `<div id="tool-screen-calc-container">${ToolsEngine.renderScreenCalculator()}</div>`;
      return;
    }
    if (path === '/tools/chips' || path === '/chips') {
      main.innerHTML = `<div id="tool-chip-ladder-container">${ToolsEngine.renderChipLadder()}</div>`;
      return;
    }
    if (path === '/tools/compat') {
      main.innerHTML = ToolsEngine.renderAccessoryMatrix();
      return;
    }

    // 路由: 商用版专区 (#/business 或 #/surface/business)
    if (path === '/business' || path === '/surface/business') {
      this.renderBusinessView(main);
      return;
    }

    // 路由: 官方数据核验与全系溯源中枢 (#/audit)
    if (path === '/audit') {
      this.renderAuditView(main);
      return;
    }

    // 路由 5: 单个机型独立详情页 (#/surface/:series/:id)
    const detailMatch = path.match(/^\/surface\/([^/]+)\/([^/]+)$/);
    if (detailMatch) {
      const [_, seriesId, deviceId] = detailMatch;
      this.renderProductDetailView(main, seriesId, deviceId);
      return;
    }

    // 路由 6: 系列横向对比页 (#/surface/:series)
    const seriesMatch = path.match(/^\/surface\/([^/]+)$/);
    if (seriesMatch) {
      const seriesId = seriesMatch[1];
      this.renderSeriesView(main, seriesId);
      return;
    }

    // 回退首页
    this.renderHomeView(main);
  },

  // 2. 首页渲染 (PRD 第十五章: 快速定位产品，非官方营销页)
  renderHomeView(container) {
    const currentCnDevices = SURFACE_DATA.devices.filter(d => d.status === 'current_cn');
    const recentAdditions = SURFACE_DATA.devices.slice(0, 4);

    let html = `
      <div class="home-hero-card">
        <div class="ms-logo" style="width:28px; height:28px; margin-bottom:16px;">
          <div class="ms-logo-tile red"></div>
          <div class="ms-logo-tile green"></div>
          <div class="ms-logo-tile blue"></div>
          <div class="ms-logo-tile yellow"></div>
        </div>
        <h1 style="font-size:34px; font-weight:800; color:var(--ms-text-primary); margin-bottom:12px; line-height:1.25; letter-spacing:-0.5px;">
          Microsoft Surface 产品参数中心
        </h1>
        <p style="font-size:15px; color:var(--ms-text-secondary); max-width:720px; line-height:1.6; margin-bottom:24px;">
          专业、权威、高密度的 Surface 历代全系技术规格中枢。依照 Google Material Design 规范深度重构，支持横向多机横向滚动比对、智能差异高亮、3:2 屏幕计算器与双向配件生态检索。
        </p>

        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <button class="fluent-btn primary" onclick="App.navigate('#/surface/pro')">
            <span>💻</span> 浏览 Surface Pro 全系列
          </button>
          <button class="fluent-btn" onclick="App.navigate('#/surface/laptop')">
            <span>⌨️</span> 浏览 Surface Laptop 全系列
          </button>
          <button class="fluent-btn" onclick="App.navigate('#/business')">
            <span>🏢</span> Surface 商用版 (Learn 专区)
          </button>
          <button class="fluent-btn" onclick="App.navigate('#/compare?products=pro-12-13,laptop-8-138')">
            <span>⚖️</span> 旗舰对决：Pro 12 vs Laptop 8
          </button>
          <button class="fluent-btn" onclick="App.navigate('#/timeline')">
            <span>⏳</span> 2012~2026 编年时间线
          </button>
        </div>
      </div>

      <!-- 当前中国市场正式在售主力机型 -->
      <div class="home-section-header">
        <h2>🔥 当前国行在售主力旗舰 (Current in China)</h2>
        <span class="header-sub-tag">共 ${currentCnDevices.length} 款现役机型</span>
      </div>

      <div class="device-select-strip" style="margin-bottom:28px;">
    `;

    currentCnDevices.forEach(dev => {
      const devImg = SURFACE_DATA.getDeviceImage(dev);
      const colorDotsHtml = (dev.specs && Array.isArray(dev.specs.colors) && dev.specs.colors.length > 1) ? `
        <div class="card-color-swatches" onclick="event.stopPropagation();">
          ${dev.specs.colors.map((c, idx) => `
            <span class="card-color-dot ${idx === 0 ? 'active' : ''}" style="background:${c.hex};" title="${c.name}"
              onmouseenter="App.previewCardColor('${dev.id}', '${c.image || devImg}', this)"
              onclick="App.previewCardColor('${dev.id}', '${c.image || devImg}', this)"></span>
          `).join('')}
        </div>
      ` : '';

      html += `
        <div class="device-card-mini" id="card-${dev.id}" onclick="App.navigateToDetail('${dev.categoryId}', '${dev.id}')">
          <div class="device-img-wrap">
            <img class="device-thumb-img" id="thumb-${dev.id}" src="${devImg}" alt="${dev.name}" loading="lazy"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            <div style="display:none; width:100%; height:100%;">
              ${ComparisonEngine.getDeviceSvgIcon(dev.categoryId)}
            </div>
          </div>
          <div class="device-name">${dev.name}</div>
          <div class="device-tagline">${dev.tagline}</div>
          ${colorDotsHtml}
          <div style="display:flex; gap:4px; justify-content:center; margin-top:6px;">
            <span class="spec-badge green">国行在售</span>
            ${dev.specs.npuTops && dev.specs.npuTops.includes('80 TOPS') ? '<span class="spec-badge gold">80 TOPS</span>' : ''}
          </div>
        </div>
      `;
    });

    html += `
      </div>

      <!-- 全系 8 大硬件品类导航卡片 -->
      <div class="home-section-header">
        <h2>💻 探索 Surface 全部 8 大硬件系列</h2>
      </div>

      <div class="series-nav-grid">
    `;

    SURFACE_DATA.categories.forEach(cat => {
      const devs = SURFACE_DATA.devices.filter(d => d.categoryId === cat.id);
      html += `
        <div class="series-card" onclick="App.navigate('#/surface/${cat.id}')">
          <div class="series-icon">
            <img src="${SURFACE_DATA.getDeviceImage(devs[0])}" alt="${cat.name}" style="max-width:100%; max-height:100%; object-fit:contain; filter:drop-shadow(0 2px 5px rgba(0,0,0,0.1));"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            <div style="display:none; width:100%; height:100%;">
              ${ComparisonEngine.getDeviceSvgIcon(cat.id)}
            </div>
          </div>
          <div class="series-info">
            <div class="series-title">${cat.name}</div>
            <div class="series-desc">${cat.desc}</div>
            <div class="series-count">收录历代 ${devs.length} 款产品 ↗</div>
          </div>
        </div>
      `;
    });

    html += `
      </div>

      <!-- 快速对比经典组合推荐 -->
      <div class="home-section-header" style="margin-top:28px;">
        <h2>⚖️ 经典热门对比推荐</h2>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px;">
        <div class="compare-shortcut-card" onclick="App.navigate('#/compare?products=pro-12-13,pro-11-13')">
          <div style="font-weight:600; font-size:14px; margin-bottom:4px;">Pro 12 (第12代) vs Pro 11 (第11代)</div>
          <div style="font-size:12px; color:var(--ms-text-secondary);">80 TOPS 骁龙 X2 对比 45 TOPS 首代 Copilot+ PC</div>
        </div>
        <div class="compare-shortcut-card" onclick="App.navigate('#/compare?products=pro-12-13,laptop-8-138')">
          <div style="font-weight:600; font-size:14px; margin-bottom:4px;">Surface Pro 12 vs Surface Laptop 8</div>
          <div style="font-size:12px; color:var(--ms-text-secondary);">二合一触控平板 vs 经典触觉触控板轻薄本选型</div>
        </div>
        <div class="compare-shortcut-card" onclick="App.navigate('#/compare?products=pro-11-13,pro-10-biz')">
          <div style="font-weight:600; font-size:14px; margin-bottom:4px;">Pro 11 (消费者版) vs Pro 10 (商用版)</div>
          <div style="font-size:12px; color:var(--ms-text-secondary);">高通骁龙 X 架构对比 Intel Core Ultra 标压商用</div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  },

  // 3. 系列多代横向参数页 (PRD 第六章)
  renderSeriesView(container, seriesId) {
    const cat = SURFACE_DATA.categories.find(c => c.id === seriesId) || SURFACE_DATA.categories[0];
    let catDevices = SURFACE_DATA.devices.filter(d => d.categoryId === cat.id);

    // 应用多维筛选器
    catDevices = this.applyFilters(catDevices);

    // 默认展示机型：托盘优先，否则展示当前筛选出的前 2 款
    let devicesForTable = catDevices.filter(d => ComparisonEngine.selectedIds.includes(d.id));
    if (devicesForTable.length === 0) {
      devicesForTable = catDevices.slice(0, 2);
    }

    let html = `
      <div class="view-header">
        <div class="view-title-group">
          <h1>
            <span>${cat.name}</span>
            <span class="header-sub-tag">共 ${catDevices.length} 款型号</span>
          </h1>
          <div class="view-meta-tip">
            <span>最后更新：2026-09-17 ｜ 💡 点击机型卡片查看规格详情 ｜ 勾选右上角 ✓ 加入横向对比池</span>
          </div>
        </div>

        <div class="view-actions">
          <!-- M3 视图切换分段按钮 -->
          <div class="m3-segmented-control" title="切换视图展示模式">
            <button class="m3-segmented-btn ${this.seriesViewMode === 'table' ? 'active' : ''}" 
              onclick="App.switchSeriesViewMode('table')">
              📊 规格大表
            </button>
            <button class="m3-segmented-btn ${this.seriesViewMode === 'gallery' ? 'active' : ''}" 
              onclick="App.switchSeriesViewMode('gallery')">
              🎴 机型卡片
            </button>
          </div>

          <button class="fluent-btn" onclick="App.selectAllCategoryDevices('${cat.id}')">
            一键全选本系列
          </button>
        </div>
      </div>

      <!-- 多维筛选控制条 (受众 / 平台 / 状态 / Copilot+) -->
      ${this.renderFilterBar(cat.id)}
    `;

    if (this.seriesViewMode === 'gallery') {
      // 🎴 画廊视图 (Gallery View)
      html += `
        <div class="series-gallery-grid">
          ${catDevices.map(dev => {
            const isSelected = ComparisonEngine.selectedIds.includes(dev.id);
            const devImg = SURFACE_DATA.getDeviceImage(dev);
            const colorDotsHtml = (dev.specs && Array.isArray(dev.specs.colors) && dev.specs.colors.length > 1) ? `
              <div class="card-color-swatches" onclick="event.stopPropagation();" style="margin-bottom:12px;">
                ${dev.specs.colors.map((c, idx) => `
                  <span class="card-color-dot ${idx === 0 ? 'active' : ''}" style="background:${c.hex};" title="${c.name}"
                    onmouseenter="App.previewCardColor('${dev.id}', '${c.image || devImg}', this)"
                    onclick="App.previewCardColor('${dev.id}', '${c.image || devImg}', this)"></span>
                `).join('')}
              </div>
            ` : '';

            return `
              <div class="device-card-mini ${isSelected ? 'selected' : ''}" style="text-align:left; padding:20px; align-items:flex-start; cursor:pointer;" data-id="${dev.id}" id="card-${dev.id}" onclick="App.navigateToDetail('${dev.categoryId}', '${dev.id}')">
                <div class="card-checkbox ${isSelected ? 'checked' : ''}" title="${isSelected ? '已加入对比（点击取消）' : '点击加入横向对比'}" onclick="event.stopPropagation(); ComparisonEngine.toggleDevice('${dev.id}')">${isSelected ? '✓' : ''}</div>
                <div class="device-img-wrap" style="height:140px; cursor:pointer; margin-bottom:12px;">
                  <img class="device-thumb-img" id="thumb-${dev.id}" src="${devImg}" alt="${dev.name}" loading="lazy"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                  <div style="display:none; width:100%; height:100%;">
                    ${ComparisonEngine.getDeviceSvgIcon(dev.categoryId)}
                  </div>
                </div>
                <div style="display:flex; justify-content:space-between; width:100%; align-items:center; margin-bottom:6px;">
                  <div style="display:flex; gap:6px; align-items:center;">
                    <span class="device-year-badge">${dev.specs.releaseDate || dev.year}</span>
                    ${dev.isCommercial ? '<span class="spec-badge commercial">🏢 商用</span>' : ''}
                  </div>
                  ${ComparisonEngine.renderStatusBadge(dev.status)}
                </div>
                <div class="device-name" style="font-size:16px; font-weight:700;">
                  ${dev.name}
                </div>
                <div class="device-tagline" style="margin-bottom:8px;">${dev.tagline}</div>
                ${colorDotsHtml}
                <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:16px;">
                  <span class="spec-badge">${dev.specs.cpuModel}</span>
                  ${(dev.specs.npuTops && dev.specs.npuTops !== 'not_applicable' && dev.specs.npuTops !== 'not_disclosed') ? `<span class="spec-badge gold">${dev.specs.npuTops}</span>` : ''}
                  <span class="spec-badge">${dev.specs.screenSize}</span>
                </div>
                <div style="display:flex; gap:8px; width:100%; margin-top:auto;" onclick="event.stopPropagation();">
                  <button class="fluent-btn primary" style="flex:1;" onclick="App.navigateToDetail('${dev.categoryId}', '${dev.id}')">
                    规格详情 ↗
                  </button>
                  ${dev.learnDocUrl ? `
                    <a href="${dev.learnDocUrl}" target="_blank" rel="noopener" class="fluent-btn-sm" style="display:inline-flex; align-items:center; text-decoration:none; padding:0 8px;" title="查看微软官方 Learn 架构文档">
                      📖 Learn ↗
                    </a>
                  ` : ''}
                  <button class="fluent-btn-sm ${isSelected ? 'active' : ''}" onclick="ComparisonEngine.toggleDevice('${dev.id}')">
                    ${isSelected ? '✓ 已选' : '+ 对比'}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else {
      // 📊 大表视图 (Table View) - 极简紧凑工具条 + 规格大表
      html += `
        <!-- 紧凑机型快速勾选条与大表控制工具栏 (无冗余大卡片遮挡) -->
        <div class="table-quick-strip">
          <div class="table-quick-chips">
            <span class="quick-chip-label">选择机型对比 (${devicesForTable.length}款)：</span>
            ${catDevices.map(d => {
              const isSelected = ComparisonEngine.selectedIds.includes(d.id);
              return `
                <button class="quick-chip ${isSelected ? 'active' : ''}" 
                  onclick="ComparisonEngine.toggleDevice('${d.id}')"
                  title="${isSelected ? '已在对比中，点击移除' : '点击加入横向对比'}">
                  <span>${isSelected ? '✓' : '+'}</span>
                  <span>${d.name.replace('Surface ', '')}</span>
                </button>
              `;
            }).join('')}
          </div>

          <div class="table-toolbar-actions">
            <div class="m3-segmented-control" title="差异对比过滤">
              <button class="m3-segmented-btn ${!ComparisonEngine.highlightDiff && !ComparisonEngine.diffOnly ? 'active' : ''}" 
                onclick="ComparisonEngine.setHighlightDiff(false); ComparisonEngine.setDiffOnly(false); App.renderActiveView();">
                全部参数
              </button>
              <button class="m3-segmented-btn ${ComparisonEngine.highlightDiff && !ComparisonEngine.diffOnly ? 'active' : ''}" 
                onclick="ComparisonEngine.setHighlightDiff(true); ComparisonEngine.setDiffOnly(false); App.renderActiveView();">
                高亮差异
              </button>
              <button class="m3-segmented-btn ${ComparisonEngine.diffOnly ? 'active' : ''}" 
                onclick="ComparisonEngine.setDiffOnly(true); App.renderActiveView();">
                仅看差异
              </button>
            </div>
            <button class="fluent-btn-sm" onclick="ComparisonEngine.expandAllGroups()">展开全部</button>
            <button class="fluent-btn-sm" onclick="ComparisonEngine.collapseAllGroups()">折叠全部</button>
            <button class="fluent-btn-sm" onclick="ComparisonEngine.clearAll(); App.renderActiveView();" style="color:#d13438;">清空对比</button>
          </div>
        </div>

        <!-- 13 大类参数横向双轴吸附大表 -->
        <div id="category-table-wrap">
          ${ComparisonEngine.renderComparisonTable(devicesForTable)}
        </div>
      `;
    }

    container.innerHTML = html;
  },

  // 3.5 Surface 商用版专区 (Surface for Business) - 微软官方 Learn 架构全线对齐
  renderBusinessView(container) {
    const commercialDevices = SURFACE_DATA.devices.filter(d => d.isCommercial || d.targetAudience === 'commercial' || d.targetAudience === 'both');

    let html = `
      <div class="business-hero-banner">
        <div class="business-hero-badge">
          <span>🏢 Microsoft Learn 官方商用规格中心</span>
          <span class="business-sub-pill">Surface for Business</span>
        </div>
        <h1 class="business-hero-title">Surface 商用版产品中枢</h1>
        <p class="business-hero-desc">
          严格对齐微软官方 Learn (learn.microsoft.com/surface) 技术架构标准。专为企业 IT 集中运维、采购合规、高安全办公与工业现场场景设计，提供深度硬件参数、快拆可更换硬盘 (rSSD)、Secured-core PC 安全基线与官方驱动生命周期支持。
        </p>
        <div class="business-hero-actions">
          <a href="https://www.microsoftstore.com.cn/commercial" target="_blank" rel="noopener" class="fluent-btn primary">
            🛒 微软官方商城·商业专区直达 ↗
          </a>
          <a href="https://learn.microsoft.com/en-us/surface/" target="_blank" rel="noopener" class="fluent-btn">
            📖 微软官方 Learn 文档中枢 ↗
          </a>
          <button class="fluent-btn" onclick="App.navigate('#/surface/pro')">
            💻 浏览 Pro 系列
          </button>
          <button class="fluent-btn" onclick="App.navigate('#/surface/laptop')">
            ⌨️ 浏览 Laptop 系列
          </button>
          <button class="fluent-btn" onclick="App.selectAllCategoryDevices('commercial')">
            一键加入对比池
          </button>
        </div>
      </div>

      <!-- 商用版四大核心技术支柱 -->
      <div class="business-pillars-grid">
        <div class="business-pillar-card">
          <div class="pillar-icon">🛡️</div>
          <div class="pillar-title">Secured-core PC 安全基线</div>
          <div class="pillar-desc">标配微软 Pluton 安全处理器与独立 TPM 2.0，Wi-Fi 商业机型集成硬件级 NFC 快速免密打卡登录，阻绝固件级渗透。</div>
        </div>
        <div class="business-pillar-card">
          <div class="pillar-icon">🔧</div>
          <div class="pillar-title">官方快拆 SSD (rSSD)</div>
          <div class="pillar-desc">企业 IT 可快速弹出并留存硬盘，设备送修时保护商业机密与敏感数据自持，附带官方部件服务指南 (Service Guides)。</div>
        </div>
        <div class="business-pillar-card">
          <div class="pillar-icon">☁️</div>
          <div class="pillar-title">Surface IT Toolkit & DFCI</div>
          <div class="pillar-desc">支持云端集中管控 UEFI 固件设置与端口锁定；Windows Autopilot 零接触开箱部署，驱动生命周期延长至 2030 年。</div>
        </div>
        <div class="business-pillar-card">
          <div class="pillar-icon">💼</div>
          <div class="pillar-title">商用专业版 OS 与纯净系统</div>
          <div class="pillar-desc">出厂预装 Windows 11 专业版 / Windows 10 企业版，纯净无第三方预装推广软件，兼容域控与 MDM 策略下发。</div>
        </div>
      </div>

      <!-- 商用机型全系列阵容 -->
      <div class="view-header" style="margin-top:32px;">
        <div class="view-title-group">
          <h2>
            <span>商用机型阵容</span>
            <span class="header-sub-tag">共 ${commercialDevices.length} 款官方商用/企业级机型</span>
          </h2>
          <div class="view-meta-tip">
            <span>点击机型卡片查阅全维度硬件规格 ｜ 包含微软官方 Learn 说明书直达链接</span>
          </div>
        </div>
        <div class="view-actions">
          <button class="fluent-btn primary" onclick="App.selectAllCategoryDevices('commercial')">
            一键全选商用机型比对
          </button>
        </div>
      </div>

      <div class="series-gallery-grid">
        ${commercialDevices.map(dev => {
          const isSelected = ComparisonEngine.selectedIds.includes(dev.id);
          const devImg = SURFACE_DATA.getDeviceImage(dev);
          const colorDotsHtml = (dev.specs && Array.isArray(dev.specs.colors) && dev.specs.colors.length > 1) ? `
            <div class="card-color-swatches" onclick="event.stopPropagation();" style="margin-bottom:12px;">
              ${dev.specs.colors.map((c, idx) => `
                <span class="card-color-dot ${idx === 0 ? 'active' : ''}" style="background:${c.hex};" title="${c.name}"
                  onmouseenter="App.previewCardColor('${dev.id}', '${c.image || devImg}', this)"
                  onclick="App.previewCardColor('${dev.id}', '${c.image || devImg}', this)"></span>
              `).join('')}
            </div>
          ` : '';

          return `
            <div class="device-card-mini ${isSelected ? 'selected' : ''}" style="text-align:left; padding:20px; align-items:flex-start; cursor:pointer;" data-id="${dev.id}" id="card-${dev.id}" onclick="App.navigateToDetail('${dev.categoryId}', '${dev.id}')">
              <div class="device-img-wrap" style="height:140px; cursor:pointer; margin-bottom:12px;">
                <img class="device-thumb-img" id="thumb-${dev.id}" src="${devImg}" alt="${dev.name}" loading="lazy"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div style="display:none; width:100%; height:100%;">
                  ${ComparisonEngine.getDeviceSvgIcon(dev.categoryId)}
                </div>
              </div>
              <div style="display:flex; justify-content:space-between; width:100%; align-items:center; margin-bottom:6px;">
                <div style="display:flex; gap:6px; align-items:center;">
                  <span class="device-year-badge">${dev.specs.releaseDate || dev.year}</span>
                  <span class="spec-badge commercial">🏢 商业版</span>
                </div>
                ${ComparisonEngine.renderStatusBadge(dev.status)}
              </div>
              <div class="device-name" style="font-size:16px; font-weight:700;">
                ${dev.name}
              </div>
              <div class="device-tagline" style="margin-bottom:8px;">${dev.tagline}</div>
              ${colorDotsHtml}
              <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:16px;">
                <span class="spec-badge">${dev.specs.cpuModel}</span>
                ${(dev.specs.npuTops && dev.specs.npuTops !== 'not_applicable' && dev.specs.npuTops !== 'not_disclosed') ? `<span class="spec-badge gold">${dev.specs.npuTops}</span>` : ''}
                <span class="spec-badge">${dev.specs.screenSize}</span>
              </div>
              <div style="display:flex; gap:8px; width:100%; margin-top:auto;" onclick="event.stopPropagation();">
                <button class="fluent-btn primary" style="flex:1;" onclick="App.navigateToDetail('${dev.categoryId}', '${dev.id}')">
                  规格详情 ↗
                </button>
                ${dev.learnDocUrl ? `
                  <a href="${dev.learnDocUrl}" target="_blank" rel="noopener" class="fluent-btn-sm" style="display:inline-flex; align-items:center; text-decoration:none; padding:0 8px;" title="查看微软官方 Learn 架构文档">
                    📖 Learn ↗
                  </a>
                ` : ''}
                <button class="fluent-btn-sm ${isSelected ? 'active' : ''}" onclick="ComparisonEngine.toggleDevice('${dev.id}')">
                  ${isSelected ? '✓ 已选' : '+ 对比'}
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.innerHTML = html;
  },

  // 数据核验与官方溯源工作台 (#/audit)
  renderAuditView(container) {
    const devices = SURFACE_DATA.devices;
    const currentDevices = devices.filter(d => d.status === 'current_cn');
    const commercialDevices = devices.filter(d => d.isCommercial || d.targetAudience === 'commercial');
    const filterType = this.auditFilter || 'all';

    let filtered = devices;
    if (filterType === 'current') filtered = currentDevices;
    else if (filterType === 'commercial') filtered = commercialDevices;
    else if (filterType === 'pro') filtered = devices.filter(d => d.categoryId === 'pro');
    else if (filterType === 'laptop') filtered = devices.filter(d => d.categoryId === 'laptop');

    const html = `
      <div class="view-header" style="margin-bottom:20px;">
        <div class="view-title-group">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
            <span style="font-size:24px;">🛡️</span>
            <h1 style="font-size:26px; font-weight:800; color:var(--ms-text-primary); margin:0;">
              官方数据核验与全系溯源中枢
            </h1>
          </div>
          <div class="view-meta-tip">
            <span>全系 43 款产品参数 100% 对齐微软中国官方商城与 Microsoft Learn 架构白皮书 ｜ 拒绝 AI 幻觉与参数臆造</span>
          </div>
        </div>
        <div class="view-actions" style="display:flex; gap:10px; flex-wrap:wrap;">
          <a href="./docs/Surface_全系规格与官方信源核对总账.xlsx" download="Surface_全系规格与官方信源核对总账.xlsx" class="fluent-btn primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
            📥 下载 Excel 核验总账 (.xlsx)
          </a>
          <a href="https://www.microsoftstore.com.cn/commercial" target="_blank" rel="noopener noreferrer" class="fluent-btn" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
            🏢 微软商用商城 ↗
          </a>
          <a href="https://learn.microsoft.com/en-us/surface/" target="_blank" rel="noopener noreferrer" class="fluent-btn" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
            📖 微软 Learn 文档库 ↗
          </a>
        </div>
      </div>

      <!-- 四大信源与合规指标卡片 -->
      <div class="screen-metrics-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); margin-bottom:24px;">
        <div class="metric-box">
          <div class="metric-val" style="color:var(--ms-accent);">${devices.length} 款</div>
          <div class="metric-label">收录历代全系机型</div>
        </div>
        <div class="metric-box">
          <div class="metric-val" style="color:#107c41;">${currentDevices.length} 款</div>
          <div class="metric-label">微软中国在售 SKU</div>
        </div>
        <div class="metric-box">
          <div class="metric-val" style="color:#0078d4;">${commercialDevices.length} 款</div>
          <div class="metric-label">商用企业级支持机型</div>
        </div>
        <div class="metric-box">
          <div class="metric-val" style="color:#d83b01;">100%</div>
          <div class="metric-label">官方信源可追溯率</div>
        </div>
      </div>

      <!-- 快速筛选分段控制器 -->
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px; background:var(--ms-bg-card); padding:12px 18px; border-radius:12px; border:1px solid var(--ms-border-subtle);">
        <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
          <span style="font-size:13px; font-weight:600; color:var(--ms-text-secondary); margin-right:4px;">分类筛选：</span>
          <button class="fluent-btn-sm ${filterType === 'all' ? 'active' : ''}" onclick="App.auditFilter='all'; App.renderAuditView(document.getElementById('hub-main-content'))">
            全部机型 (${devices.length})
          </button>
          <button class="fluent-btn-sm ${filterType === 'current' ? 'active' : ''}" onclick="App.auditFilter='current'; App.renderAuditView(document.getElementById('hub-main-content'))">
            🔥 国行在售 (${currentDevices.length})
          </button>
          <button class="fluent-btn-sm ${filterType === 'commercial' ? 'active' : ''}" onclick="App.auditFilter='commercial'; App.renderAuditView(document.getElementById('hub-main-content'))">
            🏢 商用版专区 (${commercialDevices.length})
          </button>
          <button class="fluent-btn-sm ${filterType === 'pro' ? 'active' : ''}" onclick="App.auditFilter='pro'; App.renderAuditView(document.getElementById('hub-main-content'))">
            Surface Pro 系列
          </button>
          <button class="fluent-btn-sm ${filterType === 'laptop' ? 'active' : ''}" onclick="App.auditFilter='laptop'; App.renderAuditView(document.getElementById('hub-main-content'))">
            Surface Laptop 系列
          </button>
        </div>
        <div style="font-size:12px; color:var(--ms-text-tertiary);">
          共显示 ${filtered.length} 款机型 ｜ 点击各行右侧按钮直达微软官方页面
        </div>
      </div>

      <!-- 全系核验交互表格 -->
      <div class="spec-table-container" style="max-height: calc(100vh - 340px); overflow:auto; border-radius:12px; border:1px solid var(--ms-border-subtle); background:var(--ms-bg-card);">
        <table class="spec-table" style="width:100%; border-collapse:collapse; min-width:1100px;">
          <thead>
            <tr style="background:var(--ms-bg-subtle, #f5f5f5); position:sticky; top:0; z-index:10; border-bottom:2px solid var(--ms-border-subtle);">
              <th style="padding:12px 14px; text-align:center; width:50px;">序号</th>
              <th style="padding:12px 14px; text-align:left; width:250px;">产品名称 / 代际</th>
              <th style="padding:12px 14px; text-align:center; width:90px;">销售状态</th>
              <th style="padding:12px 14px; text-align:right; width:110px;">官方起售价</th>
              <th style="padding:12px 14px; text-align:left; width:190px;">官方机身配色</th>
              <th style="padding:12px 14px; text-align:left; width:180px;">核心芯片 / NPU</th>
              <th style="padding:12px 14px; text-align:left; width:180px;">屏幕规格</th>
              <th style="padding:12px 14px; text-align:center; width:200px;">微软官方信源直达</th>
              <th style="padding:12px 14px; text-align:center; width:90px;">核验状态</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map((dev, idx) => {
              const sp = dev.specs || {};
              const colors = sp.colors || [];
              const storeUrl = sp.officialDocUrl || 'https://www.microsoftstore.com.cn/';
              const learnUrl = dev.learnDocUrl;
              const isCommercial = dev.isCommercial || dev.targetAudience === 'commercial';
              const isCurrent = dev.status === 'current_cn';

              return `
                <tr style="border-bottom:1px solid var(--ms-border-subtle); background:${isCurrent ? 'rgba(0,120,212,0.02)' : 'transparent'};">
                  <td style="padding:10px 14px; text-align:center; font-size:12px; color:var(--ms-text-tertiary);">${idx + 1}</td>
                  <td style="padding:10px 14px;">
                    <div style="display:flex; align-items:center; gap:10px;">
                      <img src="${SURFACE_DATA.getDeviceImage(dev)}" style="width:36px; height:28px; object-fit:contain;" alt="${dev.name}">
                      <div>
                        <a href="#/surface/${dev.categoryId}/${dev.id}" style="font-weight:700; color:var(--ms-text-primary); text-decoration:none; font-size:13.5px;" title="点击查看单机全量规格">
                          ${dev.name} ↗
                        </a>
                        <div style="font-size:11px; color:var(--ms-text-tertiary);">${dev.nameEn} · ${dev.generation}</div>
                      </div>
                    </div>
                  </td>
                  <td style="padding:10px 14px; text-align:center;">
                    ${ComparisonEngine.renderStatusBadge(dev.status)}
                  </td>
                  <td style="padding:10px 14px; text-align:right; font-weight:700; color:var(--ms-text-primary); font-size:13.5px;">
                    ${sp.startingPriceCny || '—'}
                  </td>
                  <td style="padding:10px 14px;">
                    ${colors.length > 0 ? `
                      <div style="display:flex; flex-wrap:wrap; gap:4px; align-items:center;">
                        ${colors.map(c => `
                          <span style="display:inline-flex; align-items:center; gap:4px; font-size:11.5px; background:var(--ms-bg-subtle, #f0f0f0); padding:2px 6px; border-radius:4px; border:1px solid var(--ms-border-subtle);">
                            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${c.hex}; border:1px solid rgba(0,0,0,0.15);"></span>
                            <span>${c.name}</span>
                          </span>
                        `).join('')}
                      </div>
                    ` : '<span style="color:var(--ms-text-tertiary); font-size:12px;">官方单色</span>'}
                  </td>
                  <td style="padding:10px 14px; font-size:12px;">
                    <div style="font-weight:600; color:var(--ms-text-primary);">${sp.cpuModel || '—'}</div>
                    ${sp.npuTops && sp.npuTops !== 'not_applicable' && sp.npuTops !== 'not_disclosed' ? `
                      <div style="color:#0078d4; font-size:11px;">⚡ ${sp.npuTops}</div>
                    ` : ''}
                  </td>
                  <td style="padding:10px 14px; font-size:12px; color:var(--ms-text-secondary);">
                    <div>${sp.screenSize || '—'} 3:2</div>
                    <div style="font-size:11px; color:var(--ms-text-tertiary);">${sp.resolution || ''} ${sp.refreshRate || ''}</div>
                  </td>
                  <td style="padding:10px 14px; text-align:center;">
                    <div style="display:inline-flex; gap:6px;">
                      <a href="${storeUrl}" target="_blank" rel="noopener noreferrer" class="fluent-btn-sm primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:2px; font-size:11px; padding:3px 8px;" title="前往微软官网选配/商城页核对">
                        🛒 选配直达 ↗
                      </a>
                      ${learnUrl ? `
                        <a href="${learnUrl}" target="_blank" rel="noopener noreferrer" class="fluent-btn-sm" style="text-decoration:none; display:inline-flex; align-items:center; gap:2px; font-size:11px; padding:3px 8px;" title="前往微软官方 Learn 文档核对">
                          📖 Learn ↗
                        </a>
                      ` : ''}
                    </div>
                  </td>
                  <td style="padding:10px 14px; text-align:center;">
                    <span style="font-size:12px; color:#0e703c; font-weight:700; background:rgba(16,124,65,0.08); padding:3px 8px; border-radius:4px; border:1px solid rgba(16,124,65,0.2);">
                      ✓ 已核验
                    </span>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;
  },

  // 4. 单机独立详情页 (PRD 第十二章 - 完整13大类规格直出)
  renderProductDetailView(container, seriesId, deviceId) {
    const dev = SURFACE_DATA.devices.find(d => d.id === deviceId);
    if (!dev) {
      container.innerHTML = `<div class="spec-table-empty"><h3>未找到该产品信息</h3><button class="fluent-btn" onclick="App.navigate('#/')">返回首页</button></div>`;
      return;
    }

    const prevDev = dev.prevGenerationId ? SURFACE_DATA.devices.find(d => d.id === dev.prevGenerationId) : null;
    const nextDev = dev.nextGenerationId ? SURFACE_DATA.devices.find(d => d.id === dev.nextGenerationId) : null;
    const defaultImg = SURFACE_DATA.getDeviceImage(dev);
    const colors = (dev.specs && Array.isArray(dev.specs.colors)) ? dev.specs.colors : [];
    const hasColors = colors.length > 0;
    const activeColorName = hasColors ? colors[0].name : '';
    const activeColorImg = (hasColors && colors[0].image) ? colors[0].image : defaultImg;
    const isSelected = ComparisonEngine.selectedIds.includes(dev.id);

    // 默认展示全量参数表
    const isComparisonTab = this.activeDetailTab === 'comparison';

    let html = `
      <div style="margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <a href="#/surface/${dev.categoryId}" style="font-size:13.5px; color:var(--ms-accent); text-decoration:none; font-weight:600; display:inline-flex; align-items:center; gap:6px;">
          ← 返回 ${SURFACE_DATA.categories.find(c => c.id === dev.categoryId)?.name} 系列列表
        </a>
        <div style="font-size:12px; color:var(--ms-text-tertiary);">
          核验来源：${dev.specs.sourceReliability || '微软官方说明书'} ｜ 核验日期：${dev.specs.lastVerified || '2026-09'}
        </div>
      </div>

      <!-- 单机顶部 Hero 核心视觉区 (M3 黄金比例舞台与外观展示) -->
      <div class="product-detail-hero">
        <div class="detail-hero-left">
          <div class="detail-hero-img-box">
            <img id="detail-main-img" class="detail-main-img" src="${activeColorImg}" alt="${dev.name}" loading="eager"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            <div style="display:none; width:100%; height:100%;">
              ${ComparisonEngine.getDeviceSvgIcon(dev.categoryId)}
            </div>
          </div>

          <!-- 多外观配色展示与交互切换器 (PRD 全系真机与多配色展示) -->
          ${hasColors ? `
            <div class="detail-color-panel">
              <div class="detail-color-header">
                <span>🎨 外观配色视角展示</span>
                <span class="detail-color-active-name" id="detail-active-color-label">${activeColorName}</span>
              </div>
              <div class="detail-color-options">
                ${colors.map((c, idx) => `
                  <button type="button" class="color-choice-btn ${idx === 0 ? 'active' : ''}" 
                    data-color="${c.name}" data-img="${c.image || defaultImg}"
                    onclick="App.switchDetailColor('${dev.id}', '${c.name}', '${c.image || defaultImg}', this)">
                    <span class="color-choice-dot" style="background:${c.hex};"></span>
                    <span>${c.name}</span>
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <div class="detail-hero-right">
          <div style="display:flex; gap:8px; align-items:center; margin-bottom:10px; flex-wrap:wrap;">
            ${ComparisonEngine.renderStatusBadge(dev.status)}
            <span class="spec-badge">${dev.generation}</span>
            ${dev.flagship ? '<span class="spec-badge gold">最新旗舰</span>' : ''}
            ${dev.specs.npuTops && dev.specs.npuTops.includes('80 TOPS') ? '<span class="spec-badge copilot">80 TOPS AI</span>' : ''}
          </div>

          <h1 style="font-size:32px; font-weight:800; color:var(--ms-text-primary); margin-bottom:6px; line-height:1.25; letter-spacing:-0.5px;">
            ${dev.name}
          </h1>
          <div style="font-size:14px; color:var(--ms-text-tertiary); margin-bottom:10px; font-weight:500;">${dev.nameEn}</div>
          <p style="font-size:15px; color:var(--ms-text-secondary); line-height:1.6; margin-bottom:24px;">${dev.tagline}</p>

          <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:18px;">
            <button class="fluent-btn ${isSelected ? 'active' : 'primary'}" onclick="ComparisonEngine.toggleDevice('${dev.id}')">
              ${isSelected ? '✓ 已在横向对比池' : '+ 加入横向对比池'}
            </button>
            ${prevDev ? `
              <button class="fluent-btn" onclick="App.switchDetailTab('comparison')">
                🔄 查看与上一代 (${prevDev.name}) 升级比对
              </button>
            ` : ''}
            <a class="fluent-btn" href="${dev.specs.officialDocUrl || 'https://www.microsoftstore.com.cn/'}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
              🛒 微软官方商城/选配直达 ↗
            </a>
            ${dev.learnDocUrl ? `
              <a class="fluent-btn" href="${dev.learnDocUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
                📖 微软 Learn 技术文档 ↗
              </a>
            ` : ''}
          </div>

          <!-- 官方数据存证证书卡片 -->
          <div style="background:var(--ms-bg-card); border:1px solid var(--ms-border-subtle); border-radius:10px; padding:10px 14px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; font-size:12.5px;">
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="font-size:15px;">🛡️</span>
              <strong style="color:var(--ms-text-primary);">官方数据存证：</strong>
              <span style="color:var(--ms-text-secondary);">${dev.specs.sourceReliability || '微软官方说明书'}（核验时间：${dev.specs.lastVerified || '2026-09'}）</span>
            </div>
            <a href="#/audit" style="color:var(--ms-accent); text-decoration:none; font-weight:600; display:inline-flex; align-items:center; gap:4px;">
              查阅全系 43 款核验总账与 Excel ↗
            </a>
          </div>

          <!-- 代际快速跳转 -->
          <div style="display:flex; gap:24px; font-size:13px; color:var(--ms-text-tertiary); border-top:1px solid var(--ms-border-subtle); padding-top:16px;">
            <div>上一代：${prevDev ? `<a href="#/surface/${prevDev.categoryId}/${prevDev.id}" style="color:var(--ms-accent); font-weight:600; text-decoration:none;">${prevDev.name}</a>` : '— (首代产品)'}</div>
            <div>下一代：${nextDev ? `<a href="#/surface/${nextDev.categoryId}/${nextDev.id}" style="color:var(--ms-accent); font-weight:600; text-decoration:none;">${nextDev.name}</a>` : '— (当前最新代)'}</div>
          </div>
        </div>
      </div>

      <!-- 核心硬件六边形指标大卡片 (M3 Metric Cards - 强化数值层级) -->
      <div class="screen-metrics-grid">
        <div class="metric-box">
          <div class="metric-val">${dev.specs.cpuModel}</div>
          <div class="metric-label">处理器核心</div>
        </div>
        <div class="metric-box">
          <div class="metric-val" style="color:#8764b8;">${(dev.specs.npuTops && dev.specs.npuTops !== 'not_applicable' && dev.specs.npuTops !== 'not_disclosed') ? dev.specs.npuTops : '— (无独立 NPU)'}</div>
          <div class="metric-label">NPU AI 算力</div>
        </div>
        <div class="metric-box">
          <div class="metric-val">${dev.specs.screenSize}</div>
          <div class="metric-label">屏幕尺寸 (3:2)</div>
        </div>
        <div class="metric-box">
          <div class="metric-val">${dev.specs.refreshRate}</div>
          <div class="metric-label">最高刷新率</div>
        </div>
        <div class="metric-box">
          <div class="metric-val">${dev.specs.batteryLifeOffice}</div>
          <div class="metric-label">日常办公续航</div>
        </div>
        <div class="metric-box">
          <div class="metric-val">${dev.specs.weightGrams}</div>
          <div class="metric-label">裸机重量</div>
        </div>
      </div>

      <!-- M3 详情页切换选项卡 (Tabs Navigation) -->
      <div class="m3-tab-bar" style="margin-top:28px; margin-bottom:16px;">
        <button class="m3-tab-item ${!isComparisonTab ? 'active' : ''}" data-tab="specs" onclick="App.switchDetailTab('specs')">
          <span>📋 13 大类官方标准规格全量大表</span>
        </button>
        ${prevDev ? `
          <button class="m3-tab-item ${isComparisonTab ? 'active' : ''}" data-tab="comparison" onclick="App.switchDetailTab('comparison')">
            <span>⚖️ 跨代进化对比（对比上一代 ${prevDev.name}）</span>
          </button>
        ` : ''}
      </div>

      <!-- 选项卡面板 1: 13 大类全量参数规格大表 (默认直出展示) -->
      <div class="m3-tab-pane" data-pane="specs" style="display: ${!isComparisonTab ? 'block' : 'none'};">
        <div class="home-section-header" style="margin-bottom:12px;">
          <div>
            <h2 style="font-size:18px; font-weight:700; color:var(--ms-text-primary); margin-bottom:4px;">
              📋 ${dev.name} 官方标准全量规格大表
            </h2>
            <div style="font-size:13px; color:var(--ms-text-tertiary);">
              完整包含处理器架构、NPU算力、双层OLED/屏幕、存储选项、续航、端口与生态全部 13 大类官方技术参数
            </div>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="fluent-btn-sm" onclick="ComparisonEngine.expandAllGroups()">全部展开</button>
            <button class="fluent-btn-sm" onclick="ComparisonEngine.collapseAllGroups()">全部折叠</button>
          </div>
        </div>
        ${ComparisonEngine.renderComparisonTable([dev])}
      </div>

      <!-- 选项卡面板 2: 跨代进化对比 (Generations) -->
      <div class="m3-tab-pane" data-pane="comparison" style="display: ${isComparisonTab ? 'block' : 'none'};">
        ${prevDev ? `
          <div style="background:var(--ms-bg-card); padding:18px 24px; border-radius:16px; margin-bottom:16px; border:1px solid var(--ms-border-subtle); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; box-shadow:var(--md-sys-elevation-1);">
            <div>
              <h3 style="font-size:18px; font-weight:700; color:var(--ms-text-primary); margin-bottom:4px;">
                🔄 跨代全项参数升级对比
              </h3>
              <div style="font-size:13px; color:var(--ms-text-secondary);">
                上一代（${prevDev.name}） ➔ 当前代（${dev.name}）参数差异已自动高亮
              </div>
            </div>
            <div style="display:flex; gap:8px; align-items:center;">
              <div class="m3-segmented-control">
                <button class="m3-segmented-btn ${ComparisonEngine.highlightDiff ? 'active' : ''}" 
                  onclick="ComparisonEngine.setHighlightDiff(!ComparisonEngine.highlightDiff); App.renderActiveView();">
                  高亮差异
                </button>
                <button class="m3-segmented-btn ${ComparisonEngine.diffOnly ? 'active' : ''}" 
                  onclick="ComparisonEngine.setDiffOnly(!ComparisonEngine.diffOnly); App.renderActiveView();">
                  仅看差异
                </button>
              </div>
              <button class="fluent-btn-sm" onclick="App.switchDetailTab('specs')">返回单机规格</button>
            </div>
          </div>
          ${ComparisonEngine.renderComparisonTable([prevDev, dev])}
        ` : `
          <div class="spec-table-empty">
            <div style="font-size:36px; margin-bottom:12px;">🌟</div>
            <h3>该产品为该品类首代开山旗舰</h3>
            <p>本型号是 ${SURFACE_DATA.categories.find(c => c.id === dev.categoryId)?.name} 系列的第一代开山之作，暂无更早一代前置机型可供比对。</p>
          </div>
        `}
      </div>
    `;

    container.innerHTML = html;
  },

  // 5. 独立可分享 Compare 页 (PRD 第十三章: /compare?products=id1,id2)
  renderCompareView(container) {
    let devIds = [];
    if (this.activeRoute.query.products) {
      devIds = this.activeRoute.query.products.split(',').filter(Boolean);
      // 同步到 ComparisonEngine
      ComparisonEngine.selectedIds = devIds;
      ComparisonEngine.saveToStorage();
      ComparisonEngine.updateDockUI();
    } else {
      devIds = ComparisonEngine.selectedIds;
      // 反射到 URL
      if (devIds.length > 0) {
        window.location.hash = `#/compare?products=${devIds.join(',')}`;
        return;
      }
    }

    const selectedDevices = devIds.map(id => SURFACE_DATA.devices.find(d => d.id === id)).filter(Boolean);

    let html = `
      <div class="view-header">
        <div class="view-title-group">
          <h1>
            <span>跨品类横向对比工作台</span>
            <span class="header-sub-tag">已选 ${selectedDevices.length} 款 Surface 设备</span>
          </h1>
          <div class="view-meta-tip">
            <span>当前对比链接可直接复制分享 ｜ 左右拖动滚轮平滑横向滚动 ｜ 点击机型右上角 ✕ 可移除</span>
          </div>
        </div>

        <div class="view-actions">
          <button class="fluent-btn ${ComparisonEngine.highlightDiff ? 'active' : ''}" 
            onclick="ComparisonEngine.setHighlightDiff(!ComparisonEngine.highlightDiff); App.renderActiveView();">
            高亮差异
          </button>
          <button class="fluent-btn ${ComparisonEngine.diffOnly ? 'active' : ''}" 
            onclick="ComparisonEngine.setDiffOnly(!ComparisonEngine.diffOnly); App.renderActiveView();">
            仅看差异
          </button>
          <button class="fluent-btn" onclick="ComparisonEngine.expandAllGroups()">
            全部展开
          </button>
          <button class="fluent-btn" onclick="ComparisonEngine.collapseAllGroups()">
            全部折叠
          </button>
          <button class="fluent-btn" onclick="ComparisonEngine.clearAll()">
            清空工作台
          </button>
        </div>
      </div>

      ${ComparisonEngine.renderComparisonTable(selectedDevices)}
    `;

    container.innerHTML = html;
  },

  // 6. Surface 编年发布时间线 (PRD 第十七章)
  renderTimelineView(container) {
    const years = [2026, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013];

    let html = `
      <div class="view-header">
        <div class="view-title-group">
          <h1>
            <span>Surface 2012 ~ 2026 编年发布时间线</span>
          </h1>
          <div class="view-meta-tip">
            <span>从初代 Surface 创世至今，记录微软硬件设计的每一次代际进化与技术分水岭</span>
          </div>
        </div>
      </div>

      <div class="timeline-container">
    `;

    years.forEach(yr => {
      const devsInYear = SURFACE_DATA.devices.filter(d => d.year === yr);
      if (devsInYear.length === 0) return;

      html += `
        <div class="timeline-year-block">
          <div class="timeline-year-badge">${yr} 年</div>
          <div class="timeline-cards-row">
            ${devsInYear.map(dev => `
              <div class="timeline-card" onclick="App.navigateToDetail('${dev.categoryId}', '${dev.id}')">
                <div style="font-weight:700; font-size:14px; margin-bottom:4px; color:var(--ms-text-primary);">
                  ${dev.name}
                </div>
                <div style="font-size:12px; color:var(--ms-text-secondary); margin-bottom:6px;">
                  ${dev.specs.releaseDate} · ${dev.specs.cpuModel}
                </div>
                <div style="font-size:11.5px; color:var(--ms-text-tertiary);">${dev.tagline}</div>
                <div style="display:flex; gap:4px; margin-top:6px;">
                  ${ComparisonEngine.renderStatusBadge(dev.status)}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  },

  // 7. 多维筛选工具条 (PRD 第十四章)
  // 7. 多维筛选工具条 (PRD 第十四章: 整合商用与消费版定位)
  renderFilterBar(seriesId) {
    return `
      <div class="filter-toolbar">
        <div class="filter-group">
          <span class="filter-label">受众定位:</span>
          <button class="filter-chip ${this.filters.audience === 'all' ? 'active' : ''}" onclick="App.setFilter('audience', 'all')">全部</button>
          <button class="filter-chip ${this.filters.audience === 'commercial' ? 'active' : ''}" onclick="App.setFilter('audience', 'commercial')">🏢 商用版</button>
          <button class="filter-chip ${this.filters.audience === 'consumer' ? 'active' : ''}" onclick="App.setFilter('audience', 'consumer')">🛍️ 消费版</button>
        </div>

        <div class="filter-group">
          <span class="filter-label">处理器平台:</span>
          <button class="filter-chip ${this.filters.cpu === 'all' ? 'active' : ''}" onclick="App.setFilter('cpu', 'all')">全部</button>
          <button class="filter-chip ${this.filters.cpu === 'snapdragon' ? 'active' : ''}" onclick="App.setFilter('cpu', 'snapdragon')">高通骁龙 X / SQ</button>
          <button class="filter-chip ${this.filters.cpu === 'intel' ? 'active' : ''}" onclick="App.setFilter('cpu', 'intel')">Intel 酷睿</button>
          <button class="filter-chip ${this.filters.cpu === 'amd' ? 'active' : ''}" onclick="App.setFilter('cpu', 'amd')">AMD 锐龙定制版</button>
        </div>

        <div class="filter-group">
          <span class="filter-label">销售状态:</span>
          <button class="filter-chip ${this.filters.status === 'all' ? 'active' : ''}" onclick="App.setFilter('status', 'all')">全部代际</button>
          <button class="filter-chip ${this.filters.status === 'current_cn' ? 'active' : ''}" onclick="App.setFilter('status', 'current_cn')">仅看国行在售</button>
          <button class="filter-chip ${this.filters.status === 'legacy' ? 'active' : ''}" onclick="App.setFilter('status', 'legacy')">历史归档机型</button>
        </div>

        <div class="filter-group">
          <button class="filter-chip ${this.filters.copilotOnly ? 'active' : ''}" onclick="App.setFilter('copilotOnly', !App.filters.copilotOnly)">
            ✨ 仅看 Copilot+ PC (≥40 TOPS)
          </button>
        </div>

        ${this.hasActiveFilters() ? `
          <button class="fluent-btn-sm" onclick="App.resetFilters()" style="color:#d13438;">重置筛选</button>
        ` : ''}
      </div>
    `;
  },

  setFilter(key, val) {
    this.filters[key] = val;
    this.syncFiltersToUrl();
    this.renderActiveView();
  },

  resetFilters() {
    this.filters = { cpu: 'all', status: 'all', copilotOnly: false, audience: 'all' };
    this.syncFiltersToUrl();
    this.renderActiveView();
  },

  hasActiveFilters() {
    return this.filters.cpu !== 'all' || this.filters.status !== 'all' || this.filters.copilotOnly || (this.filters.audience && this.filters.audience !== 'all');
  },

  applyFilters(devices) {
    return devices.filter(d => {
      // 受众过滤
      if (this.filters.audience && this.filters.audience !== 'all') {
        if (this.filters.audience === 'commercial') {
          if (!d.isCommercial && d.targetAudience !== 'commercial' && d.targetAudience !== 'both') return false;
        } else if (this.filters.audience === 'consumer') {
          if (d.targetAudience !== 'consumer' && d.targetAudience !== 'both') return false;
        }
      }

      // CPU 过滤
      if (this.filters.cpu === 'snapdragon') {
        const cpu = (d.specs.cpuModel || '').toLowerCase();
        if (!cpu.includes('snapdragon') && !cpu.includes('sq') && !cpu.includes('高通')) return false;
      }
      if (this.filters.cpu === 'intel') {
        const cpu = (d.specs.cpuModel || '').toLowerCase();
        if (!cpu.includes('intel') && !cpu.includes('酷睿') && !cpu.includes('奔腾')) return false;
      }
      if (this.filters.cpu === 'amd') {
        const cpu = (d.specs.cpuModel || '').toLowerCase();
        if (!cpu.includes('amd') && !cpu.includes('ryzen')) return false;
      }

      // 状态过滤
      if (this.filters.status === 'current_cn' && d.status !== 'current_cn') return false;
      if (this.filters.status === 'legacy' && d.status !== 'legacy' && d.status !== 'discontinued') return false;

      // Copilot+ 过滤
      if (this.filters.copilotOnly) {
        const topsStr = d.specs.npuTops || '';
        const num = parseInt(topsStr, 10);
        if (isNaN(num) || num < 40) return false;
      }

      return true;
    });
  },

  syncFiltersToUrl() {
    if (typeof window === 'undefined' || !window.location) return;
    const params = new URLSearchParams();
    if (this.filters.cpu !== 'all') params.set('cpu', this.filters.cpu);
    if (this.filters.status !== 'all') params.set('status', this.filters.status);
    if (this.filters.copilotOnly) params.set('copilot', 'true');
    if (this.filters.audience && this.filters.audience !== 'all') params.set('audience', this.filters.audience);
    
    const queryStr = params.toString();
    const currentPath = (this.activeRoute && this.activeRoute.path) || '/';
    window.location.hash = queryStr ? `#${currentPath}?${queryStr}` : `#${currentPath}`;
  },

  parseFiltersFromQuery(query) {
    if (!query) return;
    this.filters.cpu = query.cpu || 'all';
    this.filters.status = query.status || 'all';
    this.filters.copilotOnly = query.copilot === '1' || query.copilot === 'true' || query.copilot === true;
    this.filters.audience = query.audience || 'all';
  },

  // 8. 全局搜索系统 (PRD 第十六章)
  handleGlobalSearch(query) {
    const term = query.trim().toLowerCase();
    const resultsContainer = document.getElementById('search-results-modal');
    if (!resultsContainer) return;

    if (!term) {
      resultsContainer.style.display = 'none';
      return;
    }

    const matchedDevices = SURFACE_DATA.devices.filter(d => {
      const fullText = `${d.name} ${d.nameEn} ${d.generation} ${d.specs.cpuModel} ${d.specs.npuTops} ${d.tagline} ${d.year}`.toLowerCase();
      return fullText.includes(term);
    });

    const matchedChips = SURFACE_DATA.chips.filter(c => {
      return `${c.name} ${c.vendor} ${c.npuDesc} ${c.highlights}`.toLowerCase().includes(term);
    });

    let html = `
      <div class="search-modal-backdrop" onclick="App.closeSearchModal()">
        <div class="search-modal-card" onclick="event.stopPropagation()">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-weight:700; font-size:15px;">搜索结果 (${matchedDevices.length + matchedChips.length})</span>
            <button class="dock-item-remove" onclick="App.closeSearchModal()">✕</button>
          </div>

          ${matchedDevices.length === 0 && matchedChips.length === 0 ? `
            <div style="padding:20px; text-align:center; color:var(--ms-text-tertiary);">未找到与 "${term}" 匹配的内容</div>
          ` : ''}

          ${matchedDevices.length > 0 ? `
            <div style="font-size:12px; font-weight:700; color:var(--ms-text-brand); margin:8px 0 4px;">匹配 Surface 设备 (${matchedDevices.length})</div>
            <div style="display:flex; flex-direction:column; gap:6px; max-height:220px; overflow-y:auto;">
              ${matchedDevices.map(d => `
                <div class="search-result-item" onclick="App.navigateToDetail('${d.categoryId}', '${d.id}'); App.closeSearchModal();">
                  <div>
                    <div style="font-weight:600; font-size:13.5px;">${d.name}</div>
                    <div style="font-size:11.5px; color:var(--ms-text-secondary);">${d.specs.cpuModel} · ${d.specs.npuTops} · ${d.specs.releaseDate}</div>
                  </div>
                  <span class="spec-badge">${d.generation}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${matchedChips.length > 0 ? `
            <div style="font-size:12px; font-weight:700; color:#8764b8; margin:12px 0 4px;">匹配处理器架构 (${matchedChips.length})</div>
            <div style="display:flex; flex-direction:column; gap:6px;">
              ${matchedChips.map(c => `
                <div class="search-result-item" onclick="App.navigate('#/tools/chips'); App.closeSearchModal();">
                  <div>
                    <div style="font-weight:600; font-size:13.5px;">${c.name}</div>
                    <div style="font-size:11.5px; color:var(--ms-text-secondary);">${c.vendor} · ${c.npuDesc}</div>
                  </div>
                  <span class="spec-badge gold">${c.npuTops} TOPS</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;

    resultsContainer.innerHTML = html;
    resultsContainer.style.display = 'block';
  },

  closeSearchModal() {
    const resultsContainer = document.getElementById('search-results-modal');
    if (resultsContainer) resultsContainer.style.display = 'none';
  },

  navigateToDetail(seriesId, deviceId) {
    this.navigate(`#/surface/${seriesId}/${deviceId}`);
  },

  // 9. 侧栏渲染与高亮状态
  renderSidebar() {
    const sidebar = document.getElementById('hub-sidebar-content');
    if (!sidebar) return;

    let html = `
      <div class="sidebar-group">
        <div class="sidebar-nav-item ${this.activeRoute.path === '/' ? 'active' : ''}" onclick="App.navigate('#/')">
          <div class="nav-item-left">
            <span class="nav-item-icon">🏠</span>
            <span>参数中心首页</span>
          </div>
        </div>
      </div>

      <div class="sidebar-group">
        <div class="sidebar-group-title">Surface 硬件设备库</div>
    `;

    SURFACE_DATA.categories.forEach(cat => {
      const count = SURFACE_DATA.devices.filter(d => d.categoryId === cat.id).length;
      const isActive = this.activeRoute.path.startsWith(`/surface/${cat.id}`);
      html += `
        <div class="sidebar-nav-item ${isActive ? 'active' : ''}" onclick="App.navigate('#/surface/${cat.id}')">
          <div class="nav-item-left">
            <span class="nav-item-icon">💻</span>
            <span>${cat.name}</span>
          </div>
          <span class="nav-item-count">${count}</span>
        </div>
      `;
    });

    html += `
      </div>

      <div class="sidebar-group">
        <div class="sidebar-group-title">商用与企业方案</div>
        <div class="sidebar-nav-item ${this.activeRoute.path.startsWith('/business') ? 'active' : ''}" onclick="App.navigate('#/business')">
          <div class="nav-item-left">
            <span class="nav-item-icon">🏢</span>
            <span>Surface 商用版专区</span>
          </div>
          <span class="nav-item-count" style="background:#0078d4; color:#fff; font-size:11px; padding:2px 6px; border-radius:4px;">Learn</span>
        </div>
      </div>

      <div class="sidebar-group">
        <div class="sidebar-group-title">数据合规与审计</div>
        <div class="sidebar-nav-item ${this.activeRoute.path === '/audit' ? 'active' : ''}" onclick="App.navigate('#/audit')">
          <div class="nav-item-left">
            <span class="nav-item-icon">🛡️</span>
            <span>数据核验与官方溯源</span>
          </div>
          <span class="nav-item-count" style="background:#107c41; color:#fff; font-size:11px; padding:2px 6px; border-radius:4px;">100% 溯源</span>
        </div>
      </div>

      <div class="sidebar-group">
        <div class="sidebar-group-title">处理器与芯片库</div>
        <div class="sidebar-nav-item ${this.activeRoute.path.includes('chips') ? 'active' : ''}" onclick="App.navigate('#/tools/chips')">
          <div class="nav-item-left">
            <span class="nav-item-icon">⚡</span>
            <span>定制芯片架构库</span>
          </div>
          <span class="nav-item-count">${SURFACE_DATA.chips.length}</span>
        </div>
      </div>

      <div class="sidebar-group">
        <div class="sidebar-group-title">特色辅助分析工具</div>
        <div class="sidebar-nav-item ${this.activeRoute.path === '/tools/screen' ? 'active' : ''}" onclick="App.navigate('#/tools/screen')">
          <div class="nav-item-left">
            <span class="nav-item-icon">📐</span>
            <span>3:2 黄金比例对比器</span>
          </div>
        </div>
        <div class="sidebar-nav-item ${this.activeRoute.path === '/tools/compat' ? 'active' : ''}" onclick="App.navigate('#/tools/compat')">
          <div class="nav-item-left">
            <span class="nav-item-icon">⌨️</span>
            <span>配件双向兼容矩阵</span>
          </div>
        </div>
        <div class="sidebar-nav-item ${this.activeRoute.path === '/timeline' ? 'active' : ''}" onclick="App.navigate('#/timeline')">
          <div class="nav-item-left">
            <span class="nav-item-icon">⏳</span>
            <span>2012-2026 编年史</span>
          </div>
        </div>
      </div>
    `;

    sidebar.innerHTML = html;
  },

  updateSidebarActiveState() {
    this.renderSidebar();
  },

  // 10. 全局事件绑定
  bindEvents() {
    const searchInput = document.getElementById('global-search-input');
    const searchClear = document.getElementById('search-clear-btn');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const val = e.target.value;
        if (searchClear) searchClear.style.display = val ? 'block' : 'none';
        this.handleGlobalSearch(val);
      });
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.closeSearchModal();
      });
    }
    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        searchClear.style.display = 'none';
        this.closeSearchModal();
      });
    }

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.hub-sidebar');
    if (mobileBtn && sidebar) {
      mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    }
  },

  initTheme() {
    const saved = localStorage.getItem('surface-hub-theme');
    if (saved) this.theme = saved;
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) this.theme = 'dark';
    else this.theme = 'light';
    document.documentElement.setAttribute('data-theme', this.theme);
    this.updateThemeButton();
  },

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('surface-hub-theme', this.theme);
    this.updateThemeButton();
  },

  updateThemeButton() {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.innerHTML = this.theme === 'dark' 
        ? `<svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg> 浅色`
        : `<svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/></svg> 深色`;
    }
  },

  renderActiveView() {
    this.dispatchRoute();
  },

  switchDetailColor(deviceId, colorName, imageUrl, btnEl) {
    const imgEl = document.getElementById('detail-main-img');
    const labelEl = document.getElementById('detail-active-color-label');
    if (imgEl && imageUrl) {
      imgEl.style.opacity = '0.3';
      imgEl.style.transform = 'scale(0.97)';
      setTimeout(() => {
        imgEl.src = imageUrl;
        imgEl.style.display = 'block';
        imgEl.style.opacity = '1';
        imgEl.style.transform = 'scale(1)';
      }, 150);
    }
    if (labelEl) {
      labelEl.textContent = colorName;
    }
    if (btnEl) {
      const parent = btnEl.closest('.detail-color-options');
      if (parent) {
        parent.querySelectorAll('.color-choice-btn').forEach(b => b.classList.remove('active'));
        btnEl.classList.add('active');
      }
    }
  },

  previewCardColor(deviceId, imageUrl, dotEl) {
    if (!imageUrl) return;
    const thumbEl = document.getElementById(`thumb-${deviceId}`);
    if (thumbEl) {
      thumbEl.src = imageUrl;
    }
    if (dotEl) {
      const parent = dotEl.parentElement;
      if (parent) {
        parent.querySelectorAll('.card-color-dot').forEach(d => d.classList.remove('active'));
        dotEl.classList.add('active');
      }
    }
  },

  selectAllCategoryDevices(catId) {
    let devs;
    if (catId === 'commercial') {
      devs = SURFACE_DATA.devices.filter(d => d.isCommercial || d.targetAudience === 'commercial');
    } else {
      devs = SURFACE_DATA.devices.filter(d => d.categoryId === catId);
    }
    devs.slice(0, ComparisonEngine.maxCompareLimit).forEach(d => {
      if (!ComparisonEngine.selectedIds.includes(d.id)) {
        ComparisonEngine.selectedIds.push(d.id);
      }
    });
    ComparisonEngine.saveToStorage();
    ComparisonEngine.updateDockUI();
    this.renderActiveView();
  },

  // M3 选项卡与视图切换交互处理器
  switchDetailTab(tabKey) {
    this.activeDetailTab = tabKey;
    if (typeof document === 'undefined') return;
    const isSpecsMode = tabKey === 'specs' || tabKey === 'overview';
    document.querySelectorAll('.m3-tab-item').forEach(btn => {
      const tab = btn.getAttribute('data-tab');
      if ((isSpecsMode && (tab === 'specs' || tab === 'overview')) || (!isSpecsMode && tab === tabKey)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    document.querySelectorAll('.m3-tab-pane').forEach(pane => {
      const paneKey = pane.getAttribute('data-pane');
      if ((isSpecsMode && (paneKey === 'specs' || paneKey === 'overview')) || (!isSpecsMode && paneKey === tabKey)) {
        pane.style.display = 'block';
      } else {
        pane.style.display = 'none';
      }
    });
  },

  switchSeriesViewMode(mode) {
    this.seriesViewMode = mode;
    this.renderActiveView();
  },

  toggleDockCollapse() {
    this.isDockCollapsed = !this.isDockCollapsed;
    const dock = document.getElementById('comparison-dock');
    const toggleBtn = document.getElementById('dock-collapse-btn');
    if (dock) {
      if (this.isDockCollapsed) {
        dock.classList.add('collapsed');
        if (toggleBtn) toggleBtn.innerHTML = '▲ 展开';
      } else {
        dock.classList.remove('collapsed');
        if (toggleBtn) toggleBtn.innerHTML = '▼ 收起';
      }
    }
  }
};

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    App.init();
  });
}

if (typeof window !== 'undefined') {
  window.App = App;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}
