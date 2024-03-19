var playerBalance = 100;

function startRace() {
    var betAmount = parseInt(document.getElementById('amount').value);

    // Check if the bet amount is less than 5
    if (betAmount < 5) {
        alert("Minimum bet amount is $5.");
        return;
    }

    // Check if the player has enough balance for this bet
    if (playerBalance < betAmount) {
        alert("Insufficient balance to place this bet.");
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
        resultDiv.classList.remove('win-message', 'lose-message'); // Remove all message classes
        if (selectedPilot === winner) {
            playerBalance += betAmount * 2; // Double the winning amount
            resultDiv.textContent = 'Congratulations! You won $' + (betAmount * 2); // Display the doubled amount
            resultDiv.classList.add('win-message');
        } else {
            playerBalance -= betAmount;
            resultDiv.textContent = 'You lost the bet of $' + betAmount + '.';
            resultDiv.classList.add('lose-message');
        }
        document.getElementById('player-balance').textContent = 'Balance: $' + playerBalance;

        // Display which car won the race
        var winnerCar = document.getElementById('car' + winner);
        resultDiv.innerHTML += '<br> Car ' + winnerCar.getAttribute('data-pilot') + ' won the race!';
    }
}
