
/* ==========================================
   SISTEMA DE DIÁLOGOS - SANTA GLÓRIA
========================================== */

// ELEMENTOS DA INTERFACE
const interfaceDialogo = document.getElementById("interfaceDialogo");
const imagemPersonagem = document.getElementById("imagemPersonagem");
const nomePersonagem = document.querySelector(".nome-personagem");
const textoDialogo = document.querySelector(".texto-dialogo");

// ELEMENTOS DA ESCOLHA
const opcoesDialogo = document.getElementById("opcoesDialogo");
const apresentacaoUniforme = document.getElementById("apresentacaoUniforme");

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
// INICIAR ESCOLHA DO UNIFORME
// ==========================================

function iniciarEscolhaUniforme() {

    dialogoAtivo = false;

    interfaceDialogo.style.display = "block";

    // Esconde a imagem lateral da personagem, se existir
    if (imagemPersonagem) {
        imagemPersonagem.style.display = "none";
    }

    // Mostra o nome e o texto
    nomePersonagem.textContent = "Amélia";

    textoDialogo.textContent =
        "Um uniforme... Será que devo experimentar?";

    // Mostra as opções de escolha
    opcoesDialogo.style.display = "flex";
}

// ==========================================
// ESCOLHER UMA OPÇÃO
// ==========================================

function escolherUniforme(opcao) {

    // Impede que a escolha seja feita novamente
    opcoesDialogo.style.display = "none";

    // Textos correspondentes às escolhas
    const escolhas = [
        "Acho que devo experimentar este uniforme.",
        "Finalmente, algo que pode me ajudar a passar despercebida."
    ];

    textoDialogo.textContent = escolhas[opcao];

    // Aguarda um pequeno intervalo antes da apresentação
    setTimeout(function() {

        interfaceDialogo.style.display = "none";

        apresentacaoUniforme.style.display = "flex";

    }, 900);
}

// ==========================================
// FECHAR APRESENTAÇÃO DO UNIFORME
// ==========================================

function fecharApresentacaoUniforme() {

    apresentacaoUniforme.style.display = "none";

    // Restaura a imagem lateral para os diálogos normais
    if (imagemPersonagem) {
        imagemPersonagem.style.display = "";
    }
}

// ==========================================
// AVANÇAR COM CLIQUE
// ==========================================

document.addEventListener("click", function(event) {

    if (!dialogoAtivo) return;

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

    // Só inicia o diálogo automático se a página
    // tiver a sequência inicial de falas.
    if (interfaceDialogo && textoDialogo) {

        setTimeout(function() {

            if (!interfaceDialogo.dataset.pularDialogoInicial) {
                iniciarDialogo();
            }

        }, duracaoFade);

    }

});
