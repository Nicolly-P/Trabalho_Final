
// ==========================================
// CONFIGURAÇÕES DA MÚSICA
// ==========================================

let musicaMutada = localStorage.getItem("musicaMutada") === "true";

let volumeMusica = Number(
    localStorage.getItem("volumeMusica") ?? 50
);

let audioMusica = null;


// ==========================================
// INICIAR MÚSICA
// ==========================================

function iniciarMusica() {

    audioMusica = document.getElementById("musicaFundo");

    if (!audioMusica) {
        console.error("Elemento de áudio não encontrado!");
        return;
    }

    audioMusica.volume = volumeMusica / 100;
    audioMusica.muted = musicaMutada;

    atualizarBotaoMusica();

    if (musicaMutada) {
        console.log("A música está desativada nas configurações.");
        return;
    }

    tentarTocarMusica();
}


// ==========================================
// TENTAR TOCAR MÚSICA
// ==========================================

function tentarTocarMusica() {

    if (!audioMusica) {
        audioMusica = document.getElementById("musicaFundo");
    }

    if (!audioMusica || musicaMutada) return;

    audioMusica.play()
        .then(() => {

            console.log("Música iniciada com sucesso!");

            // Remove as tentativas extras após começar a tocar.
            document.removeEventListener("click", tentarTocarMusica);
            document.removeEventListener("keydown", tentarTocarMusica);
            document.removeEventListener("pointerdown", tentarTocarMusica);

        })
        .catch((erro) => {

            console.warn("O navegador bloqueou a reprodução:", erro);

            // Continua tentando até conseguir iniciar.
            document.addEventListener("click", tentarTocarMusica);
            document.addEventListener("keydown", tentarTocarMusica);
            document.addEventListener("pointerdown", tentarTocarMusica);

        });
}


// ==========================================
// MUTAR OU DESMUTAR A MÚSICA
// ==========================================

function alternarMusica() {

    if (!audioMusica) {
        audioMusica = document.getElementById("musicaFundo");
    }

    if (!audioMusica) return;

    musicaMutada = !musicaMutada;

    localStorage.setItem("musicaMutada", musicaMutada);

    audioMusica.muted = musicaMutada;

    atualizarBotaoMusica();

    if (!musicaMutada) {
        tentarTocarMusica();
    }
}


// ==========================================
// ALTERAR VOLUME
// ==========================================

function alterarVolume(valor) {

    volumeMusica = Number(valor);

    localStorage.setItem("volumeMusica", volumeMusica);

    if (!audioMusica) {
        audioMusica = document.getElementById("musicaFundo");
    }

    if (audioMusica) {
        audioMusica.volume = volumeMusica / 100;
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