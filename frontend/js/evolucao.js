const urlParams = new URLSearchParams(window.location.search);
const usuarioId = urlParams.get("usuarioId") || "1";
const nome = urlParams.get("nome") || "estudante";
const resultadosBrutos = urlParams.get("resultados");

const badgeMock = document.getElementById("badgeMock");
if (!CONFIG.USE_MOCK) badgeMock.style.display = "none";

/* Se o usuário acabou de terminar o diagnóstico agora (veio da tela
   anterior com os resultados na URL), montamos o painel a partir das
   respostas reais dessa sessão — deixa a demonstração/vídeo mais fiel.
   Caso contrário (ex: entrou direto nessa página), usamos o retorno
   padrão da API (mock ou real). */
function montarEvolucaoAPartirDaSessao(resultados) {
  const totalRespondidas = resultados.length;
  const totalAcertos = resultados.filter(r => r.correta).length;
  const totalErros = totalRespondidas - totalAcertos;
  const percentualAcertos = totalRespondidas
    ? Number(((totalAcertos / totalRespondidas) * 100).toFixed(1))
    : 0;

  const porAssunto = {};
  resultados.forEach(({ assunto, correta }) => {
    if (!porAssunto[assunto]) {
      porAssunto[assunto] = { assunto, respondidas: 0, acertos: 0, erros: 0 };
    }
    porAssunto[assunto].respondidas++;
    if (correta) porAssunto[assunto].acertos++;
    else porAssunto[assunto].erros++;
  });

  const desempenhoPorAssunto = Object.values(porAssunto).map(item => ({
    ...item,
    percentual: Number(((item.acertos / item.respondidas) * 100).toFixed(1))
  }));

  return {
    usuarioId: Number(usuarioId),
    totalRespondidas,
    totalAcertos,
    totalErros,
    percentualAcertos,
    diasConsecutivos: 1, // primeira sessão de estudo detectada agora
    desempenhoPorAssunto
  };
}

function renderizar(dados) {
  document.getElementById("carregando").style.display = "none";
  document.getElementById("conteudoEvolucao").style.display = "block";

  const titulo = document.getElementById("tituloEvolucao");
  if (dados.percentualAcertos >= 70) {
    titulo.textContent = `Muito bem, ${nome}! Você está indo bem.`;
  } else if (dados.percentualAcertos >= 40) {
    titulo.textContent = `Você está no caminho, ${nome}.`;
  } else {
    titulo.textContent = `Todo começo tem seus desafios, ${nome}.`;
  }

  document.getElementById("statPercentual").textContent = `${dados.percentualAcertos}%`;
  document.getElementById("statRespondidas").textContent = dados.totalRespondidas;

  const dias = dados.diasConsecutivos ?? 1;
  document.getElementById("streakPill").textContent =
    `🔥 ${dias} dia${dias === 1 ? "" : "s"} seguido${dias === 1 ? "" : "s"}`;

  const lista = document.getElementById("listaAssuntos");
  lista.innerHTML = "";
  dados.desempenhoPorAssunto.forEach(item => {
    const card = document.createElement("div");
    card.className = "subject-card";
    card.innerHTML = `
      <div class="subject-head">
        <h3>${item.assunto}</h3>
        <span class="subject-pct">${item.percentual}%</span>
      </div>
      <div class="tide-track" style="margin:0 0 6px 0;">
        <div class="tide-fill" style="width:${item.percentual}%"></div>
      </div>
      <div class="subject-meta">${item.acertos} de ${item.respondidas} questões corretas</div>
    `;
    lista.appendChild(card);
  });
}

async function iniciar() {
  try {
    if (resultadosBrutos) {
      const resultados = JSON.parse(resultadosBrutos);
      renderizar(montarEvolucaoAPartirDaSessao(resultados));
    } else {
      const dados = await AprovaMatAPI.getEvolucao(usuarioId);
      renderizar(dados);
    }
  } catch (erro) {
    document.getElementById("carregando").innerHTML =
      `<p style="color:var(--wrong)">${erro.message}</p>`;
  }
}

iniciar();
