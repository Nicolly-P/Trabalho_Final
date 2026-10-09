
 // ==========================================
 // NOVO JOGO
 // ==========================================

function novoJogo() {
    const telaJogo = document.getElementById("telaJogo");
    const telaInicial = document.getElementById("telaInicial");
    const video = document.getElementById("meuVideo");
    const botaoFecharJogo = document.getElementById("botaoFecharJogo");

    telaInicial.style.display = "none";
    telaJogo.style.display = "flex";
    botaoFecharJogo.style.display = "none";

    video.currentTime = 0;

    video.play().catch(error => {
        console.log("Erro ao iniciar o vídeo:", error);
    });
}


// ==========================================
// COMO JOGAR
// ==========================================

function abrirComoJogar() {
    const janela = document.getElementById("janelaComoJogar");
    janela.style.display = "flex";
}


// ==========================================
// CONFIGURAÇÕES
// ==========================================

function abrirConfiguracoes() {
    const configuracoes = document.getElementById("telaConfiguracoes");
    configuracoes.style.display = "flex";
}


// ==========================================
// FECHAR "COMO JOGAR"
// ==========================================

document.getElementById("janelaComoJogar").onclick = function(event) {
    if (event.target === this) {
        this.style.display = "none";
    }
};


// ==========================================
// CRIADORES
// ==========================================

function abrircriadores() {
    const janela = document.getElementById("criadores");
    janela.style.display = "flex";
}


// ==========================================
// FECHAR "CRIADORES"
// ==========================================

document.getElementById("criadores").onclick = function(event) {
    if (event.target === this) {
        this.style.display = "none";
    }
};


// ==========================================
// VOLTAR PARA A TELA INICIAL
// ==========================================

function voltarInicio() {
    document.getElementById("telaJogo").style.display = "none";
    document.getElementById("telaConfiguracoes").style.display = "none";
    document.getElementById("telaInicial").style.display = "flex";
}


// ==========================================
// VÍDEO
// ==========================================

const video = document.getElementById("meuVideo");
const audio = document.getElementById("musicaFundo");
const botaoFecharJogo = document.getElementById("botaoFecharJogo");


// Quando o vídeo começar
video.addEventListener("play", () => {
    botaoFecharJogo.style.display = "none";

    if (audio) {
        audio.muted = true;
    }
});


// Impede que o vídeo fique pausado antes de terminar
video.addEventListener("pause", () => {
    if (
        !video.ended &&
        !video.error &&
        document.getElementById("telaJogo").style.display === "flex"
    ) {
        video.play().catch(error => {
            console.log("Não foi possível continuar o vídeo:", error);
        });
    }
});


// Quando o vídeo terminar
video.addEventListener("ended", () => {
    botaoFecharJogo.style.display = "block";
});


// ==========================================
// IR PARA A TELA DA HISTÓRIA
// ==========================================
function irParaHistoria() {
    if (!video.ended) {
        return;
    }

    window.location.href = "historia.html";
}
