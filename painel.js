
let senha = "";

// CHAVE QUE IDENTIFICA O PAINEL DESTRANCADO
const chavePainel = "painelSantaGloriaDesbloqueado";

/* ==========================================
   VERIFICAR SE O PAINEL JÁ FOI DESTRANCADO
   ========================================== */

function painelDesbloqueado() {
    return sessionStorage.getItem(chavePainel) === "true";
}

/* ==========================================
   ABRIR PAINEL
   ========================================== */

function abrirPainel() {

    // SE JÁ ESTIVER DESTRANCADO, IR PARA OUTRA PÁGINA
    if (painelDesbloqueado()) {

        window.location.href = "porta.html";
        return;

    }

    // CASO AINDA ESTEJA TRANCADO, ABRIR TECLADO
    document.getElementById("quadroOverlay").style.display = "flex";

    mostrarObjetivo();

}

/* ==========================================
   FECHAR PAINEL
   ========================================== */

function fecharPainel() {

    document.getElementById("quadroOverlay").style.display = "none";

    limpar();

}

/* ==========================================
   DIGITAR SENHA
   ========================================== */

function digitar(numero) {

    if (senha.length >= 6) return;

    senha += numero;

    document.getElementById("visor").value = senha;

    if (senha.length === 6) {

        const senhaDigitada = senha;

        setTimeout(() => {

            if (senhaDigitada === "162940") {

                // SALVAR O DESBLOQUEIO
                sessionStorage.setItem(chavePainel, "true");

                // MOSTRAR O SÍMBOLO DENTRO DO PAINEL
                const wrapper = document.querySelector(".quadro-grande-wrapper");

                wrapper.classList.add("desbloqueado");

                // LIMPAR A SENHA
                limpar();

            } else {

                alert("SENHA INCORRETA!");

                limpar();

            }

        }, 300);

    }

}

/* ==========================================
   LIMPAR SENHA
   ========================================== */

function limpar() {

    senha = "";

    document.getElementById("visor").value = "";

}

/* ==========================================
   ABRIR PAPEL
   ========================================== */

function abrirPapel() {

    document.getElementById("papelOverlay").style.display = "flex";

}

/* ==========================================
   FECHAR PAPEL
   ========================================== */

function fecharPapel() {

    document.getElementById("papelOverlay").style.display = "none";

}

/* ==========================================
   FECHAR COM ESC
   ========================================== */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        fecharPainel();

        fecharPapel();

    }

});