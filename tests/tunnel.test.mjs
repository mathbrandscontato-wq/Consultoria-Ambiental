import test from 'node:test';
import assert from 'node:assert/strict';
import { cardState,titleState } from '../src/scripts/tunnel-model.mjs';
test('camera title approaches the viewer and disappears at the end',()=>{
 assert.equal(titleState(0).scale,.7);
 assert.equal(titleState(.5).scale,1);
 assert.equal(titleState(1).scale,1.35);
 assert.equal(titleState(.5).opacity,1);
 assert.equal(titleState(1).opacity,0);
});
test('cards approach in staggered order and fade before the section ends',()=>{
 for(const mobile of [true,false])for(let i=0;i<6;i++) {
  const start=i/6*.45;
  assert.equal(cardState(start,i,6,mobile).opacity,0);
  assert.equal(cardState(start+.275,i,6,mobile).opacity,1);
  assert.equal(cardState(1,i,6,mobile).opacity,0);
  assert.ok(cardState(start+.4,i,6,mobile).z>cardState(start+.2,i,6,mobile).z);
 }
 assert.ok(cardState(.2,0,6).z>cardState(.2,4,6).z);
});
