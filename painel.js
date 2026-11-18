let senha = "";

/* ==========================================
   ABRIR PAINEL
========================================== */
function abrirPainel() {

    document.getElementById("quadroOverlay").style.display = "flex";

    // MOSTRAR OBJETIVO AO CLICAR NO PAINEL
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

        setTimeout(() => {

            if (senha === "162940") {

                alert("PORTA DESTRANCADA!");

            } else {

                alert("SENHA INCORRETA!");

            }

            limpar();

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