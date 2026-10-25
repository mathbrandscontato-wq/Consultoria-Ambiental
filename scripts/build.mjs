import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { routes } from "../src/site.mjs";
import { renderPage } from "../src/lib/render.mjs";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const dist = join(root, "dist");
await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, "styles"), { recursive: true });

for (const style of ["tokens.css", "base.css", "hero-a.css", "sections.css"]) {
  const content = await readFile(join(root, "src/styles", style), "utf8");
  await writeFile(join(dist, "styles", style), content, "utf8");
}
await mkdir(join(dist, "scripts"), { recursive: true });
await writeFile(join(dist, "scripts", "mobile-menu.mjs"),
  await readFile(join(root, "src/scripts/mobile-menu.mjs"), "utf8"), "utf8");
for (const route of routes) {
  if (route.slug && !/^[a-z0-9-]+$/.test(route.slug)) throw new Error("Unsafe route slug");
  const out = route.slug ? join(dist, route.slug) : dist;
  await mkdir(out, { recursive: true });
  await writeFile(join(out, "index.html"), renderPage(route), "utf8");
}
console.info(`Arquivos estáticos gerados: ${routes.length} rotas, sem deploy.`);
