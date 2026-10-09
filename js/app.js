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

  listDevices(query) {
    if (typeof Catalog !== 'undefined' && Catalog.listDevices) {
      return Catalog.listDevices(query);
    }
    return (typeof SURFACE_DATA !== 'undefined' && Array.isArray(SURFACE_DATA.devices)) ? SURFACE_DATA.devices : [];
  },

  getDevice(id) {
    if (typeof Catalog !== 'undefined' && Catalog.getDevice) {
      return Catalog.getDevice(id);
    }
    return this.listDevices().find(d => d.id === id) || null;
  },

  homeShelfDevices(kind) {
    return this.listDevices().filter(d => {
      if (!d || d.categoryId === 'xbox') return false;
      if (kind === 'current') return d.status === 'current_cn';
      if (kind === 'upcoming') return d.status === 'upcoming';
      return false;
    });
  },

  spec(device, key) {
    return Catalog.getSpec(device, key);
  },

  shot(device, colorName) {
    return Catalog.portrait(device, colorName);
  },

  recentLaunchBadge(device) {
    return Catalog.isRecentLaunch(device) ? '<span class="spec-badge new">新品</span>' : '';
  },

  portraitBadge(device, colorName, markId) {
    const shot = this.shot(device, colorName);
    const label = Catalog.portraitLabel(shot);
    const hidden = label ? '' : ' hidden';
    const idAttr = markId ? ` id="${markId}"` : '';
    return `<span class="portrait-stand-in"${idAttr}${hidden}>${label}</span>`;
  },

  escapeText(value) {
    return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  },

  audienceHtml(device) {
    const text = (typeof Catalog.audience === 'function') ? Catalog.audience(device) : '';
    if (!text) return '';
    return `<div class="device-audience">推荐人群：${this.escapeText(text)}</div>`;
  },

  highlightsHtml(device) {
    const points = (typeof Catalog.highlights === 'function') ? Catalog.highlights(device) : [];
    if (!points.length) return '';
    return `<div class="detail-points"><div class="detail-points-title">亮点</div><ul>${points.map(p => `<li>${this.escapeText(p)}</li>`).join('')}</ul></div>`;
  },

  picture(shot, opts) {
    return Catalog.frame(shot, opts);
  },

  hideBrokenImage(img) {
    if (!img) return;
    // 阶段 1：如果是带 ?v= 参数的优化交付图在本地环境失败，先尝试剥离参数请求
    if (img.src && img.src.includes('?v=') && !img.dataset.retryClean) {
      img.dataset.retryClean = '1';
      const cleanSrc = img.src.split('?')[0];
      const picture = img.closest ? img.closest('picture') : null;
      if (picture) {
        picture.querySelectorAll('source').forEach(s => s.remove());
      }
      img.removeAttribute('srcset');
      img.src = cleanSrc;
      return;
    }
    // 阶段 2：如果衍生格式仍失败，平滑回退至 assets/products 原始产品大图
    const fallbackPath = img.getAttribute('data-fallback-path');
    if (fallbackPath && !img.dataset.retryFallback) {
      img.dataset.retryFallback = '1';
      const cleanPath = fallbackPath.split('?')[0];
      const picture = img.closest ? img.closest('picture') : null;
      if (picture) {
        picture.querySelectorAll('source').forEach(s => s.remove());
      }
      img.removeAttribute('srcset');
      img.src = cleanPath;
      return;
    }
    // 阶段 3：若所有图片源均不可达，优雅展示占位图标并重置为居中对齐
    img.style.display = 'none';
    const box = img.closest('.device-img-wrap, .detail-hero-img-box, .series-icon, .table-device-img, .catalog-item-image');
    if (!box) return;
    const fallback = box.querySelector('div');
    if (fallback) {
      fallback.style.display = 'flex';
      fallback.style.alignItems = 'center';
      fallback.style.justifyContent = 'center';
    }
  },

  init() {
    this.initTheme();
    this.initRouter();
    this.bindEvents();
    ComparisonEngine.init();

    // 动态同步页脚核验日期 (PRD P1-3 / C-3)
    const footerDateEl = document.getElementById('footer-verification-date');
    if (footerDateEl && window.SURFACE_DATA && window.SURFACE_DATA.lastVerifiedDate) {
      footerDateEl.textContent = window.SURFACE_DATA.lastVerifiedDate;
    }

    // 离线工作状态指示器 (PRD P1-4 / T-6)
    const offlineToast = document.getElementById('offline-toast');
    if (offlineToast) {
      const updateOnlineStatus = () => {
        if (!navigator.onLine) {
          offlineToast.classList.remove('hidden');
        } else {
          offlineToast.classList.add('hidden');
        }
      };
      window.addEventListener('offline', updateOnlineStatus);
      window.addEventListener('online', updateOnlineStatus);
      if (typeof navigator.onLine === 'boolean' && !navigator.onLine) {
        updateOnlineStatus();
      }
    }

    if (typeof Catalog !== 'undefined' && Catalog.onChange) {
      Catalog.onChange(() => {
        this.renderSidebar();
        this.renderRoute();
      });
    }
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

    this.syncLayoutMode();

    // 同步侧栏选中态
    this.updateSidebarActiveState();

    // 路由分发渲染
    this.dispatchRoute();

    // 动态同步 JSON-LD 结构化数据 (PRD P2-3 / T-5)
    this.updateStructuredData();
  },

  // 动态更新 JSON-LD 结构化数据 (PRD P2-3 / T-5)
  updateStructuredData() {
    if (typeof document === 'undefined') return;
    const scriptEl = document.getElementById('structured-data-jsonld');
    if (!scriptEl) return;

    const path = (this.activeRoute && this.activeRoute.path) ? this.activeRoute.path : '';
    const siteUrl = 'https://surface.kaibase.cn/';
    const baseBreadcrumb = {
      "@type": "ListItem",
      "position": 1,
      "name": "首页",
      "item": `${siteUrl}#/`
    };

    let data = {
      "@context": "https://schema.org",
      "@graph": []
    };

    // 1. 详情页解析
    let matchedDevice = null;
    let matchedSeriesName = 'Surface 系列';
    let matchedSeriesPath = '';

    const parts = path.split('/').filter(Boolean);
    if (parts.length >= 3) {
      const devId = parts[parts.length - 1];
      const dev = this.getDevice(devId);
      if (dev) {
        matchedDevice = dev;
        const segment = parts[0];
        const seriesId = parts[1];
        matchedSeriesPath = `${siteUrl}#/${segment}/${seriesId}`;
        const cat = (SURFACE_DATA.consumerCategories || []).find(c => c.seriesId === seriesId) ||
                    (SURFACE_DATA.commercialCategories || []).find(c => c.seriesId === seriesId);
        if (cat) matchedSeriesName = cat.name;
      }
    } else if (parts.length === 2 && (parts[0] === 'xbox') && parts[1] !== 'consoles' && parts[1] !== 'controllers' && parts[1] !== 'accessories') {
      const dev = this.getDevice(parts[1]);
      if (dev) {
        matchedDevice = dev;
        matchedSeriesName = 'Xbox 游戏主机';
        matchedSeriesPath = `${siteUrl}#/xbox/consoles`;
      }
    }

    if (matchedDevice) {
      // 渲染 Product + BreadcrumbList
      const pageUrl = `${siteUrl}#${path}`;
      const shot = this.shot(matchedDevice);
      const rawImg = typeof shot === 'string' ? shot : (shot && shot.src ? shot.src : '');
      const cleanImg = rawImg.split('?')[0];
      const absImage = cleanImg ? (cleanImg.startsWith('http') ? cleanImg : `${siteUrl}${cleanImg.replace(/^\.\//, '')}`) : `${siteUrl}assets/delivery/webp/w1280/surface-new-pro-hero.webp`;
      
      const cpu = Catalog.getSpec(matchedDevice, 'cpuModel') || '';
      const npu = Catalog.getSpec(matchedDevice, 'npuTops') || '';
      const summaryDesc = matchedDevice.tagline || `${matchedDevice.name}，搭载 ${cpu || '官方高性能处理器'}${npu ? `，具备 ${npu} 端侧 AI 算力` : ''}。`;

      const productNode = {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        "name": matchedDevice.name,
        "image": absImage,
        "description": summaryDesc,
        "brand": {
          "@type": "Brand",
          "name": "Microsoft"
        },
        "category": matchedDevice.categoryName || "笔记本电脑与平板"
      };

      const breadcrumbNode = {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": [
          baseBreadcrumb,
          {
            "@type": "ListItem",
            "position": 2,
            "name": matchedSeriesName,
            "item": matchedSeriesPath || `${siteUrl}#/`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": matchedDevice.name,
            "item": pageUrl
          }
        ]
      };

      data["@graph"] = [productNode, breadcrumbNode];
    } else if (parts.length >= 2 && (parts[0] === 'consumer' || parts[0] === 'business' || parts[0] === 'commercial' || parts[0] === 'xbox')) {
      // 系列页或专区页：CollectionPage + BreadcrumbList
      const segment = parts[0];
      const seriesId = parts[1];
      const pageUrl = `${siteUrl}#${path}`;
      let pageTitle = `${seriesId.toUpperCase()} 系列`;
      if (segment === 'xbox') {
        if (seriesId === 'consoles') pageTitle = 'Xbox 历代主机规格';
        else if (seriesId === 'controllers') pageTitle = 'Xbox 官方手柄大全';
        else if (seriesId === 'accessories') pageTitle = 'Xbox 官方周边配件';
        else pageTitle = 'Xbox 游戏专区';
      } else {
        const cat = (SURFACE_DATA.consumerCategories || []).find(c => c.seriesId === seriesId) ||
                    (SURFACE_DATA.commercialCategories || []).find(c => c.seriesId === seriesId);
        if (cat) pageTitle = cat.name;
      }

      const collectionNode = {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": `${pageTitle} - Surface 参数中心`,
        "description": `查阅 ${pageTitle} 历代机型详细技术规格与横向比对数据。`,
        "isPartOf": { "@id": `${siteUrl}#website` }
      };

      const breadcrumbNode = {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": [
          baseBreadcrumb,
          {
            "@type": "ListItem",
            "position": 2,
            "name": pageTitle,
            "item": pageUrl
          }
        ]
      };

      data["@graph"] = [collectionNode, breadcrumbNode];
    } else if (path.startsWith('/tools/')) {
      // 工具页
      const toolName = path.includes('compat') ? '双向配件兼容矩阵' : (path.includes('copilot') ? 'Copilot+ PC 算力天梯' : '实用工具箱');
      const pageUrl = `${siteUrl}#${path}`;
      data["@graph"] = [
        {
          "@type": "WebPage",
          "@id": `${pageUrl}#webpage`,
          "url": pageUrl,
          "name": `${toolName} - Surface 参数中心`,
          "isPartOf": { "@id": `${siteUrl}#website` }
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          "itemListElement": [
            baseBreadcrumb,
            { "@type": "ListItem", "position": 2, "name": toolName, "item": pageUrl }
          ]
        }
      ];
    } else if (path.startsWith('/compare')) {
      // 对比页
      const pageUrl = `${siteUrl}#${path}`;
      data["@graph"] = [
        {
          "@type": "WebPage",
          "@id": `${pageUrl}#webpage`,
          "url": pageUrl,
          "name": "Surface 机型横向深度参数比对",
          "description": "多机型并列双轴冻结对比表，支持仅看差异与高亮比对。",
          "isPartOf": { "@id": `${siteUrl}#website` }
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          "itemListElement": [
            baseBreadcrumb,
            { "@type": "ListItem", "position": 2, "name": "多机型深度比对", "item": pageUrl }
          ]
        }
      ];
    } else {
      // 默认首页：WebSite + BreadcrumbList
      data["@graph"] = [
        {
          "@type": "WebSite",
          "@id": `${siteUrl}#website`,
          "url": siteUrl,
          "name": "Surface 参数中心 · 民间资料库",
          "description": "专业 Surface 产品参数数据库与历代机型横向对比平台。收录 Surface Pro、Laptop、Studio、Go、Book 等全系产品详细规格、高通骁龙 X 与 Intel 芯片架构、NPU 算力天梯及双向配件兼容矩阵。",
          "inLanguage": "zh-CN"
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${siteUrl}#breadcrumb`,
          "itemListElement": [baseBreadcrumb]
        }
      ];
    }

    try {
      scriptEl.textContent = JSON.stringify(data, null, 2);
    } catch (e) {
      console.warn('Failed to update structured data:', e);
    }
  },

  navigate(hashPath) {
    window.location.hash = hashPath;
  },

  navigateToDetail(seriesId, deviceId) {
    const dev = this.getDevice(deviceId);
    if (dev && typeof Taxonomy !== 'undefined' && Taxonomy.canonicalPath) {
      this.navigate(Taxonomy.canonicalPath(dev));
      return;
    }
    const segment = (dev && (dev.segment === 'commercial' || dev.isCommercial)) ? 'commercial' : 'consumer';
    const prefix = segment === 'commercial' ? 'business' : 'consumer';
    const cleanSeries = (typeof Taxonomy !== 'undefined' && Taxonomy.seriesIdOf && dev)
      ? Taxonomy.seriesIdOf(dev)
      : (seriesId || (dev && dev.categoryId) || '');
    this.navigate(`#/${prefix}/${cleanSeries}/${deviceId}`);
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

    // 路由 4: 特色辅助分析工具矩阵
    if (path === '/tools' || path === '/tools/guide') {
      main.innerHTML = `<div id="tool-smart-guide-container">${ToolsEngine.renderSmartGuide()}</div>`;
      return;
    }
    if (path === '/tools/weight') {
      main.innerHTML = `<div id="tool-weight-calc-container">${ToolsEngine.renderWeightCalculator()}</div>`;
      return;
    }
    if (path === '/tools/upgrade') {
      main.innerHTML = `<div id="tool-upgrade-advisor-container">${ToolsEngine.renderUpgradeAdvisor()}</div>`;
      return;
    }
    if (path === '/tools/storage') {
      main.innerHTML = `<div id="tool-storage-guide-container">${ToolsEngine.renderStorageGuide()}</div>`;
      return;
    }
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

    // 路由: Surface 官方配件专区 (#/accessories 或 #/accessories/:category 或 #/surface/accessories)
    if (path === '/accessories' || path === '/surface/accessories') {
      this.renderSurfaceAccessoriesView(main, 'all');
      return;
    }
    const accMatch = path.match(/^\/(?:surface\/)?accessories\/([^/]+)$/);
    if (accMatch) {
      this.renderSurfaceAccessoriesView(main, accMatch[1]);
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

    // 路由: 商用版单机详情 (#/business/:series/:id)
    const bizDetailMatch = path.match(/^\/business\/([^/]+)\/([^/]+)$/);
    if (bizDetailMatch) {
      const [_, seriesId, deviceId] = bizDetailMatch;
      this.renderProductDetailView(main, seriesId, deviceId);
      return;
    }

    // 路由: 商用版系列页 (#/business/:series)
    const bizSeriesMatch = path.match(/^\/business\/([^/]+)$/);
    if (bizSeriesMatch) {
      const seriesId = bizSeriesMatch[1];
      this.renderSeriesView(main, seriesId, 'commercial');
      return;
    }

    // 路由: 兼容简写单机详情 (#/detail/:id)
    const shorthandDetailMatch = path.match(/^\/detail\/([^/]+)$/);
    if (shorthandDetailMatch) {
      const targetDev = this.getDevice(shorthandDetailMatch[1]);
      if (targetDev) {
        this.navigateToDetail(targetDev.seriesId, targetDev.id);
        return;
      }
    }

    // 路由: 消费版单机详情 (#/consumer/:series/:id)
    const consDetailMatch = path.match(/^\/consumer\/([^/]+)\/([^/]+)$/);
    if (consDetailMatch) {
      const [_, seriesId, deviceId] = consDetailMatch;
      this.renderProductDetailView(main, seriesId, deviceId);
      return;
    }

    // 路由: 消费版系列页 (#/consumer/:series)
    const consSeriesMatch = path.match(/^\/consumer\/([^/]+)$/);
    if (consSeriesMatch) {
      const seriesId = consSeriesMatch[1];
      if (seriesId === 'xbox') {
        this.navigate('#/xbox/consoles');
        return;
      }
      this.renderSeriesView(main, seriesId, 'consumer');
      return;
    }

    // 路由: Xbox 专区主页与主机系列页 (#/xbox, #/xbox/consoles)
    if (path === '/xbox' || path === '/xbox/consoles' || path === '/consumer/xbox') {
      this.renderSeriesView(main, 'xbox', 'xbox');
      return;
    }

    // 路由: Xbox 手柄专区 (#/xbox/controllers)
    if (path === '/xbox/controllers') {
      this.renderXboxControllersView(main);
      return;
    }

    // 路由: Xbox 配件专区 (#/xbox/accessories)
    if (path === '/xbox/accessories') {
      this.renderXboxAccessoriesView(main);
      return;
    }

    // 路由: Xbox 单机详情 (#/xbox/consoles/:id 或 #/xbox/:id 或 #/consumer/xbox/:id)
    const xboxConsolesDetail = path.match(/^\/xbox\/consoles\/([^/]+)$/) || path.match(/^\/consumer\/xbox\/([^/]+)$/);
    if (xboxConsolesDetail) {
      this.renderProductDetailView(main, 'xbox', xboxConsolesDetail[1]);
      return;
    }
    const xboxShortDetail = path.match(/^\/xbox\/([^/]+)$/);
    if (xboxShortDetail && xboxShortDetail[1] !== 'controllers' && xboxShortDetail[1] !== 'accessories') {
      this.renderProductDetailView(main, 'xbox', xboxShortDetail[1]);
      return;
    }

    if (path.startsWith('/surface')) {
      const resolved = (typeof Taxonomy !== 'undefined' && Taxonomy.resolvePath)
        ? Taxonomy.resolvePath(path)
        : { canonical: '#/' };
      if (resolved.canonical && resolved.canonical !== '#' + path) {
        this.navigate(resolved.canonical);
        return;
      }
    }

    // 回退首页
    this.renderHomeView(main);
  },

  // 2. 首页渲染 (PRD 第十五章: 快速定位产品，非官方营销页)
  renderHomeView(container) {
    const currentCnDevices = this.homeShelfDevices('current');
    const upcomingDevices = this.homeShelfDevices('upcoming');
    const recentAdditions = this.listDevices().slice(0, 4);

    let html = `
      <!-- 首页高阶叙事 Hero 引导区 (PRD D-2) -->
      <div class="home-hero-banner">
        <div class="home-hero-badge">
          <span>✨ 微软历代 Surface 全谱系技术规格中枢</span>
          <span style="opacity:0.6;">｜</span>
          <span>收录 ${this.listDevices().length} 条设备记录 · ${Catalog.accessories().length} 条 Surface 配件记录（不等于 SKU 数，未全量核验）</span>
        </div>
        <h1 class="home-hero-title">Surface 参数中心 · 民间资料库</h1>
        <p class="home-hero-desc">
          为数码极客、工程师与企业采购打造的客观技术参数资料库。支持全系 13 大类微观参数深度查阅、双轴冻结多机型横向比对、NPU 算力天梯与双向配件兼容矩阵。
        </p>

        <!-- 10 秒选机导流核心卡片体系 (PRD D-2) -->
        <div style="font-size:13px; font-weight:700; color:var(--ms-text-primary); margin-top:16px;">
          🎯 10 秒快速定位机型：
        </div>
        <div class="scenario-quick-grid">
          <div class="scenario-card" onclick="App.navigate('#/consumer/pro')">
            <div class="scenario-card-header">
              <span class="scenario-card-icon">🚀</span>
              <div class="scenario-card-title">轻量便携与二合一</div>
            </div>
            <div class="scenario-card-desc">便携平板与笔记本形态自由切换，支持手写笔与超长续航。</div>
            <div class="scenario-card-footer">
              <span>推荐: Surface Pro / Go 系列</span>
              <span>查看 ↗</span>
            </div>
          </div>

          <div class="scenario-card" onclick="App.navigate('#/consumer/laptop')">
            <div class="scenario-card-header">
              <span class="scenario-card-icon">💻</span>
              <div class="scenario-card-title">长效续航与传统轻薄本</div>
            </div>
            <div class="scenario-card-desc">高通骁龙 X2 平台，触觉压感触控板，全天候长达 22 小时办公。</div>
            <div class="scenario-card-footer">
              <span>推荐: Surface Laptop 8 (13.8"/15")</span>
              <span>查看 ↗</span>
            </div>
          </div>

          <div class="scenario-card" onclick="App.navigate('#/consumer/sls')">
            <div class="scenario-card-header">
              <span class="scenario-card-icon">🎨</span>
              <div class="scenario-card-title">创意设计与重度生产力</div>
            </div>
            <div class="scenario-card-desc">动态编织铰链，RTX 独立显卡加速，工作室与展台多姿态工作流。</div>
            <div class="scenario-card-footer">
              <span>推荐: Laptop Studio 2 / Studio 2+</span>
              <span>查看 ↗</span>
            </div>
          </div>

          <div class="scenario-card" onclick="App.navigate('#/timeline')">
            <div class="scenario-card-header">
              <span class="scenario-card-icon">⏳</span>
              <div class="scenario-card-title">14 年演进编年史</div>
            </div>
            <div class="scenario-card-desc">从 2012 初代 RT 到 2026 骁龙 X2 旗舰，见证微软硬件每一次架构跃迁。</div>
            <div class="scenario-card-footer">
              <span>招牌体验: 历代硬件时间轴</span>
              <span>探索 ↗</span>
            </div>
          </div>
        </div>
      </div>

      <div class="home-section-header">
        <h2 style="font-size:22px; font-weight:700; margin:0;">国行在售</h2>
        <button class="fluent-btn primary" onclick="App.navigate('#/compare?products=pro-12-inch-2,laptop-13-inch-2')">开始对比</button>
      </div>
      <p style="margin:-8px 0 16px; font-size:13px; color:var(--ms-text-secondary);">在售 ${currentCnDevices.length} 款 · 即将发售 ${upcomingDevices.length} 款。点选机型查看完整参数，或对比 9 月新发布的 12 英寸 Pro 与 13 英寸 Laptop。</p>

      <div class="mobile-scroll-hint">👈 左右滑动查看更多国行在售机型 👉</div>
      <div class="device-select-strip" style="margin-bottom:28px;">
    `;

    currentCnDevices.forEach((dev, index) => {
      const devShot = this.shot(dev);
      const homeColors = this.spec(dev, 'colors');
      const defaultColor = (Array.isArray(homeColors) && homeColors.length > 0) ? homeColors[0] : null;
      const defaultColorLabel = defaultColor ? `${defaultColor.name}${defaultColor.material ? ' · ' + defaultColor.material.replace(/®|合金/g, '') : ''}` : '';
      const colorDotsHtml = (Array.isArray(homeColors) && homeColors.length > 1) ? `
        <div class="card-color-swatches" onclick="event.stopPropagation();">
          <div class="card-color-dots-row">
            ${homeColors.map((c, idx) => `
              <span class="card-color-dot ${idx === 0 ? 'active' : ''}" style="background:${c.hex};" title="${c.name}${c.material ? ' (' + c.material + ')' : ''}"
                onmouseenter="App.previewCardColor('${dev.id}', '${c.name}', this)"
                onclick="App.previewCardColor('${dev.id}', '${c.name}', this)"></span>
            `).join('')}
          </div>
          <span class="card-active-color-name" id="color-name-${dev.id}">${defaultColorLabel}</span>
        </div>
      ` : '';

      html += `
        <div class="device-card-mini" id="card-${dev.id}" onclick="App.navigateToDetail('${dev.categoryId}', '${dev.id}')">
          <div class="device-img-wrap">
            ${this.picture(devShot, {
              slot: 'card',
              id: `thumb-${dev.id}`,
              className: 'device-thumb-img',
              alt: dev.name,
              loading: index < 4 ? 'eager' : 'lazy',
              sizes: '(max-width: 768px) 80vw, 160px',
              onerror: 'App.hideBrokenImage(this)'
            })}
                  ${this.portraitBadge(dev, '', `portrait-mark-${dev.id}`)}
                  <div style="display:${devShot.src ? 'none' : 'flex'}; width:100%; height:100%; align-items:center; justify-content:center;">
                    ${ComparisonEngine.getDeviceSvgIcon(dev.categoryId)}
                  </div>
                </div>
                <div class="device-name">${dev.name}</div>
          <div class="device-tagline">${dev.tagline}</div>
          ${this.audienceHtml(dev)}
          ${colorDotsHtml}
          <div style="display:flex; gap:4px; justify-content:center; flex-wrap:wrap; margin-top:6px;">
            ${this.recentLaunchBadge(dev)}
            <span class="spec-badge green">国行在售</span>
            ${String(Catalog.getSpec(dev, 'npuTops') || '').includes('80') ? '<span class="spec-badge gold">80 TOPS</span>' : ''}
          </div>
        </div>
      `;
    });

    html += `
      </div>
    `;

    if (upcomingDevices && upcomingDevices.length) {
      html += `
        <div class="home-section-header">
          <h2 style="font-size:20px; font-weight:700; margin:0;">即将发售</h2>
        </div>
        <p style="margin:-8px 0 16px; font-size:13px; color:var(--ms-text-secondary);">收录官方已公布发布日程但尚未正式在售的 Surface 机型（共 ${upcomingDevices.length} 款）。</p>
        <div class="device-select-strip" style="margin-bottom:28px;">
      `;
      upcomingDevices.forEach((dev) => {
        const devShot = this.shot(dev);
        html += `
          <div class="device-card-mini" id="card-${dev.id}" onclick="App.navigateToDetail('${dev.categoryId}', '${dev.id}')">
            <div class="device-img-wrap">
              ${this.picture(devShot, {
                slot: 'card',
                id: `thumb-${dev.id}`,
                className: 'device-thumb-img',
                alt: dev.name,
                loading: 'lazy',
                sizes: '(max-width: 768px) 80vw, 160px',
                onerror: 'App.hideBrokenImage(this)'
              })}
              ${this.portraitBadge(dev, '', `portrait-mark-${dev.id}`)}
            </div>
            <div class="device-name">${dev.name}</div>
            <div class="device-tagline">${dev.tagline}</div>
            ${this.audienceHtml(dev)}
            <div style="display:flex; gap:4px; justify-content:center; flex-wrap:wrap; margin-top:6px;">
              ${ComparisonEngine.renderStatusBadge(dev.status)}
            </div>
          </div>
        `;
      });
      html += `</div>`;
    }

    html += `
      <!-- 🛒 探索消费版全系列 (Consumer) -->
      <div class="home-section-header">
        <div style="display:flex; align-items:center; gap:8px;">
          <h2 style="font-size:20px; font-weight:700; color:var(--ms-text-primary); margin:0;">消费版</h2>
        </div>
        <span class="header-sub-tag">按系列查看历代机型</span>
      </div>

      <div class="series-nav-grid">
        ${(SURFACE_DATA.consumerCategories || []).map((cat, index) => {
          const devs = this.listDevices({ seriesId: cat.seriesId, segment: 'consumer' });
          const iconShot = this.shot(devs[0]);
          return `
            <div class="series-card" onclick="App.navigate('#/consumer/${cat.seriesId}')">
              <div class="series-icon">
                ${iconShot.src ? this.picture(iconShot, {
                  slot: 'icon',
                  className: 'series-icon-img',
                  alt: cat.name,
                  loading: index < 4 ? 'eager' : 'lazy',
                  onerror: 'App.hideBrokenImage(this)'
                }) : ''}
                <div style="display:${iconShot.src ? 'none' : 'flex'}; width:100%; height:100%; align-items:center; justify-content:center;">
                  ${ComparisonEngine.getDeviceSvgIcon(cat.seriesId)}
                </div>
              </div>
              <div class="series-info">
                <div class="series-title">${cat.name}</div>
                <div class="series-desc">${cat.desc}</div>
                <div class="series-count">收录历代 ${devs.length} 款消费产品 ↗</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- 🏢 探索商用版全系列 (For Business) -->
      <div class="home-section-header" style="margin-top:36px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <h2 style="font-size:20px; font-weight:700; color:var(--ms-text-primary); margin:0;">商用版</h2>
        </div>
        <span class="header-sub-tag">按系列查看商用机型</span>
      </div>

      <div class="series-nav-grid">
        ${(SURFACE_DATA.commercialCategories || []).map(cat => {
          const devs = this.listDevices({ seriesId: cat.seriesId, segment: 'commercial' });
          return `
            <div class="series-card" onclick="App.navigate('#/business/${cat.seriesId}')">
              <div class="series-icon">
                ${this.picture(this.shot(devs[0]), {
                  slot: 'icon',
                  className: 'series-icon-img',
                  alt: cat.name,
                  loading: 'lazy',
                  onerror: 'App.hideBrokenImage(this)'
                })}
                <div style="display:none; width:100%; height:100%;">
                  ${ComparisonEngine.getDeviceSvgIcon(cat.seriesId === 'hub' ? 'desktop' : cat.seriesId)}
                </div>
              </div>
              <div class="series-info">
                <div class="series-title">${cat.name}</div>
                <div class="series-desc">${cat.desc}</div>
                <div class="series-count">收录历代 ${devs.length} 款商用产品 ↗</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- 🎮 探索 XBOX 专区 (独立一栏，不放在 Surface 后面) -->
      <div class="home-section-header" style="margin-top:36px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <h2 style="font-size:20px; font-weight:700; color:var(--ms-text-primary); margin:0;">Xbox 专区</h2>
          <span class="sidebar-group-badge xbox" style="font-size:11px; padding:2px 8px;">独立产品大类</span>
        </div>
        <span class="header-sub-tag">按类别查看 Xbox 主机、手柄大全与配件体系</span>
      </div>

      <div class="series-nav-grid">
        ${(SURFACE_DATA.xboxCategories || []).map((cat, index) => {
          let countText = '';
          let targetPath = '';
          let heroImg = '';
          if (cat.subCategory === 'consoles') {
            const devs = this.listDevices({ seriesId: 'xbox', segment: 'xbox' });
            countText = `收录历代 ${devs.length} 款主机型号 ↗`;
            targetPath = '#/xbox/consoles';
            heroImg = './assets/products/xbox-series-x-1tb-hero.png';
          } else if (cat.subCategory === 'controllers') {
            const ctrlCount = (typeof XBOX_CONTROLLERS !== 'undefined' ? XBOX_CONTROLLERS.length : 36);
            countText = `收录历代 ${ctrlCount} 款全色彩与限定版手柄 ↗`;
            targetPath = '#/xbox/controllers';
            heroImg = './assets/products/xbox-series-controller-sky-cipher.jpg';
          } else {
            const accCount = (typeof XBOX_ACCESSORIES !== 'undefined' ? XBOX_ACCESSORIES.length : 5);
            countText = `收录 ${accCount} 款官方存储卡、耳机与配件 ↗`;
            targetPath = '#/xbox/accessories';
            heroImg = './assets/products/xbox-wireless-headset.png';
          }
          return `
            <div class="series-card" onclick="App.navigate('${targetPath}')">
              <div class="series-icon" style="background:var(--ms-bg-subtle); display:flex; align-items:center; justify-content:center; overflow:hidden; padding:4px;">
                <img src="${heroImg}" alt="${cat.name}" style="max-width:100%; max-height:100%; object-fit:contain; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.08));" loading="lazy">
              </div>
              <div class="series-info">
                <div class="series-title">${cat.name}</div>
                <div class="series-desc">${cat.desc}</div>
                <div class="series-count">${countText}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- ⌨️ 探索 Surface 官方原装配件体系 -->
      <div class="home-section-header" style="margin-top:36px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <h2 style="font-size:20px; font-weight:700; color:var(--ms-text-primary); margin:0;">Surface 原装配件</h2>
          <span class="sidebar-group-badge" style="font-size:11px; padding:2px 8px; background:var(--ms-accent-light); color:var(--ms-accent);">官方生态</span>
        </div>
        <span class="header-sub-tag">键盘盖、超薄触控笔、雷电扩展坞、鼠标与音频外设</span>
      </div>

      <div class="series-nav-grid">
        <div class="series-card" onclick="App.navigate('#/accessories/keyboard')">
          <div class="series-icon" style="background:var(--ms-bg-subtle); display:flex; align-items:center; justify-content:center; overflow:hidden; padding:4px;">
            <img src="./assets/accessories/flex-keyboard.png" alt="键盘盖与保护套" style="max-width:100%; max-height:100%; object-fit:contain; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.08));" loading="lazy">
          </div>
          <div class="series-info">
            <div class="series-title">专业键盘盖与键鼠套件</div>
            <div class="series-desc">Flex 触觉键盘、特制版带笔槽键盘盖与经典便携键盘</div>
            <div class="series-count">收录 6 款原装键盘 ↗</div>
          </div>
        </div>

        <div class="series-card" onclick="App.navigate('#/accessories/pen')">
          <div class="series-icon" style="background:var(--ms-bg-subtle); display:flex; align-items:center; justify-content:center; overflow:hidden; padding:4px;">
            <img src="./assets/accessories/slim-pen-2.png" alt="触控笔" style="max-width:100%; max-height:100%; object-fit:contain; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.08));" loading="lazy">
          </div>
          <div class="series-info">
            <div class="series-title">触控笔 / 超薄触控笔</div>
            <div class="series-desc">4096 级压感超薄笔 2、触觉震动反馈与经典压感笔</div>
            <div class="series-count">收录 4 款原装触控笔 ↗</div>
          </div>
        </div>

        <div class="series-card" onclick="App.navigate('#/accessories/dock')">
          <div class="series-icon" style="background:var(--ms-bg-subtle); display:flex; align-items:center; justify-content:center; overflow:hidden; padding:4px;">
            <img src="./assets/accessories/surface-tb4-dock.png" alt="拓展坞" style="max-width:100%; max-height:100%; object-fit:contain; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.08));" loading="lazy">
          </div>
          <div class="series-info">
            <div class="series-title">拓展坞与雷电连接坞</div>
            <div class="series-desc">Thunderbolt 4 高速坞、Dock 2 桌面工作站与便携集线器</div>
            <div class="series-count">收录 5 款官方扩展坞 ↗</div>
          </div>
        </div>

        <div class="series-card" onclick="App.navigate('#/accessories/mouse')">
          <div class="series-icon" style="background:var(--ms-bg-subtle); display:flex; align-items:center; justify-content:center; overflow:hidden; padding:4px;">
            <img src="./assets/accessories/surface-arc-mouse.png" alt="鼠标与旋钮" style="max-width:100%; max-height:100%; object-fit:contain; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.08));" loading="lazy">
          </div>
          <div class="series-info">
            <div class="series-title">精工鼠标与创作者旋钮</div>
            <div class="series-desc">Arc 弯折便携鼠标、精准人体工学鼠标与 Surface Dial</div>
            <div class="series-count">收录 5 款鼠标与旋钮 ↗</div>
          </div>
        </div>

        <div class="series-card" onclick="App.navigate('#/accessories/audio')">
          <div class="series-icon" style="background:var(--ms-bg-subtle); display:flex; align-items:center; justify-content:center; overflow:hidden; padding:4px;">
            <img src="./assets/accessories/surface-headphones-2.png" alt="音频耳机" style="max-width:100%; max-height:100%; object-fit:contain; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.08));" loading="lazy">
          </div>
          <div class="series-info">
            <div class="series-title">音频与降噪耳机</div>
            <div class="series-desc">Headphones 2 旋钮降噪耳机、Earbuds 与会务音箱坞</div>
            <div class="series-count">收录 3 款原装音频产品 ↗</div>
          </div>
        </div>

        <div class="series-card" onclick="App.navigate('#/tools/compat')">
          <div class="series-icon" style="background:var(--ms-accent-light); display:flex; align-items:center; justify-content:center; overflow:hidden; padding:4px; color:var(--ms-accent);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>
          </div>
          <div class="series-info">
            <div class="series-title" style="color:var(--ms-accent);">配件双向兼容矩阵 ↗</div>
            <div class="series-desc">选择任意 Surface 主机或配件，实时查看全面兼容状态</div>
            <div class="series-count" style="color:var(--ms-accent); font-weight:600;">进入全景交互矩阵 ➔</div>
          </div>
        </div>
      </div>

      <!-- 快速对比经典组合推荐 -->
      <div class="home-section-header" style="margin-top:28px;">
        <h2>常用对比</h2>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px;">
        <div class="compare-shortcut-card" onclick="App.navigate('#/compare?products=pro-12-13-intel,pro-12-13-snap')">
          <div style="font-weight:600; font-size:14px; margin-bottom:4px;">Pro 12 商用版 (Intel vs 骁龙)</div>
          <div style="font-size:12px; color:var(--ms-text-secondary);">50 TOPS 酷睿 Ultra 3 代 对比 80 TOPS 骁龙 X2 Elite</div>
        </div>
        <div class="compare-shortcut-card" onclick="App.navigate('#/compare?products=pro-12-13-intel,laptop-8-138-intel')">
          <div style="font-weight:600; font-size:14px; margin-bottom:4px;">Surface Pro 12 vs Surface Laptop 8 (商用 Intel)</div>
          <div style="font-size:12px; color:var(--ms-text-secondary);">二合一触控平板 vs 经典触觉触控板轻薄本选型</div>
        </div>
        <div class="compare-shortcut-card" onclick="App.navigate('#/compare?products=pro-11-13,pro-10-biz')">
          <div style="font-weight:600; font-size:14px; margin-bottom:4px;">Pro 11 (消费零售版) vs Pro 10 (商用版)</div>
          <div style="font-size:12px; color:var(--ms-text-secondary);">高通骁龙 X 架构对比 Intel Core Ultra 标压商用</div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  },

  // 3. 系列多代横向参数页 (PRD 第六章: 消费版与商用版 100% 绝对隔离)
  renderSeriesView(container, seriesId, segment = 'consumer') {
    if (seriesId.startsWith('business-')) {
      seriesId = seriesId.replace('business-', '');
      segment = 'commercial';
    } else if (seriesId.startsWith('consumer-')) {
      seriesId = seriesId.replace('consumer-', '');
      segment = 'consumer';
    } else if (seriesId.startsWith('xbox-')) {
      seriesId = seriesId.replace('xbox-', '');
      segment = 'xbox';
    } else if (seriesId === 'xbox' || seriesId === 'consoles') {
      segment = 'xbox';
    }

    const isCommercial = segment === 'commercial';
    const isXbox = segment === 'xbox' || seriesId === 'xbox' || seriesId === 'consoles';
    let cat;
    if (isXbox) {
      cat = (SURFACE_DATA.xboxCategories || []).find(c => c.seriesId === seriesId || c.subCategory === seriesId) || {
        id: 'xbox-consoles',
        seriesId: 'xbox',
        name: 'XBOX 主机',
        desc: '微软历代 Xbox 游戏主机规格中枢'
      };
    } else if (isCommercial) {
      cat = (SURFACE_DATA.commercialCategories || []).find(c => c.seriesId === seriesId) || {
        id: 'business-' + seriesId,
        seriesId: seriesId,
        name: `Surface ${seriesId.toUpperCase()} 商用系列`,
        desc: '微软官方企业级商用系列'
      };
    } else {
      cat = (SURFACE_DATA.consumerCategories || []).find(c => c.seriesId === seriesId) || {
        id: 'consumer-' + seriesId,
        seriesId: seriesId,
        name: `Surface ${seriesId.toUpperCase()} 消费系列`,
        desc: '微软官方零售消费系列'
      };
    }

    // 100% 隔离筛选：消费版仅含消费机型，商用版仅含商用机型，Xbox 版仅含 Xbox 主机
    let catDevices = this.devicesForSeriesTable(seriesId === 'consoles' ? 'xbox' : seriesId, segment);
    const devicesForTable = catDevices;

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

        ${isXbox ? `
          <div class="xbox-scope-callout" role="note" style="margin:14px 0 6px 0; padding:12px 16px; border-radius:8px; background:rgba(16, 124, 65, 0.08); border-left:4px solid #107c41; font-size:13px; line-height:1.6; color:var(--ms-text-primary); width:100%;">
            <strong>【微软硬件生态拓展收录】</strong>本专区作为 Microsoft 硬件生态的补充资料，收录历代 Xbox 主机规格参数。本专区非 Surface 个人电脑核心系列，供硬件极客与数码玩家查阅参考。
          </div>
        ` : ''}

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

          <button class="fluent-btn" onclick="App.selectAllCategoryDevices('${cat.seriesId || cat.id}', '${segment}')">
            一键全选本系列
          </button>
        </div>
      </div>

      <!-- 多维筛选控制条 (受众 / 平台 / 状态 / Copilot+) -->
      ${this.renderFilterBar(cat.seriesId || cat.id, segment)}
    `;

    if (this.seriesViewMode === 'gallery') {
      // 🎴 画廊视图 (Gallery View)
      html += `
        <div class="series-gallery-grid">
          ${catDevices.map((dev, index) => {
            const isSelected = ComparisonEngine.selectedIds.includes(dev.id);
            const devShot = this.shot(dev);
            const galleryColors = this.spec(dev, 'colors');
            const defaultColor = (Array.isArray(galleryColors) && galleryColors.length > 0) ? galleryColors[0] : null;
            const defaultColorLabel = defaultColor ? `${defaultColor.name}${defaultColor.material ? ' · ' + defaultColor.material.replace(/®|合金/g, '') : ''}` : '';
            const colorDotsHtml = (Array.isArray(galleryColors) && galleryColors.length > 1) ? `
              <div class="card-color-swatches" onclick="event.stopPropagation();" style="margin-bottom:12px;">
                <div class="card-color-dots-row">
                  ${galleryColors.map((c, idx) => `
                    <span class="card-color-dot ${idx === 0 ? 'active' : ''}" style="background:${c.hex};" title="${c.name}${c.material ? ' (' + c.material + ')' : ''}"
                      onmouseenter="App.previewCardColor('${dev.id}', '${c.name}', this)"
                      onclick="App.previewCardColor('${dev.id}', '${c.name}', this)"></span>
                  `).join('')}
                </div>
                <span class="card-active-color-name" id="color-name-${dev.id}">${defaultColorLabel}</span>
              </div>
            ` : '';

            return `
              <div class="device-card-mini ${isSelected ? 'selected' : ''}" style="text-align:left; padding:20px; align-items:flex-start; cursor:pointer;" data-id="${dev.id}" id="card-${dev.id}" onclick="App.navigateToDetail('${dev.categoryId}', '${dev.id}')">
                <div class="card-checkbox ${isSelected ? 'checked' : ''}" title="${isSelected ? '已加入对比（点击取消）' : '点击加入横向对比'}" onclick="event.stopPropagation(); ComparisonEngine.toggleDevice('${dev.id}')">${isSelected ? '✓' : ''}</div>
                <div class="device-img-wrap" style="height:140px; cursor:pointer; margin-bottom:12px;">
                  ${this.picture(devShot, {
                    slot: 'card',
                    id: `thumb-${dev.id}`,
                    className: 'device-thumb-img',
                    alt: dev.name,
                    loading: index < 4 ? 'eager' : 'lazy',
                    priority: index === 0 ? 'high' : '',
                    onerror: 'App.hideBrokenImage(this)'
                  })}
                  ${this.portraitBadge(dev, '', `portrait-mark-${dev.id}`)}
                  <div style="display:none; width:100%; height:100%;">
                    ${ComparisonEngine.getDeviceSvgIcon(dev.categoryId)}
                  </div>
                </div>
                <div style="display:flex; justify-content:space-between; width:100%; align-items:center; margin-bottom:6px;">
                  <div style="display:flex; gap:6px; align-items:center;">
                    <span class="device-year-badge">${this.spec(dev, 'releaseDate') || dev.year}</span>
                    ${dev.isCommercial ? '<span class="spec-badge commercial">🏢 商用</span>' : ''}
                  </div>
                  ${ComparisonEngine.renderStatusBadge(dev.status)}
                </div>
                <div class="device-name" style="font-size:16px; font-weight:700;">
                  ${dev.name}
                </div>
                <div class="device-tagline" style="margin-bottom:8px;">${dev.tagline}</div>
                ${this.audienceHtml(dev)}
                ${colorDotsHtml}
                <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:16px;">
                  ${this.recentLaunchBadge(dev)}
                  <span class="spec-badge">${this.spec(dev, 'cpuModel')}</span>
                  ${Catalog.isNpuDisplayable(this.spec(dev, 'npuTops')) ? `<span class="spec-badge gold">${this.spec(dev, 'npuTops')}</span>` : ''}
                  <span class="spec-badge">${this.spec(dev, 'screenSize')}</span>
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
          ${ComparisonEngine.renderSpecTable(devicesForTable)}
        </div>
      `;
    }

    container.innerHTML = html;
  },

  // 3.4a Xbox 手柄专区 (大全中心)
  renderXboxControllersView(container) {
    const controllers = (typeof XBOX_CONTROLLERS !== 'undefined' ? XBOX_CONTROLLERS : (typeof XBOX_LINEUP !== 'undefined' && XBOX_LINEUP.controllers ? XBOX_LINEUP.controllers : []));
    const activeFilter = this._xboxCtrlFilter || 'all';
    const searchQuery = (this._xboxCtrlQuery || '').trim().toLowerCase();

    const filtered = controllers.filter(ctrl => {
      // 类别与发售地区筛选
      if (activeFilter === 'cn_active' && ctrl.salesRegion !== 'cn_official') return false;
      if (activeFilter === 'us_exclusive' && ctrl.salesRegion !== 'us_only') return false;
      if (activeFilter === 'series_core' && (ctrl.generation !== 'series' || ctrl.seriesType !== 'core')) return false;
      if (activeFilter === 'series_special' && (ctrl.generation !== 'series' || ctrl.seriesType !== 'special')) return false;
      if (activeFilter === 'series_camo' && (ctrl.generation !== 'series' || ctrl.seriesType !== 'camo')) return false;
      if (activeFilter === 'series_limited' && (ctrl.generation !== 'series' || ctrl.seriesType !== 'limited')) return false;
      if (activeFilter === 'elite' && ctrl.generation !== 'elite') return false;
      if (activeFilter === 'retro' && (ctrl.generation !== 'one' && ctrl.generation !== '360' && ctrl.generation !== 'original')) return false;
      if (activeFilter === 'adaptive' && ctrl.generation !== 'adaptive') return false;

      // 关键词搜索
      if (searchQuery) {
        const text = `${ctrl.name} ${ctrl.nameEn} ${ctrl.colorName} ${ctrl.description} ${ctrl.generationName} ${ctrl.seriesTypeName} ${ctrl.year}`.toLowerCase();
        if (!text.includes(searchQuery)) return false;
      }
      return true;
    });

    let html = `
      <div class="view-header">
        <div class="view-title-group">
          <h1>
            <span>Xbox 手柄大全中心</span>
            <span class="header-sub-tag">Xbox 历代官方控制器·全色系图鉴与硬件微观参数</span>
          </h1>
          <div class="view-meta-tip">
            <span>官方收录共 ${controllers.length} 款 ｜ 💡 对齐微软中国官方标准命名，清晰标注国行在售与美国限定款式 ｜ 覆盖初代 Duke、360、One、Series X|S 核心纯色、烟云透视、战术迷彩、联名限定与精英 2 代系列</span>
          </div>
        </div>
        <div class="view-actions">
          <a href="https://www.xbox.com/zh-CN/accessories/controllers" target="_blank" rel="noopener noreferrer" class="fluent-btn primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
            🎮 微软 Xbox 官方手柄商城 ↗
          </a>
        </div>
      </div>

      <!-- 微软泛硬件生态收录说明 (PRD P2-1 / C-5) -->
      <div class="xbox-scope-callout" role="note" style="margin:16px 0; padding:12px 16px; border-radius:8px; background:rgba(16, 124, 65, 0.08); border-left:4px solid #107c41; font-size:13px; line-height:1.6; color:var(--ms-text-primary);">
        <strong>【微软硬件生态拓展收录】</strong>本专区作为 Microsoft 硬件生态的补充资料，全量收录历代 Xbox 官方无线控制器、国行在售标准译名与海外限定色号图鉴，供数码外设与游戏玩家查阅参考。
      </div>

      <!-- 控制台：代际色彩分类 Tab + 实时搜索 -->
      <div style="background:var(--ms-bg-card); border:1px solid var(--ms-border-subtle); border-radius:10px; padding:16px; margin:20px 0; box-shadow:var(--ms-shadow-card);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            <button class="fluent-btn ${activeFilter === 'all' ? 'primary' : ''}" style="font-size:12.5px; padding:4px 12px;" onclick="App.setXboxControllerFilter('all')">全部 (${controllers.length})</button>
            <button class="fluent-btn ${activeFilter === 'cn_active' ? 'primary' : ''}" style="font-size:12.5px; padding:4px 12px;" onclick="App.setXboxControllerFilter('cn_active')">🇨🇳 国行在售</button>
            <button class="fluent-btn ${activeFilter === 'us_exclusive' ? 'primary' : ''}" style="font-size:12.5px; padding:4px 12px;" onclick="App.setXboxControllerFilter('us_exclusive')">🇺🇸 美国限定 / 未在大陆发售</button>
            <button class="fluent-btn ${activeFilter === 'series_core' ? 'primary' : ''}" style="font-size:12.5px; padding:4px 12px;" onclick="App.setXboxControllerFilter('series_core')">Series 核心纯色</button>
            <button class="fluent-btn ${activeFilter === 'series_special' ? 'primary' : ''}" style="font-size:12.5px; padding:4px 12px;" onclick="App.setXboxControllerFilter('series_special')">透视与烟云特别版</button>
            <button class="fluent-btn ${activeFilter === 'series_camo' ? 'primary' : ''}" style="font-size:12.5px; padding:4px 12px;" onclick="App.setXboxControllerFilter('series_camo')">战术迷彩系列</button>
            <button class="fluent-btn ${activeFilter === 'elite' ? 'primary' : ''}" style="font-size:12.5px; padding:4px 12px;" onclick="App.setXboxControllerFilter('elite')">精英系列 (Elite)</button>
            <button class="fluent-btn ${activeFilter === 'retro' ? 'primary' : ''}" style="font-size:12.5px; padding:4px 12px;" onclick="App.setXboxControllerFilter('retro')">经典复刻 (One/360/初代)</button>
            <button class="fluent-btn ${activeFilter === 'adaptive' ? 'primary' : ''}" style="font-size:12.5px; padding:4px 12px;" onclick="App.setXboxControllerFilter('adaptive')">无障碍控制器</button>
          </div>
          <div style="position:relative; min-width:240px; flex:1; max-width:320px;">
            <input type="text" placeholder="搜索手柄名称、色号、型号..." value="${this._xboxCtrlQuery || ''}"
              style="width:100%; box-sizing:border-box; padding:7px 12px 7px 32px; border-radius:6px; border:1px solid var(--ms-border-subtle); background:var(--ms-bg-subtle); font-size:13px; color:var(--ms-text-primary);"
              oninput="App.searchXboxControllers(this.value)">
            <span style="position:absolute; left:10px; top:50%; transform:translateY(-50%); font-size:13px; opacity:0.6;">🔍</span>
          </div>
        </div>
        <div style="font-size:12px; color:var(--ms-text-secondary); display:flex; justify-content:space-between; align-items:center;">
          <span>当前筛选结果：<strong>${filtered.length}</strong> 款手柄展示中</span>
          <span style="opacity:0.8;">💡 点击卡片可查看微软官方全色彩及详细微观硬件结构</span>
        </div>
      </div>

      <!-- 🎮 手柄全图鉴高密度网格 -->
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(330px, 1fr)); gap:20px;">
        ${filtered.map(ctrl => {
          let badgeClass = 'spec-badge green';
          if (ctrl.status === 'discontinued') badgeClass = 'spec-badge';
          if (ctrl.status === 'upcoming') badgeClass = 'spec-badge blue';
          if (ctrl.seriesType === 'limited') badgeClass = 'spec-badge gold';

          const regionBadgeHtml = ctrl.salesRegion === 'us_only'
            ? '<span class="spec-badge gold" style="font-size:11px; padding:2px 8px; font-weight:700;">🇺🇸 美国限定</span>'
            : (ctrl.salesRegion === 'cn_official'
              ? '<span class="spec-badge green" style="font-size:11px; padding:2px 8px; font-weight:700;">🇨🇳 国行在售</span>'
              : '<span class="spec-badge" style="font-size:11px; padding:2px 8px; background:var(--ms-bg-subtle); color:var(--ms-text-tertiary);">历史经典款</span>');

          return `
            <div class="device-card-mini" style="text-align:left; padding:18px 20px; align-items:flex-start; height:auto; transition:transform 0.2s cubic-bezier(0.1, 0.9, 0.2, 1), box-shadow 0.2s;" onmouseenter="this.style.transform='translateY(-3px)'" onmouseleave="this.style.transform='translateY(0)'">
              <!-- 卡片顶部信息条 -->
              <div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:8px; font-size:11.5px; flex-wrap:wrap; gap:6px;">
                <span style="color:var(--ms-text-tertiary); font-weight:600;">${ctrl.generationName} · ${ctrl.year} 年</span>
                <div style="display:flex; gap:4px; align-items:center;">
                  ${regionBadgeHtml}
                  <span class="${badgeClass}" style="font-size:11px; padding:2px 8px;">${ctrl.statusLabel}</span>
                </div>
              </div>

              <!-- 手柄真实官方摄影大图展示区 -->
              <div style="width:100%; height:170px; background:var(--ms-bg-subtle); border-radius:8px; display:flex; align-items:center; justify-content:center; margin-bottom:14px; padding:10px; box-sizing:border-box; overflow:hidden;">
                <img src="${ctrl.image}" alt="${ctrl.name}" style="max-height:100%; max-width:100%; object-fit:contain; filter:drop-shadow(0 6px 12px rgba(0,0,0,0.12));" loading="lazy" onerror="App.hideBrokenImage(this)">
              </div>

              <!-- 标题与色彩徽章 -->
              <div style="font-size:16px; font-weight:700; color:var(--ms-text-primary); margin-bottom:4px; line-height:1.3;">
                ${ctrl.name}
              </div>
              <div style="font-size:11.5px; color:var(--ms-text-tertiary); margin-bottom:10px;">${ctrl.nameEn}</div>

              <!-- 官方色卡指示器 -->
              <div style="display:inline-flex; align-items:center; gap:8px; padding:4px 10px; background:var(--ms-bg-subtle); border-radius:20px; margin-bottom:12px; font-size:12px; border:1px solid var(--ms-border-subtle);">
                <span style="display:inline-block; width:14px; height:14px; border-radius:50%; background:${ctrl.colorHex}; box-shadow:0 0 0 1px rgba(0,0,0,0.2) inset;"></span>
                <span style="font-weight:600; color:var(--ms-text-primary);">${ctrl.colorName}</span>
              </div>

              <!-- 详细微观规格矩阵 -->
              <div style="display:flex; flex-direction:column; gap:6px; width:100%; font-size:12px; border-top:1px solid var(--ms-border-subtle); padding-top:12px; color:var(--ms-text-secondary); line-height:1.5;">
                <div><strong style="color:var(--ms-text-primary);">🕹️ 方向键结构：</strong>${ctrl.dpad}</div>
                <div><strong style="color:var(--ms-text-primary);">⚡ 扳机技术：</strong>${ctrl.triggers}</div>
                <div><strong style="color:var(--ms-text-primary);">📶 连接协议：</strong>${ctrl.connectivity}</div>
                <div><strong style="color:var(--ms-text-primary);">🔋 供电与续航：</strong>${ctrl.battery}</div>
                <div><strong style="color:var(--ms-text-primary);">🎧 音频接口：</strong>${ctrl.headphoneJack}</div>
                <div><strong style="color:var(--ms-text-primary);">🏷️ 官方参考价：</strong><span style="color:var(--ms-accent); font-weight:700;">${ctrl.msrp}</span></div>
              </div>

              <!-- 设计背景故事 -->
              <div style="margin-top:12px; padding-top:10px; border-top:1px dashed var(--ms-border-subtle); font-size:12px; color:var(--ms-text-tertiary); line-height:1.5;">
                ${ctrl.description}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div style="margin-top:30px; padding:16px 20px; background:var(--ms-bg-card); border:1px solid var(--ms-border-subtle); border-radius:8px; font-size:12.5px; color:var(--ms-text-secondary); line-height:1.6;">
        🛡️ <strong>Xbox 手柄档案核验守则：</strong>本中心收录的所有色彩款型、按键机构、微动开关、射频协议及建议售价均与微软 Xbox 官方技术白皮书及发售公报逐一核对。已明确标明国行在售与美国限定（未在大陆发售）版本。
      </div>
    `;
    container.innerHTML = html;
  },

  // 交互辅助：手柄过滤与搜索
  setXboxControllerFilter(filterName) {
    this._xboxCtrlFilter = filterName;
    const main = document.getElementById('hub-main-content');
    if (main) this.renderXboxControllersView(main);
  },

  searchXboxControllers(query) {
    this._xboxCtrlQuery = query;
    const main = document.getElementById('hub-main-content');
    if (main) this.renderXboxControllersView(main);
  },

  // 3.4c Surface 官方配件专区 (23 款官方原装配件图鉴)
  renderSurfaceAccessoriesView(container, activeCategory) {
    const category = activeCategory || 'all';
    this._activeAccessoryCategory = category;
    const allAccessories = (typeof Catalog !== 'undefined' && Catalog.accessories) ? Catalog.accessories() : ((typeof SURFACE_DATA !== 'undefined' && SURFACE_DATA.accessories) ? SURFACE_DATA.accessories : []);
    const query = (this._accessorySearchQuery || '').trim().toLowerCase();

    const filtered = allAccessories.filter(acc => {
      if (category === 'keyboard' && acc.category !== 'keyboard') return false;
      if (category === 'pen' && acc.category !== 'pen') return false;
      if (category === 'dock' && acc.category !== 'dock') return false;
      if (category === 'mouse' && acc.category !== 'mouse' && acc.category !== 'creative') return false;
      if (category === 'audio' && acc.category !== 'audio') return false;
      if (query) {
        const hay = `${acc.name} ${acc.category} ${acc.releaseYear} ${(acc.features || []).join(' ')} ${JSON.stringify(acc['specs'] || {})}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });

    const categoryTabs = [
      { id: 'all', label: '全部配件', count: allAccessories.length, icon: '⚡' },
      { id: 'keyboard', label: '专业键盘盖与键鼠套件', count: allAccessories.filter(a => a.category === 'keyboard').length, icon: '⌨️' },
      { id: 'pen', label: '触控笔 / 超薄笔', count: allAccessories.filter(a => a.category === 'pen').length, icon: '🖊️' },
      { id: 'dock', label: '拓展坞与雷电连接坞', count: allAccessories.filter(a => a.category === 'dock').length, icon: '🔌' },
      { id: 'mouse', label: '鼠标与创作者旋钮', count: allAccessories.filter(a => a.category === 'mouse' || a.category === 'creative').length, icon: '🖱️' },
      { id: 'audio', label: '音频与降噪耳机', count: allAccessories.filter(a => a.category === 'audio').length, icon: '🎧' }
    ];

    const categoryNamesMap = {
      keyboard: '键盘盖与保护套',
      pen: '触控笔系列',
      dock: '高速拓展坞与集线器',
      mouse: '精工鼠标系列',
      creative: '创作者智能旋钮',
      audio: '沉浸音频与降噪耳机'
    };

    let html = `
      <div class="view-header">
        <div class="view-title-group">
          <h1>
            <span>Surface 官方配件图鉴</span>
            <span class="header-sub-tag">微软官方原装配件 · 官方技术规格 · 双向全景兼容矩阵</span>
          </h1>
          <div class="view-meta-tip">
            <span>官方认证全量收录 ${allAccessories.length} 款原装主力配件 ｜ 💡 涵盖专业键盘盖、超薄触控笔 2、雷电 4 拓展坞、精准鼠标、降噪耳机与 Dial 智能旋钮 ｜ 零杜撰参数</span>
          </div>
        </div>
        <div class="view-actions">
          <button class="fluent-btn primary" onclick="App.navigate('#/tools/compat')">
            📊 配件双向兼容矩阵 ↗
          </button>
        </div>
      </div>

      <!-- 控制台：分类 Tab + 实时搜索 -->
      <div style="background:var(--ms-bg-card); border:1px solid var(--ms-border-subtle); border-radius:12px; padding:16px 20px; margin:20px 0; box-shadow:var(--ms-shadow-card);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            ${categoryTabs.map(t => `
              <button class="fluent-btn ${category === t.id ? 'primary' : ''}" style="font-size:12.5px; padding:6px 14px; border-radius:20px;" onclick="App.navigate('#/accessories${t.id === 'all' ? '' : '/' + t.id}')">
                <span>${t.icon}</span> <span>${t.label} (${t.count})</span>
              </button>
            `).join('')}
          </div>
          <div style="position:relative; min-width:240px; flex:1; max-width:320px;">
            <input type="text" placeholder="搜索配件名称、接口、特性..." value="${this._accessorySearchQuery || ''}"
              style="width:100%; box-sizing:border-box; padding:7px 12px 7px 32px; border-radius:6px; border:1px solid var(--ms-border-subtle); background:var(--ms-bg-subtle); font-size:13px; color:var(--ms-text-primary);"
              oninput="App.searchAccessories(this.value)">
            <span style="position:absolute; left:10px; top:50%; transform:translateY(-50%); font-size:13px; opacity:0.6;">🔍</span>
          </div>
        </div>
        <div style="font-size:12px; color:var(--ms-text-secondary); display:flex; justify-content:space-between; align-items:center;">
          <span>当前筛选结果：展示 <strong>${filtered.length}</strong> 款官方原装配件</span>
          <span style="opacity:0.8;">💡 点击卡片下方支持机型可直达设备参数或跳转兼容矩阵</span>
        </div>
      </div>

      <!-- 配件网格 -->
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:22px; margin-bottom:40px;">
        ${filtered.map(acc => {
          const catName = categoryNamesMap[acc.category] || '原装配件';
          const fullSupported = (acc.compatibilityList || []).filter(d => d.status === 'FULL' && !d.deviceId.startsWith('xbox'));
          const sampleSupported = fullSupported.slice(0, 4);

          return `
            <div class="device-card-mini" style="text-align:left; padding:20px; align-items:flex-start; height:auto; transition:transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s;" onmouseenter="this.style.transform='translateY(-3px)'" onmouseleave="this.style.transform='translateY(0)'">
              <!-- 卡片顶部信息条 -->
              <div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:10px;">
                <span style="font-size:11.5px; font-weight:700; color:var(--ms-accent); background:var(--ms-accent-light); padding:3px 8px; border-radius:12px;">${catName}</span>
                <span class="spec-badge" style="font-size:11px; padding:2px 8px; background:var(--ms-bg-card-secondary); color:var(--ms-text-secondary);">${acc.categoryName || '官方原装'}</span>
              </div>

              <!-- 产品官方大图展示区 (响应式 WebP/AVIF + 优雅兜底) -->
              <div class="accessory-img-wrap">
                ${Catalog.frame({ src: acc.image, alt: acc.name }, {
                  slot: 'card',
                  className: 'accessory-card-img',
                  onerror: 'App.hideBrokenImage(this)'
                })}
              </div>

              <!-- 标题与特性导语 -->
              <div style="font-size:16.5px; font-weight:700; color:var(--ms-text-primary); margin-bottom:6px; line-height:1.35;">
                ${acc.name}
              </div>
              <div style="font-size:12.5px; color:var(--ms-text-secondary); line-height:1.45; margin-bottom:12px;">
                ${acc.tagline || ''}
              </div>

              <!-- 核心功能亮点 (4 项官方认证特性) -->
              ${(acc.features && acc.features.length) ? `
                <div style="font-size:12px; color:var(--ms-text-secondary); line-height:1.6; margin-bottom:14px; width:100%;">
                  <ul style="margin:0; padding-left:16px;">
                    ${acc.features.slice(0, 4).map(f => `<li style="margin-bottom:3px;">${f}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}

              <!-- 适配代表机型 -->
              <div style="margin-top:auto; width:100%; border-top:1px solid var(--ms-border-subtle); padding-top:12px;">
                <div style="font-size:11px; font-weight:700; color:var(--ms-text-tertiary); margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px;">
                  原生适配支持机型 (${fullSupported.length} 款)
                </div>
                <div style="display:flex; gap:5px; flex-wrap:wrap; margin-bottom:12px;">
                  ${sampleSupported.map(dev => {
                    const devObj = App.getDevice(dev.deviceId);
                    const label = devObj ? devObj.name : dev.deviceId;
                    return `
                      <span class="accessory-compat-chip" style="font-size:11px; padding:2px 8px; border-radius:10px; background:var(--ms-bg-subtle); color:var(--ms-text-primary); cursor:pointer; border:1px solid var(--ms-border-subtle);" onclick="App.navigateToDetail('', '${dev.deviceId}')" title="${dev.note || '完美支持'}">
                        ${label}
                      </span>
                    `;
                  }).join('')}
                  ${fullSupported.length > 4 ? `
                    <span style="font-size:11px; padding:2px 6px; color:var(--ms-accent); cursor:pointer;" onclick="App.navigate('#/tools/compat'); setTimeout(() => { if (typeof ToolsEngine !== 'undefined') ToolsEngine.selectAccessory('${acc.id}'); }, 80);">
                      +更多${fullSupported.length - 4}款
                    </span>
                  ` : ''}
                </div>

                <!-- 操作按钮组 -->
                <div style="display:flex; gap:8px;">
                  <button class="fluent-btn-sm" style="flex:1; justify-content:center; text-align:center;" onclick="App.navigate('#/tools/compat'); setTimeout(() => { if (typeof ToolsEngine !== 'undefined') ToolsEngine.selectAccessory('${acc.id}'); }, 80);" title="在全景矩阵中查看所有支持设备状态与注意事项">
                    📊 查看兼容矩阵 ↗
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.innerHTML = html;
  },

  searchAccessories(query) {
    this._accessorySearchQuery = query;
    const main = document.getElementById('hub-main-content');
    if (main) this.renderSurfaceAccessoriesView(main, this._activeAccessoryCategory);
  },

  // 3.4b Xbox 配件专区 (官方扩展图鉴)
  renderXboxAccessoriesView(container) {
    const accessories = (typeof XBOX_ACCESSORIES !== 'undefined' ? XBOX_ACCESSORIES : (typeof XBOX_LINEUP !== 'undefined' && XBOX_LINEUP.accessories ? XBOX_LINEUP.accessories : []));

    let html = `
      <div class="view-header">
        <div class="view-title-group">
          <h1>
            <span>Xbox 官方配件图鉴</span>
            <span class="header-sub-tag">Xbox 官方存储扩展、音频与周边生态</span>
          </h1>
          <div class="view-meta-tip">
            <span>官方认证收录 ${accessories.length} 款主力配件 ｜ 💡 包含希捷定制存储卡、官方无线双模耳机、Windows 10/11 极速无线适配器与电池包 ｜ 零杜撰参数</span>
          </div>
        </div>
        <div class="view-actions">
          <a href="https://www.xbox.com/zh-CN/accessories" target="_blank" rel="noopener noreferrer" class="fluent-btn primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
            🎒 微软 Xbox 官方配件商城 ↗
          </a>
        </div>
      </div>

      <!-- 微软泛硬件生态收录说明 (PRD P2-1 / C-5) -->
      <div class="xbox-scope-callout" role="note" style="margin:16px 0; padding:12px 16px; border-radius:8px; background:rgba(16, 124, 65, 0.08); border-left:4px solid #107c41; font-size:13px; line-height:1.6; color:var(--ms-text-primary);">
        <strong>【微软硬件生态拓展收录】</strong>本专区作为 Microsoft 硬件生态的补充资料，收录 Xbox 官方存储扩展卡、无线双模耳机及核心周边配件，供数码外设玩家查阅参考。
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(360px, 1fr)); gap:22px; margin-top:20px;">
        ${accessories.map(acc => `
          <div class="device-card-mini" style="text-align:left; padding:22px; align-items:flex-start; height:auto; transition:transform 0.2s;" onmouseenter="this.style.transform='translateY(-3px)'" onmouseleave="this.style.transform='translateY(0)'">
            <div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:10px;">
              <span style="font-size:12px; font-weight:700; color:var(--ms-accent);">${acc.categoryName}</span>
              <span class="spec-badge green">${acc.statusLabel}</span>
            </div>

            <!-- 产品真实大图展示 -->
            <div style="width:100%; height:180px; background:var(--ms-bg-subtle); border-radius:8px; display:flex; align-items:center; justify-content:center; margin-bottom:14px; padding:10px; box-sizing:border-box;">
              <img src="${acc.image}" alt="${acc.name}" style="max-height:100%; max-width:100%; object-fit:contain; filter:drop-shadow(0 4px 8px rgba(0,0,0,0.1));" loading="lazy" onerror="App.hideBrokenImage(this)">
            </div>

            <div style="font-size:18px; font-weight:700; color:var(--ms-text-primary); margin-bottom:4px;">${acc.name}</div>
            <div style="font-size:12px; color:var(--ms-text-tertiary); margin-bottom:12px;">${acc.nameEn}</div>

            <div style="font-size:13px; color:var(--ms-text-secondary); line-height:1.6; margin-bottom:14px;">
              ${acc.description}
            </div>

            <!-- 参数列表 -->
            <div style="display:flex; flex-direction:column; gap:8px; width:100%; font-size:12.5px; border-top:1px solid var(--ms-border-subtle); padding-top:12px; color:var(--ms-text-secondary);">
              ${Object.keys(acc.details || {}).map(k => {
                const labelMap = {
                  capacity: '💾 存储容量',
                  interface: '🔌 硬件接口',
                  speed: '🚀 读写吞吐',
                  architecture: '⚡ 快速架构',
                  features: '✨ 核心特性',
                  driver: '🔊 扬声单元',
                  spatialAudio: '🎧 空间音频',
                  connectivity: '📶 无线协议',
                  battery: '🔋 供电续航',
                  mic: '🎙️ 麦克风',
                  controls: '🎛️ 机身交互',
                  headsetSupport: '🎧 耳机支持',
                  port: '💻 接口规格',
                  dimensions: '📐 物理尺寸',
                  weight: '⚖️ 机身净重',
                  batteryType: '🔋 电池类型',
                  chargingTime: '⏱️ 充满耗时',
                  batteryLife: '🎮 游戏续航',
                  cable: '🧵 随附线缆',
                  compatibility: '🤝 兼容设备'
                };
                return `<div><strong style="color:var(--ms-text-primary);">${labelMap[k] || k}：</strong>${acc.details[k]}</div>`;
              }).join('')}
              <div style="margin-top:6px;"><strong style="color:var(--ms-text-primary);">🏷️ 官方参考价：</strong><span style="color:var(--ms-accent); font-weight:700;">${acc.price}</span></div>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="margin-top:24px; padding:14px 18px; background:var(--ms-bg-card); border:1px solid var(--ms-border-subtle); border-radius:8px; font-size:12px; color:var(--ms-text-secondary); line-height:1.6;">
        🛡️ <strong>官方扩展协议守则：</strong>Xbox Series X|S 专属存储扩展卡利用定点 PCIe 4.0 x2 直连通道提供与机身内置 SSD 毫无二致的 4.8 GB/s 瞬时硬件解压带宽；通用 USB 3.1 移动硬盘仅供存放与运行向下兼容作品。
      </div>
    `;
    container.innerHTML = html;
  },


  // 3.5 Surface 商用版专区 (Surface for Business) - 微软官方 Learn 架构全线对齐
  renderBusinessView(container) {
    const commercialDevices = this.listDevices({ segment: 'commercial' });

    let html = `
      <div class="business-hero-banner">
        <div class="business-hero-badge">
          <span>🏢 Microsoft Learn 官方商用规格中心</span>
          <span class="business-sub-pill">Surface for Business</span>
        </div>
        <h1 class="business-hero-title">Surface 商用版产品中枢</h1>
        <p class="business-hero-desc">
          严格对齐微软官方 Learn (learn.microsoft.com/surface) 技术架构标准。专为企业 IT 集中运维、采购合规、高安全办公与工业现场场景设计，提供深度硬件参数、规格表写明的可拆卸式固态硬盘、Secured-core PC 安全基线与官方驱动生命周期支持。
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
          <div class="pillar-title">可拆卸式固态硬盘</div>
          <div class="pillar-desc">仅技术规格写明「可拆卸式」的机型适用。送修时能否留存硬盘，以该机型的驱动器保留条款和维修指南为准。</div>
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
        ${commercialDevices.map((dev, index) => {
          const isSelected = ComparisonEngine.selectedIds.includes(dev.id);
          const devShot = this.shot(dev);
          const galleryColors = this.spec(dev, 'colors');
          const defaultColor = (Array.isArray(galleryColors) && galleryColors.length > 0) ? galleryColors[0] : null;
          const defaultColorLabel = defaultColor ? `${defaultColor.name}${defaultColor.material ? ' · ' + defaultColor.material.replace(/®|合金/g, '') : ''}` : '';
          const colorDotsHtml = (Array.isArray(galleryColors) && galleryColors.length > 1) ? `
            <div class="card-color-swatches" onclick="event.stopPropagation();" style="margin-bottom:12px;">
              <div class="card-color-dots-row">
                ${galleryColors.map((c, idx) => `
                  <span class="card-color-dot ${idx === 0 ? 'active' : ''}" style="background:${c.hex};" title="${c.name}${c.material ? ' (' + c.material + ')' : ''}"
                    onmouseenter="App.previewCardColor('${dev.id}', '${c.name}', this)"
                    onclick="App.previewCardColor('${dev.id}', '${c.name}', this)"></span>
                `).join('')}
              </div>
              <span class="card-active-color-name" id="color-name-${dev.id}">${defaultColorLabel}</span>
            </div>
          ` : '';

          return `
            <div class="device-card-mini ${isSelected ? 'selected' : ''}" style="text-align:left; padding:20px; align-items:flex-start; cursor:pointer;" data-id="${dev.id}" id="card-${dev.id}" onclick="App.navigateToDetail('${dev.categoryId}', '${dev.id}')">
              <div class="device-img-wrap" style="height:140px; cursor:pointer; margin-bottom:12px;">
                ${this.picture(devShot, {
                  slot: 'card',
                  id: `thumb-${dev.id}`,
                  className: 'device-thumb-img',
                  alt: dev.name,
                  loading: index < 4 ? 'eager' : 'lazy',
                  priority: index === 0 ? 'high' : '',
                  onerror: 'App.hideBrokenImage(this)'
                })}
                ${this.portraitBadge(dev, '', `portrait-mark-${dev.id}`)}
                <div style="display:none; width:100%; height:100%;">
                  ${ComparisonEngine.getDeviceSvgIcon(dev.categoryId)}
                </div>
              </div>
              <div style="display:flex; justify-content:space-between; width:100%; align-items:center; margin-bottom:6px;">
                <div style="display:flex; gap:6px; align-items:center;">
                  <span class="device-year-badge">${this.spec(dev, 'releaseDate') || dev.year}</span>
                  <span class="spec-badge commercial">🏢 商业版</span>
                </div>
                ${ComparisonEngine.renderStatusBadge(dev.status)}
              </div>
              <div class="device-name" style="font-size:16px; font-weight:700;">
                ${dev.name}
              </div>
              <div class="device-tagline" style="margin-bottom:8px;">${dev.tagline}</div>
              ${this.audienceHtml(dev)}
              ${colorDotsHtml}
              <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:16px;">
                ${this.recentLaunchBadge(dev)}
                <span class="spec-badge">${this.spec(dev, 'cpuModel')}</span>
                ${Catalog.isNpuDisplayable(this.spec(dev, 'npuTops')) ? `<span class="spec-badge gold">${this.spec(dev, 'npuTops')}</span>` : ''}
                <span class="spec-badge">${this.spec(dev, 'screenSize')}</span>
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
    const devices = this.listDevices();
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
            <span>Surface 参数按国行官方页面核对。Xbox 主机按美国微软官网收录，规格表里写明销售区域。</span>
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
          <div class="metric-val" style="color:#d83b01;">逐字段</div>
          <div class="metric-label">来源索引不代表全库已核验</div>
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
      <div class="spec-table-container has-internal-scroll" style="max-height: calc(100vh - 340px); overflow:auto; border-radius:12px; border:1px solid var(--ms-border-subtle); background:var(--ms-bg-card);">
        <table class="spec-table audit-table" style="width:100%; border-collapse:separate; border-spacing:0; min-width:1100px;">
          <thead>
            <tr style="background:var(--ms-bg-subtle, #f5f5f5);">
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
              const specOf = (key) => this.spec(dev, key);
              const colors = specOf('colors') || [];
              const storeUrl = specOf('officialDocUrl') || 'https://www.microsoftstore.com.cn/';
              const learnUrl = dev.learnDocUrl;
              const isCommercial = dev.isCommercial || dev.targetAudience === 'commercial';
              const isCurrent = dev.status === 'current_cn';

              return `
                <tr style="border-bottom:1px solid var(--ms-border-subtle); background:${isCurrent ? 'rgba(0,120,212,0.02)' : 'transparent'};">
                  <td style="padding:10px 14px; text-align:center; font-size:12px; color:var(--ms-text-tertiary);">${idx + 1}</td>
                  <td style="padding:10px 14px;">
                    <div style="display:flex; align-items:center; gap:10px;">
                      ${this.picture(this.shot(dev), {
                        slot: 'audit',
                        alt: dev.name,
                        loading: 'lazy'
                      })}
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
                    ${specOf('startingPriceCny') || '—'}
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
                    <div style="font-weight:600; color:var(--ms-text-primary);">${specOf('cpuModel') || '—'}</div>
                    ${Catalog.isNpuDisplayable(Catalog.getSpec(dev, 'npuTops')) ? `
                      <div style="color:#0078d4; font-size:11px;">⚡ ${Catalog.getSpec(dev, 'npuTops')}</div>
                    ` : ''}
                  </td>
                  <td style="padding:10px 14px; font-size:12px; color:var(--ms-text-secondary);">
                    <div>${Catalog.presentSpec(specOf('screenSize'))} ${Catalog.presentSpec(specOf('aspectRatio'))}</div>
                    <div style="font-size:11px; color:var(--ms-text-tertiary);">${specOf('resolution') || ''} ${specOf('refreshRate') || ''}</div>
                  </td>
                  <td style="padding:10px 14px; text-align:center;">
                    <div style="display:inline-flex; gap:6px; flex-wrap:wrap; justify-content:center;">
                      ${specOf('officialIntelConfigureUrl') ? `
                        <a href="${specOf('officialIntelConfigureUrl')}" target="_blank" rel="noopener noreferrer" class="fluent-btn-sm primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:2px; font-size:10.5px; padding:2px 6px;" title="前往微软官方 Intel Ultra 选配定制页">
                          🛒 Ultra选配 ↗
                        </a>
                      ` : ''}
                      ${specOf('officialSnapdragonConfigureUrl') ? `
                        <a href="${specOf('officialSnapdragonConfigureUrl')}" target="_blank" rel="noopener noreferrer" class="fluent-btn-sm primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:2px; font-size:10.5px; padding:2px 6px;" title="前往微软官方骁龙版选配定制页">
                          ⚡ 骁龙选配 ↗
                        </a>
                      ` : ''}
                      ${!specOf('officialIntelConfigureUrl') && !specOf('officialSnapdragonConfigureUrl') ? `
                        <a href="${storeUrl}" target="_blank" rel="noopener noreferrer" class="fluent-btn-sm primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:2px; font-size:11px; padding:3px 8px;" title="前往微软官网选配/商城页核对">
                          🛒 选配直达 ↗
                        </a>
                      ` : ''}
                      ${learnUrl ? `
                        <a href="${learnUrl}" target="_blank" rel="noopener noreferrer" class="fluent-btn-sm" style="text-decoration:none; display:inline-flex; align-items:center; gap:2px; font-size:11px; padding:3px 8px;" title="前往微软官方 Learn 文档核对">
                          📖 Learn ↗
                        </a>
                      ` : ''}
                    </div>
                  </td>
                  <td style="padding:10px 14px; text-align:center;">
                    ${this.getDeviceVerificationBadge(dev.id)}
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

  renderMetricCards(dev) {
    const npuRaw = Catalog.getSpec(dev, 'npuTops');
    const npuHtml = Catalog.isNpuDisplayable(npuRaw)
      ? Catalog.presentDeviceSpec(dev, 'npuTops')
      : Catalog.presentSpec(npuRaw === 'not_applicable' ? 'not_applicable' : null);
    return `
      <div class="screen-metrics-grid">
        <div class="metric-box">
          <div class="metric-val">${Catalog.presentDeviceSpec(dev, 'cpuModel')}</div>
          <div class="metric-label">处理器核心</div>
        </div>
        <div class="metric-box">
          <div class="metric-val" style="color:#8764b8;">${npuHtml}</div>
          <div class="metric-label">NPU AI 算力</div>
        </div>
        <div class="metric-box">
          <div class="metric-val">${Catalog.presentDeviceSpec(dev, 'screenSize')}</div>
          <div class="metric-label">屏幕尺寸 (3:2)</div>
        </div>
        <div class="metric-box">
          <div class="metric-val">${Catalog.presentDeviceSpec(dev, 'refreshRate')}</div>
          <div class="metric-label">最高刷新率</div>
        </div>
        <div class="metric-box">
          <div class="metric-val">${Catalog.presentDeviceSpec(dev, 'batteryLifeOffice')}</div>
          <div class="metric-label">日常办公续航</div>
        </div>
        <div class="metric-box">
          <div class="metric-val">${Catalog.presentDeviceSpec(dev, 'weightGrams')}</div>
          <div class="metric-label">裸机重量</div>
        </div>
      </div>
    `;
  },

  /** 核验列：读取 VERIFICATION_STATUS（由 registry 构建时嵌入），禁止写死「已核验」 */
  getDeviceVerificationBadge(deviceId) {
    const root = (typeof window !== 'undefined' && window.VERIFICATION_STATUS) ? window.VERIFICATION_STATUS : null;
    const toneStyles = {
      ok: 'color:#0e703c; font-weight:700; background:rgba(16,124,65,0.08); border:1px solid rgba(16,124,65,0.2);',
      policy: 'color:#8a6116; font-weight:700; background:rgba(255,185,0,0.12); border:1px solid rgba(138,97,22,0.28);',
      warn: 'color:#c43e1c; font-weight:700; background:rgba(209,52,27,0.10); border:1px solid rgba(196,62,28,0.28);',
      danger: 'color:#a4262c; font-weight:700; background:rgba(164,38,44,0.10); border:1px solid rgba(164,38,44,0.3);'
    };
    const entry = root && typeof root.resolve === 'function'
      ? root.resolve(deviceId)
      : (root && root.byDeviceId ? root.byDeviceId[deviceId] : null);
    if (!entry) {
      return `<span title="待补充技术白皮书索引" style="font-size:11px; padding:3px 8px; border-radius:4px; ${toneStyles.warn}">⚠ 待补充</span>`;
    }
    const style = toneStyles[entry.tone] || toneStyles.warn;
    const prefix = entry.status === 'verified' ? '✓ ' : (entry.status === 'policy_partial' ? '◐ ' : '⚠ ');
    const title = (entry.reason || entry.label || '').replace(/"/g, '&quot;');
    return `<span title="${title}" style="font-size:11px; padding:3px 8px; border-radius:4px; ${style}">${prefix}${entry.label}</span>`;
  },

  // 4. 单机独立详情页 (PRD 第十二章 - 完整13大类规格直出)
  renderProductDetailView(container, seriesId, deviceId) {
    const dev = this.getDevice(deviceId);
    if (!dev) {
      container.innerHTML = `<div class="spec-table-empty"><h3>未找到该产品信息</h3><button class="fluent-btn" onclick="App.navigate('#/')">返回首页</button></div>`;
      return;
    }

    const prevDev = dev.prevGenerationId ? this.getDevice(dev.prevGenerationId) : null;
    const nextDev = dev.nextGenerationId ? this.getDevice(dev.nextGenerationId) : null;
    const colors = this.spec(dev, 'colors');
    const colorRows = Array.isArray(colors) ? colors : [];
    const hasColors = colorRows.length > 0;
    const activeColorName = hasColors ? colorRows[0].name : '';
    const activeShot = this.shot(dev, activeColorName);
    const isSelected = ComparisonEngine.selectedIds.includes(dev.id);

    // 默认展示全量参数表
    const isComparisonTab = this.activeDetailTab === 'comparison';
    const shotIdentityLabel = activeShot.identity === 'official' ? '官方图像' : (Catalog.portraitLabel(activeShot) || '同系列示意');
    const shotRoleLabel = activeColorName ? `${activeColorName} 配色图` : '代表图';

    let html = `
      <div class="catalog-detail-layout">
      <section class="catalog-detail-main">
      <p class="spec-evidence-note">参数记录尚未完成逐字段真实性核验；来源链接与历史记录日期不代表当前配置已确认。</p>
      <div class="catalog-breadcrumb">
        <a href="${Taxonomy.canonicalPath({ segment: Taxonomy.segmentOf(dev), seriesId: Taxonomy.seriesIdOf(dev) })}">产品目录</a>
        <span>›</span>
        <a href="${Taxonomy.canonicalPath({ segment: Taxonomy.segmentOf(dev), seriesId: Taxonomy.seriesIdOf(dev) })}">${Taxonomy.seriesLabel(Taxonomy.seriesIdOf(dev), Taxonomy.segmentOf(dev))}</a>
        <span>›</span>
        <strong>${this.escapeText(dev.name)}</strong>
      </div>
      <!-- 单机顶部 Hero 核心视觉区 (M3 黄金比例舞台与外观展示) -->
      <div class="product-detail-hero">
        <div class="detail-hero-left">
          <div class="detail-hero-img-box">
            ${this.picture(activeShot, {
              slot: 'detail',
              id: 'detail-main-img',
              className: 'detail-main-img',
              alt: dev.name,
              loading: 'eager',
              onerror: 'App.hideBrokenImage(this)'
            })}
            ${this.portraitBadge(dev, activeColorName, 'portrait-mark-detail')}
            <div style="display:${activeShot.src ? 'none' : 'flex'}; width:100%; height:100%; align-items:center; justify-content:center;">
              ${ComparisonEngine.getDeviceSvgIcon(dev.categoryId)}
            </div>
          </div>

          <!-- 多外观配色展示与交互切换器 (PRD 全系真机与多配色展示) -->
          ${hasColors ? `
            <div class="detail-color-panel">
              <div class="detail-color-header">
                <span style="font-weight:600;">🎨 外观配色与材质工学</span>
                <span class="detail-color-active-name" id="detail-active-color-label">${activeColorName}${colorRows[0] && colorRows[0].material ? ' · ' + colorRows[0].material : ''}</span>
              </div>
              <div class="detail-color-options">
                ${colorRows.map((c, idx) => `
                  <button type="button" class="color-choice-btn ${idx === 0 ? 'active' : ''}" 
                    data-color="${c.name}"
                    title="${c.name}${c.material ? ' · ' + c.material : ''}"
                    onclick="App.switchDetailColor('${dev.id}', '${c.name}', this)">
                    <span class="color-choice-dot" style="background:${c.hex};"></span>
                    <span class="color-choice-name">${c.name}</span>
                    ${c.material ? `<span class="color-material-chip">${c.material}</span>` : ''}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <div class="detail-hero-right">
          <div class="detail-hero-status-row">
            ${this.recentLaunchBadge(dev)}
            ${ComparisonEngine.renderStatusBadge(dev.status)}
            <span class="spec-badge">${dev.generation}</span>
            ${dev.flagship ? '<span class="spec-badge gold">最新旗舰</span>' : ''}
            ${String(Catalog.getSpec(dev, 'npuTops') || '').includes('80') ? '<span class="spec-badge copilot">80 TOPS AI</span>' : ''}
          </div>

          <h1 class="detail-hero-title">
            ${dev.name}
          </h1>
          <div class="detail-hero-name-en">${dev.nameEn}</div>
          <p class="detail-hero-tagline">${this.escapeText(dev.tagline || '')}</p>
          <div class="detail-hero-meta">
            <div class="hero-meta-card"><span>发布日期</span><strong>${this.spec(dev, 'releaseDate') || dev.year || '—'}</strong></div>
            <div class="hero-meta-card"><span>产品定位</span><strong>${this.escapeText(dev.tagline || 'Surface 设备')}</strong></div>
            <div class="hero-meta-card"><span>起始价格</span><strong>${Catalog.presentDeviceSpec(dev, 'startingPriceCny')}</strong></div>
            <div class="hero-meta-card"><span>目标客户</span><strong>${this.escapeText(Catalog.audience(dev) || '个人与企业用户')}</strong></div>
          </div>
          <div class="detail-hero-links">
            ${(this.spec(dev, 'officialConfigureUrl') || this.spec(dev, 'officialDocUrl')) ? `
              <a class="hero-link-btn" href="${this.spec(dev, 'officialConfigureUrl') || this.spec(dev, 'officialDocUrl')}" target="_blank" rel="noopener noreferrer">▣ 查看官方产品页 ↗</a>
            ` : ''}
            ${dev.learnDocUrl ? `<a class="hero-link-btn" href="${dev.learnDocUrl}" target="_blank" rel="noopener noreferrer">▤ 技术规格（Microsoft Learn）↗</a>` : ''}
            ${this.spec(dev, 'supportUrl') ? `<a class="hero-link-btn" href="${this.spec(dev, 'supportUrl')}" target="_blank" rel="noopener noreferrer">▱ 支持页面 ↗</a>` : ''}
          </div>

          <!-- 代际快速跳转 -->
          <div class="detail-generation-links">
            <div>上一代：${prevDev ? `<a href="#/${(prevDev.segment === 'commercial' || prevDev.isCommercial) ? 'business' : 'consumer'}/${prevDev.categoryId}/${prevDev.id}">${prevDev.name}</a>` : '—'}</div>
            <div>下一代：${nextDev ? `<a href="#/${(nextDev.segment === 'commercial' || nextDev.isCommercial) ? 'business' : 'consumer'}/${nextDev.categoryId}/${nextDev.id}">${nextDev.name}</a>` : '—'}</div>
          </div>
        </div>
      </div>

      <!-- M3 详情页切换选项卡 (Tabs Navigation) -->
      <div class="m3-tab-bar catalog-detail-tabs-bar">
        <button class="m3-tab-item ${!isComparisonTab ? 'active' : ''}" data-tab="specs" onclick="App.switchDetailTab('specs')">
          <span>技术规格</span>
        </button>
        ${prevDev ? `
          <button class="m3-tab-item ${isComparisonTab ? 'active' : ''}" data-tab="comparison" onclick="App.switchDetailTab('comparison')">
            <span>机型与配置</span>
          </button>
        ` : ''}
        <span class="catalog-detail-tab-static">配件</span>
        <span class="catalog-detail-tab-static">服务与保修</span>
        <span class="catalog-detail-tab-static">资源库</span>
        <div class="catalog-detail-tab-actions">
          <button class="fluent-btn-sm" onclick="ComparisonEngine.expandAllGroups()">⌃ 展开全部</button>
          <button class="fluent-btn-sm" onclick="ComparisonEngine.collapseAllGroups()">⌄ 折叠全部</button>
        </div>
      </div>

      <!-- 选项卡面板 1: 13 大类全量参数手风琴折叠卡片 (默认直出展示) -->
      <div class="m3-tab-pane" data-pane="specs" style="display: ${!isComparisonTab ? 'block' : 'none'};">
        <div class="detail-specs-heading">
          <div>
            <h2 aria-label="${dev.name} · 13 大类官方标准规格全量大表">${dev.name} · 技术规格</h2>
            <p>字段按官方资料分组展示；没有公布的参数保持原始核验状态。</p>
          </div>
          <span class="detail-verification-inline">${this.getDeviceVerificationBadge(dev.id)}</span>
        </div>
        ${ComparisonEngine.renderDetailAccordion(dev)}
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
            <p>本型号是 ${Taxonomy.seriesLabel(Taxonomy.seriesIdOf(dev), Taxonomy.segmentOf(dev))} 的第一代开山之作，暂无更早一代前置机型可供比对。</p>
          </div>
        `}
      </div>
      </section>

      <aside class="detail-utility-rail" aria-label="产品证据与图片信息">
        <div class="utility-rail-section utility-action-section">
          <button class="fluent-btn primary utility-primary-action" onclick="ComparisonEngine.toggleDevice('${dev.id}')">
            ${isSelected ? '✓ 已加入对比' : '+ 加入对比'}
          </button>
          <button class="fluent-btn utility-secondary-action" type="button" hidden title="收藏功能待接入">
            ♡ 收藏产品
          </button>
        </div>

        <div class="utility-rail-section">
          <div class="utility-rail-heading">
            <span>官方资源</span>
            <span class="utility-rail-count">${dev.learnDocUrl || dev.officialDocUrl ? '已绑定' : '待补充'}</span>
          </div>
          <div class="utility-link-list">
            ${(this.spec(dev, 'officialConfigureUrl') || this.spec(dev, 'officialDocUrl')) ? `
              <a href="${this.spec(dev, 'officialConfigureUrl') || this.spec(dev, 'officialDocUrl')}" target="_blank" rel="noopener noreferrer">▣ 产品页面 ↗</a>
            ` : ''}
            ${dev.learnDocUrl ? `<a href="${dev.learnDocUrl}" target="_blank" rel="noopener noreferrer">▤ 技术规格 ↗</a>` : ''}
            ${this.spec(dev, 'supportUrl') ? `<a href="${this.spec(dev, 'supportUrl')}" target="_blank" rel="noopener noreferrer">▣ 支持页面 ↗</a>` : ''}
            <a href="#/audit">▧ 产品图片 ↗</a>
            <a href="#/audit">▤ 宣传素材 ↗</a>
          </div>
        </div>

        <div class="utility-rail-section">
          <div class="utility-rail-heading">
            <span>产品图片</span>
            <a href="#/audit" class="utility-rail-count utility-rail-link">查看全部 (${colorRows.length || 1})</a>
          </div>
          <div class="utility-rail-main-image">
            ${this.picture(activeShot, {
              slot: 'detail',
              id: 'detail-rail-main-img',
              className: 'utility-main-img',
              alt: dev.name,
              loading: 'lazy',
              onerror: 'App.hideBrokenImage(this)'
            })}
          </div>
          <div class="utility-image-caption">
            <strong id="detail-rail-image-label">${shotRoleLabel}</strong>
            <span id="detail-rail-color-label">${shotIdentityLabel}</span>
          </div>
          <div class="utility-image-carousel-row">
            <div class="utility-image-grid">
              ${colorRows.slice(0, 4).map((color) => {
                const shot = this.shot(dev, color.name);
                return `
                  <button type="button" class="utility-image-thumb ${color.name === activeColorName ? 'active' : ''}" onclick="App.switchDetailColor('${dev.id}', '${color.name}', this)" title="${color.name}">
                    ${this.picture(shot, { slot: 'card', className: 'utility-thumb-img', alt: `${dev.name} ${color.name}`, loading: 'lazy', onerror: 'App.hideBrokenImage(this)' })}
                  </button>
                `;
              }).join('')}
            </div>
            ${colorRows.length > 1 ? `<button type="button" class="utility-image-arrow-next" onclick="App.nextDetailImage('${dev.id}')" title="查看下一张图片">›</button>` : ''}
          </div>
        </div>

        <div class="utility-rail-section utility-status-section">
          <div class="utility-rail-heading"><span>产品状态</span></div>
          <div class="utility-status-row">${ComparisonEngine.renderStatusBadge(dev.status)}</div>
          <dl class="utility-meta-list">
            <div><dt>产品线</dt><dd>${Taxonomy.seriesLabel(Taxonomy.seriesIdOf(dev), Taxonomy.segmentOf(dev))}</dd></div>
            <div><dt>版本</dt><dd>${dev.generation || '—'}</dd></div>
            <div><dt>历史记录日期</dt><dd>${this.spec(dev, 'lastVerified') || '待核验'}（非全字段核验）</dd></div>
            <div><dt>图像身份</dt><dd id="detail-rail-meta-identity">${shotIdentityLabel}</dd></div>
            <div><dt>备注</dt><dd>${this.spec(dev, 'sourceReliability') || '—'}</dd></div>
          </dl>
        </div>
      </aside>
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

    const selectedDevices = devIds.map(id => this.getDevice(id)).filter(Boolean);

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
  // 3.4 编年发布时间线视图 (PRD 阶段 3 招牌体验: 2012 ~ 2026 演进时间轴)
  renderTimelineView(container) {
    const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012];

    const eraMilestones = {
      2026: {
        title: "⚡ Copilot+ PC 算力革命纪元 (2024 ~ 2026)",
        desc: "全面拥抱 ARM 架构与高通骁龙® X / X2 芯片，端侧 NPU 突破 80 TOPS，开启 Windows AI PC 硬件新时代。"
      },
      2023: {
        title: "🎨 形态深化与动态编织铰链纪元 (2021 ~ 2023)",
        desc: "Surface Laptop Studio 独创展台与工作室多姿态切换，120Hz 高刷屏与触觉反馈手写笔全面普及。"
      },
      2020: {
        title: "📱 ARM 初探与双屏探索纪元 (2019 ~ 2020)",
        desc: "Surface Pro X 开启超轻薄窄边框与 SQ 定制芯片，Surface Duo 探索革命性 360° 双屏移动生产力。"
      },
      2018: {
        title: "🚀 形态爆发与专业工作台纪元 (2015 ~ 2018)",
        desc: "Surface Book 独创动态支点铰链与独显分离，Surface Studio 带来 28 英寸零重力大画布，Surface Go 主打轻巧便携形态。"
      },
      2014: {
        title: "🌱 二合一品类奠基与创生纪元 (2013 ~ 2014)",
        desc: "微软开启自研硬件传奇，VaporMg 镁合金机身、集成 kickstand 支架与磁吸键盘盖，开创并定义了现代二合一 PC 形态。"
      }
    };

    let html = `
      <div class="view-header">
        <div class="view-title-group">
          <h1>
            <span>Surface 2012 ~ 2026 家族演进时间轴</span>
            <span class="header-sub-tag">14 年硬件设计与芯片架构跃迁图鉴</span>
          </h1>
          <div class="view-meta-tip">
            <span>收录 ${this.listDevices().length} 条设备记录（不含配件、控制器或 SKU 变体） ｜ 💡 点击卡片可查看单机全维度参数详情 ｜ 勾选可直接加入对比池</span>
          </div>
        </div>
      </div>

      <div class="timeline-container">
    `;

    years.forEach(yr => {
      const devsInYear = this.listDevices().filter(d => d.year === yr);
      if (devsInYear.length === 0) return;

      if (eraMilestones[yr]) {
        const milestone = eraMilestones[yr];
        html += `
          <div class="timeline-era-banner" style="margin:24px 0 16px 0; padding:16px 20px; background:linear-gradient(135deg, rgba(0,120,212,0.08) 0%, rgba(0,120,212,0.02) 100%); border-left:4px solid var(--ms-accent); border-radius:8px;">
            <div style="font-size:16px; font-weight:700; color:var(--ms-text-primary); margin-bottom:4px;">${milestone.title}</div>
            <div style="font-size:12.5px; color:var(--ms-text-secondary); line-height:1.5;">${milestone.desc}</div>
          </div>
        `;
      }

      html += `
        <div class="timeline-year-block">
          <div class="timeline-year-badge">${yr} 年</div>
          <div class="timeline-cards-row">
            ${devsInYear.map(dev => {
              const npu = Catalog.getSpec(dev, 'npuTops');
              const cpu = Catalog.getSpec(dev, 'cpuModel');
              const isSelected = ComparisonEngine.selectedIds.includes(dev.id);

              return `
                <div class="timeline-card ${isSelected ? 'selected' : ''}" onclick="App.navigateToDetail('${dev.categoryId}', '${dev.id}')" style="position:relative;">
                  <div style="font-weight:700; font-size:14px; margin-bottom:4px; color:var(--ms-text-primary);">
                    ${dev.name}
                  </div>
                  <div style="font-size:12px; color:var(--ms-text-secondary); margin-bottom:6px;">
                    ${this.spec(dev, 'releaseDate')} · ${cpu || '官方定制架构'}
                  </div>
                  <div style="font-size:11.5px; color:var(--ms-text-tertiary);">${dev.tagline}</div>
                  
                  <div style="display:flex; gap:5px; margin-top:8px; flex-wrap:wrap; align-items:center;">
                    ${ComparisonEngine.renderStatusBadge(dev.status)}
                    ${npu && npu !== 'not_applicable' && npu !== 'not_disclosed' ? `<span class="timeline-milestone-pill">${npu}</span>` : ''}
                    ${dev.flagship ? `<span class="timeline-milestone-pill flagship">旗舰标杆</span>` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  },

  devicesForSeriesTable(seriesId, segment) {
    return this.applyFilters(this.listDevices({ seriesId, segment }));
  },

  // 7. 多维筛选工具条 (按处理器架构、在售状态与 Copilot+ PC 精准筛选)
  renderFilterBar(seriesId, segment = 'consumer') {
    if (segment === 'xbox' || seriesId === 'xbox' || seriesId === 'consoles') {
      return `
        <div class="filter-toolbar">
          <div class="filter-group">
            <span class="filter-label">主机代际状态:</span>
            <button class="filter-chip ${this.filters.status === 'all' ? 'active' : ''}" onclick="App.setFilter('status', 'all')">全部主机</button>
            <button class="filter-chip ${this.filters.status === 'current_global' ? 'active' : ''}" onclick="App.setFilter('status', 'current_global')">现役在售</button>
            <button class="filter-chip ${this.filters.status === 'upcoming' ? 'active' : ''}" onclick="App.setFilter('status', 'upcoming')">即将发售</button>
            <button class="filter-chip ${this.filters.status === 'discontinued' ? 'active' : ''}" onclick="App.setFilter('status', 'discontinued')">已停售 / 经典代际</button>
          </div>
          ${this.hasActiveFilters() ? `
            <button class="fluent-btn-sm" onclick="App.resetFilters()" style="color:#d13438;">重置筛选</button>
          ` : ''}
        </div>
      `;
    }

    return `
      <div class="filter-toolbar">
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
      // 受众过滤 (Xbox 不参与 PC 消费/商用筛选)
      if (this.filters.audience && this.filters.audience !== 'all' && d.segment !== 'xbox' && d.categoryId !== 'xbox') {
        if (this.filters.audience === 'commercial') {
          if (!d.isCommercial && d.targetAudience !== 'commercial' && d.targetAudience !== 'both') return false;
        } else if (this.filters.audience === 'consumer') {
          if (d.targetAudience !== 'consumer' && d.targetAudience !== 'both') return false;
        }
      }

      // CPU 过滤
      if (this.filters.cpu === 'snapdragon') {
        const cpu = String(this.spec(d, 'cpuModel') || '').toLowerCase();
        if (!cpu.includes('snapdragon') && !cpu.includes('sq') && !cpu.includes('高通')) return false;
      }
      if (this.filters.cpu === 'intel') {
        const cpu = String(this.spec(d, 'cpuModel') || '').toLowerCase();
        if (!cpu.includes('intel') && !cpu.includes('酷睿') && !cpu.includes('奔腾')) return false;
      }
      if (this.filters.cpu === 'amd') {
        const cpu = String(this.spec(d, 'cpuModel') || '').toLowerCase();
        if (!cpu.includes('amd') && !cpu.includes('ryzen')) return false;
      }

      // 状态过滤
      if (this.filters.status === 'current_cn' && d.status !== 'current_cn') return false;
      if (this.filters.status === 'current_global' && d.status !== 'current_global') return false;
      if (this.filters.status === 'upcoming' && d.status !== 'upcoming') return false;
      if (this.filters.status === 'discontinued' && d.status !== 'discontinued' && d.status !== 'legacy') return false;
      if (this.filters.status === 'legacy' && d.status !== 'legacy' && d.status !== 'discontinued') return false;

      // Copilot+ 过滤
      if (this.filters.copilotOnly) {
        const topsStr = this.spec(d, 'npuTops') || '';
        const num = Catalog.npuScore(topsStr);
        if (num === null || num < 40) return false;
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
  escapeText(text) {
    return String(text).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
  },

  normalizeSearchText(text) {
    return String(text || '').toLowerCase().replace(/[®™©]/g, '').replace(/第十一[代版]/g, '第11代').replace(/第\s*(\d+)\s*[代版]/g, ' $1 ').replace(/(pro|laptop)(\d+)/g, '$1 $2').replace(/\s+/g, ' ').trim();
  },

  handleGlobalSearch(query) {
    const term = this.normalizeSearchText(query);
    const resultsContainer = document.getElementById('search-results-modal');
    if (!resultsContainer) return;

    if (!term) {
      this.closeSearchModal();
      return;
    }

    const matchedDevices = this.listDevices().filter(d => {
      const fullText = this.normalizeSearchText(
        `${d.id.replace(/-/g, " ")} ${d.name} ${d.nameEn} ${d.generation} ${this.spec(d, 'cpuModel')} ${this.spec(d, 'npuTops')} ${d.tagline} ${d.year}`
      );
      const modelQuery = term.match(/^(?:surface\s+)?(pro|laptop)\s+(\d+)$/);
      if (modelQuery) return new RegExp(`^${modelQuery[1]}-${modelQuery[2]}(?:-|$)`).test(d.id);
      return term.split(/\s+/).every(token => fullText.includes(token));
    });

    const matchedChips = SURFACE_DATA.chips.filter(c => {
      return this.normalizeSearchText(`${c.name} ${c.vendor} ${c.npuDesc} ${c.highlights}`).includes(term);
    });

    let html = `
      <div class="search-modal-backdrop" onclick="App.closeSearchModal()">
        <div class="search-modal-card" role="dialog" aria-modal="true" aria-labelledby="search-dialog-title" onkeydown="App.onSearchDialogKey(event)" onclick="event.stopPropagation()">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span id="search-dialog-title" style="font-weight:700; font-size:15px;">搜索结果 (${matchedDevices.length + matchedChips.length})</span>
            <button class="dock-item-remove" aria-label="关闭搜索" onclick="App.closeSearchModal()">✕</button>
          </div>

          <input id="dialog-search-input" type="search" aria-label="搜索产品与参数" value="${this.escapeText(query)}" oninput="App.handleGlobalSearch(this.value)">
          ${matchedDevices.length === 0 && matchedChips.length === 0 ? `
            <div class="hub-empty-state" style="padding:24px 16px; margin:10px 0; border:none; box-shadow:none;">
              <div class="empty-icon" style="font-size:32px; margin-bottom:8px;">🔍</div>
              <div class="empty-title" style="font-size:15px;">未找到与 "${this.escapeText(term)}" 匹配的内容</div>
              <div class="empty-desc" style="font-size:12px; margin-bottom:12px;">建议尝试搜索机型（如 Pro 13、Laptop 8）、芯片架构（如 骁龙 X2、酷睿 Ultra）或算力（如 80 TOPS）。</div>
              <div class="empty-actions">
                <button class="fluent-btn-sm" onclick="App.clearGlobalSearch()">清空搜索词</button>
              </div>
            </div>
          ` : ''}

          ${matchedDevices.length > 0 ? `
            <div style="font-size:12px; font-weight:700; color:var(--ms-text-brand); margin:8px 0 4px;">匹配 Surface 设备 (${matchedDevices.length})</div>
            <div style="display:flex; flex-direction:column; gap:6px; max-height:220px; overflow-y:auto;">
              ${matchedDevices.map(d => `
                <div class="search-result-item" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.click()}" onclick="App.navigateToDetail('${d.categoryId}', '${d.id}'); App.closeSearchModal();">
                  <div>
                    <div style="font-weight:600; font-size:13.5px;">${d.name}</div>
                    <div style="font-size:11.5px; color:var(--ms-text-secondary);">${this.spec(d, 'cpuModel')} · ${this.spec(d, 'npuTops')} · ${this.spec(d, 'releaseDate')}</div>
                  </div>
                  ${this.recentLaunchBadge(d)}
                  <span class="spec-badge">${d.generation}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${matchedChips.length > 0 ? `
            <div style="font-size:12px; font-weight:700; color:#8764b8; margin:12px 0 4px;">匹配处理器架构 (${matchedChips.length})</div>
            <div style="display:flex; flex-direction:column; gap:6px;">
              ${matchedChips.map(c => `
                <div class="search-result-item" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.click()}" onclick="App.navigate('#/tools/chips'); App.closeSearchModal();">
                  <div>
                    <div style="font-weight:600; font-size:13.5px;">${c.name}</div>
                    <div style="font-size:11.5px; color:var(--ms-text-secondary);">${c.vendor} · ${c.npuDesc}</div>
                  </div>
                  <span class="spec-badge gold">${Catalog.npuScore(c.npuTops) === null ? 'NPU 算力待核验' : Catalog.npuScore(c.npuTops) + ' TOPS'}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;

    if (resultsContainer.style.display !== 'block') this.searchReturnFocus = document.activeElement;
    resultsContainer.innerHTML = html;
    resultsContainer.style.display = 'block';
    resultsContainer.querySelector?.('#dialog-search-input')?.focus();
  },

  onSearchDialogKey(event) {
    if (event.key === 'Escape') { event.preventDefault(); this.closeSearchModal(); return; }
    if (event.key !== 'Tab') return;
    const controls = [...event.currentTarget.querySelectorAll('input,button,[tabindex="0"]')];
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  },

  closeSearchModal() {
    const resultsContainer = document.getElementById('search-results-modal');
    if (resultsContainer) resultsContainer.style.display = 'none';
    this.searchReturnFocus?.focus?.();
  },

  clearGlobalSearch() {
    const input = document.getElementById('global-search-input');
    const clearBtn = document.getElementById('search-clear-btn');
    if (input) input.value = '';
    if (clearBtn) clearBtn.style.display = 'none';
    this.closeSearchModal();
  },

  // 9. 侧栏渲染与高亮状态
  isProductDetailRoute(path = this.activeRoute.path) {
    return /^\/(consumer|business)\/[^/]+\/[^/]+$/.test(path || '');
  },

  syncLayoutMode() {
    if (typeof document === 'undefined') return;
    document.body.classList.toggle('catalog-explorer-detail', this.isProductDetailRoute());
  },

  detailCatalogStatusLabel(status) {
    const labels = {
      current_cn: '已发布',
      upcoming: '即将推出',
      discontinued: '已停止销售',
      legacy: '历史型号',
      current_global: '全球在售'
    };
    return labels[status] || '待确认';
  },

  detailFilterState: {
    keyword: '',
    series: 'all',
    status: 'all',
    sort: 'default'
  },

  toggleDetailCatalogGroup(headingEl) {
    const group = headingEl.closest('.detail-catalog-group');
    if (!group) return;
    group.classList.toggle('collapsed');
    headingEl.setAttribute('aria-expanded', String(!group.classList.contains('collapsed')));
    const icon = headingEl.querySelector('.group-chevron-icon');
    if (icon) {
      icon.style.transform = group.classList.contains('collapsed') ? 'rotate(-90deg)' : 'rotate(0deg)';
    }
  },

  updateDetailFilter(key, val) {
    if (key === 'keyword') this.detailFilterState.keyword = String(val || '').trim().toLowerCase();
    if (key === 'series') this.detailFilterState.series = String(val || 'all');
    if (key === 'status') this.detailFilterState.status = String(val || 'all');
    if (key === 'sort') this.detailFilterState.sort = String(val || 'default');
    this.applyDetailCatalogFilters();
  },

  applyDetailCatalogFilters() {
    const { keyword, series, status, sort } = this.detailFilterState;
    document.querySelectorAll('.detail-catalog-group').forEach(group => {
      const container = group.querySelector('.detail-catalog-items');
      if (!container) return;
      const items = [...container.querySelectorAll('.detail-catalog-item')];
      items.forEach(item => {
        const text = (item.dataset.search || item.textContent || '').toLowerCase();
        const matchesKeyword = !keyword || text.includes(keyword);
        const matchesSeries = (series === 'all') || (item.dataset.series === series);
        let matchesStatus = true;
        if (status === '已发布' || status === 'current_cn') {
          matchesStatus = item.dataset.status === 'current_cn';
        } else if (status === '已停止销售' || status === 'discontinued') {
          matchesStatus = item.dataset.status === 'discontinued' || item.dataset.status === 'legacy';
        } else if (status === '即将推出' || status === 'upcoming') {
          matchesStatus = item.dataset.status === 'upcoming';
        }
        item.hidden = !(matchesKeyword && matchesSeries && matchesStatus);
      });

      // 排序：基于 YYYYMMDD 时间戳精准排序
      if (sort === '最新优先' || sort === 'newest' || sort === 'default') {
        items.sort((a, b) => (Number(b.dataset.timestamp) || 0) - (Number(a.dataset.timestamp) || 0));
        items.forEach(el => container.appendChild(el));
      } else if (sort === '最早优先' || sort === 'oldest') {
        items.sort((a, b) => (Number(a.dataset.timestamp) || 99999999) - (Number(b.dataset.timestamp) || 99999999));
        items.forEach(el => container.appendChild(el));
      }

      const visible = items.some(item => !item.hidden);
      group.hidden = !visible;
      const countSpan = group.querySelector('.detail-catalog-group-heading .group-count-text');
      if (countSpan) {
        const visibleCount = items.filter(item => !item.hidden).length;
        countSpan.textContent = `${visibleCount} 款产品`;
      }
    });
  },

  filterDetailCatalog(query) {
    this.updateDetailFilter('keyword', query);
  },

  renderDetailCatalogSidebar(sidebar) {
    const current = this.getDevice(this.activeRoute.path.split('/').pop());
    const segment = current && (current.segment === 'commercial' || current.isCommercial) ? 'commercial' : 'consumer';
    const categories = segment === 'commercial'
      ? (SURFACE_DATA.commercialCategories || [])
      : (SURFACE_DATA.consumerCategories || []);
    const activeSeriesId = current ? Taxonomy.seriesIdOf(current) : this.activeRoute.path.split('/')[2];
    const orderedCategories = [
      ...categories.filter(cat => cat.seriesId === activeSeriesId),
      ...categories.filter(cat => cat.seriesId !== activeSeriesId)
    ];

    const groups = orderedCategories.map(cat => {
      const devices = this.listDevices({ seriesId: cat.seriesId, segment });
      if (!devices.length) return '';
      const isActiveGroup = cat.seriesId === activeSeriesId;
      return `
        <section class="detail-catalog-group ${isActiveGroup ? 'active' : ''}">
          <div class="detail-catalog-group-heading" aria-expanded="true" onclick="App.toggleDetailCatalogGroup(this)" role="button" tabindex="0" title="点击折叠或展开本系列">
            <div style="display:flex; align-items:center; gap:8px;">
              <svg class="group-chevron-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.2s ease;"><polyline points="6 9 12 15 18 9"></polyline></svg>
              <strong>${this.escapeText(cat.name)}</strong>
            </div>
            <span class="group-count-text">${devices.length} 款产品</span>
          </div>
          <div class="detail-catalog-items">
            ${devices.map((dev, devIdx) => {
              const shot = this.shot(dev);
              const active = dev.id === (current && current.id);
              const year = this.spec(dev, 'releaseDate') || dev.year || '—';
              const catLabel = cat.name ? cat.name.replace(/系列|机型/g, '') : 'Surface';
              const cleanYear = String(year).slice(0, 4);
              const itemSub = `${catLabel} · ${cleanYear}`;
              const aliases = Array.isArray(dev.aliases) ? dev.aliases.join(' ') : '';
              const timestamp = (typeof Catalog !== 'undefined' && Catalog.parseReleaseTimestamp)
                ? Catalog.parseReleaseTimestamp(dev)
                : (parseInt(dev.year, 10) * 10000 + 101);
              return `
                <button type="button"
                  class="detail-catalog-item ${active ? 'active' : ''}"
                  data-search="${this.escapeText(`${dev.name} ${dev.nameEn || ''} ${dev.generation || ''} ${cat.name} ${aliases}`)}"
                  data-series="${this.escapeText(cat.name)}"
                  data-status="${dev.status}"
                  data-year="${cleanYear}"
                  data-timestamp="${timestamp}"
                  data-order="${devIdx}"
                  onclick="App.navigateToDetail('${cat.seriesId}', '${dev.id}')">
                  <span class="detail-catalog-item-image">
                    ${this.picture(shot, {
                      slot: 'card',
                      className: 'catalog-item-image',
                      alt: dev.name,
                      loading: 'lazy',
                      onerror: 'App.hideBrokenImage(this)'
                    })}
                  </span>
                  <span class="detail-catalog-item-copy">
                    <span class="detail-catalog-item-title">${this.escapeText(dev.name)}</span>
                    <span class="detail-catalog-item-meta">${this.escapeText(itemSub)}</span>
                  </span>
                  <span class="detail-catalog-status ${dev.status}">${this.detailCatalogStatusLabel(dev.status)}</span>
                </button>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }).join('');

    sidebar.classList.add('catalog-detail-sidebar');
    sidebar.innerHTML = `
      <div class="catalog-detail-sidebar-inner">
        <div class="detail-catalog-tabs" role="tablist" aria-label="目录视图">
          <button type="button" class="detail-catalog-tab active" role="tab" aria-selected="true" onclick="App.navigate('#/')">
            <span class="catalog-tab-icon">▦</span>产品目录
          </button>
          <button type="button" class="detail-catalog-tab" role="tab" aria-selected="false" onclick="App.navigate('#/compare')">
            <span class="catalog-tab-icon">▣</span>对比 (${ComparisonEngine.selectedIds.length})
          </button>
          <button type="button" class="detail-catalog-tab" role="tab" aria-selected="false" hidden title="收藏功能待接入">
            <span class="catalog-tab-icon">♡</span>收藏 (0)
          </button>
        </div>
        <div class="detail-catalog-controls">
          <label class="detail-catalog-search">
            <span aria-hidden="true">⌕</span>
            <input type="search" placeholder="搜索产品、型号或关键词" aria-label="搜索产品、型号或关键词" value="${this.escapeText(this.detailFilterState.keyword)}" oninput="App.updateDetailFilter('keyword', this.value)">
          </label>
          <div class="detail-catalog-selects">
            <select aria-label="按系列筛选" onchange="App.updateDetailFilter('series', this.value)">
              <option value="all" ${this.detailFilterState.series === 'all' ? 'selected' : ''}>所有系列</option>
              ${categories.map(cat => `<option value="${this.escapeText(cat.name)}" ${this.detailFilterState.series === cat.name ? 'selected' : ''}>${this.escapeText(cat.name)}</option>`).join('')}
            </select>
            <select aria-label="按状态筛选" onchange="App.updateDetailFilter('status', this.value)">
              <option value="all" ${this.detailFilterState.status === 'all' ? 'selected' : ''}>所有状态</option>
              <option value="current_cn" ${this.detailFilterState.status === 'current_cn' || this.detailFilterState.status === '已发布' ? 'selected' : ''}>国行在售</option>
              <option value="upcoming" ${this.detailFilterState.status === 'upcoming' || this.detailFilterState.status === '即将推出' ? 'selected' : ''}>即将推出</option>
              <option value="discontinued" ${this.detailFilterState.status === 'discontinued' || this.detailFilterState.status === '已停止销售' ? 'selected' : ''}>停产/经典</option>
            </select>
            <select aria-label="按发布时间筛选" onchange="App.updateDetailFilter('sort', this.value)">
              <option value="default" ${this.detailFilterState.sort === 'default' ? 'selected' : ''}>发布时间排序 (最新)</option>
              <option value="最新优先" ${this.detailFilterState.sort === '最新优先' || this.detailFilterState.sort === 'newest' ? 'selected' : ''}>最新优先</option>
              <option value="最早优先" ${this.detailFilterState.sort === '最早优先' || this.detailFilterState.sort === 'oldest' ? 'selected' : ''}>最早优先</option>
            </select>
          </div>
        </div>
        <div class="detail-catalog-list">
          ${groups}
          <div class="sidebar-group" style="margin-top:16px; padding-top:12px; border-top:1px solid var(--catalog-line);">
            <div class="sidebar-group-title" style="color:var(--ms-text-primary); font-weight:800; display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; padding:0 8px;">
              <span class="sidebar-group-label">Xbox 专区</span>
              <span class="sidebar-group-badge xbox" style="font-size:11px; padding:2px 8px; border-radius:10px; background:rgba(16,124,16,0.1); color:#107c10; font-weight:600;">独立大类</span>
            </div>
            <div class="sidebar-nav-item ${this.activeRoute.path.includes('/xbox') ? 'active' : ''}" onclick="App.navigate('#/xbox/consoles')">
              <div class="nav-item-left">
                <span class="nav-item-icon">🎮</span>
                <span class="nav-item-label" title="XBOX 主机">XBOX 主机</span>
              </div>
              <span class="nav-item-count">${this.listDevices({ seriesId: 'xbox', segment: 'xbox' }).length}</span>
            </div>
            <div class="sidebar-nav-item" onclick="App.navigate('#/xbox/controllers')">
              <div class="nav-item-left">
                <span class="nav-item-icon">🕹️</span>
                <span class="nav-item-label" title="XBOX 手柄">XBOX 手柄</span>
              </div>
              <span class="nav-item-count">官方手柄</span>
            </div>
            <div class="sidebar-nav-item" onclick="App.navigate('#/xbox/accessories')">
              <div class="nav-item-left">
                <span class="nav-item-icon">🎒</span>
                <span class="nav-item-label" title="XBOX 配件">XBOX 配件</span>
              </div>
              <span class="nav-item-count">周边配件</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  sidebarTreeState: {
    surface: true,
    commercial: false,
    xbox: false,
    accessories: false
  },
  _lastAutoExpandedPath: null,

  toggleSidebarTree(key) {
    if (this.sidebarTreeState[key] === undefined) this.sidebarTreeState[key] = false;
    this.sidebarTreeState[key] = !this.sidebarTreeState[key];
    this.renderSidebar();
  },

  renderSidebar() {
    const sidebar = document.getElementById('hub-sidebar-content');
    if (!sidebar) return;

    if (this.isProductDetailRoute()) {
      this.renderDetailCatalogSidebar(sidebar);
      return;
    }

    sidebar.classList.remove('catalog-detail-sidebar');
    const path = this.activeRoute.path || '/';

    // 路由联动：仅当路由切换时自动展开对应层级，避免重绘冲掉用户手动折叠的操作
    if (this._lastAutoExpandedPath !== path) {
      this._lastAutoExpandedPath = path;
      if (path.startsWith('/business')) {
        this.sidebarTreeState.commercial = true;
      } else if (path.includes('xbox')) {
        this.sidebarTreeState.xbox = true;
      } else if (path.includes('compat') || path.startsWith('/accessories')) {
        this.sidebarTreeState.accessories = true;
      } else if (path.startsWith('/consumer') || path === '/' || path === '') {
        this.sidebarTreeState.surface = true;
      }
    }

    const isHome = path === '/' || path === '';

    let html = `
      <!-- 顶部 首页 -->
      <div class="sidebar-flat-item ${isHome ? 'active' : ''}" onclick="App.navigate('#/')">
        <span class="sidebar-action-icon">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </span>
        <span class="sidebar-item-text" style="font-weight:600;">首页</span>
      </div>

      <!-- 分组：产品库 -->
      <div class="sidebar-section-title">产品库</div>

      <!-- 1. Surface 消费版 折叠树 -->
      <div class="sidebar-tree-group">
        <div role="button" tabindex="0" class="sidebar-parent-row ${this.sidebarTreeState.surface ? 'expanded' : ''}" onclick="App.toggleSidebarTree('surface')">
          <span class="parent-accent-bar"></span>
          <div class="parent-row-left">
            <span class="parent-row-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
            </span>
            <span class="parent-row-title" style="font-weight:600;">Surface 消费版</span>
          </div>
          <span class="parent-chevron">
            <svg class="parent-chevron-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </span>
        </div>

        ${this.sidebarTreeState.surface ? `
          <div class="sidebar-tree-children">
            <div class="tree-sub-item ${path === '/consumer/pro' || path.startsWith('/consumer/pro/') ? 'active' : ''}" onclick="App.navigate('#/consumer/pro')">
              <span class="tree-sub-text">Surface Pro</span>
            </div>
            <div class="tree-sub-item ${path === '/consumer/laptop' || path.startsWith('/consumer/laptop/') ? 'active' : ''}" onclick="App.navigate('#/consumer/laptop')">
              <span class="tree-sub-text">Surface Laptop</span>
            </div>
            <div class="tree-sub-item ${path === '/consumer/sls' || path.startsWith('/consumer/sls/') ? 'active' : ''}" onclick="App.navigate('#/consumer/sls')">
              <span class="tree-sub-text">Surface Laptop Studio</span>
            </div>
            <div class="tree-sub-item ${path === '/consumer/book' || path.startsWith('/consumer/book/') ? 'active' : ''}" onclick="App.navigate('#/consumer/book')">
              <span class="tree-sub-text">Surface Book</span>
            </div>
            <div class="tree-sub-item ${path === '/consumer/go' || path.startsWith('/consumer/go/') ? 'active' : ''}" onclick="App.navigate('#/consumer/go')">
              <span class="tree-sub-text">Surface Go</span>
            </div>
            <div class="tree-sub-item ${path === '/consumer/laptopgo' || path.startsWith('/consumer/laptopgo/') ? 'active' : ''}" onclick="App.navigate('#/consumer/laptopgo')">
              <span class="tree-sub-text">Surface Laptop Go</span>
            </div>
            <div class="tree-sub-item ${path === '/consumer/studio' || path.startsWith('/consumer/studio/') ? 'active' : ''}" onclick="App.navigate('#/consumer/studio')">
              <span class="tree-sub-text">Surface Studio</span>
            </div>
            <div class="tree-sub-item ${path === '/consumer/duo' || path.startsWith('/consumer/duo/') ? 'active' : ''}" onclick="App.navigate('#/consumer/duo')">
              <span class="tree-sub-text">Surface Duo</span>
            </div>
          </div>
        ` : ''}
      </div>

      <!-- 2. Surface 商用版 (对齐设计稿 Windows 设备位) 折叠树 -->
      <div class="sidebar-tree-group">
        <div role="button" tabindex="0" class="sidebar-parent-row ${this.sidebarTreeState.commercial ? 'expanded' : ''}" onclick="App.toggleSidebarTree('commercial')">
          <span class="parent-accent-bar"></span>
          <div class="parent-row-left">
            <span class="parent-row-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            </span>
            <span class="parent-row-title" style="font-weight:600;">Surface 商用版</span>
          </div>
          <span class="parent-chevron">
            <svg class="parent-chevron-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </span>
        </div>

        ${this.sidebarTreeState.commercial ? `
          <div class="sidebar-tree-children">
            <div class="tree-sub-item ${path === '/business/pro' || path.startsWith('/business/pro/') ? 'active' : ''}" onclick="App.navigate('#/business/pro')">
              <span class="tree-sub-text">Surface Pro 商用版</span>
            </div>
            <div class="tree-sub-item ${path === '/business/laptop' || path.startsWith('/business/laptop/') ? 'active' : ''}" onclick="App.navigate('#/business/laptop')">
              <span class="tree-sub-text">Surface Laptop 商用版</span>
            </div>
            <div class="tree-sub-item ${path === '/business/sls' || path.startsWith('/business/sls/') ? 'active' : ''}" onclick="App.navigate('#/business/sls')">
              <span class="tree-sub-text">Surface Laptop Studio 商用版</span>
            </div>
            <div class="tree-sub-item ${path === '/business/book' || path.startsWith('/business/book/') ? 'active' : ''}" onclick="App.navigate('#/business/book')">
              <span class="tree-sub-text">Surface Book 商用版</span>
            </div>
            <div class="tree-sub-item ${path === '/business/go' || path.startsWith('/business/go/') ? 'active' : ''}" onclick="App.navigate('#/business/go')">
              <span class="tree-sub-text">Surface Go 商用版</span>
            </div>
            <div class="tree-sub-item ${path === '/business/laptopgo' || path.startsWith('/business/laptopgo/') ? 'active' : ''}" onclick="App.navigate('#/business/laptopgo')">
              <span class="tree-sub-text">Surface Laptop Go 商用版</span>
            </div>
            <div class="tree-sub-item ${path === '/business/hub' || path.startsWith('/business/hub/') || path.includes('hub-studio') ? 'active' : ''}" onclick="App.navigate('#/business/hub')">
              <span class="tree-sub-text">Surface Hub 协作巨幕</span>
            </div>
          </div>
        ` : ''}
      </div>

      <!-- 3. Surface 配件 (对齐设计稿 Microsoft 365 位，独立大类！) 折叠树 -->
      <div class="sidebar-tree-group">
        <div role="button" tabindex="0" class="sidebar-parent-row ${this.sidebarTreeState.accessories ? 'expanded' : ''}" onclick="App.toggleSidebarTree('accessories')">
          <span class="parent-accent-bar"></span>
          <div class="parent-row-left">
            <span class="parent-row-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="6" y1="8" x2="6" y2="8"/><line x1="10" y1="8" x2="10" y2="8"/><line x1="14" y1="8" x2="14" y2="8"/><line x1="18" y1="8" x2="18" y2="8"/><line x1="7" y1="16" x2="17" y2="16"/></svg>
            </span>
            <span class="parent-row-title" style="font-weight:600;">Surface 配件</span>
          </div>
          <span class="parent-chevron">
            <svg class="parent-chevron-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </span>
        </div>

        ${this.sidebarTreeState.accessories ? `
          <div class="sidebar-tree-children">
            <div class="tree-sub-item ${path === '/accessories' || path === '/surface/accessories' ? 'active' : ''}" onclick="App.navigate('#/accessories')">
              <span class="tree-sub-text">全部配件图鉴 (23款)</span>
            </div>
            <div class="tree-sub-item ${path === '/accessories/keyboard' ? 'active' : ''}" onclick="App.navigate('#/accessories/keyboard')">
              <span class="tree-sub-text">键盘盖与保护套</span>
            </div>
            <div class="tree-sub-item ${path === '/accessories/pen' ? 'active' : ''}" onclick="App.navigate('#/accessories/pen')">
              <span class="tree-sub-text">触控笔 / 超薄笔</span>
            </div>
            <div class="tree-sub-item ${path === '/accessories/dock' ? 'active' : ''}" onclick="App.navigate('#/accessories/dock')">
              <span class="tree-sub-text">拓展坞与连接坞</span>
            </div>
            <div class="tree-sub-item ${path === '/accessories/mouse' ? 'active' : ''}" onclick="App.navigate('#/accessories/mouse')">
              <span class="tree-sub-text">鼠标与旋钮</span>
            </div>
            <div class="tree-sub-item ${path === '/accessories/audio' ? 'active' : ''}" onclick="App.navigate('#/accessories/audio')">
              <span class="tree-sub-text">音频与降噪耳机</span>
            </div>
            <div class="tree-sub-item ${path === '/tools/compat' ? 'active' : ''}" onclick="App.navigate('#/tools/compat')">
              <span class="tree-sub-text">配件双向兼容矩阵 ↗</span>
            </div>
          </div>
        ` : ''}
      </div>

      <!-- 4. Xbox 生态补充 (PRD P2-1 / C-5: 明确收录定位与层级降级) 折叠树 -->
      <div class="sidebar-tree-group">
        <div role="button" tabindex="0" class="sidebar-parent-row ${this.sidebarTreeState.xbox ? 'expanded' : ''}" onclick="App.toggleSidebarTree('xbox')">
          <span class="parent-accent-bar" style="background:#107c41;"></span>
          <div class="parent-row-left">
            <span class="parent-row-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="6.5" y1="6.5" x2="17.5" y2="17.5"/><line x1="17.5" y1="6.5" x2="6.5" y2="17.5"/></svg>
            </span>
            <span class="parent-row-title" style="font-weight:600; color:var(--ms-text-secondary);">Xbox 生态补充</span>
          </div>
          <span class="parent-chevron">
            <svg class="parent-chevron-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </span>
        </div>

        ${this.sidebarTreeState.xbox ? `
          <div class="sidebar-tree-children">
            <div class="tree-sub-item ${path === '/xbox/consoles' || path === '/xbox' || path.startsWith('/xbox/consoles/') ? 'active' : ''}" onclick="App.navigate('#/xbox/consoles')">
              <span class="tree-sub-text">Xbox 游戏主机</span>
            </div>
            <div class="tree-sub-item ${path === '/xbox/controllers' ? 'active' : ''}" onclick="App.navigate('#/xbox/controllers')">
              <span class="tree-sub-text">Xbox 无线手柄</span>
            </div>
            <div class="tree-sub-item ${path === '/xbox/accessories' ? 'active' : ''}" onclick="App.navigate('#/xbox/accessories')">
              <span class="tree-sub-text">Xbox 拓展配件</span>
            </div>
          </div>
        ` : ''}
      </div>

      <!-- 分组：使用场景 (对齐设计稿第二组) -->
      <div class="sidebar-section-title" style="margin-top:14px;">使用场景</div>

      <div role="button" tabindex="0" class="sidebar-action-item ${path === '/tools' || path === '/tools/guide' ? 'active' : ''}" onclick="App.navigate('#/tools/guide')">
        <span class="sidebar-action-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
        </span>
        <span class="sidebar-item-text">场景智能选型向导</span>
      </div>
      <div role="button" tabindex="0" class="sidebar-action-item ${path === '/tools/upgrade' ? 'active' : ''}" onclick="App.navigate('#/tools/upgrade')">
        <span class="sidebar-action-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/></svg>
        </span>
        <span class="sidebar-item-text">跨代升级价值评估</span>
      </div>
      <div role="button" tabindex="0" class="sidebar-action-item ${path === '/tools/weight' ? 'active' : ''}" onclick="App.navigate('#/tools/weight')">
        <span class="sidebar-action-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 20h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2z"/><line x1="10" y1="3" x2="14" y2="3"/><line x1="12" y1="12" x2="12" y2="15"/></svg>
        </span>
        <span class="sidebar-item-text">差旅背包负重测算</span>
      </div>
      <div role="button" tabindex="0" class="sidebar-action-item ${path === '/tools/storage' ? 'active' : ''}" onclick="App.navigate('#/tools/storage')">
        <span class="sidebar-action-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
        </span>
        <span class="sidebar-item-text">固态硬盘省钱指南</span>
      </div>
      <div role="button" tabindex="0" class="sidebar-action-item ${path === '/tools/screen' ? 'active' : ''}" onclick="App.navigate('#/tools/screen')">
        <span class="sidebar-action-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        </span>
        <span class="sidebar-item-text">3:2 黄金比例对比器</span>
      </div>

      <!-- 分组：资源 (对齐设计稿第三组) -->
      <div class="sidebar-section-title" style="margin-top:14px;">资源</div>

      <div role="button" tabindex="0" class="sidebar-action-item ${path === '/audit' ? 'active' : ''}" onclick="App.navigate('#/audit')">
        <span class="sidebar-action-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        </span>
        <span class="sidebar-item-text">官方文档核验中枢</span>
      </div>
      <div role="button" tabindex="0" class="sidebar-action-item ${path.includes('chips') ? 'active' : ''}" onclick="App.navigate('#/tools/chips')">
        <span class="sidebar-action-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </span>
        <span class="sidebar-item-text">定制芯片架构库</span>
      </div>
      <div role="button" tabindex="0" class="sidebar-action-item ${path === '/compare' ? 'active' : ''}" onclick="App.navigate('#/compare')">
        <span class="sidebar-action-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="18" rx="1"/><line x1="10" y1="8" x2="14" y2="8"/><line x1="10" y1="16" x2="14" y2="16"/></svg>
        </span>
        <span class="sidebar-item-text">全机型规格对比</span>
      </div>
      <div role="button" tabindex="0" class="sidebar-action-item ${path === '/timeline' ? 'active' : ''}" onclick="App.navigate('#/timeline')">
        <span class="sidebar-action-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </span>
        <span class="sidebar-item-text">常见问题与编年史</span>
      </div>
    `;

    sidebar.innerHTML = html;
  },

  updateSidebarActiveState() {
    this.renderSidebar();
  },

  // 10. 全局事件绑定
  bindEvents() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        const sidebar = document.querySelector('.hub-sidebar.open');
        if (sidebar) { sidebar.classList.remove('open'); const btn = document.getElementById('mobile-menu-btn'); btn?.setAttribute('aria-expanded','false'); btn?.focus(); }
      }
      if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('div[role="button"]:not([onkeydown])')) { event.preventDefault(); event.target.click(); }
    });
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
        const open = sidebar.classList.toggle('open');
        mobileBtn.setAttribute('aria-expanded', String(open));
        if (open) sidebar.querySelector('[tabindex],button,a')?.focus();
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
        ? `<svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg> <span class="btn-label">浅色</span>`
        : `<svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/></svg> <span class="btn-label">深色</span>`;
    }
  },

  renderActiveView() {
    this.dispatchRoute();
  },

  renderRoute() {
    this.renderActiveView();
  },

  switchDetailColor(deviceId, colorName, btnEl) {
    const dev = this.getDevice(deviceId);
    const imgEl = document.getElementById('detail-main-img');
    const labelEl = document.getElementById('detail-active-color-label');
    const shot = this.shot(dev, colorName);
    if (imgEl && shot.src) {
      delete imgEl.dataset.retryClean;
      delete imgEl.dataset.retryFallback;
      const box = imgEl.closest ? imgEl.closest('.detail-hero-img-box, .device-img-wrap') : null;
      if (box) {
        const fallback = box.querySelector('div');
        if (fallback) fallback.style.display = 'none';
      }
      imgEl.style.opacity = '0.3';
      imgEl.style.transform = 'scale(0.97)';
      setTimeout(() => {
        Catalog.paint(imgEl, shot, 'detail');
        imgEl.style.display = 'block';
        imgEl.style.opacity = '1';
        imgEl.style.transform = 'scale(1)';
      }, 150);
    }
    const mark = document.getElementById('portrait-mark-detail');
    if (mark) {
      mark.textContent = Catalog.portraitLabel(shot);
      mark.hidden = !mark.textContent;
    }
    const railImg = document.getElementById('detail-rail-main-img');
    if (railImg && shot.src) {
      Catalog.paint(railImg, shot, 'detail');
    }
    const shotIdentityLabel = shot.identity === 'official' ? '官方图像' : (Catalog.portraitLabel(shot) || '同系列示意');
    const shotRoleLabel = colorName ? `${colorName} 配色图` : '代表图';

    const railLabel = document.getElementById('detail-rail-image-label');
    if (railLabel) {
      railLabel.textContent = shotRoleLabel;
    }
    const railColorLabel = document.getElementById('detail-rail-color-label');
    if (railColorLabel) {
      railColorLabel.textContent = shotIdentityLabel;
    }
    const railMetaIdentity = document.getElementById('detail-rail-meta-identity');
    if (railMetaIdentity) {
      railMetaIdentity.textContent = shotIdentityLabel;
    }
    document.querySelectorAll('.utility-image-thumb').forEach(thumb => {
      thumb.classList.toggle('active', thumb.title === colorName);
    });
    if (labelEl) {
      const colors = this.spec(dev, 'colors') || [];
      const foundColor = colors.find(c => c.name === colorName);
      if (foundColor && foundColor.material) {
        labelEl.textContent = `${colorName} · ${foundColor.material}`;
      } else {
        labelEl.textContent = colorName;
      }
    }
    if (btnEl) {
      const parent = btnEl.closest('.detail-color-options');
      if (parent) {
        parent.querySelectorAll('.color-choice-btn').forEach(b => b.classList.remove('active'));
        btnEl.classList.add('active');
      }
    }
  },

  nextDetailImage(deviceId) {
    const dev = this.getDevice(deviceId);
    if (!dev) return;
    const colors = this.spec(dev, 'colors');
    const colorRows = Array.isArray(colors) ? colors : [];
    if (colorRows.length <= 1) return;
    const activeThumb = document.querySelector('.utility-image-thumb.active');
    let nextIdx = 0;
    if (activeThumb) {
      const currentName = activeThumb.title;
      const curIdx = colorRows.findIndex(c => c.name === currentName);
      nextIdx = (curIdx + 1) % colorRows.length;
    }
    const nextColor = colorRows[nextIdx];
    if (nextColor) {
      this.switchDetailColor(deviceId, nextColor.name, null);
    }
  },

  previewCardColor(deviceId, colorName, dotEl) {
    const dev = this.getDevice(deviceId);
    if (!dev) return;
    const shot = this.shot(dev, colorName);
    if (!shot.src) return;
    const thumbEl = document.getElementById(`thumb-${deviceId}`);
    if (thumbEl) {
      Catalog.paint(thumbEl, shot, 'card');
    }
    const mark = document.getElementById(`portrait-mark-${deviceId}`);
    if (mark) {
      mark.textContent = Catalog.portraitLabel(shot);
      mark.hidden = !mark.textContent;
    }
    if (dotEl) {
      const parent = dotEl.parentElement;
      if (parent) {
        parent.querySelectorAll('.card-color-dot').forEach(d => d.classList.remove('active'));
        dotEl.classList.add('active');
      }
    }
    const lblEl = document.getElementById(`color-name-${deviceId}`);
    if (lblEl) {
      const colors = this.spec(dev, 'colors') || [];
      const cObj = colors.find(c => c.name === colorName);
      if (cObj && cObj.material) {
        lblEl.textContent = `${colorName} · ${cObj.material.replace(/®|合金/g, '')}`;
      } else {
        lblEl.textContent = colorName;
      }
    }
  },

  selectAllCategoryDevices(catId, segment) {
    let devs;
    if (catId === 'commercial' || segment === 'commercial') {
      devs = this.listDevices({
        seriesId: catId === 'commercial' ? undefined : catId,
        segment: 'commercial'
      });
    } else {
      devs = this.listDevices({ seriesId: catId, segment: segment || 'consumer' });
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
        if (toggleBtn) toggleBtn.innerHTML = '▲';
      } else {
        dock.classList.remove('collapsed');
        if (toggleBtn) toggleBtn.innerHTML = '▼';
      }
    }
  },

  scrollToSpecsBottom() {
    if (typeof document === 'undefined') return;
    this.switchDetailTab('specs');
    setTimeout(() => {
      const el = document.querySelector('.field-row-metadata') || document.querySelector('.spec-table tbody tr:last-child');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.style.transition = 'background-color 0.5s';
        el.style.backgroundColor = 'rgba(0,120,212,0.15)';
        setTimeout(() => { el.style.backgroundColor = ''; }, 2000);
      }
    }, 50);
  }
};

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      App.init();
    });
  } else {
    App.init();
  }
}

if (typeof window !== 'undefined') {
  window.App = App;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}
