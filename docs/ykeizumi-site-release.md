# Ykeizumi — redesign integrado V1

Data: 27/10/2026. Escopo autorizado pelo prompt mestre enviado pelo proprietário. Entrega **parcial**: quatro páginas redesenhadas; novo Contato preparado em desenvolvimento e isolado da publicação por bloqueio real de integração/privacidade.

## Resultado e status por página

| Página | Implementação | QA | Publicação | Pós-publicação |
|---|---|---|---|---|
| Home | Oito seções; doze famílias de efeitos, galeria curva, quatro segmentos selecionáveis, mapa real com pan/zoom, FAQ e CTA | Build, testes,40layouts compartilhados e interações verificadas | Candidata aprovada para deploy | A registrar após deploy |
| Sobre | Seis seções; retrato original, expansão por scroll, topografia, narrativa e Bento | Estrutura, mídia e layout verificados | Candidata aprovada para deploy | A registrar após deploy |
| Serviços | Cinco seções; sete serviços, crossfade/accordion, contextos e timeline | Âncoras s01–07, seleção rápida e histórico verificados | Candidata aprovada para deploy | A registrar após deploy |
| Projetos | Seis seções; acervo real vazio condicional, Atlas6fotos, Masonry e lightbox | Registro seguro4testes, foco/teclado/lightbox e layouts verificados | Candidata aprovada para deploy | A registrar após deploy |
| Contato | Interface6perguntas, revisão/edição, validação e adaptador | 8testes de lógica; fluxo local até revisão, edição direta e bloqueio de envio verificados | Nova versão **bloqueada**; manter página pública anterior | Não testar envio real inexistente |

## Auditoria e baseline

- Repositório existente: `https://github.com/mathbrandscontato-wq/Consultoria-Ambiental`.
- Checkout local baseado em `feat/pr-08-sobre-lara-galeria-projetos`. A fonte de produção do Sites é um repositório `cloudflare_artifact`, branch `main`, separado do GitHub original. A busca GitHub encontrou PRs históricas1–9 abertas; não havia redesign equivalente a incorporar. Nenhum trabalho anterior foi mesclado ou sobrescrito.
- Espelho de revisão GitHub preparado para branch nova `feat/ykeizumi-redesign-unificado-20261027`, baseada no head verificado `5a547b93602358363ee156255f9bb5a67577bd82` da PR08. Acesso de escrita Git CLI indisponível; usar conector GitHub para versionar, preservando a CI mais recente e main. Publicação segue o vínculo de fonte do Sites.
- Commit-base: `178d0cf518cd0fe9211f6faa3d800c4780b88144`.
- Versão anterior:20; ID `appgprj_6adf8696a404819180e8bf53b4757b4b~appgver_41dfa21df9208191b4c49de9595da3a9`.
- Deployment anterior: `appgdep_6ae0a498d22881918d726a03fc3621dc`, confirmado como versão de rollback.
- Stack: NodeESM estático, cinco rotas HTML, zero dependências npm. Sem React/Next/Astro/Tailwind presumidos.
- Baseline `npm run qa`:26testes passaram, build e inspeção estática aprovados. Capturas iniciais de Home/Sobre observadas na sessão; conteúdo das cinco URLs recuperado via TinyFish.
- Mídias existentes: cerca de9MB, reutilizadas. Vídeo, retrato, seis fotos, logo e favicon não substituídos nem editados.
- Contato público: sem formulário ou endpoint; não existem política/destinatário verificáveis no código. Não há fluxo real de recebimento que possa ser ativado com segurança.
- Acesso atual confirmado no Sites: **público**, proprietário atual; preservado, sem mudar permissões, domínio ou DNS.
- `noindex,nofollow`, Avenir local-first e avisos de revisão preexistentes preservados. Metadescrições corrigidas para explicar cada página, sem alegações fictícias.

## Componentes e fidelidade

Registro detalhado: [ykeizumi-component-registry.md](ykeizumi-component-registry.md). Documentos por página e pesquisa vinculados nele.

Todos os novos efeitos são **adaptações técnicas originais para a stack estática**. Páginas públicas oficiais foram recuperadas por pesquisa web após timeout do TinyFish; suas descrições corroboram as mecânicas. Não foram importados código protegido, Copy prompts, versões ou licenças não recuperadas. Não declaramos igualdade pixel a pixel ou uso do código React original. Sem nova dependência.

Desvios explícitos: CircularGallery em DOM/CSS3D sem deformação WebGL; topografia em SVG original, coerente com curvas/luzcursor/pausa descritas pela referência; Masonry CSS sem motor de springs do React; ImageReveal vertical conforme direção aprovada. Magnet opcional omitido. Mapa é o asset cartográfico real existente, raster incorporado em SVG e interativo; não há tiles online ou dados geográficos ao vivo.

## QA realizado

- `npm run lint`, `npm run build`, `npm test` e `npm run check`: aprovados, **38testes,0falhas**.
- Typecheck: não aplicável à stack JavaScript sem TypeScript; sintaxe verificada pelo lint Node.
- Navegador Chrome via ferramenta suportada: cinco páginas × oito larguras nominais320/360/390/430/768/1024/1440/1920 =40combinações. Sem overflow horizontal; um H1 por página; seções8/6/5/6/2 (Contato público preservado). As barras de rolagem dos iframes reduzem clientWidth, como em um viewport desktop normal.
- Menu mobile: abertura, links e Escape. FAQ: expansão com estado acessível. Segmentos: seleção única e mídia correspondente. Serviços: acesso direto s04, seleção02→07, histórico e mídia sincronizados. Atlas: abrir, avançar, Escape e restauração de foco. Galeria curva: teclado, próximo e arraste mudam seleção. Mapa: abrir, ampliar e setas alteram enquadramento.
- Contato dev: erro de obrigatório; nome/perfil/serviço pré-selecionado s04; textarea preserva Enter; cidade/UF; somente e-mail; revisão100%; edição de nome retorna diretamente à revisão; botãoEnviar bloqueado. Nenhum dado real transmitido.
- Console observado: nenhum erro da origem da aplicação nas consultas realizadas; mensagens da extensão do navegador foram separadas e não atribuídas ao site.
- JavaScript sem API de animação/observers: testes existentes aprovados. Reduced-motion previsto no código e nos testes unitários de fallback; não houve auditoria completa com emulação do sistema operacional.
- `npm run qa:browser`: script legado de CDP com seletores antigos não executado; substituído pela matriz e interações na ferramenta de navegador suportada. Não foi instalado navegador alternativo.
- Lighthouse, LCP, CLS, INP e TBT: **não medidos**. Não há declaração de Core Web Vitals aprovado ou conformidade WCAG integral. Teclado virtual real de iOS/Android não medido.

## Peso dos recursos declarados

Valores medidos em bytes sem compressão nos HTMLs e arquivos referenciados. Não equivalem a tráfego real ou métricas de campo.

| Página | HTML | JS | CSS |
|---|---:|---:|---:|
| Home | 29.144 | 25.727 | 80.013 |
| Sobre | 66.840 | 21.289 | 87.957 |
| Serviços | 25.413 | 20.243 | 87.300 |
| Projetos | 17.802 | 16.840 | 85.802 |
| Contato | 9.727 | 16.840 | 80.013 |

CSS do hover FAQ teve refinamento posterior pequeno; os valores acima representam a medição anterior a esse ajuste. Não são teto rígido de release.

## Evidências

Capturas reais em `docs/evidence/`:

- [Galeria desktop](evidence/home-gallery-desktop-20261027.jpg)
- [Galeria mobile](evidence/home-gallery-mobile-20261027.jpg)
- [Sobre/Lara](evidence/about-desktop-20261027.jpg)
- [Explorador desktop](evidence/services-desktop-20261027.jpg)
- [Explorador mobile](evidence/services-mobile-20261027.jpg)
- [Atlas desktop](evidence/projects-desktop-20261027.jpg)

## Gates e isolamento de Contato

Integridade, funcionalidade, visual/responsividade e engenharia aprovados para as quatro páginas candidatas, nos limites descritos acima. Contato novo reprova o gate de envio real por falta de backend/destinatário, política/retencão e validação server-side/antispam verificáveis.

Build de produção não copia renderer, scripts, schema ou CSS de Contato em desenvolvimento. PréviaHTML, cópias temporárias e matriz de QA são removidas antes do pacote. Os CTAs públicos mantêm `/contato/` sem prometer pré-seleção em uma experiência não publicada. Nenhum projeto fictício, dado pessoal ou sucesso simulado foi incluído.

O gate histórico de lançamento institucional completo continua separado desta publicação parcial autorizada. Não significa liberação de formulário, fonte comercial ou claims pendentes.

## Rollback

Usar o deploy suportado do Sites para a versão20 indicada acima; não reescrever histórico nem excluir a candidata. O pacote final deve corresponder ao commit retornado pelo helper. Publicar respeitando a audiência atual, sem alterar DNS/hosting.

## Pendências comprovadas

1. Contato: endpoint/destinatário autorizado, política e retenção, servidor seguro, proteção contra abuso, recebimento controlado e confirmação real. A interface não está publicada como funcional.
2. Avenir: webfont universal licenciada continua pendência anterior; fallback existente preservado, nenhum TTF redistribuído.
3. Acervo real: vazio por falta de registros autorizados; Atlas continua identificado como ilustrativo.
4. Código/Copy prompt e comparação integral com previews originais não recuperados; versões nativas classificadas como adaptações.
5. Métricas de campo, Lighthouse e auditoria WCAG integral não medidas.

## Publicação

Candidata aguardando resultado nativo. Este bloco será atualizado após confirmação do deploy e smoke tests das cinco URLs, sem alterar a versão de conteúdo já validada.
