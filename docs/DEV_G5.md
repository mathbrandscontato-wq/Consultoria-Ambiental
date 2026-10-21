# G5 | Como executar a fundação PR-01

## Estado
Somente **fundação estática**. Não é o Hero A aprovado, não contém conteúdo editorial validado, não envia formulários e não está autorizada para publicação.

## Ambiente de desenvolvimento
Node.js 20+ apenas **em máquina local e CI**; não exige Node no servidor definitivo nem instala dependências de terceiros.

```bash
npm run qa
python3 -m http.server 4173 -d dist
```

Abrir `http://localhost:4173/`; verificar rotas `/`, `/servicos/`, `/sobre/`, `/contato/`. Não expor a porta na internet nem confundir com publicação.

## Arquitetura
- `src/site.mjs`: catálogo de rotas e metadados provisórios.
- `src/lib/render.mjs`: cabeçalho, navegação, rodapé e slot textual explicitamente não homologado.
- `src/styles/tokens.css`: cores da marca registradas e fonte Inter como família aprovada; **woff2 ausentes**.
- `src/styles/base.css`: estrutura acessível mínima, sem a composição Hero A.
- `scripts/build.mjs`: gera `dist/` exportável como arquivos estáticos.
- `scripts/lint.mjs`: checa sintaxe dos módulos sem bibliotecas externas.
- `scripts/check.mjs`: asserções sobre rotas, metadados, links, landmarks e ausência de formulário fictício.
- `tests/foundation.test.mjs`: testes Node nativos.
- `.github/workflows/ci.yml`: apenas validação em PR; nenhuma etapa de deploy.

## Limites e riscos
- A compilação é reversível. Isso não confirma adequação à hospedagem da Vic.
- URLs e metadados SEO definitivos dependem de domínio/conteúdo aprovados.
- Testes sintáticos e estruturais não substituem auditoria WCAG, E2E e screenshots.
- A navegação apenas testa estrutura; composições do header/menu mobile seguem pendentes da prancha G2 V5.
- Nenhuma API, banco de dados, provedor de formulários ou serviço externo obrigatório.
- PR-02 somente após pacote G2 V5 real, vínculo e QA visual com 1440/390/768/360.
