#!/usr/bin/env node
/**
 * Surface / Xbox 数据与图片核验基线审计。
 *
 * 这个脚本只做发现和报告，不修改数据：
 * - 统计设备、字段和核验账覆盖率
 * - 检查设备级官方来源与核验账缺口
 * - 检查本地图片引用、同文件多配色和字节完全相同的文件
 * - 输出需要人工回到官方页面复核的清单
 *
 * 用法：
 *   node scripts/verification/audit-library.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..', '..');
const data = require(path.join(ROOT, 'js', 'surface-data.js'));
const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs', 'full-library-verification-registry.json'), 'utf8'));

function rel(file) {
  return path.relative(ROOT, file).split(path.sep).join('/');
}

function imagePath(raw) {
  if (!raw || typeof raw !== 'string') return null;
  return path.resolve(ROOT, raw.replace(/^\.\//, '').split('?')[0]);
}

function md5(file) {
  if (!fs.existsSync(file)) return null;
  return crypto.createHash('md5').update(fs.readFileSync(file)).digest('hex');
}

const devices = data.devices || [];
const registryByDevice = new Map();
for (const entry of registry.entries || []) {
  if (!registryByDevice.has(entry.deviceId)) registryByDevice.set(entry.deviceId, []);
  registryByDevice.get(entry.deviceId).push(entry);
}

const missingRegistry = devices
  .map((device) => device.id)
  .filter((id) => !registryByDevice.has(id));

const missingSources = devices
  .filter((device) => {
    const specs = device.specs || {};
    return !(device.officialDocUrl || specs.officialDocUrl || device.learnDocUrl);
  })
  .map((device) => device.id);

const missingImages = [];
const sharedColorFiles = [];
const imageOwners = new Map();
const imageHashes = new Map();

for (const device of devices) {
  const colors = Array.isArray(device.specs && device.specs.colors) ? device.specs.colors : [];
  const refs = [{ label: 'heroImage', raw: device.heroImage }];
  colors.forEach((color, index) => refs.push({
    label: `colors[${index}]${color && color.name ? `:${color.name}` : ''}`,
    raw: color && color.image
  }));

  const colorFiles = new Map();
  for (const ref of refs) {
    const file = imagePath(ref.raw);
    if (!file) {
      if (device.categoryId !== 'xbox') missingImages.push({ deviceId: device.id, field: ref.label, reason: 'no image path' });
      continue;
    }
    const key = rel(file);
    if (!fs.existsSync(file)) {
      missingImages.push({ deviceId: device.id, field: ref.label, file: key, reason: 'file missing' });
      continue;
    }
    if (!imageOwners.has(key)) imageOwners.set(key, []);
    imageOwners.get(key).push({ deviceId: device.id, field: ref.label });
    const hash = md5(file);
    if (!imageHashes.has(hash)) imageHashes.set(hash, new Set());
    imageHashes.get(hash).add(key);
    if (ref.label.startsWith('colors[')) colorFiles.set(ref.label, key);
  }

  const byFile = new Map();
  for (const [label, file] of colorFiles) {
    if (!byFile.has(file)) byFile.set(file, []);
    byFile.get(file).push(label);
  }
  for (const [file, fields] of byFile) {
    if (fields.length > 1) {
      sharedColorFiles.push({ deviceId: device.id, file, fields });
    }
  }
}

const duplicateFiles = [...imageHashes.entries()]
  .filter(([, files]) => files.size > 1)
  .map(([hash, files]) => ({
    md5: hash,
    files: [...files].map((file) => ({ file, owners: imageOwners.get(file) }))
  }));

const report = {
  generatedAt: new Date().toISOString(),
  datasetVersion: data.datasetVersion,
  counts: {
    devices: devices.length,
    surfaceDevices: devices.filter((device) => device.categoryId !== 'xbox').length,
    xboxDevices: devices.filter((device) => device.categoryId === 'xbox').length,
    registryEntries: (registry.entries || []).length,
    registryDevices: registryByDevice.size,
    missingRegistryDevices: missingRegistry.length,
    uniqueProductImages: imageOwners.size,
    missingImageReferences: missingImages.length,
    sameFileMultipleColors: sharedColorFiles.length,
    byteIdenticalFileGroups: duplicateFiles.length
  },
  missingRegistry,
  missingSources,
  missingImages,
  sameFileMultipleColors: sharedColorFiles,
  byteIdenticalFileGroups: duplicateFiles
};

console.log(JSON.stringify(report, null, 2));
