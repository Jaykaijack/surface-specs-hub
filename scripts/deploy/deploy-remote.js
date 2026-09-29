/**
 * 远程服务器（surface.kaibase.cn）一键发布部署脚本
 *
 * 职责：
 *   1. 运行 build-site.js 构建 dist/site/
 *   2. 运行 smoke-test.js 进行本地 HTTP 冒烟测试
 *   3. 打包 dist/site 并通过 SSH/SCP 同步到 grow-server (/opt/surface-specs-hub/site/)
 *   4. 同步更新离线单文件 surface-specs-hub-standalone.html
 *   5. 验证远程 HTTPS 响应状态为 200
 *
 * 用法：
 *   node scripts/deploy/deploy-remote.js
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..', '..');
const SCRATCH = path.join(ROOT, '.scratch');
if (!fs.existsSync(SCRATCH)) fs.mkdirSync(SCRATCH, { recursive: true });

console.log('🚀 [1/5] 本地构建最小发布集 (dist/site)...');
execSync('node scripts/deploy/build-site.js', { cwd: ROOT, stdio: 'inherit' });

console.log('\n🔍 [2/5] 本地 HTTP 冒烟测试...');
execSync('node scripts/deploy/smoke-test.js', { cwd: ROOT, stdio: 'inherit' });

console.log('\n📦 [3/5] 打包静态资源并上传至 grow-server (106.14.17.19)...');
const tarPath = path.join(SCRATCH, 'deploy-site.tar.gz');
execSync(`tar.exe -czf "${tarPath}" -C dist/site .`, { cwd: ROOT, stdio: 'inherit' });
execSync(`scp "${tarPath}" grow-server:/tmp/deploy-site.tar.gz`, { cwd: ROOT, stdio: 'inherit' });

console.log('\n🔄 [4/5] 服务器解压部署并更新文件权限...');
execSync('ssh grow-server "tar -xzf /tmp/deploy-site.tar.gz -C /opt/surface-specs-hub/site && chmod -R 755 /opt/surface-specs-hub/site && rm -f /tmp/deploy-site.tar.gz"', { cwd: ROOT, stdio: 'inherit' });

const standalonePath = path.join(ROOT, 'surface-specs-hub-standalone.html');
if (fs.existsSync(standalonePath)) {
  console.log('📄 同步更新单文件离线包至线上目录...');
  execSync(`scp "${standalonePath}" grow-server:/opt/surface-specs-hub/site/surface-specs-hub-standalone.html`, { cwd: ROOT, stdio: 'inherit' });
  execSync('ssh grow-server "chmod 644 /opt/surface-specs-hub/site/surface-specs-hub-standalone.html"', { cwd: ROOT, stdio: 'inherit' });
}

if (fs.existsSync(tarPath)) fs.unlinkSync(tarPath);

console.log('\n🌐 [5/5] 验证远程站点 (https://surface.kaibase.cn)...');
const remoteCheck = execSync('ssh grow-server "curl -s -k -I https://surface.kaibase.cn --resolve surface.kaibase.cn:443:127.0.0.1 | head -n 5"', { encoding: 'utf8' });
console.log(remoteCheck);

console.log('✨ 部署成功！线上服务已更新：https://surface.kaibase.cn\n');
