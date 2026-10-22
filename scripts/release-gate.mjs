import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, join } from "node:path";
const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const gates = JSON.parse(await readFile(join(root,"docs/GATES.json"),"utf8"));
const unsatisfied = Object.entries(gates.pending).map(([key,owner])=>({key,owner}));
if (gates.site_publication_allowed !== false) throw new Error("Gate doc inconsistent: publication unexpectedly allowed.");
if (!gates.verified.hero_a_direction || !gates.verified.avenir_font_choice) throw new Error("Previously approved art direction missing.");
const releaseMode = process.argv.includes("--release");
console.log(JSON.stringify({
 scope: releaseMode ? "release" : "development",
 development: "READY_FOR_CONTROLLED_WORK",
 publication: "BLOCKED",
 open_gates: unsatisfied
},null,2));
if (releaseMode) {
  console.error("Release/deploy NÃO AUTORIZADO: aprovação visual, conteúdo, segurança, QA e hospedagem pendentes.");
  process.exitCode = 2;
}
