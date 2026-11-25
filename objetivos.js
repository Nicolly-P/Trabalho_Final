/* =====================================
OBJETIVOS DO JOGO
===================================== */

const objetivoJogo = document.getElementById("objetivoJogo");
const abaObjetivo = document.getElementById("abaObjetivo");
const minimizarObjetivoBotao = document.getElementById("minimizarObjetivo");

// MOSTRAR OBJETIVO PRINCIPAL
function mostrarObjetivo() {
    objetivoJogo.classList.add("visivel");
}

// MINIMIZAR OBJETIVO PRINCIPAL
minimizarObjetivoBotao.addEventListener("click", () => {
    objetivoJogo.classList.remove("visivel");
    objetivoJogo.classList.add("minimizado");
    abaObjetivo.classList.add("visivel");

});

// REABRIR OBJETIVO PRINCIPAL
abaObjetivo.addEventListener("click", () => {
    objetivoJogo.classList.remove("minimizado");
    objetivoJogo.classList.add("visivel");
    abaObjetivo.classList.remove("visivel");

});