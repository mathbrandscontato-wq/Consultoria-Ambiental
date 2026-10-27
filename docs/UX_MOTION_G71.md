# Ykeizumi | G7.1 | Relatório técnico | 26/10/2026

## Escopo e estado
Atualização do Site existente `appgprj_6adf8696a404819180e8bf53b4757b4b`, preservando audiência privada. Autorização expressa no documento fornecido por Matheus em 26/10/2026. Não constitui liberação dos conteúdos comerciais ainda provisórios.

Base recuperável V1: `appgprj_6adf8696a404819180e8bf53b4757b4b~appgver_21e00e6b53048191aa3a0ce8653a1762`, commit `e84a733057e35976eb641b3bd8a6d89434b30a27`. Deploy inicial confirmado anteriormente.

## Implementação por página
| Página | Implementação |
|---|---|
| Home | Split Text de palavras com semântica contínua; reveal de blocos, setas com feedback, menu nativo refinado. Hero A, fotos e topografia preservados. |
| Serviços | Split nos títulos de destaque, reveal de linhas e spotlight verde discreto somente com mouse; foco/toque sem hover permanente. |
| Sobre | Split/reveal nos blocos existentes; Image Reveal preparado para fotografias quando fornecidas. A página atual não possui fotografia. |
| Projetos | Grid assimétrico preservado; infraestrutura de imagem, hover, foco e lightbox somente para imagens reais. Nenhum placeholder recebe interação de case. |
| Contato | Split/reveal; menu mobile consistente; não ativado formulário ou canal não confirmado. |

## Engenharia
HTML estático gerado por Node, CSS e módulos JavaScript nativos. Zero dependências adicionadas. WAAPI e IntersectionObserver como melhorias progressivas; sem esconder conteúdo antes da inicialização. Movimento reduzido cancela animações em andamento. Recursos não suportados deixam conteúdo visível. Lightbox com dialog/showModal, nome acessível, Esc nativo, controles visíveis, contenção e restauração de foco, bloqueio/restauração da rolagem. Sem copiar código de terceiros; referências utilizadas apenas como comportamento.

Arquivos: `src/scripts/motion.mjs`, `src/styles/motion.css`, `src/scripts/mobile-menu.mjs`, renderizadores de páginas/hero/projetos/seções, `scripts/build.mjs` e testes. O Site utiliza seu repositório de fontes próprio: não existe sincronização automática com o GitHub original; nenhum merge no GitHub foi realizado nesta atualização.

## QA executado
- Lint, build e testes unitários do projeto. Os 22 testes anteriores passaram após adaptar a expectativa de navegação atual por haver menus desktop/mobile independentes. Dois testes adicionais verificam inicialização sem API de animação/observer.
- Chrome cloud: 50 documentos comparados (antes/depois × 5 páginas × 1440/768/390/360/320). Nenhum overflow horizontal, exatamente um H1 por página e nenhuma diferença de largura/altura dos títulos na comparação.
- 25 capturas de comparação lado a lado, com título de página confirmado antes de cada captura. Documentos longos não foram integralmente capturados; capturas mostram a abertura de cada página.
- Cinco menus a 390px: Enter abre, Esc fecha, foco retorna ao summary, controles medidos 44×44.
- Lightbox em fixture técnica isolada: modal nativo aberto, foco inicial no fechamento, Tab contido, Esc fecha, foco volta à origem e rolagem restaurada. Fixture não integra o deploy.
- Movimento reduzido simulado no matchMedia em fixture: heading visível e nenhuma fragmentação animada. Sem JavaScript em iframe sandbox: heading visível e menu details nativo abre pelo teclado.
- Console inspecionado: mensagens da extensão do navegador; não foram observados erros atribuídos aos módulos alterados no período inspecionado.
- Sem fotos reais nas galerias e Sobre: Image Reveal e lightbox não têm conteúdo de cliente para teste em produção. Nenhuma imagem/case foi inventado.

## Performance e limitações
Nenhuma biblioteca nova; apenas CSS/módulo locais. Transform/opacity nas entradas, RAF por card sob ponteiro e execução única por alvo. Zero loops de animação permanentes.
Não há dados de campo p75 de LCP/INP/CLS, nem Lighthouse comparativo controlado. Portanto não se atesta atendimento numérico às metas CWV ou ausência de regressão de CWV. A comparação geométrica e os testes de navegação não substituem medição de performance.
Não executados: Safari, dispositivos Android/iOS físicos, leitor de tela real, zoom 200/400%, orientação horizontal, CPU throttling e auditoria integral WCAG 2.2 AA. O teste de reduced motion em fixture verifica a lógica JS, não a preferência real do sistema.

## Publicação e reversão
Publicar pelo mecanismo oficial Sites usando o commit/arquivo gerados pelo helper de fonte. Manter audiência privada. Validar as cinco rotas e menus depois do deploy. Resultado exato e identificador de publicação serão informados na entrega.
Rollback: reimplantar a versão V1 acima no mesmo projeto com `deploy_private_site_version`; não recriar o Site, não trocar DNS. Após rollback confirmar estado `succeeded` e rotas. A versão V1 continua no histórico. O gate histórico de lançamento comercial permanece fechado; a autorização atual cobre os efeitos e a prévia hospedada.
