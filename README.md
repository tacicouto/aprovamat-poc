# AprovaMat — Prova de Conceito (PoC)

> **Projeto Integrador III** — SENAC EAD, 2026
> Professor: Adriano Milanez

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)]()
[![Licença](https://img.shields.io/badge/licença-acadêmico-lightgrey)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933?logo=node.js&logoColor=white)]()
[![React](https://img.shields.io/badge/frontend-React-61DAFB?logo=react&logoColor=black)]()
[![MySQL](https://img.shields.io/badge/database-MySQL%208.4-4479A1?logo=mysql&logoColor=white)]()

O **AprovaMat** é uma plataforma híbrida (Web e Mobile) voltada a estudantes de 15 a 30 anos que estão se preparando para o **ENEM**. O objetivo é combater a ansiedade pré-vestibular e a baixa proficiência em matemática por meio de **microlearning**, **feedback imediato** e **acompanhamento de evolução**.

Esta PoC (Prova de Conceito) implementa a fatia mínima e funcional do produto, cobrindo o fluxo:

```
Login  →  Diagnóstico inicial  →  Feedback comentado  →  Painel de evolução
```

📄 Especificação completa em [`docs/DEFINICAO_POC.md`](docs/DEFINICAO_POC.md).

---

## Sumário

- [Equipe](#equipe)
- [Objetivo](#-objetivo)
- [Persona e jornada](#-persona-e-jornada)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Estrutura do repositório](#-estrutura-do-repositório)
- [Pré-requisitos](#-pré-requisitos)
- [Como rodar o projeto](#-como-rodar-o-projeto)
- [Banco de dados](#-banco-de-dados)
- [Contrato de API](#-contrato-de-api)
- [Demonstração](#-demonstração)
- [Roadmap / fora do escopo](#-roadmap--fora-do-escopo)

---
## Equipe

Projeto desenvolvido pela equipe:

- Cesar Alexandre Parazi
- Larissa Ferreira de Oliveira
- Larissa Queiroz de Almeida Silva
- Liângela do Nascimento Mariano
- Lucas Karam Toralles de Morais
- Luciana Aparecida Ramalho
- Samuel Santos Mendes
- Taciana Michele Couto

---
## Objetivo

Validar, com o menor esforço possível, se o fluxo essencial do AprovaMat funciona de ponta a ponta: um estudante consegue **entrar no sistema**, **responder a um diagnóstico de nivelamento**, **receber feedback comentado** sobre suas respostas e **visualizar sua evolução** — tudo sem intervenção manual no banco de dados.

## Persona e jornada

A PoC foi construída em torno de uma persona única, escolhida por cobrir diretamente as 4 funcionalidades core do MVP:

> **Mariana Souza**, 17 anos, 3º ano do Ensino Médio. Alta familiaridade com tecnologia, mas sofre com ansiedade pré-vestibular e dificuldade para organizar o conteúdo de estudo.

| Etapa da jornada | O que a PoC entrega |
|---|---|
| 1. Acesso | Login simplificado |
| 2. Cadastro | Simplificado (login direto, sem formulário extenso) |
| 3. Uso principal | Diagnóstico inicial + exercícios com feedback imediato |
| 4. Confirmação | Painel de evolução simplificado |

> Notificações e retorno recorrente (etapa 5 da jornada original) ficam fora do escopo desta PoC.

## Arquitetura

```
┌──────────────┐        HTTP/JSON        ┌──────────────┐        SQL        ┌──────────────┐
│   Frontend    │  ───────────────────▶  │   Backend     │  ─────────────▶  │  MySQL (Aiven) │
│  React + Vite │  ◀───────────────────  │ Node.js + API │  ◀─────────────  │   aprova_mat   │
└──────────────┘                         └──────────────┘                   └──────────────┘
   :5173                                     :3001                          nuvem (SSL/TLS)
```

O backend expõe uma API REST consumida pelo frontend; o contrato de rotas está formalizado em [`docs/API.md`](docs/API.md), permitindo que frontend e backend evoluam em paralelo usando um mock com o mesmo formato.

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Banco de dados | MySQL 8.4 (hospedado na [Aiven](https://aiven.io/free-mysql-database), plano gratuito) |
| Scripts auxiliares | Python (utilitário de carga/teste de usuários) |

## Estrutura do repositório

```
aprovamat-poc/
├── frontend/          # Aplicação React (telas de login, diagnóstico, feedback e evolução)
├── backend/           # API Node/Express que serve o frontend
├── banco_dados/        # Scripts e utilitários de conexão com o MySQL (Aiven)
├── docs/
│   ├── DEFINICAO_POC.md   # Persona, jornada, telas e escopo da PoC
│   └── API.md             # Contrato de endpoints (request/response)
└── README.md
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior + npm
- Acesso a um banco **MySQL** (local ou instância gratuita na Aiven — veja a seção [Banco de dados](#-banco-de-dados))
- Opcional: **MySQL Workbench** ou **DBeaver** para inspecionar as tabelas
- Opcional: **Python 3** para rodar os scripts utilitários da pasta `banco_dados/`

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/tacicouto/aprovamat-poc.git
cd aprovamat-poc
```

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

O servidor sobe em **http://localhost:3001**.

### 3. Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

A aplicação sobe em **http://localhost:5173** (ou na porta indicada no terminal).

### 4. Variáveis de ambiente

Copie `.env.example` para `.env` em cada pasta (`backend/`, e `banco_dados/` quando aplicável) e preencha os valores, incluindo as credenciais do banco de dados descritas na seção abaixo.

## Banco de dados

O projeto usa **MySQL**, hospedado gratuitamente na [Aiven](https://aiven.io/free-mysql-database) — uma plataforma de dados em nuvem que gerencia tecnologias open source (PostgreSQL, MySQL, Kafka, OpenSearch etc.) e oferece um plano gratuito para estudos e projetos pequenos.

| Item | Valor |
|---|---|
| Serviço | MySQL 8.4 |
| Plano | Free — 1 CPU / 1 GB RAM / 1 GB storage, com backups |
| Banco | `aprova_mat` |
| Tabelas principais | `usuarios`, `questoes`, `respostas` |

### Configuração local

1. **Variáveis de ambiente (`.env`)** — na raiz do projeto local (arquivo que **não** deve ser versionado), configure:

   ```env
   DB_HOST=<host fornecido pelo Aiven>
   DB_PORT=<porta fornecida pelo Aiven>
   DB_USER=avnadmin
   DB_PASS=<solicitar ao administrador do banco>
   DB_NAME=aprova_mat
   DB_SSL_CA=ca.pem
   ```

2. **Certificado SSL** — a conexão com o Aiven exige SSL:
   - Baixe o arquivo `ca.pem` (CA Certificate) no painel do Aiven;
   - Coloque-o na raiz da pasta `banco_dados/`;
   - Baseie seu `.env` no `.env.example` do mesmo diretório.

3. **Pré-requisitos recomendados**: MySQL Server 8.0+, MySQL Workbench (ou DBeaver) e VS Code.

> Nunca commite o arquivo `.env` nem o `ca.pem` com credenciais reais — eles ficam de fora do controle de versão via `.gitignore`.

### Criando sua própria instância gratuita (opcional)

Não é necessário para rodar o projeto com o banco já compartilhado pela equipe, mas caso queira subir uma instância própria:

1. Crie uma conta gratuita em [aiven.io](https://aiven.io/) (sem cartão de crédito).
2. No console, clique em **Create service** → selecione **MySQL**.
3. Escolha um provedor de nuvem e a região mais próxima do Brasil.
4. Selecione o plano **Free**.
5. Nomeie o serviço e aguarde o status mudar para **Running**.

## Contrato de API

Especificação completa em [`docs/API.md`](docs/API.md). Resumo das rotas:

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/login` | Autentica o usuário e retorna um token |
| `GET` | `/diagnostico` | Retorna as questões do teste de nivelamento |
| `POST` | `/diagnostico/responder` | Recebe uma resposta, calcula acerto/erro e devolve feedback comentado |
| `GET` | `/evolucao/:usuarioId` | Retorna o percentual de acertos por assunto e o streak de dias consecutivos |

Rotas protegidas exigem o header `Authorization: Bearer <token>`. Erros seguem o formato `{ "erro": "mensagem" }`.

## Demonstração

- Vídeo pitch (até 60s) 


## Roadmap / fora do escopo

Itens deliberadamente deixados de fora desta PoC, para manter o foco no fluxo essencial:

- [ ] Cadastro completo e recuperação de senha
- [ ] Simulados de 45 questões cronometrados
- [ ] Gamificação (ranking, moedas, medalhas)
- [ ] Cronograma dinâmico e revisão adaptativa por IA
- [ ] Notificações e retorno recorrente do usuário

### Critério de sucesso da PoC

A PoC é considerada bem-sucedida se um usuário conseguir, do início ao fim e **sem intervenção manual no banco**:

**logar → responder a pelo menos 1 questão do diagnóstico → ver o feedback comentado → visualizar seu percentual de acerto no painel de evolução.**

---

<p align="center">Feito para o Projeto Integrador III — SENAC EAD, 2026</p>
