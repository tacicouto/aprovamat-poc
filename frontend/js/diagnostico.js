const urlParams = new URLSearchParams(window.location.search);
const usuarioId = urlParams.get("usuarioId") || "1";
const nome = urlParams.get("nome") || "estudante";

document.getElementById("nomeUsuario").textContent = `Oi, ${nome}! Responda com calma — cada questão vem com uma explicação.`;
const badgeMock = document.getElementById("badgeMock");
if (!CONFIG.USE_MOCK) badgeMock.style.display = "none";

let questoes = [];
let indiceAtual = 0;
let respondida = false;
const resultados = []; // { assunto, correta } — usado para montar o painel de evolução

const els = {
  carregando: document.getElementById("carregando"),
  conteudo: document.getElementById("conteudoQuestao"),
  assuntoAtual: document.getElementById("assuntoAtual"),
  enunciado: document.getElementById("enunciado"),
  lista: document.getElementById("listaAlternativas"),
  caixaFeedback: document.getElementById("caixaFeedback"),
  tituloFeedback: document.getElementById("tituloFeedback"),
  textoExplicacao: document.getElementById("textoExplicacao"),
  btnProxima: document.getElementById("btnProxima"),
  tideFill: document.getElementById("tideFill"),
  progressoTexto: document.getElementById("progressoTexto"),
  acertosTexto: document.getElementById("acertosTexto")
};

const LETRAS = ["A", "B", "C", "D", "E"];

async function iniciar() {
  try {
    questoes = await AprovaMatAPI.getDiagnostico();
    atualizarProgresso();
    renderizarQuestaoAtual();
  } catch (erro) {
    els.carregando.innerHTML = `<p style="color:var(--wrong)">${erro.message}</p>`;
  }
}

function atualizarProgresso() {
  const acertos = resultados.filter(r => r.correta).length;
  const pct = questoes.length ? (indiceAtual / questoes.length) * 100 : 0;
  els.tideFill.style.width = pct + "%";
  els.progressoTexto.textContent = `Questão ${Math.min(indiceAtual + 1, questoes.length)} de ${questoes.length}`;
  els.acertosTexto.textContent = `${acertos} acerto${acertos === 1 ? "" : "s"}`;
}

function renderizarQuestaoAtual() {
  respondida = false;
  const questao = questoes[indiceAtual];
  if (!questao) return;

  els.carregando.style.display = "none";
  els.conteudo.style.display = "block";
  els.assuntoAtual.textContent = questao.assunto;
  els.enunciado.textContent = questao.enunciado;
  els.caixaFeedback.classList.remove("show", "ok", "no");
  els.btnProxima.style.display = "none";

  els.lista.innerHTML = "";
  questao.alternativas.forEach((texto, indice) => {
    const letra = LETRAS[indice];
    const botao = document.createElement("button");
    botao.className = "option";
    botao.type = "button";
    botao.innerHTML = `<span class="letter">${letra}</span><span>${texto}</span>`;
    botao.addEventListener("click", () => responder(letra, botao));
    els.lista.appendChild(botao);
  });
}

async function responder(letraEscolhida, botaoClicado) {
  if (respondida) return;
  respondida = true;

  const questao = questoes[indiceAtual];
  const todosOsBotoes = els.lista.querySelectorAll(".option");
  todosOsBotoes.forEach(b => (b.disabled = true));
  botaoClicado.classList.add("is-selected");

  try {
    const feedback = await AprovaMatAPI.responderDiagnostico(
      Number(usuarioId),
      questao.id,
      letraEscolhida
    );

    resultados.push({ assunto: questao.assunto, correta: feedback.correta });

    // Marca visualmente a alternativa certa e a errada (se houver)
    todosOsBotoes.forEach((botao, indice) => {
      const letra = LETRAS[indice];
      if (letra === feedback.alternativaCorreta) botao.classList.add("is-correct");
      if (letra === letraEscolhida && !feedback.correta) botao.classList.add("is-wrong");
    });

    els.tituloFeedback.textContent = feedback.correta
      ? "Certinho! ✅"
      : "Quase lá — vamos rever juntas.";
    els.textoExplicacao.textContent =
      feedback.explicacao || "Continue praticando esse assunto, você está no caminho certo.";
    els.caixaFeedback.classList.add("show", feedback.correta ? "ok" : "no");

    atualizarProgresso();

    const ultimaQuestao = indiceAtual === questoes.length - 1;
    els.btnProxima.style.display = "block";
    els.btnProxima.textContent = ultimaQuestao ? "Ver minha evolução" : "Próxima questão";
  } catch (erro) {
    els.tituloFeedback.textContent = "Ops!";
    els.textoExplicacao.textContent = erro.message;
    els.caixaFeedback.classList.add("show", "no");
  }
}

els.btnProxima.addEventListener("click", () => {
  indiceAtual++;
  if (indiceAtual >= questoes.length) {
    const params = new URLSearchParams({
      usuarioId,
      nome,
      resultados: JSON.stringify(resultados)
    });
    window.location.href = `evolucao.html?${params.toString()}`;
  } else {
    renderizarQuestaoAtual();
    atualizarProgresso();
  }
});

iniciar();
