# YKEIZUMI | CHECKPOINT OPERACIONAL | 21/10/2026

**Etapa atual:** G5, prontidão para continuação da implementação controlada; **não é site final, nem publicação**. Repositório público `mathbrandscontato-wq/Consultoria-Ambiental`.

## Histórico GitHub First confirmado
- PR #1 G4 documentação: https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/pull/1
- PR #2 fundação estática: https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/pull/2
- PR #3 Hero A inicial: https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/pull/3
- PR #4 prontidão de implementação e QA: https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/pull/4
- **Todas abertas em DRAFT, não mescladas. Main não é o aplicativo. Nenhum deploy.**

## Decisões e fontes
- Hero A definitivamente aprovado; Hero B proibido; **Avenir agora aprovada**, substituindo a antiga escolha Inter.
- Handoff original SHA256 `abd38454f26166b460d64df863bd97f01b4e7301e0dd4f92bfe05ff2ebe63113`, manifesto 23/23.
- G2 V5 aninhado SHA256 `4968b1a66fbcd37b972dc3372cbdae1922eea81cf6d72173ed8954d2fffc95b1`, manifesto 50/50. Referências 1440/390/768/360 versionadas como hashes/caminhos em `docs/G2_V5_BINDING.md`, sem divulgar os arquivos internos.
- G4/Brandbook V2/Planejamento Estrutural V1.2 documentados. Cores oficiais e token semântico no código.

## Implementado no código do branch da PR #4
- 4 rotas estáticas; Home com composição Hero A inicial e contornos topográficos individualizados para quatro viewports; copy provisória. Header/menu/CTA navegáveis.
- Serviços, Sobre e Contato: apenas scaffold técnico, NÃO páginas finais; nenhum formulário ativo.
- Contratos de 31 módulos e 7 grupos de serviços, estados condicionais H08/S10.
- Zero dependências npm externas, CI sem deploy, release-gate bloqueado por padrão.

## QA observado
- CI anterior [#39698365141](https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/actions/runs/39698365141): lint, build, 11 testes, HTTP 200 em 4 rotas + 4 assets, 1440/390/768/360 Chrome sem overflow, screenshots em artefato. PASS técnico.
- Revisão lado a lado com as pranchas: correspondência estrutural melhorada; topografia redesenhada a partir de parâmetros G2; **aprovação visual final NÃO emitida**.
- Modificações de texto e documentação posteriores a esse CI exigem comprovação de nova execução para o head final.

## Pendências que impedem site final/G6/G7
1. Logo oficial e arquivos da fonte Inter integrados mediante verificação de licença/publicação no repo público.
2. Fotografia com licença, origem, enquadramento e crédito, sem insinuar projeto executado.
3. Homologação visual Matheus no Hero final e designs das demais seções Home/Serviços/Sobre/Contato.
4. Validação Vic para textos, experiência/credenciais de Lara, canais de contato e grupos de serviços.
5. Decisão sobre cases reais H08 e FAQ S10, backend/destinatário/política de privacidade; sem simular envio.
6. Compatibilidade da hospedagem e autorização específica de produção, **fora do escopo atual**.

## Próxima execução
Ler este checkpoint, `docs/CODEX_HANDOFF_G5.md`, `docs/QA_VISUAL_G2V5.md`, `docs/GATES.json` e apenas diff da PR. Rodar `npm run lint && npm run build && npm test && npm run check && npm run qa:browser`; comparar 4 screenshots com referências. Não abrir PR de publicação, não mesclar sem autorização. Decisões visuais novas ou conteúdo não confirmado → revisão com Matheus/Vic.

## PR-05 (21/10/2026) | Refinamento editorial
- Branch `feat/pr-05-refinamento-hero-editorial` baseada na PR-04, revisão em rascunho.
- Fotografia aérea provisória com licença Unsplash documentada; crédito ao fotógrafo e aviso explícito de não representar projeto executado. URL remota de preview não aprovada para produção.
- Tratamento de profundidade, contraste, recorte mobile, microinterações reversíveis e fonte Inter via stylesheet oficial opcional; auto-hospedagem ainda pendente.
- Mantidas apenas as rotas, Hero A, hierarquia e conteúdo de revisão aprovados; sem implementar seções posteriores ou alterar domínio/hospedagem.
- Executar GitHub Actions no commit final antes de declarar testes aprovados; capturas devem ser revisadas em 1440/768/390/360 por Matheus.

## Evidências do primeiro CI PR-05
- [Actions #39701526155](https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/actions/runs/39701526155), SHA `40aa5354b97f7cd159963b7d374483caaa60ec8e`: **SUCCESS**, 12/12 testes, 4/4 Chrome, HTTP 200 nas 8 URLs; 4/4 fotos renderizadas em navegador, crédito visível no DOM.
- Screenshots completos + por viewport no [artefato #12393170768](https://github.com/mathbrandscontato-wq/Consultoria-Ambiental/actions/runs/39701526155/artifacts/12393170768).
- Alterações documentais posteriores exigem CI no head da PR. Nenhum merge, deploy, alteração DNS/host, backend ou formulário.
- A fotografia e a Inter continuam vinculadas a serviços externos no **ambiente de revisão**; auto-hospedagem e autorização visual continuam gates para G6/G7.

## PR-06 — Mudança tipográfica solicitada (21/10/2026)
- Avenir Light, Book, Regular, Medium, Heavy, Black fornecidas no arquivo `avenir.zip`, íntegro. Metadados declaram propriedade da Monotype e o ZIP não contém licença que permita distribuir webfont.
- CSS define Avenir por pesos usando `local()` e fallback de sistema, sem subir arquivos de fonte comerciais ao GitHub público. Stylesheet externo Inter removido em todas as rotas.
- `src/content/contracts.mjs` e testes atualizados para `fontFamily=Avenir`.
- Testes em Chrome Linux medem responsividade com fallback se Avenir não estiver instalada: não representam homologação com arquivos comerciais carregados. Bloqueio para licença webfont e reflow real permanece em `docs/GATES.json`.
- Não fazer merge ou deploy. Nenhuma mudança na identidade oficial/logotipo, nas fotos ou na infraestrutura.

## PR-07 — Candidata G6.1 + runbook Cloudflare (21/10/2026)
- Branch `feat/pr-07-complete-pages-cloudflare-ready` após PR-06; Home abaixo Hero, Serviços 7 grupos, Sobre e Contato receberam propostas HTML/CSS de layout responsivo para aprovação. NÃO é design homologado.
- Contato permanece não operacional por falta de dados oficiais/backend/privacidade. Fonte Avenir ainda precisa de licença webfont para servir a todos.
- Destino futuro: **yekeizumi.mathbrands.com.br** (grafia exata solicitada), Cloudflare Pages GitHub `main`, build `npm run build`, output `dist`, Node 22. Runbook em `docs/CLOUDFLARE_PAGES_DEPLOY.md` e prompt em `docs/AI_CLOUDFLARE_EXECUTION_PROMPT.md`.
- Sem acesso Cloudflare associado, nenhuma alteração DNS e nenhuma publicação. Requer gate visual, editorial e operacional antes de merge/release.
- Executar CI no HEAD final; não declarar QA aprovado sem conclusão do workflow.

## PR-08 | 25/10/2026 — Aprovação visual parcial e galeria
- Diretor criativo aprovou o design das quatro telas G6 da PR-07, condicionando a aprovação total a (1) **Lara Yumi como primeira seção de Sobre após Hero**, (2) inclusão de **galeria de projetos**. Nenhum outro redesenho autorizado.
- Branch `feat/pr-08-sobre-lara-galeria-projetos` encadeada à PR-07, com nova rota `/projetos/`, galeria de seis posições editoriais e chamada na Home; cards vazios com indicação de conteúdo pendente. Fonte real de projetos/fotos e licenças ainda não fornecida.
- Atualizar testes para cinco rotas, rodar 1440/768/390/360 e capturar páginas novas. Não declarar QA aprovado sem GitHub Actions observado.
- Demais gates permanecem: Avenir webfont licenciada, assinatura oficial, conteúdo Vic, canal de contato real, eventuais imagens, Cloudflare delegada e autorização operacional. `site_publication_allowed=false`. Sem merge e sem deploy.


## 26/10/2026 | Prévia autorizada em ChatGPT Sites
- Matheus autorizou hospedar a versão atual no ChatGPT Sites com endereço chatgpt.site, após indisponibilidade de acesso à zona DNS.
- Escopo: prévia para revisão, cinco páginas preservadas; sem habilitar canais de contato, sem publicar cases fictícios, sem redistribuir fontes proprietárias.
- Build, lint, 22 testes e inspeção estática aprovados nesta execução. Noindex e avisos de revisão preservados.
- QA de navegador não reexecutado nesta migração de hospedagem; evidências anteriores não equivalem a nova inspeção visual.
- O gate histórico de lançamento definitivo permanece fechado; esta autorização é específica para a prévia em Sites. Domínio personalizado e entrega definitiva continuam pendentes.

## 26/10/2026 | G7.1 UX Motion
Matheus forneceu plano e autorização expressa para implementar e publicar efeitos no Site existente. CSS/JS nativos, sem novas dependências. Ver `docs/UX_MOTION_G71.md` para escopo, QA, limitações e rollback V1. Preservar audiência privada, conteúdo provisório, contato não operacional, Hero A e galeria sem cases inventados. GitHub original não está automaticamente sincronizado ao repositório de fontes do Site.

## 26/10/2026 | Revisão de emojis
Revisados textos das cinco páginas, títulos, metadados, navegação e lightbox. Substituídos caracteres pictográficos das setas/menu por SVGs monocromáticos, preservando controles, nomes acessíveis e destinos. Removido símbolo de fechamento do texto do botão. Sem reescrita de conteúdo ou mudanças de audiência.

## 26/10/2026 | Mídias fornecidas pelo diretor criativo
Matheus autorizou vídeo na hero, Retrato.jpg no perfil da Lara e distribuição das demais fotos. Integrados vídeo 8,68s em H.264 sem áudio (1280/720, aproximadamente 2,4MB/647KB), poster WebP, retrato e seis fotografias únicas com srcset WebP. A duplicata de Teofilo não foi repetida. Mantidos textos/topografia da hero; substituídos crédito/aviso antigos de Unsplash pela identificação de vídeo ilustrativo. Galeria usa fotografias editoriais fornecidas, claramente identificadas como ilustrativas, sem afirmar cases reais. Reprodução respeita movimento reduzido/saveData, pausa manual, página oculta e saída do campo de visão. Retrato não retocado.
QA: lint, build, 24 testes e check estático aprovados; Chrome confirmou vídeo readyState4/1280x720, reprodução/pausa, retrato carregado e lightbox com imagem real fornecida. Home/Sobre/Projetos em 1440/768/390/360/320 sem overflow. As imagens lazy fora da tela não foram forçadas a carregar; modal fechado tem imagem sem tamanho por definição. Conta privada e restrição de validação autenticada em produção preservadas.

## 26/10/2026 | Hero com vídeo integral
Solicitação do Matheus: vídeo cobre toda a hero com texto sobreposto; feito com poster, overlay de legibilidade, responsividade e controle de pausa existentes. A referência Pinterest do menu não pôde ser acessada e o menu não foi redesenhado por falta de conteúdo verificável da referência.

## 26/10/2026 | Hero compacta
Por solicitação do Matheus: removido CTA inferior e controle do vídeo; vídeo de fundo automático silencioso, respeitando movimento reduzido e economia de dados. Textura topográfica substituída por pontilhado com maior opacidade na base e transparência progressiva em direção ao centro. Altura da seção reduzida, mantendo navegação existente.

## 27/10/2026 — Redesign integrado autorizado pelo prompt mestre

O proprietário aprovou e solicitou execução autônoma do redesign de cinco páginas e publicação. Esta ordem recente prevalece sobre as antigas restrições visuais/operacionais de PRs históricos para o escopo especificado. Stack estática, marca, Avenir local-first, header/footer e assets preservados. Quatro páginas candidatas completas; novo Contato preparado somente em desenvolvimento, por ausência verificada de backend/destinatário e privacidade. Página pública Contato preservada.

Baseline26testes; candidata38testes aprovados. Matriz real via navegador suportado: cinco rotas em oito larguras, sem overflow. Interações críticas de galeria, mapa, serviços, FAQ e lightbox verificadas. Sem Lighthouse/CWV medidos. Fontes públicas oficiais recuperadas pela pesquisa web; código original/Copy prompts não importados, adaptações declaradas. Registro central e relatório em docs/ykeizumi-component-registry.md e docs/ykeizumi-site-release.md. Gates históricos de lançamento integral não equivalem à publicação parcial autorizada. Ver relatório para versão publicada, rollback e bloqueios comprovados.

Publicação observada: versão21 do Sites, source4ecadd5e48885cd547a1e170143fa7c208ad176f, deployappgdep_6ae0c9bb1d1481919f992db8f08c7e24 succeeded. Cinco URLs verificadas diretamente no navegador; quatro redesigns no ar e Contato anterior preservado. PR10 GitHub em draft, commit804447c9def36c16d61f20dbb03eb71e06f5cfd7, sem merge. Relatório de release atualizado com IDs, capturas, resultados e bloqueios.

CI GitHub posterior: run40536820905 no commit9f6a59e062d1d719cadfc40200f6a30d3e364687 SUCCESS,38testes e navegador em oito larguras. A falha inicial era o seletor/título do Hero antigo no script legado; correção ampliou a cobertura sem desativar checks. Sem alteração do conteúdo publicado versão21.

## Remoção de emojis e glifos — 27/10/2026

Revisadas as cinco páginas e o Contato em desenvolvimento. Setas e símbolos dos controles substituídos por SVG ou desenho CSS, incluindo navegação da galeria, links, reset do mapa e pausa/reprodução. Ícones vetoriais institucionais preservados. Sem alteração de textos, dados ou destinos.

Validação desta revisão: npm run qa aprovado (38testes), inspeção das cinco rotas e varredura dos HTML/CSS/JS gerados sem Emoji_Presentation, seletor de apresentação emoji ou keycaps.
