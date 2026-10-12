// Bind a literal to its actual page header, including recorded redirects.
const fs=require('node:fs');
const compact=s=>String(s).replace(/L\d+(?:@P[\d-]+)?:/g,'').replace(/\s/g,'');
function strings(value){if(typeof value==='string')return[value];if(value&&typeof value==='object')return Object.values(value).flatMap(strings);return[];}
function blocks(file){const raw=fs.readFileSync(file,'utf8');let object;try{object=JSON.parse(raw);}catch{}
 if(object?.method?.startsWith('web tool numbered text extraction')&&Array.isArray(object.lines))return[{urls:[...object.sourceHeader.matchAll(/\((https:\/\/[^\s)]+)\)/g)].map(m=>m[1]),text:object.lines.join('\n')}];
 if(object?.method?.startsWith('Exact numbered primary-source text')&&object.sources)return Object.entries(object.sources).flatMap(([url,list])=>list.filter(c=>Array.isArray(c.lines)).map(c=>({urls:[url],text:c.lines.join('\n')})));
 if(raw.startsWith('https://')&&raw.slice(0,400).includes('当次网页工具返回的精确片段'))return[{urls:[raw.split('\n')[0]],text:raw}];
 const found=[];
 for(const text of object?strings(object):[raw]){
  const starts=[...text.matchAll(/^([^\n]+?)\((https:\/\/[^\s\n]+)\)\s*\n/gm)].filter(m=>/Source:/.test(text.slice(m.index+m[0].length,m.index+m[0].length+600))&&/Total lines:|Content type:/.test(text.slice(m.index+m[0].length,m.index+m[0].length+600)));
  starts.forEach((m,i)=>{const part=text.slice(m.index,starts[i+1]?.index),header=part.slice(0,1800),urls=[m[2],...[...header.matchAll(/Redirected to URL: (https:\/\/[^;\s]+)/g)].map(m=>m[1]),...[...header.matchAll(/Source:\s*(?:open|find|click)\(\{[^\n]*?"(?:ref_id|url)"\s*:\s*"(https:\/\/[^"\n]+)"/g)].map(m=>m[1])];found.push({urls,text:part});});
 }
 return found;
}
function matches(read){const lines=read.literalText.split('\n').filter(x=>x.trim()).map(compact);return blocks(read.path).some(b=>b.urls.includes(read.sourceUrl)&&lines.every(l=>compact(b.text).includes(l)));}
module.exports={compact,strings,blocks,matches};
