let indice = 0;
let pontos = 0;

function carregarPergunta() {
  if (indice >= perguntas.length) {
    encerrarFase();
    return;
  }

  document.getElementById("pergunta").innerText = perguntas[indice].pergunta;
  const opcoes = document.getElementById("opcoes");
  opcoes.innerHTML = "";

  perguntas[indice].opcoes.forEach((opcao, i) => {
    const botao = document.createElement("button");
    botao.innerText = opcao;
    botao.onclick = () => verificarResposta(i);
    opcoes.appendChild(botao);
  });
}

function verificarResposta(resposta) {
  if (resposta === perguntas[indice].correta) {
    pontos += 10;
  }
  indice++;
  carregarPergunta();
}

function encerrarFase() {
  // Bônus de 10 pontos se acertou todas
  if (pontos === 100) {
    pontos += 10;
  }

  localStorage.setItem(`fase${faseAtual}`, pontos);

  if (pontos > 70) {
    // Vai para próxima fase ou final
    if (faseAtual < 3) {
      window.location.href = `fase${faseAtual + 1}.html`;
    } else {
      window.location.href = "final.html";
    }
  } else {
    window.location.href = "gameover.html";
  }
}

document.addEventListener("DOMContentLoaded", carregarPergunta);
