# ADR-001 | Fundação de desenvolvimento reversível (ACEITA SOMENTE PARA PR-01)
Data: 21/10/2026. Status: **aceita para o escopo reversível de PR-01 em 21/10/2026**. Autorização do responsável pela direção criativa: "Pode seguir pra proxima etapa." Esta autorização não aprova a stack definitiva, o design ausente, mudanças de infraestrutura, merge ou deploy.

## Contexto
Desenvolvimento local e em GitHub, hospedagem do cliente desconhecida e expressamente fora do escopo deste ciclo. Páginas institucionais com fotografia e grafismo topográfico; necessidade de preservar G2 V5. Formulário com backend/destinatário ainda indefinidos.

## Proposta reversível
Adotar, nesta PR-01 autorizada, **saída estática** com HTML semântico, CSS moderno e JavaScript modular progressivo, mantendo componentes e dados independentes do provedor. Sem banco, runtime contínuo ou plataforma externa obrigatória.

- Preparar tokens a partir da marca + pranchas e componentização local.
- Se a complexidade de manutenção realmente exigir ferramenta, avaliar um build local/CI pequeno que exporte arquivos estáticos; isso não implica necessidade de Node em produção. **Ferramenta ainda não selecionada.**
- Reservar mecanismo de formulário sob interface substituível; protótipo deve indicar indisponibilidade de envio e nunca apresentar resposta de sucesso fictícia.
- Sem CI de deploy, ambientes públicos, domínio/DNS, chaves nem serviços pagos.
- Fontes Inter somente sob condições adequadas de licença e distribuição.
- Preferir assets locais/licenciados, formatos responsivos e ausência de layout shift.

## Alternativas
1. Site estático sem build obrigatório (opção provisória mínima).
2. Gerador estático com etapa de build local, se necessário para componentes/reutilização.
3. Framework com servidor ou CMS: adiar até requisito aprovado e compatibilidade comprovada.

## Critérios de validação da ADR para PR-01
O aceite da etapa autoriza a **alternativa mínima reversível com exportação estática e build de desenvolvimento sem dependências externas**, sem fixar a tecnologia definitiva da hospedagem. Exigir execução real de testes locais e CI, atualização dos checkpoints, e verificação futura do design antes da PR-02. A escolha final de hospedagem, adaptadores de formulário e deploy permanece pendente.
**Esta ADR não altera a regra de não publicar e não supõe compatibilidade com servidor específico.**
