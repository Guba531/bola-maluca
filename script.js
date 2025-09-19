const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('resetButton');
const shapeBtns = document.querySelectorAll('.shape-btn');

let balls = [];
let startTime = null;
let attempts = 0;
let gameStarted = false;
let timerInterval = null;
let points = 0;

const attemptsSpan = document.getElementById('attempts');
const timeSpan = document.getElementById('time');
const messageDiv = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

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
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);

    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}'`;
    timeSpan.textContent = formattedTime;
}

function endGame() {
    clearInterval(timerInterval);
    winSound.currentTime = 0;
    winSound, play();
    messageDiv.textContent = `🎉Você ganhou em ${attempts} tentativas!`
    messageDiv.classList.add('win-message');
    messageDiv.classList.add('show');
}

function drawCircle(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

resetBtn.addEventListener('click', resetGame);

function resetGame() {
    balls = [];
    attempts = 0;
    startTime = null;
    gameStarted = false;

    if (timerInterval) {
        clearInterval(timerInterval);
    }

    attemptsSpan.textContent = '0';
    timeSpan.textContent = '00:00';
    messageDiv.textContent = '';
    messageDiv.className = 'message';

}

