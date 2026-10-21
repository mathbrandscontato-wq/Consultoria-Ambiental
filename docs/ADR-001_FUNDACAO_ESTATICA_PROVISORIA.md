# ADR-001 | Fundação de desenvolvimento reversível (PROPOSTA, NÃO APROVADA)
Data: 21/10/2026. Status: **proposta aguardando validação arquitetural**.

## Contexto
Desenvolvimento local e em GitHub, hospedagem do cliente desconhecida e expressamente fora do escopo deste ciclo. Páginas institucionais com fotografia e grafismo topográfico; necessidade de preservar G2 V5. Formulário com backend/destinatário ainda indefinidos.

## Proposta reversível
Adotar, apenas após aprovação desta ADR, **saída estática** com HTML semântico, CSS moderno e JavaScript modular progressivo, mantendo componentes e dados independentes do provedor. Sem banco, runtime contínuo ou plataforma externa obrigatória.

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
Aprovação técnica explícita da alternativa, entendimento dos efeitos no fluxo de manutenção, garantia de preservação do design, procedimento de teste local e CI. A escolha final de hospedagem, adaptadores de formulário e deploy permanecerá pendente.
**Esta ADR não altera a regra de não publicar e não supõe compatibilidade com servidor específico.**
