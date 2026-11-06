// ==========================================
// CONFIGURAÇÕES DA MÚSICA
// ==========================================

let musicaMutada = localStorage.getItem("musicaMutada") === "true";

let volumeMusica = Number(
    localStorage.getItem("volumeMusica") ?? 50
);


// ==========================================
// INICIAR MÚSICA
// ==========================================

function iniciarMusica() {
    const audio = document.getElementById("musicaFundo");

    if (!audio) return;

    audio.volume = volumeMusica / 100;
    audio.muted = musicaMutada;

    atualizarBotaoMusica();

    audio.play().catch(() => {
        document.addEventListener("click", tentarTocarMusica, {
            once: true
        });
    });
}


// ==========================================
// TENTAR TOCAR MÚSICA
// ==========================================

function tentarTocarMusica() {
    const audio = document.getElementById("musicaFundo");

    if (audio && !musicaMutada) {
        audio.play().catch(() => {});
    }
}


// ==========================================
// MUTAR OU DESMUTAR A MÚSICA
// ==========================================

function alternarMusica() {
    const audio = document.getElementById("musicaFundo");

    if (!audio) return;

    musicaMutada = !musicaMutada;

    localStorage.setItem("musicaMutada", musicaMutada);

    audio.muted = musicaMutada;

    atualizarBotaoMusica();

    if (!musicaMutada) {
        audio.play().catch(() => {});
    }
}


// ==========================================
// ALTERAR VOLUME
// ==========================================

function alterarVolume(valor) {
    volumeMusica = Number(valor);

    localStorage.setItem("volumeMusica", volumeMusica);

    const audio = document.getElementById("musicaFundo");

    if (audio) {
        audio.volume = volumeMusica / 100;
    }

    const textoVolume = document.getElementById("valorVolume");

    if (textoVolume) {
        textoVolume.textContent = volumeMusica + "%";
    }
}


// ==========================================
// ATUALIZAR BOTÃO DA MÚSICA
// ==========================================

function atualizarBotaoMusica() {
    const botao = document.getElementById("botaoMusica");

    if (!botao) return;

    botao.textContent = musicaMutada
        ? "🔇 Música: Desligada"
        : "🔊 Música: Ligada";
}


// ==========================================
// INICIAR AO CARREGAR A PÁGINA
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    iniciarMusica();

    const controleVolume = document.getElementById("controleVolume");

    if (controleVolume) {
        controleVolume.value = volumeMusica;
        alterarVolume(volumeMusica);
    }
});