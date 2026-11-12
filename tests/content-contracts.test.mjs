import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { SERVICES, ROUTE_MODULES, CONDITIONAL_MODULES, APPROVED_ART_DIRECTION, EDITORIAL_STATUS } from "../src/content/contracts.mjs";
test("revisão cliente apresenta apenas quatro rotas institucionais",()=>{
  const ids=Object.values(ROUTE_MODULES).flat();
  assert.equal(ids.length,29);
  assert.equal(new Set(ids).size,33);
  assert.deepEqual(Object.keys(ROUTE_MODULES),["/","/servicos","/sobre","/contato"]);
});
test("nove serviços reais, IDs únicos e revisão das fronteiras jurídicas",()=>{
  assert.deepEqual(SERVICES.map(s=>s.id),["SRV-01","SRV-02","SRV-03","SRV-04","SRV-05","SRV-06","SRV-07","SRV-08","SRV-09"]);
  assert.equal(new Set(SERVICES.map(s=>s.module)).size,9);
  assert.equal(SERVICES[6].review,"legal-boundary");
  assert.equal(SERVICES[7].review,"legal-boundary");
  assert.deepEqual(CONDITIONAL_MODULES,["C-FORM","REGION-MAP"]);
});
test("só Hero A e Avenir estão formalmente selecionados",()=>{
  assert.equal(APPROVED_ART_DIRECTION.hero,"A");
  assert.equal(APPROVED_ART_DIRECTION.fontFamily,"Avenir");
  assert.equal(APPROVED_ART_DIRECTION.ctaHref,"/contato");
  assert.ok(Object.values(EDITORIAL_STATUS).every(v=>v===false));
});
test("gate de publicação devolve saída negativa controlada",()=>{
  const r=spawnSync(process.execPath,["scripts/release-gate.mjs","--release"],{encoding:"utf8"});
  assert.equal(r.status,2);
  assert.match(r.stdout,/"publication": "BLOCKED"/);
  assert.match(r.stderr,/NÃO AUTORIZADO/);
});
