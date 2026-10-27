# Contato — formulário progressivo em desenvolvimento

## Situação real

Implementação isolada no código-fonte, **não publicada, sem coleta ou transmissão habilitada**. A rota pública `/contato/` deve permanecer com o conteúdo anterior. Não existe endpoint/destinatário de recebimento nem política de privacidade verificados no site estático auditado. Esses fatos bloqueiam a ativação conforme seção 12.12 do prompt mestre.

O protótipo informa explicitamente que é uma prévia de desenvolvimento e pede que não sejam utilizados dados reais. Não há formulário HTML com action, submissão GET implícita, storage, analytics, persistência, URLs com dados pessoais nem chamada de rede padrão. Os dados ficam apenas na memória da instância JavaScript.

## Fluxo implementado

- Uma pergunta principal por vez: nome; perfil; serviço; descrição; cidade/UF; canal e contato.
- Registro único dos sete serviços em `src/content/services.mjs`; `?servico=s01` a `s07` pré-selecionam sem impedir edição. Valores inválidos são ignorados.
- Seleção explícita, sem avanço automático de rádios.
- Validação específica por etapa; nomes acentuados/compostos; UF oficial; telefone brasileiro com DDD e normalização `+55`; e-mail; limites de tamanho; textarea multilinha.
- Máscara de telefone ao digitar no fim e ao sair; edição intermediária preserva o cursor.
- Progresso de preenchimento 0%, 16,7%, 33,3%, 50%, 66,7%, 83,3% e 100% na revisão. Não representa entrega.
- Voltar preserva respostas. Editar na revisão abre diretamente a etapa e salva diretamente de volta. Cancelar a edição restaura o valor anterior validado.
- Feedback de erros associado por `aria-describedby` e `aria-invalid`, foco em campo inválido; foco nos títulos nas mudanças de etapa sem abrir teclado móvel automaticamente.
- `Enter` em input pode avançar; textarea mantém quebra de linha.
- Revisão em texto, sem interpolar dados em HTML; nenhuma política, base legal ou consentimento fictício.
- Envio permanece desabilitado com aviso explícito. Não há confirmação fictícia.

## Registro de componentes

| ID | Referência solicitada | Implementação local | Fidelidade |
|---|---|---|---|
| C01 | [React Bits Split Text](https://reactbits.dev/text-animations/split-text) | Título semanticamente contínuo, palavras em spans acessíveis ocultos da árvore e WAAPI com stagger vertical de 450ms; repetido em cada etapa | Adaptação técnica da mecânica; não utiliza código original |
| C02 | [React Bits Animated Content](https://reactbits.dev/animations/animated-content) | Saída de 150ms, entrada de 350ms, direção invertida ao voltar; campos e alternativas montados após saída | Adaptação técnica. Saída bidirecional é código do projeto |
| C03 | [React Bits Fade Content](https://reactbits.dev/animations/fade-content) | Suporte e revisão entram com o estágio; título possui animação própria e não recebe fade individual duplicado | Adaptação técnica |
| C04 | Barra de progresso do projeto | `<progress>` com contador textual e `aria-valuetext`, atualizada por navegação | Componente próprio |
| C05 | Seleção animada do projeto | Rádios nativos com estados de foco, selecionado, hover e alteração de superfície sem layout shift | Componente próprio |

Não foi copiado ou inventado um prompt original de componente. As URLs acima identificam as referências do documento aprovado; o código é nativo, sem React, GSAP ou dependências adicionais. O sistema respeita movimento reduzido e não esconde conteúdo se uma animação falhar.

## Adaptador de envio e requisitos pendentes

`createSubmissionAdapter()` é fail-closed. Por padrão, `enabled=false` e qualquer tentativa rejeita antes de rede. Somente recebe transporte quando houver HTTPS, aprovação explícita de privacidade e segurança e implementação `fetch` fornecida. Essas flags são contrato de configuração, **não comprovam por si só** a segurança do servidor.

Contrato preparado: JSON de campos mínimos, validação antes da rede, timeout 15s, `Idempotency-Key` reutilizado após falha com mesmos dados, bloqueio de chamadas concorrentes, recusa de redirects e confirmação exigindo `{accepted:true, receipt:"identificador"}`. Uma confirmação indica recebimento pelo serviço, não entrega em caixa de entrada. Somente após confirmação a UI limpa os dados e exibe o estado recebido.

Antes de ativar, ainda é obrigatório implementar/verificar no servidor: destino autorizado; validação; rate limiting/antispam; idempotência efetiva; acesso; segredos; retenção; informações de privacidade; teste controlado de recebimento. Nenhum desses itens foi declarado concluído.

## Verificações executadas

`node --test tests/contact-flow.test.mjs`: **8 testes aprovados, zero falhas** nesta implementação.

Cobertura: normalização e quebras de linha; sete pré-seleções; opções desconhecidas; limites e UF; telefone/e-mail; progressão e preservação; edição direta e cancelamento; adaptador sem transmissão; rejeição de confirmação ambígua; chave estável em retentativa; duplicidades concorrentes e pós-recebimento; dados inválidos bloqueados antes da rede; render de desenvolvimento sem submissão HTML implícita.

`node --check src/scripts/contact-development.mjs`: aprovado.

Testes de adaptador usam transporte em memória para verificação unitária e nunca são prova de entrega real. QA visual, teclado virtual, tecnologia assistiva e integração real permanecem a validar pelo executor principal. Não registrar a página como publicada ou o formulário como operacional.

## Arquivos e isolamento de release

- `src/lib/pages/contact-development.mjs` — shell de desenvolvimento.
- `src/lib/contact-schema.mjs` — esquema, fluxo e adaptador.
- `src/scripts/contact-development.mjs` — interface conversacional.
- `src/styles/contact-development.css` — estilos isolados.
- `tests/contact-flow.test.mjs` — testes de contrato.

Para QA temporário, os imports do script necessitam de `../lib/contact-schema.mjs` e `../content/services.mjs`. Remover shell, script, CSS e cópias de módulos de desenvolvimento da saída de produção. Não importá-los pelo render de `/contato/` enquanto houver bloqueio.
