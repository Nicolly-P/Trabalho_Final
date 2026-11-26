
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
let dialogoUniformeFinalizado = false;

let escolhaAmelia = 0;
let etapaConversa = 0;


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

    controlarInventario(true);

    interfaceDialogo.style.display = "block";

    mostrarFala();
}


// ==========================================
// DIÁLOGOS PERSONALIZADOS
// ==========================================

function iniciarDialogoPersonalizado(novasFalas) {

    falas = [...novasFalas];

    falaAtual = 0;
    dialogoAtivo = true;

    controlarInventario(true);

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

    interfaceDialogo.style.display = "block";
}


// ==========================================
// REPRODUZIR SOM E INICIAR NOVO DIÁLOGO
// ==========================================

function reproduzirSomEIniciarDialogo() {

    const arquivoSom = "../assets/audio/porta.mp3";

    controlarInventario(true);

    interfaceDialogo.style.display = "none";
    dialogoAtivo = false;

    const efeitosAtivos =
        localStorage.getItem("efeitosAtivos") !== "false";

    if (!efeitosAtivos) {
        iniciarProximoDialogo();
        return;
    }

    const som = new Audio(arquivoSom);

    som.preload = "auto";

    som.addEventListener("ended", function() {
        iniciarProximoDialogo();
    }, { once: true });

    som.addEventListener("error", function() {
        console.error(
            "Não foi possível reproduzir o efeito sonoro:",
            arquivoSom,
            som.error
        );

        // Continua a conversa mesmo se o áudio apresentar erro
        iniciarProximoDialogo();
    }, { once: true });

    som.play().catch(function(erro) {
        console.error("Erro ao iniciar o áudio:", erro);

        // Continua a conversa caso o navegador bloqueie o áudio
        iniciarProximoDialogo();
    });
}


// ==========================================
// INICIAR CONVERSA COM IARA
// ==========================================

function iniciarProximoDialogo() {

    const imagemIara = "../assets/imagens/Iara.png";

    etapaConversa = 0;

    const novasFalas = [
        {
            nome: "???",
            imagem: imagemIara,
            texto: "..."
        },

        {
            nome: "???",
            imagem: imagemIara,
            texto: "Por que você está aqui?"
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

    // Verifica se as falas atuais terminaram
    if (falaAtual >= falas.length) {

        // Primeira etapa: mostrar primeira escolha
        if (etapaConversa === 0) {
            mostrarEscolhasAmelia();
            return;
        }

        // Segunda etapa: mostrar segunda escolha
        if (etapaConversa === 1) {
            mostrarEscolhasAmelia();
            return;
        }

        // Terceira etapa: encerrar a conversa
        if (etapaConversa === 2) {
            finalizarDialogo();
            return;
        }
    }

    mostrarFala();
}


// ==========================================
// MOSTRAR ESCOLHAS DE AMÉLIA
// ==========================================

function mostrarEscolhasAmelia() {

    dialogoAtivo = false;

    nomePersonagem.textContent = "Amélia";

    if (imagemPersonagem) {
        imagemPersonagem.src = "../assets/imagens/personagem.png";
        imagemPersonagem.alt = "Amélia";
    }

    // PRIMEIRA ETAPA DE ESCOLHAS
    if (etapaConversa === 0) {

        textoDialogo.textContent = "O que devo responder?";

        opcoesDialogo.innerHTML = `
            <button onclick="escolherRespostaAmelia(0)">
                Eu? É…, eu estou procurando o papel de medicação da Ágata,
                me pediram pra dar a medicação dela agora, mas não encontro em
                lugar nenhum.
            </button>

            <button onclick="escolherRespostaAmelia(1)">
                Eu... Cheguei atrasada! Mas precisava das medicações da Ágata,
                então tentei procurar aqui... Não achei e estava indo para a
                sala de experimentos.
            </button>
        `;
    }

    // SEGUNDA ETAPA DE ESCOLHAS
    else if (etapaConversa === 1) {

        textoDialogo.textContent = "O que devo responder agora?";

        opcoesDialogo.innerHTML = `
            <button onclick="escolherRespostaAmelia(0)">
                Você me ajudaria? Muito Obrigada?
            </button>

            <button onclick="escolherRespostaAmelia(1)">
                Sério? Quer dizer... Claro, eu adoraria.
            </button>
        `;
    }

    opcoesDialogo.style.display = "flex";
    interfaceDialogo.style.display = "block";
}


// ==========================================
// ESCOLHER RESPOSTA DE AMÉLIA
// ==========================================

function escolherRespostaAmelia(opcao) {

    escolhaAmelia = opcao;

    opcoesDialogo.style.display = "none";

    // PRIMEIRA ESCOLHA
    if (etapaConversa === 0) {

        etapaConversa = 1;

        iniciarDialogoPersonalizado([
            {
                nome: "???",
                imagem: "../assets/imagens/Iara.png",
                texto: escolhaAmelia === 0
                    ? "Talvez esteja na sala de experimentos, esse hospital sempre é bagunçado, as coisas nunca estão no lugar certo."
                    : "Atrasada? Sei, mas tem razão, deve estar por lá."
            },

            {
                nome: "???",
                imagem: "../assets/imagens/Iara.png",
                texto: "Bem, gostaria de ajuda para encontrá-lo?"
            }
        ]);

        return;
    }

    // SEGUNDA ESCOLHA
    if (etapaConversa === 1) {

        etapaConversa = 2;

        iniciarDialogoPersonalizado([
            {
                nome: "???",
                imagem: "../assets/imagens/Iara.png",
                texto: escolhaAmelia === 0
                    ? "Não precisa agradecer. Só espero que encontre logo a medicação."
                    : "Certo, apenas me acompanhe."
            },

            {
                nome: "Iara",
                imagem: "../assets/imagens/Iara.png",
                texto: "Ah, mas antes que eu me esqueça... Meu nome é Iara. Você não pareceu me reconhecer."
            }
        ]);

        return;
    }
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

        controlarInventario(false);

    }
}


// ==========================================
// INICIAR ESCOLHA DO UNIFORME
// ==========================================

function iniciarEscolhaUniforme() {

    dialogoAtivo = false;

    interfaceDialogo.style.display = "block";

    if (imagemPersonagem) {
        imagemPersonagem.style.display = "none";
    }

    nomePersonagem.textContent = "Amélia";

    textoDialogo.textContent =
        "Um uniforme... Será que devo experimentar?";

    opcoesDialogo.style.display = "flex";
}


// ==========================================
// ESCOLHER UMA OPÇÃO DO UNIFORME
// ==========================================

function escolherUniforme(opcao) {

    opcoesDialogo.style.display = "none";

    const escolhas = [
        "Acho que devo experimentar este uniforme.",
        "Finalmente, algo que pode me ajudar a passar despercebida."
    ];

    textoDialogo.textContent = escolhas[opcao];

    setTimeout(function() {

        interfaceDialogo.style.display = "none";

        apresentacaoUniforme.style.display = "flex";

    }, 900);
}


// ==========================================
// FECHAR APRESENTAÇÃO DO UNIFORME
// ==========================================

function fecharApresentacaoUniforme(event) {

    if (event) {
        event.stopPropagation();
    }

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

    if (interfaceDialogo && textoDialogo) {

        setTimeout(function() {

            if (!interfaceDialogo.dataset.pularDialogoInicial) {
                iniciarDialogo();
            }

        }, duracaoFade);

    }

});
