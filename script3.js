const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ballsRadius = 20;
const ballStart = 4;
const balls = [1, 2, 3, 4, 5];
const ballsColor = ['darkblue', 'brown', 'maroon', 'orange', 'magenta', 'seagreen', 'black', 'violet', 'pink', 'lightgreen', 'blue', 'red', 'turquoise'];

let activeBalls = [];
let score = 0;

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawBall(ball) {
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballsRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.font = `${ballsRadius * 0.8}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(ball.value.toString(), ball.x, ball.y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
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
        points: randomValue * 10
    };

    activeBalls.push(newBall);
}

function drawAllBalls() {
    clearCanvas();

    for (let i=0; i < activeBalls.length; i++) {
        drawBall(activeBalls[i]);
    }

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Pontuação: ${score}`, 10, 30);
} 

function handleClick(event) {
    const rect = canvas.getBoundingClientRect(); //retorna um objeto com as medidas e posição de um elemento (no caso, o canvas) na tela do navegador.
    //getBoundingClientRect() serve pra descobrir onde o canvas está na tela
    const clickX = event.clientX  - rect.left;
    //event.clientX → posição do clique na janela inteira;
   // rect.left → onde o canvas começa na tela;
   //x → posição exata dentro do canvas (coordenada local).
    const clickY = event.clientY - rect.top;

    for (let i = 0; i < activeBalls.length; i++) {
        const ball = activeBalls[i];
        const distance = Math.sqrt(
            Math.pow(clickX - ball.x, 2) +
            Math.pow(clickY - ball.y, 2)
        );
        //calcula a distância entre dois pontos (x₁, y₁) e (x₂, y₂) usando o Teorema de Pitágoras
        //(clickX, clickY) → posição onde o jogador clicou
        //(ball.x, ball.y) → posição do centro da bola
//Math.pow(a, b) significa “a elevado à potência b”.

        if (distance <= ball.radius) {
            score += ball.points;
            console.log(`Acertou! +${ball.points} pontos. Total: ${score}`);

            activeBalls.splice(i, 1);
            generateBall();
            drawAllBalls();
            break;
        }
    }
}

canvas.addEventListener('click', handleClick);

for (let i = 0; i < ballStart; i++) {
    generateBall();
}

drawAllBalls();