
/* ==========================================
SISTEMA DE DIÁLOGOS - SANTA GLÓRIA
========================================== */

// Elementos da interface
const interfaceDialogo = document.getElementById("interfaceDialogo");
const imagemPersonagem = document.getElementById("imagemPersonagem");
const nomePersonagem = document.querySelector(".nome-personagem");
const textoDialogo = document.querySelector(".texto-dialogo");

// Controle da conversa
let falaAtual = 0;
let dialogoAtivo = false;


/* ==========================================
LISTA DE FALAS
========================================== */

// Adicione, remova ou edite as falas aqui.

const falas = [

    {
        nome: "Amélia",
        imagem: "personagem.png",
        texto: "Eu finalmente cheguei... Mas esse lugar parece tão estranho..."
    },

    {
        nome: "Amélia",
        imagem: "personagem.png",
        texto: "Espera... O que é aquilo na porta?"
    }

];


/* ==========================================
MOSTRAR UMA FALA
========================================== */

function mostrarFala() {

    // Verifica se ainda existem falas
    if (falaAtual >= falas.length) {

        finalizarDialogo();

        return;
    }

    // Obtém a fala atual
    const fala = falas[falaAtual];

    // Atualiza as informações
    nomePersonagem.textContent = fala.nome;

    textoDialogo.textContent = fala.texto;

    imagemPersonagem.src = fala.imagem;

    imagemPersonagem.alt = fala.nome;

}


/* ==========================================
INICIAR DIÁLOGO
========================================== */

function iniciarDialogo() {

    falaAtual = 0;

    dialogoAtivo = true;

    interfaceDialogo.style.display = "block";

    mostrarFala();

}


/* ==========================================
AVANÇAR PARA A PRÓXIMA FALA
========================================== */

function proximaFala() {

    // Impede avançar se o diálogo estiver encerrado
    if (!dialogoAtivo) return;

    falaAtual++;

    mostrarFala();

}


/* ==========================================
FINALIZAR DIÁLOGO
========================================== */

function finalizarDialogo() {

    dialogoAtivo = false;

    interfaceDialogo.style.display = "none";

    falaAtual = 0;

}


/* ==========================================
AVANÇAR COM CLIQUE
========================================== */

document.addEventListener("click", function(event) {

    if (!dialogoAtivo) return;

    // Não avançar ao interagir com os elementos
    // de investigação ou outros controles.

    if (
        event.target.closest("button") ||
        event.target.closest("input") ||
        event.target.closest(".overlay") ||
        event.target.closest(".papel-overlay")
    ) {
        return;
    }

    proximaFala();

});


/* ==========================================
AVANÇAR COM ENTER OU ESPAÇO
========================================== */

document.addEventListener("keydown", function(event) {

    if (!dialogoAtivo) return;

    if (
    document.getElementById("quadroOverlay").style.display === "flex" ||
    document.getElementById("papelOverlay").style.display === "flex"
) {
    return;
}

    if (event.repeat) return;

    if (
        event.key === "Enter" ||
        event.code === "Space"
    ) {

        // Impede comportamentos padrão do teclado
        event.preventDefault();

        proximaFala();

    }

});


/* ==========================================
AGUARDAR O FADE-IN
========================================== */

window.addEventListener("load", function() {

    // Se a página estiver usando fade-in,
    // aguarda os 1,5 segundos da animação.

    const possuiFade = document.documentElement
        .classList.contains("fade-in-historia");

    const duracaoFade = possuiFade ? 1500 : 0;

    setTimeout(function() {

        iniciarDialogo();

    }, duracaoFade);

});
