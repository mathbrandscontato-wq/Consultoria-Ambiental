# PR-02 | Design-to-code | Hero A G2 V5 (21/10/2026)

Status: IMPLEMENTAÇÃO EM REVISÃO. Nenhuma publicação nem homologação visual declarada.

## Fontes verificadas
- Handoff ZIP SHA-256: abd38454f26166b460d64df863bd97f01b4e7301e0dd4f92bfe05ff2ebe63113; manifesto 23/23.
- G2 V5 ZIP interno SHA-256: 4968b1a66fbcd37b972dc3372cbdae1922eea81cf6d72173ed8954d2fffc95b1; manifesto 50/50.
- Hero A desktop: 03_Estudos_Visuais/05_Hero_A_1440.svg (1440 × 900).
- Hero A mobile: 03_Estudos_Visuais/06_Hero_A_390.svg (390 × 860).
- Adaptações: 07_Responsivo/Hero_A_768.svg e Hero_A_360.svg.
- Geometria: 09_MEDIDAS_EXTRAIDAS_DOS_SVG.json, SHA-256 17abb42a8c681b9fa0c99cfcb145e30e7f9164170057be3e8b3eefd514a7146e.

## Medidas dos originais (dados medidos, não CSS fixo)
| Viewport | Canvas | Área verde | Campo de mídia | AMBIENTAL |
|---|---|---|---|---|
| 1440 | 1440×900 | x20 y20 1400×856 | x675 y118 704×602 | 185px, tracking -10 |
| 390 | 390×860 | x12 y12 366×833 | x25 y310 340×353 | 53px, tracking -3.4 |
| 768 | 768×870 | consultar SVG | composição mobile/tablet própria | responsivo |
| 360 | 360×780 | consultar SVG | composição mobile própria | responsivo |

## Implementação restrita ao aprovado
- Hero A, Inter como família preferencial, paleta oficial e CTA Solicitar proposta → /contato/.
- Home recebe o Hero A. Outras rotas permanecem como scaffold até layouts aprovados.
- Navegação mobile por details com Esc e retorno de foco; sem dependências ou tracking.
- Topografia provisória desenhada em SVG via código, sem reutilizar material de terceiros.
- A área de imagem permanece claramente identificada como fotografia pendente; NÃO é case, obra ou resultado executado.
- Logotipo no código é somente marcador tipográfico temporário, **não substituto aprovado da assinatura oficial**. O raster oficial não foi publicado neste repositório público sem permissão específica.
- Os arquivos de Inter licenciados ainda não foram incorporados, portanto fallback não é homologação tipográfica.
- Textos da arte são provisórios e sujeitos à validação por Vic.
- Não incorporar Hero B, H08 cases, fotografias não licenciadas, formulário com sucesso fictício ou novas rotas.

## Aceitação e bloqueios
Verificar 1440, 390, 768 e 360 em navegador real: hierarquia, proporção, header, CTA, nenhum texto/controle cortado ou horizontal overflow, contraste, foco, menu com teclado, preferências de movimento reduzido. Contrastar screenshots com os PNGs G2 V5 correspondentes e registrar diferenças antes de declarar fidelidade.

A CI testa código e HTML estático, **não substitui QA de navegador nem aprovação visual de Matheus**. Foto licenciada, logo oficial, WOFF2, texto final e as demais telas ainda são gates.
