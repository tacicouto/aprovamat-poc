import os
import hashlib
from datetime import datetime
import mysql.connector
from dotenv import load_dotenv

# 1. Carrega as configurações do arquivo .env
load_dotenv()

# Configura o caminho absoluto do certificado ca.pem de forma dinâmica
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
nome_certificado = os.environ.get("DB_SSL_CA", "ca.pem")
caminho_completo_ssl = os.path.join(BASE_DIR, nome_certificado)

print("=" * 50)
print("📝 SISTEMA DE CADASTRO DE USUÁRIOS - APROVAMAT")
print("=" * 50)

# 2. Coleta dos dados que fazem sentido o usuário digitar
nome = input("Digite o nome completo: ").strip()
email = input("Digite o e-mail: ").strip()
senha_pura = input("Digite a senha de acesso: ").strip()
status_usuario = input("Digite o status do usuário (ex: ativo, pendente): ").strip()
origem_cadastro = input("Digite a origem do cadastro (ex: web, app): ").strip()
device_token = input("Digite o token do dispositivo (ou deixe em branco se não houver): ").strip()

# 3. Tratamento automático de segurança e de datas
# Transforma a senha pura em um Hash SHA-256 seguro para salvar no banco
senha_hash = hashlib.sha256(senha_pura.encode('utf-8')).hexdigest()

# Define o momento exato do cadastro para preencher os campos de data e login
agora = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
ultimo_login = agora
data_cadastro = agora
data_atualizacao = agora

# Caso o token do dispositivo tenha sido deixado em branco, envia como Nulo para o banco
if not device_token:
    device_token = None

# 4. Conexão e gravação no MySQL hospedado na Aiven
try:
    conexao = mysql.connector.connect(
        host=os.environ.get("DB_HOST"),
        port=os.environ.get("DB_PORT"),
        user=os.environ.get("DB_USER"),
        password=os.environ.get("DB_PASS"),
        database=os.environ.get("DB_NAME"),
        ssl_ca=caminho_completo_ssl
    )
    
    if conexao.is_connected():
        cursor = conexao.cursor()
        
        # Query SQL estruturada para inserir na tabela 'usuarios'
        comando_sql = """
        INSERT INTO usuarios (
            nome, email, senha_hash, status_usuario, 
            origem_cadastro, device_token, ultimo_login, 
            data_cadastro, data_atualizacao
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        
        # Tupla com os dados mapeados na ordem correta das colunas
        valores = (
            nome, email, senha_hash, status_usuario, 
            origem_cadastro, device_token, ultimo_login, 
            data_cadastro, data_atualizacao
        )
        
        # Executa o comando e salva as alterações (Commit)
        cursor.execute(comando_sql, valores)
        conexao.commit()
        
        print(f"\n🎉 SUCESSO: Usuário '{nome}' gravado na tabela 'usuarios' da Aiven!")
        
        cursor.close()
        conexao.close()

except mysql.connector.Error as erro:
    print(f"\n❌ ERRO ao interagir com o banco de dados: {erro}")
print("=" * 50)
