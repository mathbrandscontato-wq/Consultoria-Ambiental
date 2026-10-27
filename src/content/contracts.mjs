import { serviceCards } from './services.mjs';
/**
 * V1.2 → dados de implementação. Referência de estrutura, NÃO copy aprovada.
 * Fatos/serviços descritos no briefing devem receber texto final validado pela Vic.
 */
export const CONTRACT_VERSION = "G6-2026-10-25";
export const ROUTE_MODULES = Object.freeze({
  "/": Object.freeze(["H01","H02","H03","H04","H05","H06","H07","H08","H09"]),
  "/servicos": Object.freeze(["S01","S02","S03","S04","S05","S06","S07","S08","S09","S10","S11"]),
  "/sobre": Object.freeze(["A01","A02","A03","A04","A05","A06"]),
  "/contato": Object.freeze(["C01","C02","C03","C04","C05"]),
  // Extensão autorizada em 25/10/2026, não presente como rota no escopo V1.2.
  "/projetos": Object.freeze(["P01","P02"])
});
// Legacy module IDs retained; public service names derive from the current single registry.
export const SERVICES = Object.freeze(serviceCards.map((service,index)=>Object.freeze({id:'SRV-'+service.num,module:'S'+String(index+2).padStart(2,'0'),title:service.title,review:index===3?'legal-boundary':'technical'})));
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
