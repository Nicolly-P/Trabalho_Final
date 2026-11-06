// ==========================================
// BRILHO DA TELA
// ==========================================

function alterarBrilho(valor) {
    const brilho = Number(valor);

    localStorage.setItem("brilhoTela", brilho);

    document.documentElement.style.filter =
        `brightness(${brilho / 100})`;

    const textoBrilho = document.getElementById("valorBrilho");

    if (textoBrilho) {
        textoBrilho.textContent = brilho + "%";
    }
}


// ==========================================
// LEGENDAS
// ==========================================

function alternarLegendas() {
    let legendasAtivas =
        localStorage.getItem("legendasAtivas") !== "false";

    legendasAtivas = !legendasAtivas;

    localStorage.setItem("legendasAtivas", legendasAtivas);

    aplicarLegendas();
}


function aplicarLegendas() {
    const legendasAtivas =
        localStorage.getItem("legendasAtivas") !== "false";

    document.body.classList.toggle(
        "legendas-desativadas",
        !legendasAtivas
    );

    const botao = document.getElementById("botaoLegendas");

    if (botao) {
        botao.textContent = legendasAtivas
            ? "Legendas: Ligadas"
            : "Legendas: Desligadas";
    }
}


// ==========================================
// EFEITOS SONOROS
// ==========================================

function alternarEfeitos() {
    let efeitosAtivos =
        localStorage.getItem("efeitosAtivos") !== "false";

    efeitosAtivos = !efeitosAtivos;

    localStorage.setItem("efeitosAtivos", efeitosAtivos);

    atualizarBotaoEfeitos();
}


function atualizarBotaoEfeitos() {
    const efeitosAtivos =
        localStorage.getItem("efeitosAtivos") !== "false";

    const botao = document.getElementById("botaoEfeitos");

    if (botao) {
        botao.textContent = efeitosAtivos
            ? "Efeitos sonoros: Ligados"
            : "Efeitos sonoros: Desligados";
    }
}


// Use esta função quando quiser reproduzir um efeito sonoro.
// Exemplo: tocarEfeito("midia/click.mp3");

function tocarEfeito(arquivo) {
    const efeitosAtivos =
        localStorage.getItem("efeitosAtivos") !== "false";

    if (!efeitosAtivos) return;

    const efeito = new Audio(arquivo);

    efeito.play().catch(() => {});
}


// ==========================================
// TELA CHEIA
// ==========================================

function alternarTelaCheia() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
    } else {
        document.exitFullscreen();
    }
}


// ==========================================
// RESTAURAR CONFIGURAÇÕES
// ==========================================

function restaurarConfiguracoes() {
    localStorage.setItem("musicaMutada", "false");
    localStorage.setItem("volumeMusica", "50");
    localStorage.setItem("brilhoTela", "100");
    localStorage.setItem("legendasAtivas", "true");
    localStorage.setItem("efeitosAtivos", "true");

    // Atualiza a música
    musicaMutada = false;
    volumeMusica = 50;

    const audio = document.getElementById("musicaFundo");

    if (audio) {
        audio.muted = false;
        audio.volume = 0.5;
    }

    atualizarBotaoMusica();

    // Atualiza os controles
    const controleVolume = document.getElementById("controleVolume");
    const controleBrilho = document.getElementById("controleBrilho");

    if (controleVolume) {
        controleVolume.value = 50;
    }

    if (controleBrilho) {
        controleBrilho.value = 100;
    }

    alterarBrilho(100);
    alterarVolume(50);
    aplicarLegendas();
    atualizarBotaoEfeitos();
}


// ==========================================
// CARREGAR CONFIGURAÇÕES SALVAS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const brilhoSalvo =
        localStorage.getItem("brilhoTela") ?? 100;

    const controleBrilho =
        document.getElementById("controleBrilho");

    if (controleBrilho) {
        controleBrilho.value = brilhoSalvo;
    }

    alterarBrilho(brilhoSalvo);

    aplicarLegendas();
    atualizarBotaoEfeitos();
});