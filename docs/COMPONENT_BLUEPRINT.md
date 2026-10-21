# YKEIZUMI | Blueprint por componente (G5)

Base: V1.2 de 18/10/2026, G2 V5, decisão Hero A e Inter em 21/10/2026.

| Módulo | Papel semântico/visual | Fonte | Interação/estado | Status |
|---|---|---|---|---|
| H01 | header, logo oficial, navegação e CTA | Hero A + V1.2 | navegação, foco, `aria-current`, menu mobile e Escape | **Protótipo**, logo pendente |
| H02 | monumental Hero A, topografia, campo de fotografia, CTA | 05 Hero A 1440 / 06 Hero A 390 + 768/360 | botão para /contato, leitura responsiva, motion reduzido | **Código inicial na PR-02, fidelidade pendente** |
| H03 | resumo de soluções por necessidades, não 7 cards homogêneos | Home WF + V1.2 | destinos para Serviços/grupos reais | **Blueprint, aprovação visual pendente** |
| H04 | segmentos: incorporação/construção, indústria, poder público, advogados, empresas de porte | Home WF + V1.2 | texto revisado, nenhuma pretensão jurídica | **Blueprint, Vic pendente** |
| H05 | experiência nos lados de elaboração/análise; ética de atuação | Home WF + V1.2 | claim preciso, sem alegação de influência | **Blueprint, revisão técnica pendente** |
| H06 | Lara Yumi, perfil e CTA Sobre | Home WF + V1.2 | credenciais e foto autorizadas | **Blueprint, revisão técnica/visual pendente** |
| H07 | Joinville, Norte e Litoral SC | V1.2 | informação acessível sem expansão geográfica | **Blueprint, redação pendente** |
| H08 | prova social, cases | G2 estudo Projetos + V1.2 | **Ocultar em release se não houver autorização de cases**; não implementar carrossel sem aceite | **CONDICIONAL** |
| H09 | convite final para proposta | Home WF + V1.2 | /contato | **Blueprint, layout pendente** |
| S01 | intro Serviços | Serviços WF | contexto claro para não especialistas | **Wireframe** |
| S02–S08 | 7 grupos reais SRV-01..07 | Serviços WF + V1.2 | âncoras, CTAs, descrição validada, sem promessas | **Wireframe / textos técnicos pendentes** |
| S09 | ajuda a quem não sabe escolher | Serviços WF | CTA /contato, sem quiz | **Wireframe** |
| S10 | FAQ técnico | V1.2 | **Só se Vic aprovar** | **CONDICIONAL** |
| S11 | CTA final Serviços | Serviços WF | /contato | **Wireframe** |
| A01–A06 | institucional, Lara, experiência dual, atendimento híbrido, região, CTA | V1.2 | navegação e leitura linear | **SEM UI FINAL APROVADA** |
| C01–C05 | proposta, formulário, canais, região e privacidade | V1.2 | validação, erro, envio real condicionado; sem falso sucesso | **SEM UI FINAL/BACKEND** |

## Contratos de dados
- `Hero`: `variant=A`, `title`, `subtitle`, `description`, `media`, `ctaHref=/contato`, `approvedMedia=false` no preview.
- `ServiceSection`: `id`, `title`, `shortExplanation`, `scope`, `technicalReview`, `ctaHref`. Títulos somente de fonte do briefing; campos ausentes não simulados.
- `TechnicalProfile`: `name=Lara Yumi`, `bio`, `qualifications`, `photo`, `verification`; não renderizar credenciais desconhecidas.
- `Contact`: canal visível apenas com URI oficial confirmada. Evitar números/e-mails de exemplo.
- `Form`: somente em homologação controlada depois de definir campos/destinatário; estados `idle`, `invalid`, `pending`, `confirmed`, `failed`, `unavailable`. No preview, `unavailable`.
- `Case`: somente com autorização específica de nome/imagem/projeto/resultado. Se nenhum, H08 deve ficar oculto em release.

## Comportamento responsivo e acessibilidade
Viewport alvo 1440, 390, 768 e 360px. Layout de mobile independente do desktop reduzido, sem cortes. Cabeçalho com botão 44×44 mínimo e navegação por teclado. `prefers-reduced-motion`. Foco visível. Imagens com alt sem ficção. Nenhuma altura fixa deve cortar títulos/CTA. Confirmar contrastes WCAG 2.2 AA conforme estado de fundo.

## Diferença entre diretriz e aceite
Consolidar tokens visuais não valida todos os layouts; documentação, implementação de PR e CI verde não substituem o aceite visual do Matheus nem o conteúdo validado pela Vic.
