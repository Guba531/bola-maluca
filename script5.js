const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const scoreSpan = document.getElementById('score');
const timerSpan = document.getElementById('time');
const restartButton = document.getElementById('resetBtn');
const messageDiv = document.getElementById('message');

const gameDuration = 30;
const ballsRadius = 20;
const ballStart = 4;
const MAX_ACTIVE_BALLS = 5;
const balls = [1, 2, 3, 4, 5];
ballsColor = ['darkblue', 'brown', 'maroon', 'orange', 'magenta', 'seagreen', 'black', 'violet', 'pink', 'lightgreen', 'blue', 'red', 'turquoise'];

const ballsTime = {
    1: 4000,
    2: 3500,
    3: 3000,
    4: 2500,
    5: 2000
}
const ballPoints =
    { 1: 10, 2: 20, 3: 30, 4: 40, 5: 50 };

let activeBalls = [];
let score = 0;
let gameTimer = gameDuration;
let gameRunning = false;
let gameInterval;
let animationFrameId;

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawBall(ball) {
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.font = `${ball.radius * 0.8}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(ball.value.toString(), ball.x, ball.y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.heigth);
}

function updateGameDisplay() {
    scoreSpan.textContent = score;
    timerSpan.textContent = gameTimer;
}

function generateBall() {
    if (!gameRunning || activeBalls.length >= MAX_ACTIVE_BALLS) return;

    const randomValue = getRandomItem(balls);
    const randomColor = getRandomItem(ballsColor);
    const x = getRandomInt(ballsRadius, canvas.width - ballsRadius);
    const y = getRandomInt(ballsRadius, canvas.heigth - ballsRadius);

    const newBall = {
        id: Date.now() + Math.random(),
        x: x,
        y: y,
        radius: ballsRadius,
        color: randomColor,
        value: balls,
        points: ballPoints[balls],
        spawnTime: Date.now(),
        lifespan: ballsTime[balls]
    };

    activeBalls.push(newBall);
}

function gameLoop() {
    if (!gameRunning) return;

    clearCanvas();

    const currentTime = Date.now();
    const nextActiveBalls = [];

    for (let i = 0; i < activeBalls.length; i++) {
        const ball = activeBalls[i];

        if (currentTime - ball.spawnTime > ball.lifespan) {
            generateBall();
        } else {
            drawBall(ball);
            nextActiveBalls.push(ball);
        }
    }

    activeBalls = nextActiveBalls;
    animationFrameId = requestAnimationFrame(gameLoop);
}

function handleClick(event) {
    if (!gameRunning) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    let ballClicked = false;

    for (let i = 0; i < activeBalls.length; i++) {
        const ball = activeBalls[i];

        const distance = Math.sqrt(
            Math.pow(clickX - ball.x, 2) +
            Math.pow(clickY - ball.y, 2)
        );

        if (distance <= ball.radius) {
            score += ball.points;
            updateGameDisplay();
            activeBalls.splice(i, 1);
            generateBall();
            ballClicked = true;
            break;
        }
    }
}

function startTimer() {
    gameInterval = setInterval(() => {
        gameTimer--;
        updateGameDisplay();

        if (gameTimer <= 0) {
            endGame(`Tempo esgotado! Sua pontuação final: ${score}`);
        }
    }, 1000);
}

function initGame() {
    endGame();

    score = 0;
    missedClicks = 0;
    gameTimer = gameDuration;
    activeBalls = [];
    gameRunning = true;
    messageDiv.textContent = '';
    messageDiv.className = 'message';

    updateGameDisplay();
    clearCanvas();

    for (let i = 0; i < ballStart; i++) {
        generateBall();
    }

    startTimer();
    gameLoop();

    console.log("Jogo iniciado! Boa sorte!");
}

function endGame(msg = "") {
    gameRunning = false;
    clearInterval(gameInterval);
    cancelAnimationFrame(animationFrameId);
    activeBalls = [];
    clearCanvas();

    messageDiv.textContent = msg;

    if (msg.includes("Tempo esgotado")) {
        messageDiv.classList.add('message');
    }

    console.log(`Jogo finalizado! Pontuação: ${score}`);
}

canvas.addEventListener('click', handleClick);
restartButton.addEventListener('click', initGame);

initGame();

console.log("Etapa 5 concluida: Jogo completo funcionando");