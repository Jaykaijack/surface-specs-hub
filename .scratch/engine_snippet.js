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
          this.selectedIds = parsed.filter(id => SURFACE_DATA.devices.some(d => d.id === id));
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
      els