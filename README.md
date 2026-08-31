AprovaMat

Prova de Conceito (PoC) de uma plataforma de apoio à aprendizagem de
Matemática, com diagnóstico inicial, feedback imediato e
acompanhamento da evolução do estudante.

Sobre o projeto

O AprovaMat é uma prova de conceito de uma solução educacional
voltada ao apoio de estudantes no desenvolvimento de competências
matemáticas.

A PoC foi concebida a partir da jornada da persona Mariana Souza,
estudante do 3º ano do Ensino Médio, e concentra-se no fluxo essencial:

Login → Diagnóstico → Resolução de questões → Feedback imediato →
Painel de evolução

O objetivo da PoC é demonstrar a experiência inicial do estudante no
AprovaMat, desde o acesso à plataforma até a realização do diagnóstico,
o recebimento de feedback e a visualização de sua evolução.

Critério de sucesso da PoC

A PoC cumpre seu objetivo quando o estudante consegue:

acessar o sistema;

responder ao diagnóstico;

receber feedback sobre a resposta;

visualizar seu desempenho e sua evolução.

O detalhamento funcional está em
docs/DEFINICAO_POC.md.

Funcionalidades

Atualmente demonstradas

Tela de login simplificada;

Diagnóstico de Matemática;

Questões organizadas por assunto;

Alternativas de múltipla escolha;

Correção imediata;

Feedback explicativo;

Indicador de progresso;

Contagem de acertos durante o diagnóstico;

Painel de evolução;

Desempenho geral;

Desempenho por assunto;

Interface responsiva;

Navegação por teclado e foco visual;

Modo mock no frontend para demonstração sem necessidade de
backend.

Em desenvolvimento / integração

Autenticação real;

Integração completa entre frontend e backend;

Persistência integral das respostas;

Cálculo de evolução a partir do banco;

Controle de usuários;

Configuração da comunicação entre frontend e API;

Evolução adaptativa e recursos de personalização.

Jornada do estudante

Login
  ↓
Diagnóstico
  ↓
Responder questão
  ↓
Feedback imediato
  ↓
Há mais questões?
  ├── Sim → Responder próxima questão
  └── Não → Painel de evolução

Arquitetura

O projeto está organizado em três camadas principais:

AprovaMat/
├── frontend/       → Interface web
├── backend/        → API REST em FastAPI
├── banco_dados/    → Documentação e recursos do MySQL
└── docs/           → Documentação funcional e contrato da API

Visão geral da comunicação

┌──────────────────────┐
│      Frontend        │
│   HTML + CSS + JS    │
└──────────┬───────────┘
           │ HTTP/JSON
           ▼
┌──────────────────────┐
│       FastAPI        │
│    Controllers      │
│      Services       │
│    Repositories     │
└──────────┬───────────┘
           │ SQLAlchemy
           ▼
┌──────────────────────┐
│        MySQL         │
│      usuarios        │
│       questoes       │
│      respostas       │
└──────────────────────┘

Backend

O backend utiliza uma organização em camadas:

backend/app/
├── controllers/   → Rotas HTTP
├── services/      → Regras de negócio
├── repositories/  → Acesso aos dados
├── schemas/       → Modelos de entrada/saída
├── models/        → Modelos ORM
├── core/          → Configuração de banco
└── main.py        → Aplicação FastAPI

Essa separação facilita a evolução da PoC para uma aplicação mais
completa.

Tecnologias

Camada                Tecnologia

Frontend              HTML5
Estilos               CSS3
Lógica de interface   JavaScript
Backend               Python
API                   FastAPI
Servidor ASGI         Uvicorn
ORM                   SQLAlchemy
Banco de dados        MySQL
Driver MySQL          PyMySQL
Configuração          python-dotenv / pydantic-settings
Banco em nuvem        Aiven

Como executar

Pré-requisitos

Para executar a aplicação completa, recomenda-se:

Python 3.10 ou superior;

pip;

MySQL 8 ou superior;

Git;

navegador moderno;

opcionalmente, VS Code, DBeaver ou MySQL Workbench.

Executando somente o frontend

Essa é a maneira mais simples de demonstrar a PoC, pois o frontend pode
utilizar dados simulados.

Entre na pasta:

cd frontend

Abra o arquivo index.html no navegador.

Para utilizar um servidor HTTP local:

python -m http.server 5500

Depois acesse:

http://localhost:5500

Modo mock

O arquivo frontend/js/api.js possui uma configuração que permite
executar o frontend sem backend:

const CONFIG = {
  USE_MOCK: true,
  BASE_URL: "http://localhost:8000",
  LATENCIA_SIMULADA_MS: 500
};

Com USE_MOCK: true, o frontend funciona sem necessidade de conexão com
a API ou com o banco de dados.

Esse modo é especialmente útil para apresentações, testes de interface e
demonstração do fluxo da PoC.

Executando o backend

1. Entre na pasta

cd backend

2. Crie um ambiente virtual

Windows:

python -m venv .venv
.venv\Scripts\activate

Linux/macOS:

python3 -m venv .venv
source .venv/bin/activate

3. Instale as dependências

pip install -r requirements.txt

4. Configure as variáveis de ambiente

O backend utiliza variáveis de ambiente para a configuração do banco de
dados. Um exemplo:

DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=aprova_mat

Importante: não publique senhas, tokens ou outras credenciais de
acesso no GitHub.

5. Inicie a API

A partir da pasta backend:

uvicorn app.main:app --reload --port 8000

A API ficará disponível em:

http://localhost:8000

A documentação automática do FastAPI estará disponível em:

http://localhost:8000/docs

A documentação alternativa estará disponível em:

http://localhost:8000/redoc

Teste de saúde

GET http://localhost:8000/health

Resposta esperada:

{
  "status": "ok"
}

Banco de dados

A PoC utiliza MySQL e foi estruturada em torno de três entidades
principais:

usuarios
   │
   ├──────────────┐
   ▼              ▼
respostas ───── questoes

Principais tabelas

usuarios

Armazena os usuários da plataforma.

questoes

Armazena informações como:

assunto;

enunciado;

alternativas;

resposta correta.

respostas

Registra informações como:

usuário;

questão;

resultado da resposta;

data da resposta.

As respostas possuem relacionamento com usuários e questões por meio de
chaves estrangeiras.

Banco em nuvem

O projeto possui documentação para utilização do Aiven como serviço
de MySQL.

As instruções estão em banco_dados/README.md.

API

O contrato funcional da API está documentado em
docs/API.md.

Principais endpoints

Método   Endpoint                   Finalidade

GET      /                        Verifica se o backend está funcionando
GET      /health                  Health check
GET      /diagnostico             Retorna questões do diagnóstico
POST     /diagnostico/responder   Registra e corrige uma resposta
GET      /evolucao/{usuario_id}   Retorna evolução do estudante
GET      /questoes                Lista questões
POST     /questoes                Cria uma questão
GET      /questoes/{questao_id}   Consulta uma questão
PUT      /questoes/{questao_id}   Atualiza uma questão
DELETE   /questoes/{questao_id}   Exclui uma questão

A documentação interativa pode ser acessada em:

http://localhost:8000/docs

Fluxo de demonstração

Para apresentar a PoC rapidamente:

1. Abra o frontend

Abra:

frontend/index.html

2. Faça login

No modo mock, qualquer e-mail e senha preenchidos são aceitos.

3. Responda ao diagnóstico

As questões são apresentadas uma a uma.

4. Observe o feedback

O sistema apresenta informações sobre:

acerto ou erro;

alternativa correta;

explicação da solução.

5. Consulte a evolução

Ao final, o sistema apresenta informações como:

percentual de acertos;

total de questões respondidas;

desempenho por assunto;

indicador de sequência de estudos.

Frontend

O frontend não utiliza framework ou etapa de build.

Estrutura principal:

frontend/
├── index.html
├── diagnostico.html
├── evolucao.html
├── css/
│   └── style.css
└── js/
    ├── api.js
    ├── login.js
    ├── diagnostico.js
    └── evolucao.js

A camada api.js foi estruturada para permitir a alternância entre o
modo mock e a API real sem modificar a lógica principal das telas.

Para utilizar a API real:

const CONFIG = {
  USE_MOCK: false,
  BASE_URL: "http://localhost:8000"
};

A integração completa ainda depende da implementação da autenticação
real e da conclusão dos demais pontos de integração entre frontend e
backend.

Documentação

Documento                                          Conteúdo

docs/DEFINICAO_POC.md   Escopo, persona, jornada e
critérios de sucesso

docs/API.md                       Contrato da API

frontend/README.md         Funcionamento detalhado do frontend

Estado atual e próximos passos

Esta versão deve ser entendida como uma Prova de Conceito (PoC),
concentrada na demonstração da experiência inicial do estudante.

Como evolução futura da plataforma, destacam-se:

integração completa entre frontend e backend;

implementação de autenticação e gerenciamento de usuários;

aprimoramento do banco de questões e do acompanhamento do
desempenho;

expansão do painel de evolução;

implementação de recomendações personalizadas de aprendizagem;

criação de testes automatizados;

preparação da infraestrutura para um ambiente de produção;

desenvolvimento de recursos de aprendizagem adaptativa e,
futuramente, integração com recursos de Inteligência Artificial.

Segurança e privacidade

Como o AprovaMat pode tratar dados relacionados a estudantes, uma futura
evolução para ambiente de produção deverá considerar requisitos de
segurança, privacidade e proteção de dados pessoais, incluindo os
princípios e obrigações aplicáveis da LGPD (Lei nº 13.709/2018).

Entre as boas práticas recomendadas estão:

não armazenar senhas em texto puro;

utilizar mecanismos seguros de proteção de senhas;

não versionar arquivos .env;

não expor credenciais do banco;

utilizar HTTPS;

controlar permissões de acesso;

minimizar a coleta de dados pessoais.

Equipe

Projeto AprovaMat --- Prova de Conceito

Repositório:

https://github.com/tacicouto/aprovamat-poc

Licença

A licença do projeto ainda não está definida.

Antes da distribuição pública ou utilização em produção, recomenda-se
definir formalmente a licença do código e, quando aplicável, as
condições de uso dos conteúdos educacionais, questões e demais ativos do
projeto.

Visão de evolução

A arquitetura da PoC permite que o AprovaMat evolua progressivamente de
um fluxo demonstrativo para uma plataforma educacional orientada por
dados.

Uma possibilidade de evolução é transformar cada resposta do estudante
em informação pedagógica útil:

Resposta
   ↓
Diagnóstico
   ↓
Identificação de lacuna
   ↓
Recomendação
   ↓
Nova atividade
   ↓
Nova evidência de aprendizagem
   ↓
Evolução do estudante

Esse ciclo pode constituir a base de um futuro motor adaptativo de
aprendizagem, capaz de personalizar a experiência de estudo a partir das
evidências de desempenho de cada estudante.
