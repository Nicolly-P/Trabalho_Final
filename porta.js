
/* =====================================
   ABRIR E FECHAR ZOOM DO QUADRO
   ===================================== */

function abrirZoomQuadro() {
    document.getElementById("zoomQuadro").style.display = "block";
}

function fecharZoomQuadro() {
    document.getElementById("zoomQuadro").style.display = "none";
}

/* =====================================
   ZOOM DA PRANCHETA
   ===================================== */

function abrirZoomPrancheta() {
    document.getElementById("zoomPrancheta").style.display = "block";
}

function fecharZoomPrancheta() {
    document.getElementById("zoomPrancheta").style.display = "none";
}

/* =====================================
   CADEADO NUMÉRICO DO ARMÁRIO
   ===================================== */

// Números iniciais das quatro roletas
let numerosCadeado = [0, 0, 0, 0];

// Estados do armário
let armarioDestrancado = false;
let itemRecolhido = false;

// Senha correta
const senhaArmario = "1247";

/* =====================================
   ABRIR CADEADO
   ===================================== */

function abrirCadeado() {

    document.getElementById("cadeadoArmario").style.display = "block";

    const recompensa = document.getElementById("recompensaArmario");
    const mensagem = document.getElementById("mensagemCadeado");

    if (itemRecolhido) {

        // O item já foi recolhido
        document.querySelector(".roletas").style.display = "none";
        document.querySelector(".confirmar-senha").style.display = "none";

        recompensa.style.display = "none";

        mensagem.style.color = "#72d572";
        mensagem.textContent = "Este armário já está vazio.";

    } else if (armarioDestrancado) {

        // O armário já foi aberto, mas o item ainda está disponível
        document.querySelector(".roletas").style.display = "none";
        document.querySelector(".confirmar-senha").style.display = "none";

        recompensa.style.display = "block";

        mensagem.style.color = "#72d572";
        mensagem.textContent = "Cadeado destrancado!";

    } else {
        // O armário ainda está trancado
        numerosCadeado = [0, 0, 0, 0];

        atualizarNumeros();

        document.querySelector(".roletas").style.display = "flex";
        document.querySelector(".confirmar-senha").style.display = "block";

        recompensa.style.display = "none";
        mensagem.textContent = "";
    }
}

/* =====================================
   FECHAR CADEADO
   ===================================== */
function fecharCadeado() {
    document.getElementById("cadeadoArmario").style.display = "none";
}

/* =====================================
   GIRAR UMA ROLETA
   ===================================== */
function girarNumero(indice, direcao) {
    numerosCadeado[indice] += direcao;

    // Se passar de 9, volta para 0
    if (numerosCadeado[indice] > 9) {
        numerosCadeado[indice] = 0;
    }

    // Se passar de 0 para baixo, vai para 9
    if (numerosCadeado[indice] < 0) {
        numerosCadeado[indice] = 9;
    }
    atualizarNumeros();
}

/* =====================================
   ATUALIZAR OS NÚMEROS NA TELA
   ===================================== */
function atualizarNumeros() {
    for (let i = 0; i < 4; i++) {
        document.getElementById("numero" + i).textContent =
            numerosCadeado[i];
    }
}

/* =====================================
   VERIFICAR SENHA DO ARMÁRIO
   ===================================== */
function verificarSenha() {
    let senhaDigitada = numerosCadeado.join("");
    const mensagem = document.getElementById("mensagemCadeado");

    if (senhaDigitada === senhaArmario) {
        mensagem.style.color = "#72d572";
        mensagem.textContent = "Cadeado destrancado!";

        // Registra que o armário foi destrancado
        armarioDestrancado = true;

        // Esconde as roletas
        document.querySelector(".roletas").style.display = "none";

        // Esconde o botão de confirmação
        document.querySelector(".confirmar-senha").style.display = "none";

        // Mostra a indicação para recolher o item
        document.getElementById("recompensaArmario").style.display = "block";

    } else {

        mensagem.style.color = "#e57373";
        mensagem.textContent = "Senha incorreta. Tente novamente.";

    }
}

/* =====================================
   RECOLHER ITEM DO ARMÁRIO
   ===================================== */
function recolherItem() {

    // Registra que o jogador já recolheu o item
    itemRecolhido = true;

    // Fecha o cadeado
    document.getElementById("cadeadoArmario").style.display = "none";

    // Mostra a tela de item adquirido
    document.getElementById("itemAdquirido").style.display = "flex";

}

/* =====================================
FECHAR TELA DE ITEM ADQUIRIDO
   ===================================== */
function fecharItemAdquirido() {

    // Fecha a tela de item adquirido
    document.getElementById("itemAdquirido").style.display = "none";

    // Inicia a escolha na caixa de diálogo
    iniciarEscolhaUniforme();

}