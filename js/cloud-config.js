/**
 * WorkBuddy Cloud Service — 前端公开配置 (publicConfig)
 *
 * 这两个值是云端返回的 publicConfig 中唯一允许进入前端源码的字段：
 *   - endpoint        当前应用发布域的数据面基址，初始化客户端时必传
 *   - publishableKey  标识"是哪个应用"，本身不携带任何权限；
 *                     服务端按发布域的精确 Origin 匹配来鉴权
 *
 * 请勿在此文件写入任何长期密钥、环境 ID 或服务端凭据。
 */

window.SURFACE_CLOUD_CONFIG = {
  endpoint: 'https://surface-specs-hub.app.workbuddy.host',
  publishableKey: 'wbpk_5G7lpzS2MtDdTV2YQYxUj6_Us9a6h1PSzlhwjX1C1JvmrHleOPm4Btj',

  // 云端数据集表（surface_dataset）中的当前版本号，仅用于展示与校验提示
  datasetVersion: '2026.09.18',

  // 单次允许上传的最大体积（字节），前端拦截，避免无谓的失败请求
  maxUploadBytes: 25 * 1024 * 1024
};
