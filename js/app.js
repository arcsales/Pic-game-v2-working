/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let activePlayer = 0;
let playerCurrentScore;
let scoreToWin = 100;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
let newGameBtn = document.querySelector('.btn-new');
let rollDiceBtn = document.querySelector('.btn-roll');
let holdBtn = document.querySelector('.btn-hold');


function rollDice() {
    if (document.getElementById('name-' + activePlayer).textContent == 'Winner!') {} else {
        let randNum = Math.ceil(Math.random() * 6);
        let randNum1 = Math.ceil(Math.random() * 6);
        playerCurrentScore = document.getElementById('current-' + activePlayer);
        document.querySelector('.dice-1').src = 'img/dice-' + randNum + '.png';
        document.querySelector('.dice-2').src = 'img/dice-' + randNum1 + '.png';
        if (randNum === 1 || randNum1 === 1) {
            playerCurrentScore.textContent = 0;
            toggleActivePlayer();
        } else {
            playerCurrentScore.textContent = +playerCurrentScore.textContent + randNum + randNum1;
        }
    }
}

function hold() {
    let palyerTotalScore = +document.getElementById('score-' + activePlayer).textContent;
    let playerCurrentScore = +document.getElementById('current-' + activePlayer).textContent;
    palyerTotalScore += Number(playerCurrentScore);
    document.getElementById('score-' + activePlayer).textContent = palyerTotalScore;
    document.getElementById('current-' + activePlayer).textContent = 0;
    //if current player is winner
    getScoreTowin();
    if (Number(palyerTotalScore) >= scoreToWin) {
        isWinner();
    } else if (Number(palyerTotalScore) === 0 || playerCurrentScore === 0) {
        holdBtn.addEventListener('click', function(event) {
            event.preventDefault()
        });
        newGameBtn.addEventListener('click', function(event) {
            event.preventDefault()
        });
    } else {
        toggleActivePlayer();
    }
}

function getScoreTowin() {
    scoreToWin = +document.querySelector('.final-score').value;
    if (scoreToWin === 0) {
        scoreToWin = 100;
    }
}

function newGame() {
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.getElementById('name-' + activePlayer).textContent = `Player ${activePlayer+1}`;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
}

function isWinner() {
    document.getElementById('name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
}

function toggleActivePlayer() {
    //removing active class from dic element of current player
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    //switching active player index
    activePlayer ? activePlayer = 0 : activePlayer = 1;
    //adding active class to next player
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
}

rollDiceBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', hold);
newGameBtn.addEventListener('click', newGame);