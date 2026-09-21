renderSeriesView(main, 'pro', 'commercial');
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
      this.renderSeriesView(main, seriesId, 'consumer');
      return;
    }

    // 兼容历史路由: 单个机型详情页 (#/surface/:series/:id)
    const detailMatch = path.match(/^\/surface\/([^/]+)\/([^/]+)$/);
    if (detailMatch) {
      const [_, seriesId, deviceId] = detailMatch;
      const dev = SURFACE_DATA.devices.find(d => d.id === deviceId);
      const seg = (dev && dev.segment === 'commercial') ? 'commercial' : 'consumer';
      this.renderProductDetailView(main, seriesId, deviceId);
      return;
    }

    // 兼容历史路由: 系列横向对比页 (#/surface/:series)
    const seriesMatch = path.match(/^\/surface\/([^/]+)$/);
    if (seriesMatch) {
      const seriesId = seriesMatch[1];
      this.renderSeriesView(main, seriesId, 'consumer');
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
          <button class="fluent-btn" onclick="App.navigate('#/compare?products=pro-12-13-intel,pro-12-13-snap')">
            <span>⚖️</span> 旗舰对决：Pro 12 Intel vs 骁龙
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

      <div class="device-select-strip" style="margin-bottom:28