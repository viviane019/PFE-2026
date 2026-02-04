function converter() {
    const celsius = document.getElementById('celsius').value;
    const feedback = document.getElementById('resultado');
    
    if (celsius === "") {
        feedback.innerText = "Por favor, digite um valor.";
        return;
    }

    // Aplicação da fórmula
    const fahrenheit = (parseFloat(celsius) * 1.8) + 32;
    
    feedback.innerText = `Resultado: ${fahrenheit.toFixed(1)} °F`;

    // Lógica de cores
    if (fahrenheit > 80) {
        document.body.style.backgroundColor = "coral";
    } else {
        document.body.style.backgroundColor = "lightskyblue";
    }
}