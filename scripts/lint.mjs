import { readdir, readFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
async function collect(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...await collect(path));
    else if (entry.name.endsWith(".mjs")) found.push(path);
  }
  return found;
}
const files = [...await collect(join(root, "src")), ...await collect(join(root, "scripts")), ...await collect(join(root, "tests"))];
for (const file of files) execFileSync(process.execPath, ["--check", file], { stdio: "pipe" });
const pkg = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
if (Object.keys(pkg.dependencies ?? {}).length || Object.keys(pkg.devDependencies ?? {}).length) throw new Error("Dependências adicionadas sem gate arquitetural");
console.info(`Lint de sintaxe OK: ${files.length} módulos; zero dependências.`);
