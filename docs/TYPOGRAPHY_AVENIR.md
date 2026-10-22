# YKEIZUMI | Tipografia do site: Avenir

**Decisão atual:** Avenir substitui Inter para toda a interface do website conforme instrução explícita de 21/10/2026. O logotipo oficial mantém sua tipografia e proporções originais; seu placeholder ainda é técnico.

## Fonte enviada e integridade
`avenir.zip` foi recebido diretamente do diretor criativo, SHA-256 `9aae2940e1b6e317f452664d578742fc8326e8400f7caa966db795fcb719e3f9`.
O ZIP está íntegro e contém seis TTF: Avenir Light, Book, Regular, Medium, Heavy e Black.

| Peso CSS | Estilo Avenir | SHA-256 do arquivo no pacote (controle interno) |
|---|---|---|
| 300 | Light | `db8d9ee60199c24140472361e43f03f2f16210fd1744df101ee2f6f9f00df644` |
| 350 | Book | `0a7f7fddb0844cf1ac94d602fc9ac13f34945ca7ee0773670e428428f3a1527c` |
| 400 | Regular | `1e27a5681ee841c04022adeceb698c8e9de8184e13c4c07807bf847d9f8d8841` |
| 500 e 600 | Medium | `6382b3641be89a4527a33737870646d42310255f2b997e65a8b08c8adc73f8cf` |
| 700 e 800 | Heavy | `49f0cde8d6b544858dd74573cc92d34b2f5a2083a01b6dd8421700261732859c` |
| 900 | Black | `897af4eb430e2f6ba18ba7fbb72fbb8a7cdc6663729c60e7a707c05d81e29a6b` |

## Licenciamento e distribuição
Os metadados `nameID 13` identificam os seis arquivos como propriedade da **Monotype GmbH** e sujeitos a licença. `readme.html` menciona origem FontsGeek, mas **não inclui autorização de web embedding, conversão ou redistribuição pública**. O indicador técnico `OS/2.fsType=0` não substitui licença. Portanto os arquivos binários NÃO foram commitados, publicados, enviados a terceiros nem convertidos para WOFF2.

A implementação da PR-06 utiliza `@font-face src:local(...)` por peso e o token `--font-interface` com Avenir em primeiro lugar; em dispositivos sem Avenir instalada, usa fallback seguro. Não há request a serviço de fonte externa, e o stylesheet da Inter foi removido.

**Bloqueio para exibição garantida em todos os dispositivos:** adquirir ou confirmar licença de Avenir para uso web (incluindo forma de distribuição/hospedagem), obter arquivos webfont autorizados e realizar nova inspeção de reflow/CLS/contraste em 1440, 768, 390 e 360px **com Avenir realmente carregada**.

**Não declarar equivalência tipográfica final** apenas com teste do CSS no GitHub Actions (Chrome Linux não contém automaticamente os arquivos Avenir).

## Integração posterior
Com licença válida:
1. Gerar/incorporar apenas webfonts legalmente autorizadas, localmente no projeto, sem URLs externas;
2. Referenciar cada peso com URL local e `font-display:swap`, preservando fallback;
3. Validar carregamento real `document.fonts.check()` e dimensões de texto em quatro viewports;
4. Atualizar `docs/GATES.json` somente depois do aceite técnico e visual.

Não fazer upload de TTF proprietário no repositório público por iniciativa própria.
