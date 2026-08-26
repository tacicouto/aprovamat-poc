const form = document.getElementById("formLogin");
const btnEntrar = document.getElementById("btnEntrar");
const alerta = document.getElementById("alertaErro");
const badgeMock = document.getElementById("badgeMock");

if (!CONFIG.USE_MOCK) badgeMock.style.display = "none";

form.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  alerta.classList.remove("show");

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;

  btnEntrar.disabled = true;
  btnEntrar.textContent = "Entrando...";

  try {
    const resultado = await AprovaMatAPI.login(email, senha);
    const params = new URLSearchParams({
      usuarioId: resultado.usuario.id,
      nome: resultado.usuario.nome
    });
    window.location.href = `diagnostico.html?${params.toString()}`;
  } catch (erro) {
    alerta.textContent = erro.message || "Não foi possível entrar. Tente novamente.";
    alerta.classList.add("show");
    btnEntrar.disabled = false;
    btnEntrar.textContent = "Entrar";
  }
});
