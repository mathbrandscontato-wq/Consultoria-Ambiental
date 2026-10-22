# PR-05 | Recursos visuais e tipográficos provisórios

## Fotografia editorial no Hero A
- **Autor:** Bleron Salihi.
- **Origem:** Unsplash, página https://unsplash.com/pt-br/fotografias/uma-vista-aerea-de-um-vale-verde-exuberante-YPN2ChAUM_k
- **Imagem:** https://images.unsplash.com/photo-1654361700413-b4db34d37fc8
- **Licença:** https://unsplash.com/license, consultada em 21/10/2026; permite uso comercial e adaptação, sem atribuição obrigatória. Crédito incorporado ao Hero.
- **Uso:** apenas ilustração ambiental/editorial provisória, **não** representa estudo, cliente, execução, localização atendida ou resultado da Ykeizumi.
- **Tratamento:** `srcset` 720/1200 com qualidade 76–80, `sizes` por viewport, `object-fit:cover`, overlay sem inventar paisagem.
- **Status de entrega:** URL remota de origem como melhoria reversível de G5; verificação de carregamento browser e substituição por arquivo local otimizado permanecem pendentes antes de G6/G7. Evitar dependência permanente de imagens.unsplash.com em produção sem decisão explícita.

## Tipografia Inter
- **Fonte:** https://github.com/rsms/inter e stylesheet oficial https://rsms.me/inter/inter.css
- **Licença:** SIL Open Font License 1.1 https://github.com/rsms/inter/blob/master/LICENSE.txt
- **Status:** a Inter escolhida foi ativada por CSS remoto **somente para revisão**, com fallback de sistema se o serviço estiver indisponível. O conector de escrita não aceitou transferência binária de WOFF2 de um repositório de fontes. NÃO afirmar que a fonte está auto-hospedada.
- **Próxima integração:** incluir WOFF2 oficial de distribuição compatível OFL com licença junto ao site; remover link de CDN, comprovar carregamento local, LCP, CLS e ausência de dependência externa. Nunca usar a fonte Inter para reconstruir o logotipo oficial.

## Marca e direitos
O Kit de Marca original não foi importado ao repositório público, pois ainda falta autorização expressa de distribuição. O placeholder do cabeçalho permanece identificado como provisório; não deve ir a G7.

## Limites
As referências Soltera e SureGuard foram usadas apenas como inspiração de impacto editorial, organização e ritmo visual. Nenhuma fotografia, marca, componente proprietário ou composição identificável foi copiada dessas referências.
