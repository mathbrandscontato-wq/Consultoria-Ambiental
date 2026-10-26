import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const base=new URL("../", import.meta.url);
const prod=JSON.parse(await readFile(new URL("docs/GATES.json",base),"utf8"));
const preview=JSON.parse(await readFile(new URL("docs/PREVIEW_GATES.json",base),"utf8"));
const pkg=JSON.parse(await readFile(new URL("package.json",base),"utf8"));
test("homologação autorizada não habilita produção",()=>{
  assert.equal(prod.site_publication_allowed,false);
  assert.equal(preview.preview_intent_authorized,true);
  assert.equal(preview.site_production_authorized,false);
  assert.equal(preview.custom_domain,"yekeizumi.mathbrands.com.br");
  assert.equal(preview.wordpress_phase,"later");
});
test("build de revisão utiliza modo noindex com verificação independente",()=>{
  assert.equal(pkg.scripts["build:preview"],"node scripts/build.mjs --preview");
  assert.equal(pkg.scripts["check:preview"],"node scripts/check-preview.mjs");
});
