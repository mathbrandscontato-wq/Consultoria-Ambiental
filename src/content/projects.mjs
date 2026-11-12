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

// Fotografias fornecidas e autorizadas por Matheus em 26/10/2026, apenas uso editorial.
export const editorialPhotos = Object.freeze([
 {"id":"ykeizumi-vila-costeira","title":"Território costeiro","alt":"Vista aérea de área residencial entre a vegetação e o litoral, com faixa de mar ao fundo"},
 {"id":"ykeizumi-floresta-trilhos","title":"Vegetação e infraestrutura","alt":"Vista aérea de mata, campo rural e linha férrea na paisagem"},
 {"id":"ykeizumi-estrada-vegetacao","title":"Uso e ocupação do solo","alt":"Vista aérea vertical de estrada entre pastagem e vegetação florestal"},
 {"id":"ykeizumi-fauna-macaco","title":"Fauna nativa","alt":"Macaco-prego entre folhas e galhos de vegetação"},
 {"id":"ykeizumi-avifauna","title":"Avifauna","alt":"Ave de penas azul-escuras e amarelas pousada em um galho"},
 {"id":"litoral","title":"Paisagem litorânea","alt":"Vista aérea de costa rochosa, vegetação e mar"}
].map(x=>Object.freeze({...x,state:'editorial',category:'Imagem ilustrativa'})));
