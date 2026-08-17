# Definição da Prova de Conceito (PoC) — AprovaMat

> Documento que formaliza a "fatia mínima" do sistema a ser implementada na
> Etapa 2, seguindo o fluxo: **Persona → Jornada → Tela → Código**.

## 1. Persona atendida

**Mariana Souza** — estudante de 17 anos, 3º ano do Ensino Médio, alta
familiaridade com tecnologia, sofre com ansiedade pré-vestibular e
desorganização de conteúdos. Escolhida porque sua jornada mapeada
(Quadro 2 do PI) cobre diretamente as 4 funcionalidades core do MVP.

## 2. Jornada implementada

Recorte das etapas 1 a 4 da "Jornada do Usuário: Mariana Souza":

| Etapa da jornada original | Ação nesta PoC |
|---|---|
| 1. Acesso | Login simplificado no sistema |
| 2. Cadastro | (simplificado — login direto, sem formulário extenso) |
| 3. Uso Principal | Responder ao diagnóstico inicial e a exercícios com feedback imediato |
| 4. Confirmação | Visualizar painel de evolução simplificado |

*Etapa 5 (Retorno/notificações) fica fora do escopo da PoC — é pós-MVP.*

## 3. Telas necessárias (Frontend)

1. **Tela de Login** — autenticação simples (e-mail/senha ou login social simulado).
2. **Tela de Diagnóstico** — exibe até 10 questões da matriz ENEM, uma por vez ou em lista.
3. **Tela de Resultado/Feedback** — mostra gabarito comentado e dica após cada resposta.
4. **Painel de Evolução** — % de acertos por assunto + dias consecutivos de estudo.

## 4. Implementação necessária (Backend + Banco)

| Endpoint | Função |
|---|---|
| `POST /login` | Autentica o usuário e retorna um token |
| `GET /diagnostico` | Retorna as questões do teste de nivelamento |
| `POST /diagnostico/responder` | Recebe respostas, calcula acerto/erro, devolve feedback comentado |
| `GET /evolucao/:usuarioId` | Retorna % de acertos por assunto e streak de dias |

**Banco de dados:** tabelas `usuarios`, `questoes`, `respostas`.
(Detalhamento completo em `docs/API.md`.)

## 5. Fora do escopo desta PoC (fica para depois)

- Cadastro completo / recuperação de senha
- Simulados de 45 questões cronometrados
- Gamificação (ranking, moedas, medalhas)
- Cronograma dinâmico e revisão adaptativa por IA

## 6. Critério de sucesso da PoC

A PoC é considerada bem-sucedida se um usuário conseguir, do início ao fim,
sem intervenção manual no banco: **logar → responder ao menos 1 questão do
diagnóstico → ver o feedback comentado → visualizar seu % de acerto no
painel de evolução.** Esse é o fluxo que deve aparecer no vídeo pitch de 60s.
