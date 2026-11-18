/* ==========================================
   SISTEMA DE DIÁLOGOS - SANTA GLÓRIA
========================================== */

// ELEMENTOS DA INTERFACE
const interfaceDialogo = document.getElementById("interfaceDialogo");
const imagemPersonagem = document.getElementById("imagemPersonagem");
const nomePersonagem = document.querySelector(".nome-personagem");
const textoDialogo = document.querySelector(".texto-dialogo");

// CONTROLE DA CONVERSA
let falaAtual = 0;
let dialogoAtivo = false;

// ==========================================
// LISTA DE FALAS
// ==========================================
const falas = [
    {
        nome: "Amélia",
        imagem: "../assets/imagens/personagem.png",
        texto: "Eu finalmente cheguei... Mas esse lugar parece tão estranho..."
    },

    {
        nome: "Amélia",
        imagem: "../assets/imagens/personagem.png",
        texto: "Espera... O que é aquilo na porta?"
    }
];

// ==========================================
// MOSTRAR UMA FALA
// ==========================================
function mostrarFala() {

    if (falaAtual >= falas.length) {
        finalizarDialogo();
        return;
    }

    const fala = falas[falaAtual];

    nomePersonagem.textContent = fala.nome;
    textoDialogo.textContent = fala.texto;
    imagemPersonagem.src = fala.imagem;
    imagemPersonagem.alt = fala.nome;
}

// ==========================================
// INICIAR DIÁLOGO
// ==========================================
function iniciarDialogo() {
    falaAtual = 0;
    dialogoAtivo = true;

    interfaceDialogo.style.display = "block";

    mostrarFala();
}

// ==========================================
// AVANÇAR PARA A PRÓXIMA FALA
// ==========================================
function proximaFala() {

    if (!dialogoAtivo) return;

    falaAtual++;

    mostrarFala();
}

// ==========================================
// FINALIZAR DIÁLOGO
// ==========================================
function finalizarDialogo() {
    dialogoAtivo = false;

    interfaceDialogo.style.display = "none";

    falaAtual = 0;
}

// ==========================================
// AVANÇAR COM CLIQUE
// ==========================================
document.addEventListener("click", function(event) {

    if (!dialogoAtivo) return;

    // Não avança ao interagir com botões, campos ou overlays.
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

// ==========================================
// AVANÇAR COM ENTER OU ESPAÇO
// ==========================================
document.addEventListener("keydown", function(event) {

    if (!dialogoAtivo) return;

    const quadroOverlay = document.getElementById("quadroOverlay");
    const papelOverlay = document.getElementById("papelOverlay");

    if (
        (quadroOverlay && quadroOverlay.style.display === "flex") ||
        (papelOverlay && papelOverlay.style.display === "flex")
    ) {
        return;
    }

    if (event.repeat) return;

    if (
        event.key === "Enter" ||
        event.code === "Space"
    ) {
        event.preventDefault();

        proximaFala();
    }
});

// ==========================================
// AGUARDAR O FADE-IN
// ==========================================
window.addEventListener("load", function() {

    const possuiFade = document.documentElement
        .classList.contains("fade-in-historia");

    const duracaoFade = possuiFade ? 1500 : 0;

    setTimeout(function() {
        iniciarDialogo();
    }, duracaoFade);

});