/* =========================================================
   AprovaMat — Camada de dados (api.js)
   ---------------------------------------------------------
   Este arquivo concentra TODA a comunicação com o backend.
   Hoje ele funciona em modo SIMULADO (dados fictícios, mas
   no MESMO formato exato descrito em docs/API.md e nos
   schemas reais do backend/app/schemas).

   QUANDO O BACKEND ESTIVER 100% PRONTO (login + CORS ok):
   1. Troque CONFIG.USE_MOCK para false
   2. Ajuste CONFIG.BASE_URL para o endereço real da API
   Nenhuma outra tela precisa ser alterada — todas chamam
   só as funções deste arquivo (AprovaMatAPI.login, etc.)
   ========================================================= */

const CONFIG = {
  USE_MOCK: true,
  BASE_URL: "http://localhost:8000", // ajustar quando o backend estiver rodando
  LATENCIA_SIMULADA_MS: 500          // deixa o mock "realista" (loading states)
};

/* ---------------------------------------------------------
   BANCO DE QUESTÕES SIMULADO
   (a "correta" fica só aqui, do lado do "servidor" simulado
   — o front nunca recebe a resposta certa antes de responder,
   exatamente como aconteceria com o backend real)
--------------------------------------------------------- */
/* Questões reais extraídas de banco_dados/ (tabela_questoes.csv),
   fornecidas pelo Cesar. Os ids 4, 5 e 6 do arquivo original eram
   cópias duplicadas dos ids 1, 2 e 3 e foram removidos aqui — vale
   avisar o grupo para corrigir isso na tabela do banco também.
   O CSV não tem coluna de explicação, então os textos abaixo foram
   escritos com base no próprio enunciado/resposta de cada questão. */
const MOCK_QUESTOES = [
  {
    id: 1,
    assunto: "Geometria",
    enunciado: "Qual a área de um quadrado de lado 5cm?",
    alternativas: ["10cm²", "20cm²", "25cm²", "30cm²"],
    correta: "C",
    explicacao: "Área do quadrado = lado × lado = 5 × 5 = 25cm²."
  },
  {
    id: 2,
    assunto: "Funções",
    enunciado: "Uma empresa de táxi cobra uma taxa fixa de R$ 5,00 mais R$ 2,00 por quilômetro rodado. Qual a expressão da função que calcula o preço P em relação aos quilômetros x?",
    alternativas: ["P(x) = 5x + 2", "P(x) = 2x + 5", "P(x) = 7x", "P(x) = 2x - 5"],
    correta: "B",
    explicacao: "A taxa fixa (R$ 5,00) não muda, e o valor por km (R$ 2,00) é multiplicado por x: P(x) = 2x + 5."
  },
  {
    id: 3,
    assunto: "Geometria",
    enunciado: "Um reservatório de água tem a forma de um bloco retangular com 2m de largura, 3m de comprimento e 1,5m de altura. Qual o volume máximo de água que ele comporta?",
    alternativas: ["6,0 m³", "7,5 m³", "9,0 m³", "10,5 m³"],
    correta: "C",
    explicacao: "Volume do bloco retangular = largura × comprimento × altura = 2 × 3 × 1,5 = 9,0 m³."
  },
  {
    id: 7,
    assunto: "Geometria",
    enunciado: "Qual é a soma dos ângulos internos de um triângulo?",
    alternativas: ["90°", "180°", "270°", "360°"],
    correta: "B",
    explicacao: "A soma dos ângulos internos de qualquer triângulo é sempre 180°."
  },
  {
    id: 8,
    assunto: "Funções",
    enunciado: "Qual o valor de f(x) = 3x - 5 quando x = 4?",
    alternativas: ["5", "7", "12", "17"],
    correta: "B",
    explicacao: "f(4) = 3×4 − 5 = 12 − 5 = 7."
  },
  {
    id: 9,
    assunto: "Geometria",
    enunciado: "Um triângulo retângulo possui catetos medindo 3cm e 4cm. Qual o comprimento da hipotenusa?",
    alternativas: ["5cm", "6cm", "7cm", "12cm"],
    correta: "A",
    explicacao: "Pelo Teorema de Pitágoras: hipotenusa² = 3² + 4² = 9 + 16 = 25 → hipotenusa = 5cm."
  },
  {
    id: 10,
    assunto: "Funções",
    enunciado: "O gráfico de uma função afim f(x) = ax + b é uma linha reta. Se a > 0, o que se pode afirmar sobre a função?",
    alternativas: ["Ela é decrescente", "Ela é constante", "Ela é crescente", "Ela passa pela origem"],
    correta: "C",
    explicacao: "Quando o coeficiente 'a' (angular) é positivo, a reta sobe da esquerda para a direita — a função é crescente."
  }
];

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const AprovaMatAPI = {

  /* POST /login
     ⚠️ Este endpoint ainda não existe no backend real.
     O mock aqui aceita qualquer e-mail/senha preenchidos,
     só para permitir demonstrar o fluxo completo. */
  async login(email, senha) {
    if (CONFIG.USE_MOCK) {
      await esperar(CONFIG.LATENCIA_SIMULADA_MS);
      if (!email || !senha) {
        throw new Error("Preencha e-mail e senha.");
      }
      return {
        token: "mock-token-" + Date.now(),
        usuario: { id: 1, nome: email.split("@")[0] }
      };
    }
    const resp = await fetch(`${CONFIG.BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });
    if (!resp.ok) throw new Error("E-mail ou senha inválidos.");
    return resp.json();
  },

  /* GET /diagnostico */
  async getDiagnostico() {
    if (CONFIG.USE_MOCK) {
      await esperar(CONFIG.LATENCIA_SIMULADA_MS);
      // nunca devolve o campo "correta" — igual ao backend real
      return MOCK_QUESTOES.map(({ id, assunto, enunciado, alternativas }) => ({
        id, assunto, enunciado, alternativas
      }));
    }
    const resp = await fetch(`${CONFIG.BASE_URL}/diagnostico`);
    if (!resp.ok) throw new Error("Não foi possível carregar as questões.");
    return resp.json();
  },

  /* POST /diagnostico/responder */
  async responderDiagnostico(usuarioId, questaoId, alternativaEscolhida) {
    if (CONFIG.USE_MOCK) {
      await esperar(CONFIG.LATENCIA_SIMULADA_MS);
      const questao = MOCK_QUESTOES.find(q => q.id === questaoId);
      const correta = questao.correta === alternativaEscolhida;
      return {
        correta,
        alternativaCorreta: questao.correta,
        explicacao: questao.explicacao
      };
    }
    const resp = await fetch(`${CONFIG.BASE_URL}/diagnostico/responder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuarioId, questaoId, alternativaEscolhida })
    });
    if (!resp.ok) throw new Error("Não foi possível enviar sua resposta.");
    return resp.json();
  },

  /* GET /evolucao/:usuarioId */
  async getEvolucao(usuarioId) {
    if (CONFIG.USE_MOCK) {
      await esperar(CONFIG.LATENCIA_SIMULADA_MS);
      // Baseado 100% no schema real (schemas/evolucao.py).
      // Obs: "diasConsecutivos" ainda não existe no backend real —
      // mantido aqui como mock para não deixar a tela incompleta
      // na demonstração; remover/ajustar quando o campo existir.
      return {
        usuarioId: Number(usuarioId),
        totalRespondidas: 7,
        totalAcertos: 6,
        totalErros: 1,
        percentualAcertos: 85.7,
        diasConsecutivos: 3,
        desempenhoPorAssunto: [
          { assunto: "Geometria", respondidas: 5, acertos: 4, erros: 1, percentual: 80.0 },
          { assunto: "Funções", respondidas: 2, acertos: 2, erros: 0, percentual: 100.0 }
        ]
      };
    }
    const resp = await fetch(`${CONFIG.BASE_URL}/evolucao/${usuarioId}`);
    if (!resp.ok) throw new Error("Não foi possível carregar sua evolução.");
    return resp.json();
  }
};
