var playerBalance = 100;

function startRace() {
    var betAmount = parseInt(document.getElementById('amount').value);

    // Verifica se o valor da aposta é menor que 5
    if (betAmount < 5) {
        alert("A aposta mínima é de R$5.");
        return;
    }

    if (playerBalance < betAmount) {
        alert("Saldo insuficiente para fazer esta aposta.");
        return;
    }

    var carPositions = [0, 0, 0, 0, 0];
    var raceInterval = setInterval(moveCars, 50);
    var winner = null;

    function moveCars() {
        for (var i = 0; i < carPositions.length; i++) {
            carPositions[i] += Math.random() * 10;
            document.getElementById('car' + (i + 1)).style.left = carPositions[i] + 'px';

            if (carPositions[i] >= 500 && winner === null) {
                winner = i + 1;
                clearInterval(raceInterval);
                announceResult();
            }
        }
    }

    function announceResult() {
        var selectedPilot = parseInt(document.getElementById('pilot').value);
        var resultDiv = document.getElementById('result');
        resultDiv.classList.remove('win-message', 'lose-message'); // Remove todas as classes de mensagem
        if (selectedPilot === winner) {
            playerBalance += betAmount * 2; // Duplica o valor ganho
            resultDiv.textContent = 'Parabéns! Você ganhou R$' + (betAmount * 2); // Exibe o valor duplicado
            resultDiv.classList.add('win-message');
        } else {
            playerBalance -= betAmount;
            resultDiv.textContent = 'Você perdeu a aposta de R$' + betAmount + '.';
            resultDiv.classList.add('lose-message');
        }
        document.getElementById('player-balance').textContent = 'Saldo: R$' + playerBalance;
    }
}
