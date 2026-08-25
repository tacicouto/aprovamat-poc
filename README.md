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

Utilizaremos nesse projeto o banco de dados MySQL, o qual é disponibilizado gratuitamente por algumas plataformas de dados em nuvem, principalmente para testes, estudos ou pequenos projetos.
A plataforma escolhida foi a Aiven, um serviço de dados em nuvem que gerencia tecnologias de código aberto (como PostgreSQL, MySQL, Apache Kafka e OpenSearch) para empresas. O sistema facilita a criação, a segurança e a operação de bancos de dados e ferramentas de streaming em grandes provedores de nuvem e, também, disponibiliza planos gratuitos para estudos e pequenos projetos.


### Acesso ao Aiven:
https://aiven.io/free-mysql-database

### Resumo do Serviço 
Serviço: MySQL - Version MySQL 8.4.8; 
Name: mysql-29052f0f; 
Service tier: free; 
Cloud: North America; 
Plan: Free 1 GB, 1 CPU, 1 GB RAM, 1 GB storage, Backups for disaster recovery; 
Organization: Eight Bits Organization; 
Project: aprovamat26; 
Database: aprova_mat; 

### Connection Information
Service URI: mysql:// CLICK_TO:REVEAL_PASSWORD @mysql-29052f0f-aprovamat26.c.aivencloud.com:22464/defaultdb?ssl-mode=REQUIRED; 
Database name: defaultdb; 
Host: mysql-29052f0f-aprovamat26.c.aivencloud.com; 
Port: 22464; 
User: avnadmin; 
Password: **********; 
SSL mode: REQUIRED; 
CA certificate: Show

### BD_AprovaMat 

Como o banco de dados do Aiven fica hospedado na nuvem, ele fornece uma URL pública (Host) e uma porta de conexão. Qualquer programa ou aplicativo conectado à internet pode se comunicar com ele, independentemente do sistema operacional.
Abaixo estão as instruções para configurar o ambiente de desenvolvimento local.

### 🛠️ Pré-requisitos e Ferramentas Recomendadas
* **MySQL Server** (Versão 8.0 ou superior)
* **MySQL Workbench** (ou DBeaver / ferramenta de sua preferência)
* **Plano Gratuito de MySQL do Aiven** (O Aiven é uma plataforma de nuvem que oferece ferramentas de dados de código aberto (Open Source) de forma totalmente gerenciada.)
* **VS Code** (Visual Studio Code)

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

#### 🚀 Como testar o acesso ao Banco de Dados:
Para executar um teste de funcionamento foi criado um código em PYthon com os seguintes requisitos: 

1- Informações ao usuário: nome,email,senha_hash,status_usuario,origem_cadastro,device_token,ultimo_login,data_cadastro e data_atualizacao;  
2- Conectar ao Banco de dados MySQL da Aiven e gravar na tabela usuarios da base dados aprova_mat; e  
3- Utilizar o aquivo .env, o qual está no mesmo diretório do ca.pem.  

Foi gerado o arquivo "cadastro_usuario.py", o qual está adicionado ao repósitorio na pasta BD_AprovaMat.

O teste foi executado por meio a execução do script no terminal do VS Code, dentro da pasta BD_AprovaMat.

Após adicionar os dados solicitados pelo programa, foi consultado por meio do Workbench a seguinte informação na tabela usuarios da base dados aprova_mat, no Banco de Dados criado no Aiven.

**id:	1  88**
**nome:	Jorge Aragão**
**email:	jaragao@gmail.com**  
**senha_hash:	8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92**  
**status_usuario:	ativo**  
**origem_cadastro:	web** 
**device_token:	a1b2c3d4e5**  
**ultimo_login:	2026-08-22 09:04:42**  
**data_cadastro:	2026-08-22 09:04:42**  
**data_atualizacao:	2026-08-22 09:04:42** 

##### Como Criar a Conta e Ativar o Serviço (naõ é necessário para utilizar o banco de dados no projeto)
    1. Acesse o site oficial do Aiven e faça o seu cadastro gratuito (não exige cartão de crédito).
    2. Dentro do console do Aiven, clique em Create service (Criar serviço).
    3. Selecione a opção MySQL.
    4. Escolha um provedor de nuvem (como AWS ou Google Cloud) e a região geográfica mais próxima do Brasil (ex: southamerica-east1 em São Paulo, se disponível no plano gratuito).
    5. Na escolha do plano de preço, selecione a categoria Free (Gratuito). O plano gratuito oferece 1 GB de armazenamento e 1 GB de RAM.
    6. Dê um nome ao seu serviço e clique em Create service. Aguarde alguns minutos até que o status mude para Running (Executando).

### 3. Construção das tabelas utilizadas no Banco de Dados MySQL.

O projeto AprovaMat possui em seu banco de dados três tabelas:  
1- tabela_questoes;  
2- tabela_respostas; e  
3- tabela_usuarios.  
As quais, estão presentes na figura abaixo:  

<img width="1307" height="716" alt="figura_tabelas" src="https://github.com/user-attachments/assets/bf23f600-04ee-4686-8be9-5949b059f501" />
  
### 4. Código SQL para o MYSQL Workbench utilizado na construção das tabelas: <br> 
#### Primeira etapa: Criação do Banco de Dados "aprova_mat" e da tabela "tabela_usuários":<br> 
-- 1. Cria o banco de dados com o nome que você escolher (pode alterar aqui) <br> 
CREATE DATABASE aprova_mat;<br> 
-- 1. Garante que estamos usando o banco de dados correto<br> 
USE aprova_mat;<br> 
-- 2. Cria a tabela de usuários adaptada para múltiplas plataformas<br> 
-- 1. Cria a base de dados<br> 
CREATE DATABASE aprova_mat;<br> 
-- 2. Seleciona a base de dados para uso<br> 
USE aprova_mat;<br> 
-- 3. Cria apenas a tabela de usuários<br> 
CREATE TABLE usuarios (<br>
    id INT AUTO_INCREMENT PRIMARY KEY,<br>
    nome VARCHAR(100) NOT NULL,<br>
    email VARCHAR(100) UNIQUE NOT NULL,<br>
    senha_hash VARCHAR(255) NOT NULL,              -- Para senhas criptografadas<br>
    status_usuario ENUM('ativo', 'inativo', 'pendente') DEFAULT 'pendente',<br>
    -- Campos para suporte a iOS, Android, Windows e Linux<br>
    origem_cadastro ENUM('ios', 'android', 'windows', 'linux', 'web') NOT NULL,<br>
    device_token VARCHAR(255) NULL,                -- Para notificações Push em celulares<br>
    ultimo_login DATETIME NULL,<br>
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,<br>
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP<br>
);<br>
#### Segunda e última etapa: Criação das tabelas "tabela_questoes" e "tabela_respostas":<br> 
-- 1. Criação da Tabela de Questões (Ajustada para o MySQL) <br>
CREATE TABLE questoes (<br>
    id INT AUTO_INCREMENT PRIMARY KEY,<br>
    assunto VARCHAR(100) NOT NULL,                  -- Ex: 'Geometria', 'Funções'<br>
    enunciado TEXT NOT NULL,                        -- A pergunta em si<br>
    -- No MySQL simplificado, separamos as alternativas em colunas fixas para a PoC<br>
    alternativa_a VARCHAR(255) NOT NULL,<br>
    alternativa_b VARCHAR(255) NOT NULL,<br>
    alternativa_c VARCHAR(255) NOT NULL,<br>
    alternativa_d VARCHAR(255) NOT NULL,<br>
    -- Deve conter exatamente o texto de uma das alternativas acima <br>
    correta VARCHAR(255) NOT NULL                   <br>
);<br>
-- 2. Criação da Tabela de Respostas (Inicia vazia, preenchida pelo backend)<br>
CREATE TABLE respostas (<br>
    id INT AUTO_INCREMENT PRIMARY KEY,<br>
    usuario_id INT NOT NULL,                       -- ID do usuário que respondeu<br>
    questao_id INT NOT NULL,                       -- ID da questão respondida<br>
    acertou BOOLEAN NOT NULL,                      -- Substitui o verdadeiro/falso (TRUE ou FALSE)<br>
    data_resposta DATE NOT NULL,                   -- Armazena a data (Ex: '2026-08-19')<br>    
    -- Chaves estrangeiras para ligar o ecossistema e garantir a integridade dos dados<br>
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,<br>
    FOREIGN KEY (questao_id) REFERENCES questoes(id) ON DELETE CASCADE<br>
);<br>
