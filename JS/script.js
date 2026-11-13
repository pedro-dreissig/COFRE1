
let senhaSecreta;
let tentativas = 0;
let jogoAtivo = true;

const limiteTentativas = 7;

// Elementos do HTML

const numero = document.getElementById("numero");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("tentativas");
const alerta = document.getElementById("alerta");
const imagemCofre = document.getElementById("imagemCofre");
const overview = document.getElementById("overview");
const resultado = document.getElementById("resultado");

// Gera uma senha aleatória entre 1 e 50

function gerarSenha() {

    senhaSecreta = Math.floor(Math.random() * 50) + 1;

}

// Verifica a senha digitada

function verificarSenha() {

    if (!jogoAtivo) {
        return;
    }

    let valor = numero.value;
    let palpite = Number(valor);

    // Verifica se o número é válido

    if (
        valor === "" ||
        !Number.isInteger(palpite) ||
        palpite < 1 ||
        palpite > 50
    ) {

        mensagem.innerText = "Digite um número entre 1 e 50!";

        return;
    }

    // Conta a tentativa

    tentativas++;

    contador.innerText = "Tentativas: " + tentativas + " / 5";

    numero.value = "";

    // Se acertar a senha

    if (palpite === senhaSecreta) {

        mensagem.innerText = "Senha correta!";

        jogoAtivo = false;

        imagemCofre.src = "imagens/cofre-aberto.png";

        imagemCofre.classList.add("aberto");

        resultado.innerText =
            "Você descobriu a senha em " + tentativas + " tentativa(s)!";

        overview.style.display = "flex";

        return;
    }

    // Se o número secreto for maior

    if (palpite < senhaSecreta) {

        mensagem.innerText = "A senha é maior!";

    }

    // Se o número secreto for menor

    else {

        mensagem.innerText = "A senha é menor!";

    }

    // Alerta quando restarem 2 tentativas

    if (tentativas === 5) {

        alerta.innerText = "⚠️ Atenção! Restam apenas 2 tentativas!";

        alerta.classList.add("perigo");

    }

    // Se acabarem as tentativas

    if (tentativas === limiteTentativas) {

        jogoAtivo = false;

        mensagem.innerText = "Você esgotou suas tentativas!";

        alerta.innerText = "A senha secreta era: " + 8;

        alerta.classList.remove("perigo");

    }

}

// Permite jogar apertando Enter

numero.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        verificarSenha();

    }

});

// Reinicia o jogo

function reiniciarJogo() {

    tentativas = 0;

    jogoAtivo = true;

    gerarSenha();

    numero.value = "";

    mensagem.innerText = "Aguardando tentativa";

    contador.innerText = "Tentativas: 0 /5";

    alerta.innerText = "";

    alerta.classList.remove("perigo");

    imagemCofre.src = "imagens/cofre-fechado.png";

    imagemCofre.classList.remove("aberto");

    overview.style.display = "none";

}

// Inicia o jogo

gerarSenha();
