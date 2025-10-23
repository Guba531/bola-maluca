// === ETAPA 2: MOSTRAR VÁRIAS BOLAS NO CANVAS ===

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ballsRadius = 20;
const ballStart = 4; // quantas bolas vão aparecer
const balls = [1, 2, 3, 4, 5];
const ballsColor = ['darkblue', 'brown', 'maroon', 'orange', 'magenta', 'seagreen', 'black', 'violet', 'pink', 'lightgreen', 'blue', 'red', 'turquoise'];

let activeBalls = [];

// === Funções auxiliares ===
function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// === Função para desenhar uma bola ===
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

// === Função para limpar o canvas ===
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// === Função para desenhar todas as bolas ===
function drawAllBalls() {
  clearCanvas();
  for (let i = 0; i < activeBalls.length; i++) {
    drawBall(activeBalls[i]);
  }
}

// === Função para gerar uma nova bola ===
function generateBall() {
  const randomValue = getRandomItem(balls);
  const randomColor = getRandomItem(ballsColor);
  const x = getRandomInt(ballsRadius, canvas.width - ballsRadius);
  const y = getRandomInt(ballsRadius, canvas.height - ballsRadius);

  const newBall = {
    id: Date.now() + Math.random(),
    x,
    y,
    radius: ballsRadius,
    color: randomColor,
    value: randomValue
  };

  activeBalls.push(newBall);
}

// === Cria várias bolas e desenha ===
for (let i = 0; i < ballStart; i++) {
  generateBall();
}

drawAllBalls();

console.log(`✅ Etapa 2 concluída: ${activeBalls.length} bolas apareceram no canvas!`);
console.log("Bolas criadas:", activeBalls);
