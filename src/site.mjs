/** Metadados técnicos, não equivalem ao conteúdo editorial aprovado. */
export const project = Object.freeze({
  name: "Ykeizumi Consultoria Ambiental",
  locale: "pt-BR",
  cta: "Solicitar proposta",
  status: "Fundação técnica: composição e conteúdo definitivos pendentes do G2 V5",
});

export const routes = Object.freeze([
  Object.freeze({ slug: "", label: "Início", title: "Página inicial", slot: "hero-a" }),
  Object.freeze({ slug: "servicos", label: "Serviços", title: "Serviços", slot: "services" }),
  Object.freeze({ slug: "sobre", label: "Sobre", title: "Sobre", slot: "about" }),
  Object.freeze({ slug: "contato", label: "Contato", title: "Contato", slot: "contact" }),
]);

export const routeHref = (route, prefix = "./") =>
  prefix + (route.slug ? route.slug + "/" : "");
