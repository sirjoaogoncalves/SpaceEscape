 // Constants
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const ENEMY_SIZE = 20;
const ENEMY_SPEED = 1;
const ENEMY_COLOR = 'green';
const PLAYER_SIZE = 30;
const PLAYER_SPEED = 5;
const PLAYER_COLOR = 'white';
const GAME_OVER_COLOR = 'red';
const GAME_OVER_TEXT = 'Game Over';
const WIN_COLOR = 'yellow';
const WIN_TEXT = 'You Win!';
const ENEMY_INTERVAL = 150; 

// Game state
let playerX = CANVAS_WIDTH / 2 - PLAYER_SIZE / 2;
let playerY = CANVAS_HEIGHT - PLAYER_SIZE;
let enemies = [];
let isGameOver = false;
let isWin = false;
let intervalId;

// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Draw player
function drawPlayer() {
  ctx.fillStyle = PLAYER_COLOR;
  ctx.fillRect(playerX, playerY, PLAYER_SIZE, PLAYER_SIZE);
}

// Draw enemy
function drawEnemy(enemy) {
  ctx.fillStyle = ENEMY_COLOR;
  ctx.fillRect(enemy.x, enemy.y, ENEMY_SIZE, ENEMY_SIZE);
}

// Draw game over
function drawGameOver() {
  ctx.fillStyle = GAME_OVER_COLOR;
  ctx.font = '40px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(GAME_OVER_TEXT, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
}

// Draw win
function drawWin() {
  ctx.fillStyle = WIN_COLOR;
  ctx.font = '40px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(WIN_TEXT, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
}

// Update game state
function update() {
  if (!isGameOver && !isWin) {
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw player
    drawPlayer();

    // Draw enemies
    for (let i = 0; i < enemies.length; i++) {
      drawEnemy(enemies[i]);
      enemies[i].y += ENEMY_SPEED;

      // Check collision with player
      if (
        enemies[i].x < playerX + PLAYER_SIZE &&
        enemies[i].x + ENEMY_SIZE > playerX &&
        enemies[i].y < playerY + PLAYER_SIZE &&
        enemies[i].y + ENEMY_SIZE > playerY
      ) {
        isGameOver = true;
      }

      // Remove enemies that go off-screen
      if (enemies[i].y > CANVAS_HEIGHT) {
        enemies.splice(i, 1);
        i--;
      }
    }
  }

  if (isGameOver) {
    drawGameOver();
    clearInterval(intervalId);
  }

  if (isWin) {
    drawWin();
    clearInterval(intervalId);
  }
}

// Generate random enemy
function generateEnemy() {
  const enemyX = Math.random() * (CANVAS_WIDTH - ENEMY_SIZE);
  const enemyY = 0;
  const enemy = { x: enemyX, y: enemyY };
  enemies.push(enemy);
}

// Start game
function startGame() {
  playerX = CANVAS_WIDTH / 2 - PLAYER_SIZE / 2;
  playerY = CANVAS_HEIGHT - PLAYER_SIZE;
  enemies = [];
  isGameOver = false;
  isWin = false;
  intervalId = setInterval(generateEnemy, ENEMY_INTERVAL);
}

// Handle player movement
function handlePlayerMove(event) {
  if (!isGameOver && !isWin) {
    switch (event.key) {
      case 'ArrowLeft':
        if (playerX - PLAYER_SPEED >= 0) {
          playerX -= PLAYER_SPEED;
        }
        break;
      case 'ArrowRight':
        if (playerX + PLAYER_SIZE + PLAYER_SPEED <= CANVAS_WIDTH) {
          playerX += PLAYER_SPEED;
        }
        break;
      case 'ArrowUp':
        if (playerY - PLAYER_SPEED >= 0) {
          playerY -= PLAYER_SPEED;
        }
        break;
      case 'ArrowDown':
        if (playerY + PLAYER_SIZE + PLAYER_SPEED <= CANVAS_HEIGHT) {
          playerY += PLAYER_SPEED;
        }
        break;
    }
  }
}

// Handle restart button click
function handleRestartClick() {
	if (isGameOver || isWin) {
		startGame();
	}
}

// Add event listeners
window.addEventListener('keydown', handlePlayerMove);
document.getElementById('restartButton').addEventListener('click', handleRestartClick);

// Start game
startGame();

// Main game loop
function gameLoop() {
	update();
	requestAnimationFrame(gameLoop);
}

gameLoop();