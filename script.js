const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
//const clearButton = document.getElementById('resetButton');
//const shapeBtns = document.querySelectorAll('.shape-btn');

//let balls = [];
//let startTime = 0;
//let attempts = 3;
//let gameStarted = false;
//let timerInterval = null;
//let points = 0;
const ballsRadius = 10;
//const ballStart = 4;

/*
const attemptsSpan = document.getElementById('attempts'); //Tentativas
const timeSpan = document.getElementById('time');
const messageDiv = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const score = document.getElementById('score');

const clickSound = new Audio('');
const winSound = new Audio('');
const defeatSound = new Audio('');
const missSound = new Audio('');
*/
const balls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];


/*const ballsTime = {
    1: 9500,
    2: 9000,
    3: 8000,
    4: 7000,
    5: 6000,
    6: 5000,
    7: 4000,
    8: 3000,
    9: 2500,
    10: 1500,
    11: 1000,
    12: 900,
    13: 800,
    14: 700,
}

const ballsValue = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 15,
    12: 25,
    13: 35,
    14: 45,
}
*/
const ballsColor = ['yellow', 'light-brown', 'wine', 'light-orange', 'magenta', 'sea-green', 'orange', 'black', 'light-purple', 'pink', 'light-green', 'blue', 'red', 'turquoise'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(arr) {
  // Generate a random index between 0 (inclusive) and the array's length (exclusive)
  const randomIndex = Math.floor(Math.random() * arr.length);

  // Return the item at the generated random index
  return arr[randomIndex];
}

function drawBall(ball) {
    ctx.fillStyle = ball.color;
    ctx.beginPath();
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
        x: x,
        y: y,
        radius: ballsRadius,
        color: randomColor,
        value: randomValue,
    };

    return newBall;
}

clearCanvas();
const primeiraBola = generateBall();
drawBall(primeiraBola);

/*
function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);

    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}'`;
    timeSpan.textContent = formattedTime;
}

function startGame() {
    gameStarted = true;
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
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

function endGame() {
    clearInterval(timerInterval);
    winSound.currentTime = 0;
    winSound, play();
    messageDiv.textContent = `🎉Você ganhou em ${attempts} tentativas!`
    messageDiv.classList.add('win-message');
    messageDiv.classList.add('show');
}
*/

