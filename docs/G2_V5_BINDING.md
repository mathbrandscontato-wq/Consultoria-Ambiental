# Matriz vinculante | G2 V5 → G5 | 21/10/2026

**Fonte visual ORIGINAL LOCALIZADA E VERIFICADA** no pacote `Ykeizumi_Handoff_Codex_GitHub_First(1).zip`.
SHA-256 do handoff: `abd38454f26166b460d64df863bd97f01b4e7301e0dd4f92bfe05ff2ebe63113`.
SHA-256 do ZIP visual interno `90_FONTES_ORIGINAIS/Ykeizumi_G2_V5_Pacote_Completo.zip`: `4968b1a66fbcd37b972dc3372cbdae1922eea81cf6d72173ed8954d2fffc95b1`.
Integridade: 23/23 itens do manifesto do handoff e 50/50 itens do manifesto G2 V5 verificados; ambos os ZIPs sem corrupção.

## Hierarquia de aprovação
- Decisão EXPRESSA posterior: **Hero A aprovado** e **Inter aprovada para o site**. Nunca incorporar Hero B.
- G2 V5 inclui estudos conceituais estáticos. Home/Serviços são *wireframes*, não telas finais visualmente homologadas. Sobre/Contato não têm telas finais de alta fidelidade. **Não estender aprovação do Hero A a outras áreas**.
- Identidade oficial: Kit da Marca V2; fonte/lettering do logo preservados. Código não pode recriar logotipo.
- Fonte funcional: Planejamento Estrutural V1.2; fatos, credenciais, contato e linguagem precisam de validação Vic.

## Vinculação de referência (caminhos dentro do ZIP G2 V5)
| ID | Destino | Arquivo SVG | SHA-256 do SVG | Estado |
|---|---|---|---|---|
| H02/HA-1440 | Home Hero desktop | `03_Estudos_Visuais/05_Hero_A_1440.svg` | `bcb3777d4ac04f7671580c051da3eb9776aa49155e432ccc57e23d3acfe399c2` | **APROVADO: COMPOSIÇÃO** |
| H02/HA-390 | Home Hero mobile | `03_Estudos_Visuais/06_Hero_A_390.svg` | `fb7c16462319d4d6dca9b13e3fe733f680950eccab19b11b3a30a3d9f5895426` | **APROVADO: REFERÊNCIA MOBILE** |
| H02/HA-768 | Hero tablet | `07_Responsivo/Hero_A_768.svg` | `645181140a992aded994e75bd195856139b137ea9577e1d58f0f3173458324de` | **ESTUDO DE ADAPTAÇÃO** |
| H02/HA-360 | Hero small mobile | `07_Responsivo/Hero_A_360.svg` | `d7e47d7943ffdb15be48e1338edcfa90bbd81744ae0635b3b790516fb6de5845` | **ESTUDO DE ADAPTAÇÃO** |
| H01-H09 | Home arquitetura | `02_Wireframes/01_Home_1440.svg`, `02_Home_390.svg` | `8cbb3d121583e88bd1ba41682bd9735d6c71cc113039b0b53a3bc8b8b7467601`, `d3fe5ad06ad09bbc34bbd6c32a2377afa75c1bea35d21717e39cdd196a412a4b` | **WIREFRAME, NÃO HOMOLOGAÇÃO FINAL** |
| S01-S11 | Serviços arquitetura | `02_Wireframes/03_Servicos_1440.svg`, `04_Servicos_390.svg` | `1595faea985a03a088086c433643b845b62a9205e9b6d3400f72d7a415541589`, `488118a993279eaac052c5af1a8aaa8bd2ed2ebdf50f325f9384d2163ef720b9` | **WIREFRAME, NÃO HOMOLOGAÇÃO FINAL** |
| H08 | Projetos condicional | `03_Estudos_Visuais/09_Projetos_1440.svg`, `10_Projetos_390.svg` | `054b4b650cc201bfd0d3837b3ad56691c0a35e45d9d2ae04cc09cd7028c4d0f9`, `5b608bb924ba0635699afdfcf9e44988ab7b2b348e985d5d5bfcdcc29242f985` | **NÃO AUTORIZADO COMO CASE REAL** |
| A01-A06 | Sobre | nenhum G3 final | — | **REVISÃO VISUAL PENDENTE** |
| C01-C05 | Contato | nenhum G3 final | — | **REVISÃO VISUAL E BACKEND PENDENTES** |

## Geometria original, hipótese de implementação, não CSS rígido
A fonte `09_MEDIDAS_EXTRAIDAS_DOS_SVG.json` (SHA `17abb42a8c681b9fa0c99cfcb145e30e7f9164170057be3e8b3eefd514a7146e`) documenta:
- Hero desktop `viewBox 0 0 1440 900`; base verde `x20 y20 w1400 h856`, campo de mídia `x675 y118 w704 h602`; lettering monumental `AMBIENTAL.` a **185px** na arte.
- Mobile 390 `viewBox 0 0 390 860`; base `x12 y12 w366 h833`, campo `x25 y310 w340 h353`; `AMBIENTAL.` a **53px** na arte e bloco secundário 31px.
- 360 e 768 incluem estudos de composição, não testes de browser. Nunca travar altura em viewport, perder CTA por overflow ou codificar todos os elementos com posicionamento absoluto.
- Imagem do campo visual ainda é **placeholder vetorial**. Fotografia provisória deve ter fonte/licença verificável; não simular cases.
- CTA `Solicitar proposta` → `/contato`; sem sucesso fictício de formulário.
- Estudar contraste, interações mobile, `prefers-reduced-motion`, performance e respeito a layout sem copiar referências Soltera/SureGuard.

## Restrições de repositório
O repositório atual é **PÚBLICO**. Não anexar ZIP integral, PDF interno, imagens pessoais, referências de terceiros, material protegido ou assets institucionais não liberados. Este arquivo guarda **nomes e hashes, não bytes**.
