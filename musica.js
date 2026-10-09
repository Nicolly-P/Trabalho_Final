
let musicaMutada = false;

function iniciarMusica() {
    const audio = document.getElementById("musicaFundo");

    if (!audio) return;

    audio.volume = 0.5;
    audio.muted = musicaMutada;

    atualizarBotaoMusica();

    audio.play().catch(() => {
        document.addEventListener("click", tentarTocarMusica, {
            once: true
        });
    });
}

function tentarTocarMusica() {
    const audio = document.getElementById("musicaFundo");

    if (audio && !musicaMutada) {
        audio.play().catch(() => {});
    }
}

function alternarMusica() {
    const audio = document.getElementById("musicaFundo");

    if (!audio) return;

    musicaMutada = !musicaMutada;
    audio.muted = musicaMutada;

    atualizarBotaoMusica();

    if (!musicaMutada) {
        audio.play().catch(() => {});
    }
}

function atualizarBotaoMusica() {
    const botao = document.getElementById("botaoMusica");

    if (!botao) return;

    botao.textContent = musicaMutada
        ? "🔇 Música: Desligada"
        : "🔊 Música: Ligada";
}

document.addEventListener("DOMContentLoaded", iniciarMusica);
