/** Registro único das sete áreas, nomenclatura aprovada no prompt mestre. */
const cards = [
  ["01","Licenciamento ambiental","Acompanhamento técnico para compreender etapas e exigências do licenciamento ambiental, conforme a atividade e o empreendimento."],
  ["02","Estudos ambientais","Estudos e levantamentos para conhecer as condições ambientais de uma área e apoiar decisões sobre empreendimentos."],
  ["03","Laudos técnicos","Laudos para caracterizar aspectos ambientais, geológicos e hidrogeológicos, conforme a necessidade de avaliação da área."],
  ["04","Defesas e assistência técnica","Análise técnica de questões ambientais em procedimentos administrativos, respeitando o escopo da demanda e a competência profissional."],
  ["05","Áreas contaminadas","Avaliações e apoio técnico para identificar possíveis passivos ambientais e compreender as condições de áreas, conforme o escopo definido."],
  ["06","Assessoria ao poder público","Assessoria técnica para analisar demandas ambientais de prefeituras e consórcios intermunicipais, conforme as necessidades institucionais."],
  ["07","Audiências e órgãos ambientais","Apoio técnico para compreender questões ambientais em audiências públicas e na interlocução com órgãos ambientais."],
];
export const serviceCards = Object.freeze(cards.map(([num,title,description])=>Object.freeze({num,title,description,slug:"s"+num,media:["litoral","floresta","montanhas","drone","paisagem","territorio","litoral"][Number(num)-1]})));
