// ==========================================
// CONFIGURAÇÃO DA MÚSICA
// ==========================================

// Recupera a preferência salva no navegador.
// Se não houver preferência salva, a música começa ligada.
let musicaMutada = localStorage.getItem("musicaMutada") === "true";


// ==========================================
// INICIAR MÚSICA
// ==========================================

function iniciarMusica() {
    const audio = document.getElementById("musicaFundo");

    if (!audio) return;

    audio.volume = 0.5;

    // Aplica a preferência salva pelo usuário.
    audio.muted = musicaMutada;

    atualizarBotaoMusica();

    // Tenta iniciar a música.
    audio.play().catch(() => {
        document.addEventListener("click", tentarTocarMusica, {
            once: true
        });
    });
}


// ==========================================
// TENTAR TOCAR A MÚSICA
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

    // Inverte o estado atual.
    musicaMutada = !musicaMutada;

    // Salva a preferência para as outras páginas.
    localStorage.setItem("musicaMutada", musicaMutada);

    // Aplica a alteração ao áudio da página atual.
    audio.muted = musicaMutada;

    atualizarBotaoMusica();

    // Se a música foi ligada, tenta reproduzi-la.
    if (!musicaMutada) {
        audio.play().catch(() => {});
    }
}


// ==========================================
// ATUALIZAR TEXTO DO BOTÃO
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

document.addEventListener("DOMContentLoaded", iniciarMusica);