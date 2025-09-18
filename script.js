const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('resetButton');
const shapeBtns = document.querySelectorAll('.shape-btn');

let balls = [];

const clickSound = new Audio('');
const winSound = new Audio('');
const defeatSound = new Audio('');
const missSound = new Audio('');

function startGame() {
    gameStarted = true;
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime- startTime) / 1000);

    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime %60;

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}'`;
    timeSpan.textContent = formattedTime;
}

function endGame() {
    clearInterval(timerInterval);
    winSound.currentTime = 0;
    winSound,play();
    messageDiv.textContent = `🎉Você ganhou em ${attempts} tentativas!`
    messageDiv.classList.add('win-message');
    messageDiv.classList.add('show');
}

