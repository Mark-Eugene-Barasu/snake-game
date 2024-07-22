const gameBoard = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score-display");
let snake = [{ x: 10, y: 10 }];
let food = {};
let score = 0;
let direction = "right";
let intervalId;

// Initialize game board
for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        gameBoard.appendChild(cell);
    }
}

// Snake movement and logic
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    } else if (e.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    } else if (e.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    } else if (e.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    }
});

function updateGame() {
    // Update snake position
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i] = { ...snake[i - 1] };
    }
    switch (direction) {
        case "up":
            snake[0] = { x: snake[0].x, y: snake[0].y - 1 };
            break;
        case "down":
            snake[0] = { x: snake[0].x, y: snake[0].y + 1 };
            break;
        case "left":
            snake[0] = { x: snake[0].x - 1, y: snake[0].y };
            break;
        case "right":
            snake[0] = { x: snake[0].x + 1, y: snake[0].y };
            break;
    }
    // Check for collisions and update score
    checkCollision();
    // Update food position
    spawnFood();
    // Render game board
    renderGameBoard();
}

function checkCollision() {
    // Check for wall collision
    if (snake[0].x < 0 || snake[0].x >= 20 || snake[0].y < 0 || snake[0].y >= 20) {
        gameOver();
    }
    // Check for self collision
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            gameOver();
        }
    }
    // Check for food collision
    if (snake[0].x === food.x && snake[0].y === food.y) {
        incrementScore();
        spawnFood();
    }
}

function spawnFood() {
    food.x = Math.floor(Math.random() * 20);
    food.y = Math.floor(Math.random() * 20);
    // Ensure
}