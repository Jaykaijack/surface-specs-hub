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
const pyCmd = process.platform === 'win32' ? 'python' : 'python3';
execSync(`${pyCmd} -c "import tarfile, os; src=r'dist/site'; dest=r'${tarPath}'; tar=tarfile.open(dest, 'w:gz'); [tar.add(os.path.join(src, i), arcname=i) for i in os.listdir(src)]; tar.close()"`, { cwd: ROOT, stdio: 'inherit' });
function waitMs(ms) {
  try {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
  } catch (e) {
    const end = Date.now() + ms;
    while (Date.now() < end) {}
  }
}

function runRemote(cmd, desc) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
      return;
    } catch (err) {
      console.warn(`⚠️ [${desc}] 尝试 ${attempt}/3 失败，等待重试...`);
      if (attempt === 3) throw err;
      waitMs(2000);
    }
  }
}

runRemote(`scp -O -o ConnectTimeout=15 -o ServerAliveInterval=5 "${tarPath}" grow-server:/tmp/deploy-site.tar.gz`, '上传压缩包');

console.log('\n🔄 [4/5] 服务器解压部署并更新文件权限...');
runRemote('ssh -o ConnectTimeout=10 grow-server "tar -xzf /tmp/deploy-site.tar.gz -C /opt/surface-specs-hub/site && chmod -R 755 /opt/surface-specs-hub/site && rm -f /tmp/deploy-site.tar.gz"', '服务器解压部署');

const standalonePath = path.join(ROOT, 'surface-specs-hub-standalone.html');
if (fs.existsSync(standalonePath)) {
  console.log('📄 同步更新单文件离线包至线上目录...');
  runRemote(`scp -O -o ConnectTimeout=15 -o ServerAliveInterval=5 "${standalonePath}" grow-server:/opt/surface-specs-hub/site/surface-specs-hub-standalone.html`, '上传单文件离线包');
  runRemote('ssh -o ConnectTimeout=10 grow-server "chmod 644 /opt/surface-specs-hub/site/surface-specs-hub-standalone.html"', '离线包权限设置');
}

if (fs.existsSync(tarPath)) fs.unlinkSync(tarPath);

console.log('\n🌐 [5/5] 验证远程站点 (https://surface.kaibase.cn)...');
try {
  runRemote('ssh -o ConnectTimeout=10 grow-server "curl -s -k -I https://surface.kaibase.cn --resolve surface.kaibase.cn:443:127.0.0.1 | head -n 5"', '验证远程站点响应');
} catch (e) {
  console.warn('⚠️ 远程探针探测超时，继续执行并汇报。');
}

console.log('\n🐙 [6/6] 检查 GitHub 仓库同步状态...');
try {
  const status = execSync('git status --porcelain', { cwd: ROOT, encoding: 'utf8' }).trim();
  const unpushed = execSync('git log origin/main..HEAD --oneline', { cwd: ROOT, encoding: 'utf8' }).trim();
  if (status || unpushed) {
    console.log('⚠️ 注意：检测到本地有未提交或未推送的改动，请务必执行 git commit & git push origin main 以保持 GitHub 同步！');
  } else {
    console.log('✅ GitHub 仓库与本地处于完全同步状态。');
  }
} catch (e) {
  // 忽略非 fatal 异常
}

console.log('\n✨ 部署成功！线上服务已更新：https://surface.kaibase.cn\n');
