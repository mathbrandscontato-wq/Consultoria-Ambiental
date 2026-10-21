import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { SERVICES, ROUTE_MODULES, CONDITIONAL_MODULES, APPROVED_ART_DIRECTION, EDITORIAL_STATUS } from "../src/content/contracts.mjs";
test("matriz V1.2 mantém exatamente 31 módulos nas quatro rotas",()=>{
  const ids=Object.values(ROUTE_MODULES).flat();
  assert.equal(ids.length,31);
  assert.equal(new Set(ids).size,31);
  assert.deepEqual(Object.keys(ROUTE_MODULES),["/","/servicos","/sobre","/contato"]);
});
test("sete serviços reais, IDs únicos e sem promessas jurídicas inventadas",()=>{
  assert.deepEqual(SERVICES.map(s=>s.id),["SRV-01","SRV-02","SRV-03","SRV-04","SRV-05","SRV-06","SRV-07"]);
  assert.equal(new Set(SERVICES.map(s=>s.module)).size,7);
  assert.equal(SERVICES[3].review,"legal-boundary");
  assert.deepEqual(CONDITIONAL_MODULES,["H08","S10"]);
});
test("só Hero A e Inter estão formalmente selecionados",()=>{
  assert.equal(APPROVED_ART_DIRECTION.hero,"A");
  assert.equal(APPROVED_ART_DIRECTION.fontFamily,"Inter");
  assert.equal(APPROVED_ART_DIRECTION.ctaHref,"/contato");
  assert.ok(Object.values(EDITORIAL_STATUS).every(v=>v===false));
});
test("gate de publicação devolve saída negativa controlada",()=>{
  const r=spawnSync(process.execPath,["scripts/release-gate.mjs","--release"],{encoding:"utf8"});
  assert.equal(r.status,2);
  assert.match(r.stdout,/"publication": "BLOCKED"/);
  assert.match(r.stderr,/NÃO AUTORIZADO/);
});
