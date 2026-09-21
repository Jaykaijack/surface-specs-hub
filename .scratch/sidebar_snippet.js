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

      <!-- 🛒 消费版产品系列 (Consumer) -->
      <div class="sidebar-group">
        <div class="sidebar-group-title" style="display:flex; justify-content:space-between; align-items:center; color:var(--ms-text-primary); font-weight:800;">
          <span>🛒 消费版产品系列</span>
          <span style="font-size:10px; font-weight:700; background:rgba(0,120,212,0.1); color:var(--ms-accent); padding:1px 6px; border-radius:10px;">Consumer</span>
        </div>
    `;

    (SURFACE_DATA.consumerCategories || []).forEach(cat => {
      const count = SURFACE_DATA.devices.filter(d => d.categoryId === cat.seriesId && d.segment === 'consumer').length;
      const isActive = this.activeRoute.path === `/consumer/${cat.seriesId}` || 
                       this.activeRoute.path.startsWith(`/consumer/${cat.seriesId}/`) ||
                       this.activeRoute.path === `/surface/${cat.seriesId}`;
      html += `
        <div class="sidebar-nav-item ${isActive ? 'active' : ''}" onclick="App.navigate('#/consumer/${cat.seriesId}')">
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

      <!-- 🏢 商用版产品系列 (For Business) -->
      <div class="sidebar-group">
        <div class="sidebar-group-title" style="display:flex; justify-content:space-between; align-items:center; color:var(--ms-text-primary); font-weight:800;">
          <span>🏢 商用版产品系列</span>
          <span style="font-size:10px; font-weight:700; background:rgba(16,124,65,0.12); color:#107c41; padding:1px 6px; border-radius:10px;">For Business</span>
        </div>
    `;

    (SURFACE_DATA.commercialCategories || []).forEach(cat => {
      const count = SURFACE_DATA.devices.filter(d => {
        if (cat.seriesId === 'hub') return (d.categoryId === 'studio' || d.categoryId === 'hub') && d.segment === 'commercial';
        return d.categoryId === cat.seriesId && d.segment === 'commercial';
      }).length;
      const isActive = this.activeRoute.path === `/business/${cat.seriesId}` || 
                       this.activeRoute.path.startsWith(`/business/${cat.seriesId}/`);
      html += `
        <div class="sidebar-nav-item ${isActive ? 'active' : ''}" onclick="App.navigate('#/business/${cat.seriesId}')">
          <div class="nav-item-left">
            <span class="nav-item-icon">🏢</span>
            <span>${cat.name}</span>
          </div>
          <span class="nav-item-count" style="background:#0078d4; color:#fff;">${count}</span>
        </div>
      `;
    });

    html += `
      </div>

      <div class="sidebar-group">
        <div class="sidebar-group-title">数据合规与审计</div>
        <div class="sidebar-nav-item ${this.activeRoute.path === '/audit' ? 'active' : ''}" onclick="App.navigate('#/audit')">
          <div class="nav-item-left">
            <span class="nav-item-icon">🛡️</span>
            <span>数据核验与官方溯源</span>
          </div>
          <span class="nav-it