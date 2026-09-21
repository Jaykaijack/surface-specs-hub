formatFieldValue(rawVal, field.type, dev, field.key);
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
    const values = devices.map(d => (d && d.specs && d.specs[fieldKey] !== undefined ? d.specs[fieldKey] : 'null'));
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
    if (val === undefined || val === null || val === '' || val === 'null') {
      return '<span class="spec-state null" title="暂未录入或缺失">—</span>';
    }

    if (val === 'not_disclosed') {
      return '<span class="spec-state not-disclosed" title="微软官方白皮书从未对外正式披露">官方未披露</span>';
    }

    if (val === 'not_applicable') {
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
      cons