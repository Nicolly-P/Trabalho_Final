document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
    OBJETIVOS DO JOGO
    ===================================== */
    const objetivoJogo = document.getElementById("objetivoJogo");
    const bonusJogo = document.getElementById("bonusJogo");
    const abaObjetivo = document.getElementById("abaObjetivo");
    const abaBonus = document.getElementById("abaBonus");
    const minimizarObjetivoBotao = document.getElementById("minimizarObjetivo");
    const minimizarBonusBotao = document.getElementById("minimizarBonus");

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

    // MINIMIZAR OBJETIVO BÔNUS
    minimizarBonusBotao.addEventListener("click", () => {
        bonusJogo.classList.remove("visivel");
        bonusJogo.classList.add("minimizado");
        abaBonus.classList.add("visivel");
    });

    // REABRIR OBJETIVO BÔNUS
    abaBonus.addEventListener("click", () => {
        bonusJogo.classList.remove("minimizado");
        bonusJogo.classList.add("visivel");
        abaBonus.classList.remove("visivel");

    });

    // VERIFICA SE A PÁGINA ESTÁ UTILIZANDO FADE-IN
    if (document.documentElement.classList.contains("fade-in-historia")) {
        document.body.addEventListener("animationend", function aparecer() {
            mostrarObjetivo();

            document.body.removeEventListener("animationend", aparecer);
        });

    } else {
        mostrarObjetivo();
    }


    /* =====================================
    QUADRO
    ===================================== */
    const abrirQuadro = document.getElementById("abrirQuadro");
    const fecharQuadro = document.getElementById("fecharQuadro");
    const quadroOverlay = document.getElementById("quadroOverlay");

    abrirQuadro.addEventListener("click", () => {
        quadroOverlay.classList.add("aberto");
    });

    fecharQuadro.addEventListener("click", () => {
        quadroOverlay.classList.remove("aberto");
    });

    /* =====================================
    PAPEL
    ===================================== */
    const abrirPapel = document.getElementById("abrirPapel");
    const fecharPapel = document.getElementById("fecharPapel");
    const papelOverlay = document.getElementById("papelOverlay");

    abrirPapel.addEventListener("click", () => {
        papelOverlay.classList.add("aberto");
    });

    fecharPapel.addEventListener("click", () => {
        papelOverlay.classList.remove("aberto");
    });

    /* =====================================
    ARMÁRIO
    ===================================== */
    const armarioFechado = document.getElementById("armarioFechado");
    const armarioAberto = document.getElementById("armarioAberto");
    const pegarUniforme = document.getElementById("pegarUniforme");

    /* =====================================
    CADEADO
    ===================================== */
    const abrirCadeado = document.getElementById("abrirCadeado");
    const fecharCadeado = document.getElementById("fecharCadeado");
    const cadeadoOverlay = document.getElementById("cadeadoOverlay");
    const mensagemCadeado = document.getElementById("mensagemCadeado");

    abrirCadeado.addEventListener("click", () => {
        cadeadoOverlay.classList.add("aberto");

        mensagemCadeado.textContent = "";

        // MOSTRA O OBJETIVO BÔNUS e também garante que ele esteja aberto caso tenha sido minimizado.
        bonusJogo.classList.remove("minimizado");
        bonusJogo.classList.add("visivel");
        abaBonus.classList.remove("visivel");
    });

    fecharCadeado.addEventListener("click", () => {
        cadeadoOverlay.classList.remove("aberto");
    });

    /* =====================================
    DISCOS DO CADEADO
    ===================================== */
    const discos = document.querySelectorAll(".disco-arrastavel");
    const senhaAtual = document.getElementById("senhaAtual");
    const alturaNumero = 60;
    const referencia = -180;
    const totalNumeros = 10;


    discos.forEach((disco) => {
        const numeros = disco.querySelector(".numeros");

        let numero = 0;
        let deslocamento = referencia;
        let arrastando = false;
        let inicioY = 0;
        let deslocamentoInicial = 0;


        function atualizar() {
            numeros.style.transform = `translateY(${deslocamento}px)`;

            disco.dataset.numero = numero;

            atualizarSenha();
        }

        disco.addEventListener("pointerdown", (event) => {
            event.preventDefault();

            arrastando = true;

            inicioY = event.clientY;

            deslocamentoInicial = deslocamento;

            disco.setPointerCapture(event.pointerId);
        });


        disco.addEventListener("pointermove", (event) => {
            if (!arrastando) {
                return;
            }

            event.preventDefault();

            const movimento = event.clientY - inicioY;

            deslocamento = deslocamentoInicial + movimento;

            const passos = Math.round(
                (deslocamento - referencia) / alturaNumero
            );

            numero = (
                (passos % totalNumeros) + totalNumeros
            ) % totalNumeros;

            deslocamento = referencia + numero * alturaNumero;
            atualizar();

        });


        disco.addEventListener("pointerup", (event) => {
            arrastando = false;

            try {
                disco.releasePointerCapture(event.pointerId);

            } catch (erro) {

            }
        });

        disco.addEventListener("pointercancel", () => {
            arrastando = false;
        });
        atualizar();
    });


    /* =====================================
    ATUALIZAR SENHA
    ===================================== */

    function atualizarSenha() {
        const numeros = Array.from(discos).map(
            (disco) => Number(disco.dataset.numero)
        );

        const senha = numeros.join("");

        senhaAtual.textContent = senha;

        if (senha === "547") {
            abrirArmario();
        }
    }

    /* =====================================
    ABRIR ARMÁRIO
    ===================================== */
    let armarioFoiAberto = false;

    function abrirArmario() {
        if (armarioFoiAberto) {
            return;
        }

        armarioFoiAberto = true;

        mensagemCadeado.textContent = "O cadeado abriu...";

        setTimeout(() => {
            cadeadoOverlay.classList.remove("aberto");
            abrirCadeado.style.display = "none";
            armarioFechado.style.display = "none";
            armarioAberto.style.display = "block";
            pegarUniforme.style.display = "block";
        }, 700);
    }


    /* =====================================
    PEGAR UNIFORME
    ===================================== */
    pegarUniforme.addEventListener("click", () => {
        pegarUniforme.style.display = "none";
    });


    /* =====================================
    TECLA ESC
    ===================================== */
    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") {
            return;
        }

        if (papelOverlay.classList.contains("aberto")) {
            papelOverlay.classList.remove("aberto");
            return;
        }

        if (quadroOverlay.classList.contains("aberto")) {
            quadroOverlay.classList.remove("aberto");
            return;

        }

        if (cadeadoOverlay.classList.contains("aberto")) {
            cadeadoOverlay.classList.remove("aberto");
        }

    });

});