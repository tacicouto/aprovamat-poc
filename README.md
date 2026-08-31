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

O objetivo da PoC é demonstrar a experiência inicial do estudante no AprovaMat, desde o acesso à plataforma até a realização do diagnóstico, o recebimento de feedback e a visualização de sua evolução.

Critério de sucesso da PoC

A PoC cumpre seu objetivo quando o estudante consegue, sem intervenção
manual no banco:

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

CORS e configuração para comunicação entre frontend e API;

Evolução adaptativa e recursos de personalização.

Jornada do estudante

flowchart LR
    A[Login] --> B[Diagnóstico]
    B --> C[Responder questão]
    C --> D[Feedback imediato]
    D --> E{Há mais questões?}
    E -->|Sim| C
    E -->|Não| F[Painel de evolução]

Arquitetura

O projeto está organizado em três camadas principais:

AprovaMat
├── frontend/       → Interface web
├── backend/        → API REST em FastAPI
├── banco_dados/    → Documentação e recursos do MySQL
└── docs/           → Documentação funcional e contrato da API

Visão geral da comunicação

┌──────────────────────┐
│      Frontend        │
│ HTML + CSS + JS      │
└──────────┬───────────┘
           │ HTTP/JSON
           ▼
┌──────────────────────┐
│       FastAPI        │
│ Controllers          │
│ Services             │
│ Repositories         │
└──────────┬───────────┘
           │ SQLAlchemy
           ▼
┌──────────────────────┐
│        MySQL         │
│ usuarios             │
│ questoes             │
│ respostas            │
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

Essa separação facilita a evolução da PoC para uma aplicação de
produção.

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

1. Pré-requisitos

Para executar a aplicação completa, recomenda-se:

Python 3.10+

pip

MySQL 8+

Git

navegador moderno;

opcionalmente VS Code, DBeaver ou MySQL Workbench.

2. Executando somente o frontend

Passo 1 --- entre na pasta

cd frontend

Passo 2 --- abra index.html

É possível abrir o arquivo diretamente no navegador.

Para uma experiência mais próxima de um ambiente web real,
recomenda-se utilizar um servidor HTTP local, por exemplo:

python -m http.server 5500

Depois acesse:

http://localhost:5500

Modo mock

O arquivo:

frontend/js/api.js

possui a configuração:

const CONFIG = {
  USE_MOCK: true,
  BASE_URL: "http://localhost:8000",
  LATENCIA_SIMULADA_MS: 500
};

Com:

USE_MOCK: true

o frontend funciona sem backend e sem banco de dados.

Isso é especialmente útil para apresentações, testes de UX e
demonstração do fluxo da PoC.

Executando o backend

1. Entre na pasta

cd backend

2. Crie um ambiente virtual

Windows

python -m venv .venv
.venv\Scripts\activate

Linux/macOS

python3 -m venv .venv
source .venv/bin/activate

3. Instale as dependências

pip install -r requirements.txt

4. Configure as variáveis de ambiente

O backend utiliza as seguintes variáveis:

DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=aprova_mat

Não publique senhas, tokens ou outras credenciais no GitHub.

5. Inicie a API

A partir da pasta backend:

uvicorn app.main:app --reload --port 8000

A API ficará disponível em:

http://localhost:8000

Documentação automática do FastAPI:

http://localhost:8000/docs

Documentação alternativa:

http://localhost:8000/redoc

Teste de saúde:

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

Armazena:

assunto;

enunciado;

alternativas;

resposta correta.

respostas

Registra:

usuário;

questão;

resultado da resposta;

data da resposta.

As respostas possuem relacionamento com usuários e questões por meio de
chaves estrangeiras.

Banco em nuvem

O projeto possui documentação para utilização do Aiven como serviço
de MySQL.

As instruções estão em:

banco_dados/README.md

Segurança

O certificado ca.pem é utilizado para conexão segura com o serviço de
banco, conforme a configuração do ambiente.

Nunca publique senhas ou credenciais reais no repositório.

Para ambientes compartilhados ou de produção, recomenda-se utilizar:

variáveis de ambiente;

secrets do provedor de hospedagem;

rotação periódica de credenciais;

princípio do menor privilégio;

conexão TLS/SSL devidamente configurada.

API

O contrato funcional da API está documentado em:

docs/API.md

Endpoints principais

Método     Endpoint                   Finalidade

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

frontend/index.html

2. Faça login

No modo mock, qualquer e-mail e senha preenchidos são aceitos.

3. Responda ao diagnóstico

As questões são apresentadas uma a uma.

4. Observe o feedback

O sistema informa:

se a resposta está correta;

qual é a alternativa correta;

uma explicação da solução.

5. Consulte a evolução

Ao final, o sistema apresenta:

percentual de acertos;

total de questões respondidas;

desempenho por assunto;

indicador de sequência de estudos.

Frontend

O frontend não utiliza framework ou etapa de build.

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

A camada api.js foi desenhada como uma fachada de comunicação,
permitindo alternar entre mock e API real sem modificar a lógica das
telas.

Para utilizar o backend real:

const CONFIG = {
  USE_MOCK: false,
  BASE_URL: "http://localhost:8000"
};

O backend atual ainda não implementa o endpoint /login; portanto, o
fluxo completo integrado ainda requer a implementação da autenticação
real.

Documentação

Documento                                          Conteúdo

docs/DEFINICAO_POC.md   Escopo, persona, jornada e
critérios de sucesso

docs/API.md                       Contrato da API

frontend/README.md         Funcionamento detalhado do frontend

Estado atual e próximos passos

Esta versão deve ser entendida como PoC/MVP técnico, e não como
produto pronto para produção.


Segurança e privacidade

Como o AprovaMat trata dados potencialmente relacionados a estudantes, a
evolução para produção deve considerar desde o início requisitos de
segurança, privacidade e proteção de dados pessoais, especialmente
os princípios e obrigações aplicáveis da LGPD (Lei nº 13.709/2018).

Recomenda-se, entre outros pontos:

não armazenar senhas em texto puro;

utilizar hashing apropriado para senhas;

não versionar arquivos .env;

não expor credenciais do banco;

utilizar HTTPS;

controlar permissões de acesso;

registrar eventos relevantes de segurança;

minimizar a coleta de dados pessoais;

definir política de retenção e descarte;

estabelecer mecanismos de auditoria.

Contribuindo

Contribuições são bem-vindas.

Uma sugestão de fluxo:

# 1. Faça um fork do projeto

# 2. Clone seu fork
git clone https://github.com/tacicouto/aprovamat-poc.git

# 3. Entre no projeto
cd aprovamat-poc

# 4. Crie uma branch
git checkout -b feat/minha-melhoria

# 5. Faça suas alterações
git add .
git commit -m "feat: descreve a melhoria"

# 6. Envie para seu fork
git push origin feat/minha-melhoria

# 7. Abra um Pull Request no GitHub

Para mudanças maiores, recomenda-se discutir previamente a proposta com
os responsáveis pelo projeto.

Equipe

Projeto AprovaMat --- Prova de Conceito.

Repositório:

https://github.com/tacicouto/aprovamat-poc

Licença

A licença do projeto ainda não está definida.

Antes da distribuição pública ou utilização em produção, recomenda-se
definir formalmente a licença do código e, quando aplicável, as
condições de uso dos conteúdos educacionais, questões e demais ativos do
projeto.

Visão de evolução

A arquitetura atual foi construída para permitir que a PoC evolua
progressivamente de um fluxo demonstrativo para uma plataforma
educacional orientada por dados.

O próximo salto de valor do AprovaMat está menos na quantidade de
funcionalidades e mais na capacidade de transformar cada resposta do
estudante em informação pedagógica útil:

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
aprendizagem, capaz de personalizar a experiência de estudo a partir
das evidências de desempenho de cada estudante.
