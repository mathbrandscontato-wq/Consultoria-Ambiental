import { mkdir, readFile, rm, writeFile, cp } from "node:fs/promises";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { routes } from "../src/site.mjs";
import { renderPage } from "../src/lib/render.mjs";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const dist = join(root, "dist");
await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, "styles"), { recursive: true });

for (const style of ["tokens.css", "base.css", "hero-a.css", "sections.css", "motion.css", "refinement.css", "footer.css", "unified.css", "about.css", "services.css", "atlas.css", "about-tunnel.css", "v5-editorial.css", "responsive-type.css"]) {
  const content = await readFile(join(root, "src/styles", style), "utf8");
  await writeFile(join(dist, "styles", style), content, "utf8");
}
await mkdir(join(dist, "scripts"), { recursive: true });
await writeFile(join(dist, "scripts", "mobile-menu.mjs"),
  await readFile(join(root, "src/scripts/mobile-menu.mjs"), "utf8"), "utf8");
await writeFile(join(dist, "scripts", "motion.mjs"), await readFile(join(root, "src/scripts/motion.mjs"), "utf8"));
await cp(join(root, "public/media"), join(dist, "media"), {recursive:true});
await writeFile(join(dist,"scripts/media.mjs"), await readFile(join(root,"src/scripts/media.mjs"),"utf8"));
for (const route of routes) {
  if (route.slug && !/^[a-z0-9-]+$/.test(route.slug)) throw new Error("Unsafe route slug");
  const out = route.slug ? join(dist, route.slug) : dist;
  await mkdir(out, { recursive: true });
  await writeFile(join(out, "index.html"), renderPage(route), "utf8");
}
console.info(`Arquivos estáticos gerados: ${routes.length} rotas, sem deploy.`);

await writeFile(join(dist,"scripts/tunnel.mjs"), await readFile(join(root,"src/scripts/tunnel.mjs"),"utf8"));

await writeFile(join(dist,"scripts/refinement.mjs"), await readFile(join(root,"src/scripts/refinement.mjs"),"utf8"));
await writeFile(join(dist,"scripts/tunnel-model.mjs"), await readFile(join(root,"src/scripts/tunnel-model.mjs"),"utf8"));

await writeFile(join(dist,"scripts/footer.mjs"), await readFile(join(root,"src/scripts/footer.mjs"),"utf8"));

await writeFile(join(dist,"scripts/map-pan.mjs"), await readFile(join(root,"src/scripts/map-pan.mjs"),"utf8"));

for(const name of ['unified.mjs','circular-gallery.mjs','about.mjs','services.mjs','about-tunnel.mjs']) await cp(join(root,'src/scripts',name),join(dist,'scripts',name));
