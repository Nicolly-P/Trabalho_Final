
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

// Indica que o diálogo após o uniforme terminou
let dialogoUniformeFinalizado = false;

// ==========================================
// LISTA DE FALAS INICIAIS
// ==========================================

let falas = [
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

    if (imagemPersonagem) {
        imagemPersonagem.src = fala.imagem;
        imagemPersonagem.alt = fala.nome;
    }
}

// ==========================================
// CONTROLAR VISIBILIDADE DO INVENTÁRIO
// ==========================================

function controlarInventario(ocultar) {

    const inventario = document.getElementById("inventarioJogador");

    if (!inventario) return;

    inventario.style.display = ocultar ? "none" : "";
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
// DIÁLOGOS PERSONALIZADOS
// ==========================================
function iniciarDialogoPersonalizado(novasFalas) {

    // Substitui a lista de falas
    falas = [...novasFalas];

    falaAtual = 0;
    dialogoAtivo = true;

    // Mantém o inventário escondido
    controlarInventario(true);

    // Esconde as opções antigas
    if (opcoesDialogo) {
        opcoesDialogo.style.display = "none";
    }

    // Atualiza o conteúdo antes de mostrar a interface
    const fala = falas[0];

    nomePersonagem.textContent = fala.nome;
    textoDialogo.textContent = fala.texto;

    if (imagemPersonagem) {
        imagemPersonagem.src = fala.imagem;
        imagemPersonagem.alt = fala.nome;
        imagemPersonagem.style.display = "block";
    }

    // Só agora mostra a interface
    interfaceDialogo.style.display = "block";
}

/* ==========================================
   REPRODUZIR SOM E INICIAR NOVO DIÁLOGO
========================================== */

function reproduzirSomEIniciarDialogo() {

    const arquivoSom = "../assets/audio/porta.mp3";

    // Mantém o inventário escondido
    controlarInventario(true);

    // Esconde a interface de diálogo durante o áudio
    interfaceDialogo.style.display = "none";
    dialogoAtivo = false;

    // Verifica se os efeitos sonoros estão ativados
    const efeitosAtivos =
        localStorage.getItem("efeitosAtivos") !== "false";

    // Se os efeitos estiverem desligados, continua imediatamente
    if (!efeitosAtivos) {
        iniciarProximoDialogo();
        return;
    }

    // Cria o áudio
    const som = new Audio(arquivoSom);

    som.preload = "auto";

    // Só inicia o próximo diálogo quando o áudio terminar
    som.addEventListener("ended", function() {

        iniciarProximoDialogo();

    }, { once: true });

    // Informa no console caso exista algum problema com o arquivo
    som.addEventListener("error", function() {

        console.error(
            "Não foi possível reproduzir o efeito sonoro:",
            arquivoSom,
            som.error
        );

    }, { once: true });

    // Inicia a reprodução
    som.play().catch(function(erro) {

        console.error("Erro ao iniciar o áudio:", erro);

    });
}
// ==========================================
// PRÓXIMO DIÁLOGO
// ==========================================
function iniciarProximoDialogo() {

    const imagemIara = "../assets/imagens/Iara.png";

    const novasFalas = [
        {
            nome: "???",
            imagem: imagemIara,
            texto: "..."
        },

        {
            nome: "???",
            imagem: imagemIara,
            texto: "O que você ta fazendo aqui?"
        }
    ];

    const imagemTemporaria = new Image();

    imagemTemporaria.onload = function() {
        iniciarDialogoPersonalizado(novasFalas);
    };

    imagemTemporaria.onerror = function() {
        console.error("Não foi possível carregar a imagem da Iara.");
        iniciarDialogoPersonalizado(novasFalas);
    };

    imagemTemporaria.src = imagemIara;
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

    // Se terminou o diálogo após o uniforme,
    // reproduz o som antes do próximo diálogo
    if (dialogoUniformeFinalizado) {

        dialogoUniformeFinalizado = false;

        reproduzirSomEIniciarDialogo();

    } else {

        // Só mostra o inventário quando a conversa terminar
        controlarInventario(false);

    }
}

// ==========================================
// INICIAR ESCOLHA DO UNIFORME
// ==========================================

function iniciarEscolhaUniforme() {

    dialogoAtivo = false;

    interfaceDialogo.style.display = "block";

    // Esconde a imagem lateral da personagem
    if (imagemPersonagem) {
        imagemPersonagem.style.display = "none";
    }

    // Mostra o nome e o texto
    nomePersonagem.textContent = "Amélia";

    textoDialogo.textContent =
        "Um uniforme... Será que devo experimentar?";

    // Mostra as opções
    opcoesDialogo.style.display = "flex";
}

// ==========================================
// ESCOLHER UMA OPÇÃO
// ==========================================

function escolherUniforme(opcao) {

    // Impede que a escolha seja feita novamente
    opcoesDialogo.style.display = "none";

    const escolhas = [
        "Acho que devo experimentar este uniforme.",
        "Finalmente, algo que pode me ajudar a passar despercebida."
    ];

    textoDialogo.textContent = escolhas[opcao];

    // Aguarda antes de mostrar a apresentação
    setTimeout(function() {

        interfaceDialogo.style.display = "none";

        apresentacaoUniforme.style.display = "flex";

    }, 900);
}

// ==========================================
// FECHAR APRESENTAÇÃO DO UNIFORME
// ==========================================

function fecharApresentacaoUniforme(event) {

    // Impede que o clique continue até o documento
    if (event) {
        event.stopPropagation();
    }

    // Fecha a apresentação
    apresentacaoUniforme.style.display = "none";

    const falasDepoisUniforme = [
        {
            nome: "Amélia",
            imagem: "../assets/imagens/personagem.png",
            texto: "Finalmente, agora posso segu-"
        }
    ];

    dialogoUniformeFinalizado = true;

    iniciarDialogoPersonalizado(falasDepoisUniforme);
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
        event.target.closest(".papel-overlay") ||
        event.target.closest("#apresentacaoUniforme")
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
    // tiver a sequência inicial de falas
    if (interfaceDialogo && textoDialogo) {

        setTimeout(function() {

            if (!interfaceDialogo.dataset.pularDialogoInicial) {
                iniciarDialogo();
            }

        }, duracaoFade);

    }

});
