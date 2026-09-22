/**
 * 可选云端叠层配置（默认关闭）
 *
 * 对齐 ADR-0001：站点核心是纯静态 SPA，双击 index.html 必须离线可用。
 * 云端能力仅在显式 enabled=true 且提供 endpoint/publishableKey 时启用；
 * 默认关闭时不发起任何网络请求，不依赖 WorkBuddy。
 *
 * 请勿在此文件写入长期密钥或服务端凭据。
 */

window.SURFACE_CLOUD_CONFIG = {
  enabled: false,
  endpoint: '',
  publishableKey: '',
  datasetVersion: '',
  maxUploadBytes: 25 * 1024 * 1024
};
