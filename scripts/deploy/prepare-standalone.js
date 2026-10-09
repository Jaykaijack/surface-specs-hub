/** Select an immutable offline snapshot by current input hashes, never by a dated filename. */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const ROOT = path.resolve(__dirname, '../..');
const TARGET = 'surface-specs-hub-standalone.html';
const INPUTS = ['index.html',
  ...['fluent-tokens', 'specs-layout', 'spec-table', 'tools'].map(n => `css/${n}.css`),
  ...['xbox-lineup', 'surface-data', 'verification-status', 'image-delivery', 'catalog', 'taxonomy', 'comparison-engine', 'tools-engine', 'app'].map(n => `js/${n}.js`),
  'docs/evidence/field-audit-1131-input-20261009.json',
  'docs/evidence/field-audit-1131-decisions-20261009.json',
  'docs/evidence/full-model-source-review-20261009.json',
  'docs/full-library-verification-registry.json',
  'docs/evidence/image-source-correspondence-20261009.json'];
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
function provenance(html) {
  const match = html.match(/<script\b[^>]*\bid="build-provenance"[^>]*>([\s\S]*?)<\/script>/i);
  try { return match ? JSON.parse(match[1]) : null; } catch { return null; }
}
function matches(meta, expected) {
  return !!meta && /^[0-9a-f]{40}$/.test(meta.gitSha || '') && meta.fullFactCertification === false &&
    Object.keys(expected).every(file => meta.files?.[file] === expected[file]);
}
function prepareStandalone(out, root = ROOT) {
  const expected = Object.fromEntries(INPUTS.map(file => [file, hash(fs.readFileSync(path.join(root, file)))]));
  const git = args => cp.execFileSync('git', args, {cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe']}).trim();
  const currentSha = git(['rev-parse', 'HEAD']);
  const releases = path.join(root, 'releases');
  const assets = ['assets/products', 'assets/accessories'];
  // These files are embedded by the builder but older provenance records did not hash them.
  // Commit comparison prevents an old snapshot being reused after image or builder changes.
  function candidate(file) {
    const html = fs.readFileSync(file, 'utf8'), meta = provenance(html);
    if (!matches(meta, expected)) return null;
    // Also check any additional inputs recorded by a newer builder.
    for (const [relative, digest] of Object.entries(meta.files)) {
      const input = path.resolve(root, relative);
      if (!input.startsWith(path.resolve(root) + path.sep) || !fs.existsSync(input) ||
          !fs.statSync(input).isFile() || hash(fs.readFileSync(input)) !== digest) return null;
    }
    try {
      git(['cat-file', '-e', `${meta.gitSha}^{commit}`]);
      if (git(['diff', '--name-only', meta.gitSha, '--', ...assets, 'scripts/build_standalone.py'])) return null;
      if (git(['ls-files', '--others', '--exclude-standard', '--', ...assets])) return null;
    } catch { return null; }
    return {file, meta, sha256: hash(html)};
  }
  const candidates = fs.existsSync(releases) ? fs.readdirSync(releases).filter(n => n.endsWith('.html'))
    .map(n => path.join(releases, n)).sort((a,b) => fs.statSync(b).mtimeMs-fs.statSync(a).mtimeMs) : [];
  let selected;
  for (const file of candidates) {
    selected = candidate(file);
    if (selected) break;
  }
  if (!selected) {
    const inputVersion = hash(JSON.stringify(expected)).slice(0,16);
    const generated = path.join(releases, `verification-build-${currentSha.slice(0,12)}-${inputVersion}-${crypto.randomUUID()}.html`);
    cp.execFileSync(process.platform === 'win32' ? 'python' : 'python3',
      ['scripts/build_standalone.py', '--snapshot-only', '--release', generated], {cwd: root, stdio: 'inherit'});
    selected = candidate(generated);
    if (!selected) throw new Error('新离线快照与当前输入不一致；停止构建，不发布旧根目录文件');
  }
  fs.copyFileSync(selected.file, path.join(out, TARGET));
  fs.chmodSync(path.join(out, TARGET), 0o644);
  const infoPath = path.join(out, 'build-info.json');
  const info = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
  info.offline = {file: TARGET, sha256: selected.sha256, snapshotGitSha: selected.meta.gitSha,
    publishingGitSha: currentSha, inputHashes: expected, currentInputsMatch: true};
  fs.writeFileSync(infoPath, JSON.stringify(info,null,2)+'\n');
  console.log(`Offline artifact verified: ${path.basename(selected.file)} → ${TARGET}`);
  return info.offline;
}
module.exports = {prepareStandalone, provenance, matches, INPUTS, TARGET};
