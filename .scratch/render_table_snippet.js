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
                <span class="table-single-meta-desc">${dev.specs.cpuModel ? `架构：${dev.specs.cpuModel}` : (dev.tagline || '')}</span>
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
                <img class="table-thumb-img" id="table-thumb-${dev.id}-${colIdx}" src="${SURFACE_DATA.getDeviceImage(dev)}" alt="${dev.name}" loading="lazy"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div style="display:none; width:100%; height:100%;">
                  ${this.getDeviceSvgIcon(dev.categoryId)}
                </div>
              </div>

              <!-- 表头多配色快速预览 -->
              ${(dev.specs && Array.isArray(dev.specs.colors) && dev.specs.colors.length > 1) ? `
                <div class="table-color-dots" onclick="event.stopPropagation();">
                  ${dev.specs.colors.map(c => `
                    <span class="table-color-dot" style="background:${c.hex};" title="${c.name}"
                      onclick="ComparisonEngine.switchTableDeviceColor('${dev.id}', ${colIdx}, '${c.image || ''}', this)"></span>
                  `).join('')}
                </div>
              ` : ''}

              <div class="table-device-title" onclick="App.navigateToDetail('${dev.categoryId}', '${dev.id}')" style="cursor:pointer;" title="点击查看详情">
                ${dev.name}
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
                ${dev.specs.npuTops && dev.specs.npuTops.includes('80 TOPS') ? '<span class="spec-badge copilot">80 TOPS</span>' : ''}
                ${dev.specs.panelTech && dev.specs.panelTech.includes('OLED') ? '<span class="spec-badge green">OLED</span>' : ''}
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

      group.fields.fo