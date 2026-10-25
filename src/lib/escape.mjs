/** Centraliza o escape HTML do conteúdo dinâmico usado em previews. */
export const escapeHtml = input => String(input).replace(/[&<>"']/g, char => ({
  "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
})[char]);
