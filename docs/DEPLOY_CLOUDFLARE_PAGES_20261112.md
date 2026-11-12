# Ykeizumi — ambiente de publicação Cloudflare Pages

Projeto Pages: `ykeizumi-consultoria-ambiental`
Endereço temporário: https://ykeizumi-consultoria-ambiental.pages.dev/
Fonte GitHub: `mathbrandscontato-wq/Consultoria-Ambiental`
Branch de publicação: `feat/ykeizumi-revisao-cliente-20261112`
Build: `npm run build` | Pasta estática: `dist`

## Segurança e escopo
- Este novo ambiente é independente do site pré-existente hospedado fora do Cloudflare Pages.
- Não alterar DNS nem a hospedagem atual sem identificar o destino e preservar backup.
- Sem cadastro de credenciais nos arquivos.
- O formulário permanece desabilitado até existir endpoint seguro com recebimento validado e gestão de anexos.
- Metadado `noindex,nofollow` permanece até conexão do domínio de produção e verificação final.
- A conexão dinâmica com Sanity ainda não foi habilitada; esta versão usa textos aprovados do arquivo docs/CLIENTE_TEXTOS_FINAIS_2026-11-12.md.
- Imagens de portfólio são ilustrativas, não projetos de clientes publicados.
- CNPJ do rodapé: 60.422.093/0001-74.
- Fotos novas da cliente: acesso à pasta Drive pendente.
- CNPJ consta na fonte da revisão, mas a razão social deve ser validada no comprovante antes da habilitação final.
- Mapa atual estáticos de SC precisa refletir abrangência Sul (SC, PR, RS); não dizer que mapa cobre toda a região enquanto não substituir.

## Validação
- GitHub Actions: `.github/workflows/ykeizumi-review-qa.yml` deve ficar verde.
- Verificar HTTPS, quatro rotas, ícones, hero de vídeo, galeria, CSS, arquivos de media e links.
- Validar mobile (375x812), tablet (768x1024), desktop (1440x900).
- Sanity Studio https://ykeizumi-mathbrands.sanity.studio/ é serviço separado.
