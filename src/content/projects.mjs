/**
 * Cadastro de projetos reais.
 * Preencher SOMENTE com material autorizado pela Vic e pelos clientes.
 * Sem imagens genéricas apresentadas como serviços prestados.
 */
export const approvedProjects = Object.freeze([]);
export const reviewSlots = Object.freeze(
  Array.from({ length: 6 }, (_, i) =>
    Object.freeze({ id: `slot-${String(i + 1).padStart(2, "0")}`, state: "awaiting-approval" })
  )
);
