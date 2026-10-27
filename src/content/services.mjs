/** Registro único das sete áreas, nomenclatura aprovada no prompt mestre. */
const cards = [
  ["01","Licenciamento ambiental","Acompanhamento técnico das etapas e exigências do licenciamento ambiental, conforme o empreendimento."],
  ["02","Estudos ambientais","Estudos e levantamentos que apoiam a compreensão do território e dos impactos de cada projeto."],
  ["03","Laudos técnicos","Avaliação e caracterização de aspectos ambientais, geológicos e hidrogeológicos."],
  ["04","Defesas e assistência técnica","Apoio técnico especializado em procedimentos administrativos e demandas periciais, dentro da competência profissional."],
  ["05","Áreas contaminadas","Avaliações ambientais e apoio técnico em processos de identificação de passivos e due diligence."],
  ["06","Assessoria ao poder público","Apoio técnico a prefeituras e consórcios intermunicipais em demandas ambientais."],
  ["07","Audiências e órgãos ambientais","Apoio técnico em audiências públicas e na interlocução sobre requisitos ambientais."],
];
export const serviceCards = Object.freeze(cards.map(([num,title,description])=>Object.freeze({num,title,description,slug:"s"+num,media:["litoral","floresta","montanhas","drone","paisagem","territorio","litoral"][Number(num)-1]})));
