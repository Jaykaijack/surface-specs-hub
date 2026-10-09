const fs=require('fs'),assert=require('assert/strict');
const root=require('path').resolve(__dirname,'../../..');
const data=require(root+'/js/surface-data');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let count=0;
for(const d of data.devices)for(const c of d.dataConflicts||[]){
 const field=data.specGroups.flatMap(g=>g.fields||[]).find(f=>f.key===c.field);
 const label=field?(field.label||field.name||c.field):c.field;
 const html=fs.readFileSync(root+'/dist/site/products/'+d.id+'/index.html','utf8');
 assert.ok(html.includes('<th scope="row">'+escape(label)+'</th><td>待核验<small'),d.id+':'+c.field);
 count++;
}
console.log('Static conflict mask PASS: '+count+' explicit conflicts hidden from generated product rows');
