'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA = path.join(ROOT, 'js', 'surface-data.js');
const FACTS = path.join(ROOT, 'tests', 'official-historical-lineup-facts.js');

const WITHDRAW = {
  'pro-7-plus': ['osAtLaunch', 'frontCamera', 'rearCamera', 'speakers', 'cellular'],
  'pro-5': ['osAtLaunch', 'frontCamera', 'rearCamera', 'speakers', 'cellular'],
  'pro-4': ['osAtLaunch', 'frontCamera', 'rearCamera', 'speakers'],
  'pro-3': ['osAtLaunch', 'frontCamera', 'rearCamera', 'speakers'],
  'pro-2': ['osAtLaunch', 'frontCamera', 'rearCamera', 'speakers'],
  'pro-1': ['osAtLaunch', 'frontCamera', 'rearCamera', 'speakers'],
  'pro-x': ['osAtLaunch', 'frontCamera', 'rearCamera', 'speakers', 'cellular'],
  'laptop-1': ['osAtLaunch', 'frontCamera', 'speakers'],
  'duo-2': ['osAtLaunch', 'frontCamera', 'rearCamera', 'speakers', 'cellular'],
  'book-2-15': ['osAtLaunch', 'frontCamera', 'rearCamera', 'speakers'],
  'book-1': ['osAtLaunch', 'frontCamera', 'rearCamera', 'speakers'],
  'go-1': ['osAtLaunch', 'frontCamera', 'rearCamera', 'speakers', 'cellular'],
  'laptop-go-1': ['osAtLaunch', 'frontCamera', 'speakers'],
  'studio-1': ['osAtLaunch', 'frontCamera', 'speakers'],
  'hub-2s': ['osAtLaunch', 'frontCamera', 'speakers'],
  'duo-1': ['osAtLaunch', 'frontCamera', 'rearCamera', 'speakers', 'cellular']
};

const FACT_KEY = {
  osAtLaunch: 'osState',
  frontCamera: 'frontCameraState',
  rearCamera: 'rearCameraState',
  speakers: 'speakersState',
  cellular: 'cellularState'
};

function patchData(src) {
  Object.entries(WITHDRAW).forEach(([id, keys]) => {
    const marker = `"id": "${id}"`;
    const start = src.indexOf(marker);
    if (start < 0) throw new Error('missing device ' + id);
    const next = src.indexOf('\n    {\n      "id":', start + 1);
    const end = next === -1 ? src.length : next;
    let block = src.slice(start, end);
    keys.forEach((key) => {
      const re = new RegExp(`"${key}":\\s*"[^"]*"`);
      if (!re.test(block)) throw new Error(`${id} missing ${key}`);
      block = block.replace(re, `"${key}": "not_disclosed"`);
    });
    src = src.slice(0, start) + block + src.slice(end);
  });
  return src;
}

function patchFacts(src) {
  Object.entries(WITHDRAW).forEach(([id, keys]) => {
    const marker = `'${id}': {`;
    const start = src.indexOf(marker);
    if (start < 0) throw new Error('missing facts ' + id);
    const next = src.indexOf('\n    \'', start + marker.length);
    const end = next === -1 ? src.indexOf('\n  }', start) : next;
    let block = src.slice(start, end);
    keys.forEach((key) => {
      const factKey = FACT_KEY[key];
      if (block.includes(`${factKey}:`)) return;
      if (!block.includes('learnDocUrl:')) {
        throw new Error(`${id} has no learnDocUrl insertion point`);
      }
      block = block.replace(
        /(\n\s*)learnDocUrl:/,
        `$1${factKey}: 'NOT_DISCLOSED',$1learnDocUrl:`
      );
    });
    src = src.slice(0, start) + block + src.slice(end);
  });
  return src;
}

fs.writeFileSync(FACTS, patchFacts(fs.readFileSync(FACTS, 'utf8')));
fs.writeFileSync(DATA, patchData(fs.readFileSync(DATA, 'utf8')));
console.log('withdrew', Object.keys(WITHDRAW).length, 'devices');
