const dicio = DICIONARIO_FIXO;
const dicioReverso = Object.fromEntries(Object.entries(dicio).map(([k, v]) => [v, k]));
let modoAtual = "C";

function abrirTradutor(modo) {
    modoAtual = modo;
    document.getElementById("menu-principal").style.display = "none";
    document.getElementById("tela-tradutor").style.display = "block";
    document.getElementById("titulo-modo").innerText = (modo === "C") ? "MODO: CODIFICAR" : "MODO: DECODIFICAR";
    limpar();
}

function voltarMenu() {
    document.getElementById("menu-principal").style.display = "block";
    document.getElementById("tela-tradutor").style.display = "none";
}

function abrirDicionario() {
    const lista = document.getElementById("lista-dic");
    lista.innerHTML = Object.entries(dicio).map(([k, v]) => `
        <div class="dic-item"><b>${k}:</b><br>${v}</div>
    `).join('');
    document.getElementById("modal-dic").style.display = "block";
}

function fecharDicionario() {
    document.getElementById("modal-dic").style.display = "none";
}

function processar() {
    const entrada = document.getElementById("entrada").value.trim();
    let res = "";

    if (modoAtual === "C") {
        // Usa Array.from para não quebrar emojis na contagem
        res = Array.from(entrada.toUpperCase()).map(l => dicio[l] || `[${l}?]`).join(',');
    } else {
        res = entrada.split(',').map(s => dicioReverso[s.trim()] || '?').join('');
    }
    document.getElementById("saida").value = res;
}

function limpar() {
    document.getElementById("entrada").value = "";
    document.getElementById("saida").value = "";
}
