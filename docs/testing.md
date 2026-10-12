# 验证与边界

运行 `node tests/test-runner.js`、`node tests/contract-regression.test.js`。本次核心套件4857断言验证分类、参数出口、比较、筛选、评分、图片身份和失效回退；另有6311字段出口、2070兼容行和34映射的移植对照，4512来源摘要绑定、值/配置/来源变异、未知值/范围/现价隔离与精确URL块负例。对照快照来自移植前冻结输出，仅证明没有无意漂移。

原私人执行账、输入工作簿、完整网页回执和下载诊断不公开。以最小公开 fixture 保留语义回归；原私人验收计数与下载诊断门禁仍留在私人恢复分支，不作为公开构建依赖。4857断言或全部来源有链接均不等于全库真实性认证。

构建：`node scripts/deploy/build-site.js`；需要Node.js、Python 3与Pillow。清洁提交上构建，离线HTML的输入哈希、资产及生成器变化必须重新生成；禁止复用旧根目录生成文件。Chromium/Playwright浏览器验收覆盖实际桌面/手机、筛选空结果、详情、比较换序、换色与图源失败、缓存及同HTML本机服务阻断后续请求。file://需另验，不能据此宣称已通过。

独立事实复核按厂商实际正文、地区、消费者/商用、尺寸CPU/SKU及测试条件进行；25张原图覆盖34已确认字段。14图片缺口保留占位，含Starfield/Forza5/Gears5三个控制器。Book初代脚注2/3测试条件仍缺，Pro Intel海外5G办公续航缺实际原文，不作为确定值。

浏览器回归：在本地构建服务运行后执行 `node tests/browser-regression.test.js`（需Playwright和Chromium；`SURFACE_PREVIEW_URL`、`CHROMIUM_PATH`可指定本机地址和浏览器）。该测试按逐键输入验证搜索焦点/光标，实际点击比较并返回，以及鼠标滚动验证两轴吸附；构建SHA必须与当前HEAD一致。缓存使用 `node tests/cache-browser.test.js` 的最小合成旧版本fixture验证真实HTTP缓存复用，避免依赖私人旧提交。
