# Ykeizumi — execução do Prompt Mestre V5

Data: 27/10/2026. Escopo: cinco rotas existentes, sem migração de stack, domínio, DNS ou indexação.

## Baseline e decisões

- Versão publicada anterior: 23; fonte recuperável `1d838a0d96b641890b58d9effc689457f9972951`.
- Stack verificada: gerador Node ESM, HTML, CSS e módulos JavaScript nativos, zero dependências de aplicação. Preservada.
- Site público de revisão no mesmo endereço Sites; `noindex,nofollow` continua ativo. Site acessível não equivale a indexação autorizada.
- Cores #1E3B2D, #7F9962, #F8F6F2 e #2F3133; Avenir local e fallbacks preservados, sem distribuição de fontes proprietárias.
- Prompt V5 e código TSX do Perspective Tunnel recebidos como anexos. Relatório de mercado fornecido pelo cliente, exploratório, sem volumes ou resultados comerciais medidos.
- V4/V3/adendo V1.1 não foram recebidos como documentos separados nesta execução. Suas diretrizes incorporadas ao V5 são aplicadas; não se presume leitura de documentos ausentes.
- Documento anterior de componentes usa S01–S10 como IDs de efeitos; S02 ali é Scroll Expand do hero, não a segunda seção da página. A arquitetura do mesmo documento e o HTML confirmam que o segundo bloco principal é `#lara-yumi`. O V5 determina explicitamente o túnel nesse bloco, preservando a apresentação da profissional.

## Matriz de alterações

| Prioridade | Página / componente | Problema e alteração autorizada | Fonte | Aceite / dependência |
|---|---|---|---|---|
| P0 | Header / CTA | Unificar botão com Home e manter logo + menu mobile em uma linha | V5 §16 | Componente compartilhado; CTA fora do header fechado no mobile |
| P1 | Sobre, Serviços, Projetos / hero | Trocar foto abaixo do texto por composição editorial desktop 55/45; mobile CTA sobre foto | V5 §17 | Caixa de imagem delimitada, sem degradê, mesmos assets e H1 |
| P1 | Sobre / seção 02 | Introduzir profundidade 3D ligada ao scroll com fotos aprovadas | V5 §18 + TSX anexo | Somente `#lara-yumi`; retrato/textos semânticos, scroll livre e fallback |
| P1 | Home / quatro setores | Descrições ligadas a necessidades dos públicos | V5 §10 | Quantidade, ordem, títulos, imagens e interação preservados |
| P1 | Serviços / sete serviços e cinco caminhos | Refinar descrições e validar destinos | V5 §11 | Nomes/âncoras mantidos; não introduzir ofertas exploratórias |
| P1 | Cinco páginas / SEO | Revisar title/description/semântica e Open Graph | V5 §§9,22 | Metadados únicos; noindex e domínio preservados |
| P1 | Home e Projetos / lightbox | Completar swipe com controle de foco e Escape existentes | V5 §19 | Sem novos pacotes; navegação por teclado mantida |
| P1 | Footer / limpeza | Remover mensagem de revisão; ícones sociais sem links fictícios | V5 §19.6 | Layout e animação preservados; perfis não inventados |
| P0 | Contato / envio | Integração pública não existe; fluxo progressivo permanece em desenvolvimento | V5 §§4.1,14.4,25 | Bloqueado por destinatário, endpoint e informações de tratamento de dados ausentes |

## Perspective Tunnel

Adaptação nativa do código fornecido do componente de @daiwiikharihar / 21st.dev. Não é cópia React nem afirmação de equivalência pixel a pixel. Reutiliza `tunnel-model.mjs`: ângulo áureo 137,5°, planos Z -1700→500 no desktop / -1200→350 no mobile, escalonamento .45 e fades locais .18/.82/.98. A câmera acompanha a rolagem real com suavização exponencial de 95 ms, sem `wheel.preventDefault`, captura de touchmove ou alteração de overflow da página.

`about-tunnel.mjs` e `about-tunnel.css` isolam o comportamento da seção 02. Desktop usa seis fotos existentes; mobile quatro. O conjunto Lara/retrato/textos avança em profundidade moderada para manter a leitura. A tipografia essencial não desaparece ao final, adaptação deliberada do demo. Imagens decorativas têm alt vazio e grupo aria-hidden; o retrato conserva o alt real. Movimento reduzido e JavaScript indisponível mantêm apresentação estática. Não há neon, roxo, glow, grids ou dependências externas.

## Conteúdo e SEO

A matriz final por URL, palavras-chave A/B/C/D, comparação antes/depois e referências oficiais estão em `ykeizumi-v5-seo.md`. Nenhuma sigla ou atividade da pesquisa foi convertida automaticamente em oferta. Cases e credenciais não foram inventados.

## Mensuração e próximos passos

Não há analytics, pixel, heatmap, CRM ou confirmação real de envio no código publicado. Portanto não há dados de cliques, leads, conversões ou atribuição disponíveis nesta entrega. Não foram instalados rastreadores. Search Console e Business Profile não foram presumidos nem configurados.

Ações futuras recomendadas, sem execução automática: dias 1–30 confirmar serviços, regiões e fontes existentes de contatos; dias 31–60 avaliar presença local e pautas técnicas com evidência; dias 61–90 relacionar consultas, propostas e contratos com atribuição válida. Indicadores possíveis: impressões/cliques, consultas comerciais, contatos reais por origem e compatibilidade da demanda. Critério de qualificação comercial continua hipótese para validação da operação.

Pendências: endpoint/destinatário e tratamento de dados para formulário; autorização específica para indexação; eventuais credenciais/serviços especializados; links sociais oficiais; licença web Avenir; dados de campo para CWV e resultados SEO.

## QA integrado observado

- `npm run qa`: lint de sintaxe, build, 46 testes e inspeção estática aprovados; `git diff --check` aprovado. Oito testes V5 cobrem semântica, heros, túnel reversível, fallback, lightbox/controle de foco e swipe com pointerId/cancelamento.
- Navegador CUA: cinco rotas em 320/375/390/768/1024/1440/1920px, 35 combinações, sem overflow horizontal, um H1 e zero tags decorativas. Verificação em iframes de viewport controlado; não equivale a35 aparelhos físicos.
- Perfil/retrato Lara disponíveis; desktop aproximadamente55/45; mobile com um CTA sobre a fotografia e CTA de header oculto. Menu320 abre com cinco links e fecha pelo Escape.
- Túnel testado em rolagem direta e reversa: progresso observado .8445→.5257 ao subir, stage fixo dentro da seção. Corrigidos altura do ancestral sticky e conflito herdado de altura de imagens; cada card mantém4:5. Viewport390×580 usa composição estática sem corte, imagens decorativas ocultas, perfil sem transform, altura da seção igual à do conteúdo.
- Galeria: abre no site, próxima imagem, Escape, foco restaurado e overflow retornando ao valor anterior. Swipe testado por unidade com ponteiros/cancelamento/direção; toque físico não foi testado.
- O teste inicial de imagens sinalizou uma imagem sem src na lightbox fechada. Inspeção confirmou ser o elemento vazio do dialog, não um asset quebrado. As verificações de mídia consideram somente imagens com src.
- Defeito de infraestrutura observado: rebuild recria dist e o preview perdeu a rota aberta; reiniciado o daemon autorizado após confirmar arquivos. Nenhuma alteração de rede ou workaround no app.
- Os logs observados mostraram mensagens da extensão do navegador, separadas do código da aplicação. Não se declara auditoria ilimitada de logs.

## Performance e acessibilidade

O build contém54 arquivos de runtime e9.563.983 bytes; soma de JavaScript43.377 bytes, soma dos arquivos comprimidos individualmente com gzip17.249 bytes; novo controlador de túnel2.874 bytes. São medidas estáticas locais, não tempos de rede nem CWV. Vídeo original: desktop2.425.547 bytes / mobile662.076 bytes; poster129.968 bytes. O carregamento condicional de vídeo, economia de dados e movimento reduzido foram preservados. Hero de imagem interno tem dimensões, srcset e fetchpriority high, sem lazy loading acima da dobra.

A API Performance não está disponível no avaliador read-only deste navegador, portanto não foram obtidos LCP/INP/CLS/FCP nem Lighthouse; sem dados de campo percentil75. Não atribuir nota de performance ou prometer metas atingidas. Inspeção semântica, foco/teclado e testes automatizados não substituem auditoria completa WCAG2.2AA, leitor de tela ou aparelhos físicos.

## Avaliação qualitativa

| Área | Avaliação de implementação | Limite |
|---|---|---|
| Direção criativa e identidade | Consistência preservada; imagens delimitadas e CTA unificado | Revisão estética humana continua pertinente |
| UX/UI e responsividade | Heros alinhados e navegação coerente nos tamanhos inspecionados | Sem homologação em aparelhos físicos |
| Motion | Profundidade reversível, scroll natural e fallback | Adaptação nativa, sem declaração pixel-perfect |
| Clareza comercial / B2B | Descrições conectadas a necessidades sem ofertas adicionais | Nenhuma conversão medida |
| SEO on-page | Titles, descriptions, OG e conteúdo próprios por rota | Ambiente permanece noindex |
| SEO técnico | Rotas/links/semântica preservados | Canonical, sitemap de produção e indexação aguardam definição |
| Acessibilidade | Foco, nomes, semântica, menu/dialog e fallback inspecionados | Sem certificação integral |
| Performance | Zero novas dependências; movimento decorativo limitado à visibilidade | Sem CWV de campo/Lighthouse |
| Confiabilidade | Build e46 testes aprovados; sem sucesso falso no contato | Envio real continua indisponível |

Avaliação qualitativa não foi convertida em uma pontuação fictícia para atingir a meta aspiracional9,2.

## Publicação

Candidata validada para publicação no ambiente existente. O registro final da versão, deploy e checagem pública será anexado após o retorno efetivo do provedor. Contato com envio real permanece pendência isolada, conforme autorização de publicação parcial segura do V5.

### Gate de empacotamento

A inspeção do primeiro arquivo tar detectou6 páginas temporárias de QA. A versão24 foi apenas salva, não recebeu deploy, e não deve ser publicada. O preview foi encerrado e o build refeito limpo. A causa operacional foi a permanência/restauração de arquivos temporários no diretório sincronizado enquanto o preview estava aberto; não se atribui um defeito de código sem evidência adicional. O check agora rejeita qualquer HTML além das cinco rotas aprovadas e módulos de contato de desenvolvimento. A candidata limpa é empacotada com build+checks ordenados depois de encerrar o preview e tem inspeção explícita do tar antes de salvar.

CI GitHub do commit930d60c6634f846f988adbf58f89278cabb127b7: run40582374354, job122464860316, SUCCESS incluindo46 testes e qa:browser remoto. A adição posterior do gate de pacote será verificada no head correspondente.

## Registro final de publicação

**Status: parcialmente publicado nos termos do V5.** Todas as melhorias visuais/editoriais/SEO independentes estão publicadas. O envio real do formulário permanece bloqueado pela integração e pelos dados de tratamento pendentes; a página pública Contato continua transparente e sem coleta.

- URL: https://ykeizumi-consultoria-ambiental.mthsdoliveira.chatgpt.site
- Ambiente: Sites existente, público, com noindex,nofollow preservado; sem DNS/domínio/hosting alterados.
- Versão publicada:25, ID `appgprj_6adf8696a404819180e8bf53b4757b4b~appgver_ea9d9a91a4588191945455329d34bc66`.
- Fonte publicada: `36beae03e7c63840b4a845b3eebe62045fdb460c`.
- Deploy: `appgdep_6ae11079900c819197c195b2fa71431e`, **succeeded**, 27/10/2026 às17:58:49 (America/Sao_Paulo).
- Pacote verificado:55 arquivos incluindo manifest de hosting; cinco HTML, zero páginas de QA ou scripts de Contato em desenvolvimento.
- CI GitHub head de código `0ddd2492734aa8f8667f8baa816f6856ae7656e1`, run40582667114, job122465902564: **SUCCESS** incluindo testes e navegador remoto. PR10 mantida draft, sem merge.
- Verificação pública: cinco rotas acessadas no CUA; titles/description/OG próprios, umH1, noindex, zero links fictícios no footer, sem overflow, imagens com src carregadas e zero forms públicos. FAQ expandiu; mapa abriu e zoom respondeu; `#s07` abriu serviço correspondente; galeria abriu, avançou por teclado e fechou por Escape; túnel público observado com progresso0,5237, stage fixo no topo e retrato carregado.
- Evidência de produção: `docs/evidence/v5-about-published.jpg`. Comparação anterior: `v5-about-before.jpg`; demais evidências: hero desktop, quadro do túnel e hero mobile em viewport de teste.
- Nenhuma regressão crítica observada, sem rollback. A versão24 foi apenas salva e excluída da publicação pelo gate de pacote.

O registro final é documentação posterior à versão publicada. Sua sincronização de fonte não implica novo deploy de runtime; a versão25 permanece vinculada ao SHA exato acima.
