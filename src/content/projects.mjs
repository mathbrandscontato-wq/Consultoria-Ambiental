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
 {id:'litoral',title:'Litoral',alt:'Vista aérea de costa rochosa com vegetação e mar'},
 {id:'floresta',title:'Floresta',alt:'Vista aérea de vegetação florestal'},
 {id:'montanhas',title:'Montanhas',alt:'Relevo montanhoso com vegetação verde'},
 {id:'drone',title:'Observação do território',alt:'Drone em voo próximo à vegetação'},
 {id:'paisagem',title:'Paisagem natural',alt:'Campo aberto e árvores sob céu nublado'},
 {id:'territorio',title:'Território',alt:'Paisagem verde iluminada pelo sol'}
].map(x=>Object.freeze({...x,state:'editorial',category:'Imagem ilustrativa'})));
