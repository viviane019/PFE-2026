function agenda(hora, prioridade) {
    let turno;

    if (hora < 0 || hora > 23) {
        alert("Horário Inválido");
        return;
    }

    if (prioridade < 1 || prioridade > 10) {
        alert("Nível de Prioridade Inválida");
        return;
    }

    if (hora >= 0 && hora <= 11) {
        turno = 'manhã';
    } else if (hora >= 12 && hora <= 17) {
        turno = 'tarde';
    } else if (hora >= 18 && hora <= 23) {
        turno = 'noite';
    }

    if (prioridade > 8 && (turno === 'manhã' || turno === 'tarde')) {
        alert("TAREFA CRÍTICA/URGENTE");
    } else if (prioridade >= 7 && prioridade <= 8 && (turno === 'manhã' || turno === 'tarde')) {
        alert("TAREFA IMPORTANTE");
    } else if (turno === 'noite') {
        alert("TAREFA NÃO IMPORTANTE");
    }
}

alert("Informe o horario e revise sua tarefa:");
let hora = parseInt(prompt("Digite a hora (0-23):"));
let prioridade = parseInt(prompt("Digite o nível de prioridade (1-10):"));
agenda(hora, prioridade);


 