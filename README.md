# AprovaMat — Prova de Conceito (PoC)

Projeto Integrador III — SENAC EAD, 2026.
Professor: Adriano Milanez.

## Objetivo

O AprovaMat é uma plataforma híbrida (Web e Mobile) para apoiar estudantes
de 15 a 30 anos na preparação de matemática para o ENEM, combatendo a
ansiedade e a baixa proficiência através de microlearning, feedback
imediato e acompanhamento de evolução.

Esta PoC implementa o fluxo: **login → diagnóstico inicial → feedback
comentado → painel de evolução**, conforme detalhado em
[`docs/DEFINICAO_POC.md`](docs/DEFINICAO_POC.md).

## Integrantes

- [preencher] — Cesar Alexandre Parazi
- [preencher] — Larissa Ferreira de Oliveira
- [preencher] — Larissa Queiroz de Almeida Silva
- [preencher] — Liângela do Nascimento Mariano
- [preencher] — Lucas Karam Toralles de Morais
- [preencher] — Luciana Aparecida Ramalho
- [preencher] — Samuel Santos Mendes
- [preencher] — Taciana Michele Couto

## Estrutura do repositório

```
meu-projeto-integrador/
├── frontend/        # Aplicação React (telas)
├── backend/         # API Node/Express + banco de dados
├── docs/
│   ├── DEFINICAO_POC.md
│   └── API.md        # contrato de endpoints
└── README.md
```

## Tecnologias utilizadas

- Frontend: [preencher — ex: React + Vite]
- Backend: [preencher — ex: Node.js + Express]
- Banco de dados: [preencher — ex: SQLite]

## Como rodar o projeto

### Backend
```bash
cd backend
npm install
npm run dev
```
O servidor sobe em `http://localhost:3001`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
A aplicação sobe em `http://localhost:5173` (ou porta indicada no terminal).

> Variáveis de ambiente (se necessárias): copiar `.env.example` para `.env`
> em cada pasta e preencher os valores. [preencher se aplicável]

## Demonstração

- Vídeo pitch (até 60s): [link do YouTube ou arquivo `demo_projeto.mp4`]
- Prints das telas: [preencher, se optarem por prints em vez de vídeo]

## Documentação adicional

- [Definição da PoC](docs/DEFINICAO_POC.md)
- [Contrato de API](docs/API.md)

## Banco de Dados
### BD_AprovaMat
Servirá de ferramenta para desenvolvimento da funcionalidade de Banco Dados a ser utilizada nesse projeto.


### BD_AprovaMat 📊 

Este repositório contém o banco de dados do projeto AprovaMat. Abaixo estão as instruções para configurar o ambiente de desenvolvimento local.

### 🛠️ Pré-requisitos e Ferramentas Recomendadas
* **MySQL Server** (Versão 8.0 ou superior)
* **MySQL Workbench** (ou DBeaver / ferramenta de sua preferência)
* **Plano Gratuito de MySQL do Aiven** (O Aiven é uma plataforma de nuvem que oferece ferramentas de dados de código aberto (Open Source) de forma totalmente gerenciada.)
* **VS Code** (Visual Studio Code)

### ⚙️ Configuração do Banco de Dados (MySQL)

### 1. Variáveis de Ambiente (.env)
As variáveis de ambiente funcionam exatamente em conjunto com o seu código Python. O arquivo .env atua como um "cofre de segurança" secreto ao lado do seu arquivo de código. O Python lê esse arquivo, carrega as credenciais para a memória do computador e as entrega para o conector do MySQL na hora de fazer o envio ou a requisição dos dados.
Para conectar a aplicação ao banco de dados, é necessário a utilização do arquivo`.env` na raiz do seu projeto local (este arquivo **não** deve ser enviado ao GitHub) com as seguintes credenciais:

```env
DB_HOST=mysql-29052f0f-aprovamat26.c.aivencloud.com
DB_PORT=22464
DB_USER=avnadmin
DB_PASS=Adicione sua senha aqui.(Solictar a senha ao Administrador do Banco de Dados)
DB_NAME=aprova_mat
DB_SSL_CA=ca.pem
```
### 🔑 Configuração de Segurança (SSL)
Para conectar ao banco em nuvem do Aiven, o projeto exige o uso de SSL:
1. Acesse o painel do Aiven e baixe o arquivo `ca.pem` (CA Certificate).
2. Cole o arquivo `ca.pem` diretamente na raiz da pasta `BD_AprovaMat`.
3. Renomeie ou crie o seu arquivo `.env` baseando-se no `.env.example`.

### 2. Inicializando o Banco de Dados
