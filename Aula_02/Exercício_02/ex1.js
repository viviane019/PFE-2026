function atualizarCartao() {
    // Captura os valores dos inputs
    const nome = document.getElementById('inputNome').value;
    const cargo = document.getElementById('inputCargo').value;

    // Injeta o texto no cartão (ou mantém o padrão se estiver vazio)
    document.getElementById('previewNome').innerText = nome || "Seu Nome";
    document.getElementById('previewCargo').innerText = cargo || "Seu Cargo";
}

function mudarCor() {
    const corSelecionada = document.getElementById('inputCor').value;
    // Altera a variável CSS no elemento raiz
    document.documentElement.style.setProperty('--card-bg', corSelecionada);
}


