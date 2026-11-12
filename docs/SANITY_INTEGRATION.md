# Ykeizumi | Preparação Sanity Studio (sem publicação)

## Escopo entregue nesta branch
- Studio independente em `studio/` com configurações gerais, Home, Sobre, Serviços, Projetos e Contato.
- Campos de SEO e imagens; projetos exigem `publishedOnSite=true` E `clientApproved=true` para integrações futuras.
- Leitor GROQ em `src/lib/sanity-content.mjs`, desabilitado por padrão.
- Nenhuma página pública, build, DNS, hospedagem ou publicação foi alterado.
- Mantida a branch de referência visual `feat/ykeizumi-redesign-unificado-20261027`.

## Ativar o projeto Sanity (ação autenticada da titular)
1. Acesse https://www.sanity.io/manage e crie um projeto **Ykeizumi Consultoria Ambiental** na organização/conta adequada.
2. Crie dataset `production` (público apenas se os conteúdos forem destinados à publicação).
3. Copie `studio/.env.example` para `studio/.env.local`, preencha `SANITY_STUDIO_PROJECT_ID`.
4. Com Node.js >=20: `cd studio && npm install && npm run dev`.
5. Autentique-se quando solicitado. Convide Vic e Lara pelo gerenciamento de membros do projeto; atribua somente as permissões necessárias.
6. **Não execute** `npm run deploy` sem autorização específica. O Studio ainda é apenas local.

## Integração do site (próxima etapa, NÃO habilitada)
- Variáveis do build estático: `YKEIZUMI_SANITY_ENABLED=true`, `SANITY_PROJECT_ID=<id>`, `SANITY_DATASET=production`.
- `SANITY_READ_TOKEN` é opcional, apenas para datasets privados; configure no ambiente de build, NUNCA no GitHub nem no JavaScript de navegador.
- O leitor `loadSanityContent` consulta somente conteúdo publicado; falha explicitamente se ativado sem credenciais ou se a API estiver indisponível.
- O adaptador ainda não está conectado às funções atuais de renderização, por segurança: a integração visual exige mapear cada campo às seções existentes e preencher os dados reais antes de ativar.
- Não importar conteúdos fictícios; não alterar estrutura/estilo/motion, não substituir vídeos e imagens atuais automaticamente.
- Para edições publicadas aparecerem no site estático, será necessário novo build/deploy autorizado ou um mecanismo de revalidação/CI aprovado. Publicar no Sanity **não** atualiza a página estática por si só.

## Critérios antes de habilitar
1. Projeto e permissões reais configurados; token nunca público.
2. Inventário aprovado de textos, imagens e direitos de uso.
3. Migração fiel, incluindo ordem de serviços, cards e galerias existentes.
4. Campos ausentes não devem apagar textos ou imagens aprovados.
5. Testes visuais desktop/tablet/mobile, acessibilidade, metadados e links.
6. Validar 100% dos projetos e consentimentos antes da exibição.
7. Revisão em ambiente isolado; merge e publicação dependem de aprovação.

## Observações
- A branch `main` do repositório ainda é documental; NÃO abrir PR contra main sem revisar a linhagem das branches.
- O uso de Studio separado evita incluir React e dependências do CMS no site estático atual.
