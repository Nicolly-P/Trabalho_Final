// ==========================================
// NOVO JOGO
// ==========================================

function novoJogo() {

    const telaJogo =
        document.getElementById("telaJogo");

    const telaInicial =
        document.getElementById("telaInicial");

    const video =
        document.getElementById("meuVideo");

    const botaoFecharJogo =
        document.getElementById("botaoFecharJogo");

    // Esconde a tela inicial
    telaInicial.style.display = "none";

    // Mostra a tela do jogo
    telaJogo.style.display = "flex";

    // Esconde o botão X durante o vídeo
    botaoFecharJogo.style.display = "none";

    // Reinicia o vídeo
    video.currentTime = 0;

    // Inicia o vídeo
    video.play().catch(error => {

        console.log("Erro ao iniciar o vídeo:", error);

    });

}


// ==========================================
// COMO JOGAR
// ==========================================

function abrirComoJogar() {

    const janela =
        document.getElementById("janelaComoJogar");

    // Mostra a janela
    janela.style.display = "flex";

}


// ==========================================
// CONFIGURAÇÕES
// ==========================================

function abrirConfiguracoes() {

    const configuracoes =
        document.getElementById("telaConfiguracoes");

    // Mostra a tela de configurações
    configuracoes.style.display = "flex";

}


// ==========================================
// FECHAR "COMO JOGAR"
// ==========================================

document.getElementById("janelaComoJogar").onclick =
    function(event) {

        // Se clicar fora da caixa,
        // a janela será fechada.
        if (event.target === this) {
            this.style.display = "none";
        }
    };


// ==========================================
// CRIADORES
// ==========================================

function abrircriadores() {

    const janela =
        document.getElementById("criadores");

    // Mostra a janela
    janela.style.display = "flex";

}


// ==========================================
// FECHAR "CRIADORES"
// ==========================================

document.getElementById("criadores").onclick =
    function(event) {

        // Se clicar fora da caixa, a janela será fechada.
        if (event.target === this) {
            this.style.display = "none";
        }
    };


// ==========================================
// VOLTAR PARA A TELA INICIAL
// ==========================================

function voltarInicio() {

    // Esconde o jogo
    document.getElementById("telaJogo").style.display = "none";

    // Esconde as configurações
    document.getElementById("telaConfiguracoes").style.display = "none";

    // Mostra a tela inicial
    document.getElementById("telaInicial").style.display = "flex";

}


// ==========================================
// MÚSICA DE FUNDO
// ==========================================

const audio =
    document.getElementById("musicaFundo");


// Guarda se o usuário decidiu deixar a música mutada
let musicaMutada = false;


// ==========================================
// TOCAR MÚSICA
// ==========================================

function tocarMusica() {

    // Se o usuário tiver mutado a música,
    // não tenta tocar novamente.
    if (musicaMutada) {
        return;
    }

    audio.play()
        .then(() => {

            // Se conseguiu tocar,
            // remove o evento de clique.
            document.removeEventListener(
                "click",
                tocarMusica
            );

        })
        .catch(error => {

            console.log(
                "O autoplay foi bloqueado pelo navegador. Aguardando interação do usuário."
            );

        });

}


// ==========================================
// MUTAR / DESMUTAR MÚSICA
// ==========================================

function alternarMusica() {

    const botaoMusica =
        document.getElementById("botaoMusica");


    // Se a música estiver tocando
    if (!audio.paused && !audio.muted) {

        // Muta a música
        audio.muted = true;

        // Guarda a escolha do usuário
        musicaMutada = true;

        // Altera o texto do botão
        botaoMusica.innerHTML =
            "🔇 Música: Desligada";

    }

    // Se a música estiver mutada ou parada
    else {

        // Permite que a música toque novamente
        audio.muted = false;

        // Guarda a escolha do usuário
        musicaMutada = false;

        // Tenta tocar a música
        audio.play()
            .then(() => {

                botaoMusica.innerHTML =
                    "🔊 Música: Ligada";

            })
            .catch(error => {

                console.log(
                    "Não foi possível iniciar a música."
                );

            });

        // Atualiza o botão
        botaoMusica.innerHTML =
            "🔊 Música: Ligada";
    }
}


// ==========================================
// INICIAR MÚSICA AO CARREGAR A PÁGINA
// ==========================================

window.addEventListener("DOMContentLoaded", () => {

    // Define o volume inicial
    audio.volume = 0.5;

    // Tenta tocar a música
    tocarMusica();

    // Se o navegador bloquear o autoplay,
    // tenta novamente quando o usuário interagir.
    document.addEventListener(
        "click",
        tocarMusica
    );

});


// ==========================================
// VÍDEO
// ==========================================

const video = document.getElementById("meuVideo");

const botaoFecharJogo =
    document.getElementById("botaoFecharJogo");


// Quando o vídeo começar a tocar
video.addEventListener("play", () => {

    // Esconde o botão X
    botaoFecharJogo.style.display = "none";

    audio.muted = true;

});


// Quando o vídeo for pausado antes do final,
// tenta continuar a reprodução.
video.addEventListener("pause", () => {

    if (
        !video.ended &&
        !video.error &&
        document.getElementById("telaJogo").style.display === "flex"
    ) {

        video.play().catch(error => {

            console.log(
                "Não foi possível continuar o vídeo:",
                error
            );

        });

    }

});


// Quando o vídeo terminar
video.addEventListener("ended", () => {

    // Mostra o botão X novamente
    botaoFecharJogo.style.display = "block";

});


// ==========================================
// IR PARA A TELA DA HISTÓRIA
// ==========================================

function irParaHistoria() {

    // Só permite avançar após o vídeo terminar
    if (!video.ended) {
        return;
    }

    // Abre a nova página HTML
    window.location.href = "historia.html";
}
