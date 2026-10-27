import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const source=await readFile(new URL('../src/scripts/motion.mjs',import.meta.url),'utf8');
for(const reduced of [true,false]) test(`motion initializes without observers/animation support (reduce=${reduced})`,()=>{
  let mutations=0;
  const document={querySelectorAll:()=>[],createTreeWalker:()=>{mutations++;throw Error('Should not split without animation support');}};
  const context={document,matchMedia:()=>({matches:reduced,addEventListener(){}}),Element:{prototype:{}},window:{},Set,Map};
  vm.runInNewContext(source,context);
  assert.equal(mutations,0);
});
