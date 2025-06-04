// Example usage in a hypothetical game setup
const CELL_SIZE = 40; // Pixels per grid cell
const GRID_WIDTH = 20;
const GRID_HEIGHT = 15;
const TARGET_X = 19; // Example target
const TARGET_Y = 7;   // Example target

const gameGrid = new GameGrid(GRID_WIDTH, GRID_HEIGHT);
const flowField = new FlowField(gameGrid);

// Initial calculation of the flow field
flowField.update(TARGET_X, TARGET_Y);

const enemies = [];
function spawnEnemy() {
    // Spawn enemies at a random starting point, or a defined spawn point
    const spawnX = 0;
    const spawnY = Math.floor(Math.random() * GRID_HEIGHT);
    enemies.push(new Enemy(spawnX * CELL_SIZE + CELL_SIZE/2, spawnY * CELL_SIZE + CELL_SIZE/2, flowField, 0.1)); // Adjust speed
}

// Example of placing a tower (obstacle)
// In a real game, this would be triggered by player input
// gameGrid.setObstacle(5, 5);
// gameGrid.setObstacle(5, 6);
// flowField.update(TARGET_X, TARGET_Y); // Recalculate flow field after placing tower

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = GRID_WIDTH * CELL_SIZE;
canvas.height = GRID_HEIGHT * CELL_SIZE;

let lastTime = 0;

function gameLoop(currentTime) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    // Update game logic
    enemies.forEach(enemy => enemy.update(deltaTime));

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid (optional, for debugging)
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            const cell = gameGrid.getCell(x, y);
            ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

            // Optional: draw integration cost or direction for debugging
            // if (cell.integrationCost !== Infinity) {
            //     ctx.fillStyle = 'black';
            //     ctx.fillText(Math.floor(cell.integrationCost), x * CELL_SIZE + 5, y * CELL_SIZE + 15);
            // }

            // Draw direction arrows
            if (cell.direction.x !== 0 || cell.direction.y !== 0) {
                 const startX = x * CELL_SIZE + CELL_SIZE / 2;
                 const startY = y * CELL_SIZE + CELL_SIZE / 2;
                 const endX = startX + cell.direction.x * CELL_SIZE * 0.3;
                 const endY = startY + cell.direction.y * CELL_SIZE * 0.3;
                 ctx.strokeStyle = 'green';
                 ctx.lineWidth = 1;
                 ctx.beginPath();
                 ctx.moveTo(startX, startY);
                 ctx.lineTo(endX, endY);
                 ctx.stroke();
            }

            if (cell.cost === Infinity) {
                ctx.fillStyle = 'gray';
                ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }

    // Draw enemies
    enemies.forEach(enemy => enemy.draw(ctx, CELL_SIZE));

    // Draw target
    ctx.fillStyle = 'blue';
    ctx.fillRect(TARGET_X * CELL_SIZE, TARGET_Y * CELL_SIZE, CELL_SIZE, CELL_SIZE);


    requestAnimationFrame(gameLoop);
}

// Start the game
spawnEnemy(); // Spawn an initial enemy
setInterval(spawnEnemy, 2000); // Spawn enemies every 2 seconds (for testing)
requestAnimationFrame(gameLoop);