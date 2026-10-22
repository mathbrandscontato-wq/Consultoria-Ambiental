/**
 * V1.2 → dados de implementação. Referência de estrutura, NÃO copy aprovada.
 * Fatos/serviços descritos no briefing devem receber texto final validado pela Vic.
 */
export const CONTRACT_VERSION = "G5-2026-10-21";
export const ROUTE_MODULES = Object.freeze({
  "/": Object.freeze(["H01","H02","H03","H04","H05","H06","H07","H08","H09"]),
  "/servicos": Object.freeze(["S01","S02","S03","S04","S05","S06","S07","S08","S09","S10","S11"]),
  "/sobre": Object.freeze(["A01","A02","A03","A04","A05","A06"]),
  "/contato": Object.freeze(["C01","C02","C03","C04","C05"])
});
export const SERVICES = Object.freeze([
  { id:"SRV-01", module:"S02", title:"Licenciamento ambiental", review:"technical" },
  { id:"SRV-02", module:"S03", title:"Estudos ambientais", review:"technical" },
  { id:"SRV-03", module:"S04", title:"Laudos", review:"technical" },
  { id:"SRV-04", module:"S05", title:"Defesas administrativas e assistência técnica", review:"legal-boundary" },
  { id:"SRV-05", module:"S06", title:"Áreas contaminadas e due diligence ambiental", review:"technical" },
  { id:"SRV-06", module:"S07", title:"Assessoria técnica a prefeituras e consórcios intermunicipais", review:"technical" },
  { id:"SRV-07", module:"S08", title:"Apoio em audiências públicas e relacionamento com órgãos ambientais", review:"technical" }
].map(Object.freeze));
export const CONDITIONAL_MODULES = Object.freeze(["H08","S10"]);
export const APPROVED_ART_DIRECTION = Object.freeze({
  hero:"A",
  heroDesktop:"03_Estudos_Visuais/05_Hero_A_1440.svg",
  heroMobile:"03_Estudos_Visuais/06_Hero_A_390.svg",
  fontFamily:"Avenir",
  ctaText:"Solicitar proposta",
  ctaHref:"/contato"
});
export const EDITORIAL_STATUS = Object.freeze({
  copyApproved:false,
  contactDetailsApproved:false,
  serviceDetailsApproved:false,
  credentialsApproved:false,
  casesApproved:false,
  photographyLicensed:false,
  formDestinationApproved:false
});
