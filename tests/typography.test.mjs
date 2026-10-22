import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { renderPage } from "../src/lib/render.mjs";
import { routes } from "../src/site.mjs";
import { APPROVED_ART_DIRECTION } from "../src/content/contracts.mjs";
const css = await readFile(new URL("../src/styles/tokens.css",import.meta.url),"utf8");

test("Avenir é família principal em todos os templates",()=>{
  assert.equal(APPROVED_ART_DIRECTION.fontFamily,"Avenir");
  assert.match(css,/--font-interface:\s*"Ykeizumi Avenir"/);
  assert.match(css,/@font-face/);
  for(const weight of ["300","350","400","500","600","700","800","900"]){
    assert.match(css,new RegExp("font-weight:\\s*"+weight+";"));
  }
  assert.match(css,/src:\s*local\(/);
});
test("Remover Inter como stylesheet obrigatório e evitar redistribuição binária",()=>{
  assert.doesNotMatch(css,/https:\/\//);
  assert.doesNotMatch(css,/\.ttf|\.woff2|\.otf/);
  for(const route of routes){
    const html=renderPage(route);
    assert.doesNotMatch(html,/rsms\.me|inter\/inter\.css|fonts\.googleapis\.com/);
    assert.match(html,/styles\/tokens\.css/);
  }
});
