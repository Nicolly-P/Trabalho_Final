
/* =====================================
   SISTEMA DE INVENTÁRIO
   SANTA GLÓRIA
   ===================================== */

const CHAVE_INVENTARIO = "inventarioSantaGloria";

// Recupera os itens guardados anteriormente
function carregarItensInventario() {

    try {

        const dados = sessionStorage.getItem(CHAVE_INVENTARIO);

        return dados ? JSON.parse(dados) : [];

    } catch (erro) {

        console.error("Não foi possível carregar o inventário:", erro);

        return [];

    }

}

let itensInventario = carregarItensInventario();


/* =====================================
   ELEMENTOS DO HTML
   ===================================== */

const inventarioJogador = document.getElementById("inventarioJogador");

const listaItensInventario = document.getElementById("listaItensInventario");

const descricaoItemInventario = document.getElementById("descricaoItemInventario");

const contadorInventario = document.getElementById("contadorInventario");


/* =====================================
   SALVAR ITENS
   ===================================== */

function salvarItensInventario() {

    sessionStorage.setItem(
        CHAVE_INVENTARIO,
        JSON.stringify(itensInventario)
    );

}


/* =====================================
   ADICIONAR UM ITEM
   ===================================== */

function adicionarItemInventario(item) {

    if (!item || !item.id || !item.nome || !item.imagem) {

        console.error("Dados incompletos para adicionar o item.");

        return;

    }

    // Impede que o mesmo item seja adicionado duas vezes
    const itemJaExiste = itensInventario.some(
        existente => existente.id === item.id
    );

    if (itemJaExiste) {
        return;
    }

    itensInventario.push(item);

    salvarItensInventario();

    renderizarInventario();

}


/* =====================================
   REMOVER UM ITEM
   ===================================== */

function removerItemInventario(id) {

    itensInventario = itensInventario.filter(
        item => item.id !== id
    );

    salvarItensInventario();

    renderizarInventario();

}


/* =====================================
   MOSTRAR OS ITENS NA TELA
   ===================================== */

function renderizarInventario() {

    if (!listaItensInventario) {
        return;
    }

    listaItensInventario.innerHTML = "";

    // Cria um botão para cada item coletado
    itensInventario.forEach(item => {

        const botao = document.createElement("button");

        botao.type = "button";

        botao.classList.add("item-inventario");

        botao.title = item.nome;

        botao.setAttribute(
            "aria-label",
            "Examinar " + item.nome
        );

        const imagem = document.createElement("img");

        imagem.src = item.imagem;

        imagem.alt = item.nome;

        botao.appendChild(imagem);

        // Ao clicar, mostra a descrição
        botao.addEventListener("click", () => {

            descricaoItemInventario.textContent =
                item.nome + ": " + (item.descricao || "Nenhuma descrição disponível.");

        });

        listaItensInventario.appendChild(botao);

    });


    // Mantém espaços vazios para os próximos itens
    const quantidadeEspacos = Math.max(
        6 - itensInventario.length,
        0
    );

    for (let i = 0; i < quantidadeEspacos; i++) {

        const espaco = document.createElement("div");

        espaco.classList.add("espaco-vazio-inventario");

        listaItensInventario.appendChild(espaco);

    }


    // Atualiza o contador
    if (contadorInventario) {

        contadorInventario.textContent =
            itensInventario.length +
            (itensInventario.length === 1 ? " item" : " itens");

    }

}


/* =====================================
   OCULTAR O INVENTÁRIO QUANDO
   OUTRA INTERFACE ESTIVER ABERTA
   ===================================== */

// Interfaces já existentes nas suas cenas
const interfacesQueOcultamInventario = [

    // Diálogos
    "#interfaceDialogo",

    // Cena história
    ".overlay",
    ".papel-overlay",

    // Cena porta
    ".zoom-quadro",
    ".cadeado-armario",
    ".item-adquirido",
    ".apresentacao-uniforme"

];


function existeInterfaceAberta() {

    return interfacesQueOcultamInventario.some(seletor => {

        const elementos = document.querySelectorAll(seletor);

        return Array.from(elementos).some(elemento => {

            const estilo = window.getComputedStyle(elemento);

            return (
                elemento.getClientRects().length > 0 &&
                estilo.display !== "none" &&
                estilo.visibility !== "hidden"
            );

        });

    });

}


/* =====================================
   ATUALIZAR VISIBILIDADE
   ===================================== */

function atualizarVisibilidadeInventario() {

    if (!inventarioJogador) {
        return;
    }

    inventarioJogador.hidden = existeInterfaceAberta();

}


/* =====================================
   OBSERVAR ABERTURA E FECHAMENTO
   DAS INTERFACES
   ===================================== */

const observadorInventario = new MutationObserver(() => {

    atualizarVisibilidadeInventario();

});


// Observa alterações de estilo e classes nas interfaces
observadorInventario.observe(document.body, {

    attributes: true,

    attributeFilter: ["style", "class"],

    childList: true,

    subtree: true

});


/* =====================================
   INICIALIZAÇÃO
   ===================================== */

renderizarInventario();

atualizarVisibilidadeInventario();