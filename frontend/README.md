# Frontend — AprovaMat (PoC)

Interface web do fluxo principal da PoC: **Login → Diagnóstico → Feedback comentado → Painel de evolução**.

Construído em **HTML + CSS + JavaScript puro**, sem frameworks e sem etapa de build — é só abrir o `index.html` no navegador.

## Como testar localmente

1. Baixe/copie a pasta `frontend/` inteira (com as subpastas `css/` e `js/`).
2. Dê dois cliques no arquivo `index.html` — ele abre direto no navegador.
3. Faça login com qualquer e-mail e senha preenchidos (veja o motivo abaixo).
4. Responda as questões do diagnóstico — cada uma mostra feedback comentado na hora.
5. Ao final, você é levada ao painel de evolução com seu desempenho da sessão.

Não é necessário nenhum servidor rodando para testar — os dados vêm de uma camada simulada (explicada abaixo).

## Estrutura de arquivos

```
frontend/
├── index.html          → Tela de Login
├── diagnostico.html    → Tela de Diagnóstico + Feedback comentado
├── evolucao.html        → Painel de Evolução
├── css/
│   └── style.css       → Estilos de todas as telas
└── js/
    ├── api.js           → Camada de dados (mock + integração real)
    ├── login.js         → Lógica da tela de Login
    ├── diagnostico.js   → Lógica do quiz e feedback
    └── evolucao.js      → Lógica do painel de evolução
```

## Modo simulado (`USE_MOCK`)

Todo o frontend consome dados através de um único arquivo: **`js/api.js`**. Ele tem uma configuração no topo:

```js
const CONFIG = {
  USE_MOCK: true,
  BASE_URL: "http://localhost:8000",
  LATENCIA_SIMULADA_MS: 500
};
```

Com `USE_MOCK: true` (padrão atual), as telas funcionam com dados fictícios/simulados, **no mesmo formato exato** que os endpoints reais do backend devolvem (baseado em `docs/API.md` e nos schemas reais de `backend/app/schemas`).

**Quando o backend estiver pronto para uso real**, para conectar de verdade:

1. Em `js/api.js`, troque `USE_MOCK` para `false`.
2. Ajuste `BASE_URL` para o endereço onde o backend estiver rodando.
3. Nenhuma outra tela ou arquivo precisa ser alterado — todas chamam só as funções de `AprovaMatAPI` (`login`, `getDiagnostico`, `responderDiagnostico`, `getEvolucao`).

## Questões usadas no diagnóstico

As 7 questões vêm da tabela `questoes` do banco real (fornecidas pelo Cesar), cobrindo os assuntos **Geometria** e **Funções**. Os ids duplicados (4, 5 e 6, cópias de 1, 2 e 3) foram removidos do mock.

## Pendências conhecidas (dependem de outras partes do grupo)

| Pendência | Status | Time responsável |
|---|---|---|
| Endpoint `POST /login` | Não implementado no backend ainda | Liângela / Luciana |
| CORS no backend | Não configurado — bloqueia chamadas reais do navegador | Liângela / Luciana |
| Campo `diasConsecutivos` | Ausente no schema `EvolucaoUsuario` real | Liângela / Luciana |
| Questões duplicadas no banco (ids 4, 5, 6) | Aguardando correção | Cesar |

Até que esses pontos sejam resolvidos, o frontend segue em **modo simulado** para permitir demonstração completa do fluxo (inclusive para o vídeo pitch da PoC).

## Acessibilidade e responsividade

- Contraste de cores testado para leitura confortável.
- Navegação por teclado com foco visível em botões e campos.
- Layout responsivo (funciona em telas de celular).
- Sem uso de vermelho puro para respostas erradas — decisão de design pensada na persona (Mariana, ansiedade pré-vestibular), evitando um estímulo visual associado a alarme/erro grave.
