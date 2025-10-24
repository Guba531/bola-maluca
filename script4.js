const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

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

let activeBalls = [];
let score = 0;
let gameRunning = true;

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;    
}

function drawBall(ball) {
    ctx.fillStyle = ball.color;
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();


    ctx.fillStyle = 'white';
    ctx.font = `${ball.radius * 0.8}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(ball.value.toString(), ball.x, ball.y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function generateBall() {
    const randomValue = getRandomItem(balls);
    const randomColor = getRandomItem(ballsColor);
    const x = getRandomInt(ballsRadius, canvas.width - ballsRadius);
    const y = getRandomInt(ballsRadius, canvas.height - ballsRadius);

    const newBall = {
        id: Date.now() + Math.random(),
        x: x,
        y: y,
        radius: ballsRadius,
        color: randomColor,
        value: randomValue,
        points: randomValue * 10,
        spawnTime: Date.now(),
        ballsTime: ballsTime[randomValue]

    };

    activeBalls.push(newBall);
    console.log(`Nova bola valor ${randomValue} (vive ${newBall.ballsTime}ms)`);
}

function gameLoop() {
    if (!gameRunning) return;

    clearCanvas();

    const currentTime = Date.now();
    const nextActiveBalls = [];

    for (let i = 0; i < activeBalls.length; i++) {
        const ball = activeBalls[i];

        if (currentTime - ball.spawnTime > ball.lifespan) {
            console.log(`Bola valor ${ball.value} sumiu por tempo!`);
            generateBall();
        } else {
            drawBall(ball);
            nextActiveBalls.push(ball);
        }
    }

    activeBalls = nextActiveBalls;

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Pontuação: ${score}`, 10, 30);
    ctx.fillText(`Bolas ativas: ${activeBalls.length}`, 10, 55);

    requestAnimationFrame(gameLoop);
}

function handleClick(event) {
    if (!gameRunning) return;

const rect = canvas.getBoundingClientRect();
const clickX = event.clientX - rect.left;
const clickY = event.clientY - rect.top;

for (let i = 0; i < activeBalls.length; i++) {
    const ball = activeBalls[i];

    const distance = Math.sqrt(
        Math.pow(clickX - ball.x, 2) +
        Math.pow(clickY - ball.y, 2)
    );

    if (distance <= ball.radius) {
        score += ball.points;
        console.log(`Acertou! +${ball.points} pontos. Total: ${score}`);

        activeBalls.splice(i, 1);
        generateBall();
        break;
    }
  } 
}

canvas.addEventListener('click', handleClick);

for (let i = 0; i < ballStart; i++) {
    generateBall();
}

gameLoop();

console.log("Etapa 4 concluida: Bolas somem automaticamente!");
console.log("Bolas com valores maiores somem mais rapido!");