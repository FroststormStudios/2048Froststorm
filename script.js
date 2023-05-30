// Game logic
var gameGrid = [];
var score = 0;

function newGame() {
    gameGrid = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0));
    addNewNumber();
    updateGrid();
    score = 0;
    updateScore();
}

function addNewNumber() {
    var availableCells = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (gameGrid[i][j] === 0) {
                availableCells.push({ row: i, col: j });
            }
        }
    }
    if (availableCells.length > 0) {
        var randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        gameGrid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateGrid() {
    var gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = "";
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var cellValue = gameGrid[i][j];
            var cellDiv = document.createElement("div");
            cellDiv.className = "cell";
            cellDiv.textContent = cellValue === 0 ? "" : cellValue;
            cellDiv.style.backgroundColor = getCellBackgroundColor(cellValue);
            gridContainer.appendChild(cellDiv);
        }
    }
}

function getCellBackgroundColor(value) {
    switch (value) {
        case 2: return "#EEE4DA";
        case 4: return "#EDE0C8";
        case 8: return "#F2B179";
        case 16: return "#F59563";
        case 32: return "#F67C5F";
        case 64: return "#F65E3B";
        case 128: return "#EDCF72";
        case 256: return "#EDCC61";
        case 512: return "#EDC850";
        case 1024: return "#EDC53F";
        case 2048: return "#EDC22E";
        default: return "#CDC1B4";
    }
}

function updateScore() {
    document.getElementById("score").textContent = "Score: " + score;
}

function move(direction) {
    var moved = false;
    switch (direction) {
        case "up":
            for (var j = 0; j < 4; j++) {
                for (var i = 1; i < 4; i++) {
                    if (gameGrid[i][j] !== 0) {
                        var k = i - 1;
                        while (k >= 0 && gameGrid[k][j] === 0) {
                            gameGrid[k][j] = gameGrid[k + 1][j];
                            gameGrid[k + 1][j] = 0;
                            k--;
                            moved = true;
                        }
                        if (k >= 0 && gameGrid[k][j] === gameGrid[k + 1][j]) {
                            gameGrid[k][j] *= 2;
                            score += gameGrid[k][j];
                            gameGrid[k + 1][j] = 0;
                            moved = true;
                        }
                    }
                }
            }
            break;
        case "down":
            for (var j = 0; j < 4; j++) {
                for (var i = 2; i >= 0; i--) {
                    if (gameGrid[i][j] !== 0) {
                        var k = i + 1;
                        while (k < 4 && gameGrid[k][j] === 0) {
                            gameGrid[k][j] = gameGrid[k - 1][j];
                            gameGrid[k - 1][j] = 0;
                            k++;
                            moved = true;
                        }
                        if (k < 4 && gameGrid[k][j] === gameGrid[k - 1][j]) {
                            gameGrid[k][j] *= 2;
                            score += gameGrid[k][j];
                            gameGrid[k - 1][j] = 0;
                            moved = true;
                        }
                    }
                }
            }
            break;
        case "left":
            for (var i = 0; i < 4; i++) {
                for (var j = 1; j < 4; j++) {
                    if (gameGrid[i][j] !== 0) {
                        var k = j - 1;
                        while (k >= 0 && gameGrid[i][k] === 0) {
                            gameGrid[i][k] = gameGrid[i][k + 1];
                            gameGrid[i][k + 1] = 0;
                            k--;
                            moved = true;
                        }
                        if (k >= 0 && gameGrid[i][k] === gameGrid[i][k + 1]) {
                            gameGrid[i][k] *= 2;
                            score += gameGrid[i][k];
                            gameGrid[i][k + 1] = 0;
                            moved = true;
                        }
                    }
                }
            }
            break;
        case "right":
            for (var i = 0; i < 4; i++) {
                for (var j = 2; j >= 0; j--) {
                    if (gameGrid[i][j] !== 0) {
                        var k = j + 1;
                        while (k < 4 && gameGrid[i][k] === 0) {
                            gameGrid[i][k] = gameGrid[i][k - 1];
                            gameGrid[i][k - 1] = 0;
                            k++;
                            moved = true;
                        }
                        if (k < 4 && gameGrid[i][k] === gameGrid[i][k - 1]) {
                            gameGrid[i][k] *= 2;
                            score += gameGrid[i][k];
                            gameGrid[i][k - 1] = 0;
                            moved = true;
                        }
                    }
                }
            }
            break;
    }
    if (moved) {
        addNewNumber();
        updateGrid();
        updateScore();
        if (isGameOver()) {
            alert("Game Over!");
        }
    }
}

function isGameOver() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (gameGrid[i][j] === 0) {
                return false;
            }
            if (i !== 3 && gameGrid[i][j] === gameGrid[i + 1][j]) {
                return false;
            }
            if (j !== 3 && gameGrid[i][j] === gameGrid[i][j + 1]) {
                return false;
            }
        }
    }
    return true;
}

// Event listeners
document.getElementById("new-game-btn").addEventListener("click", newGame);
document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "ArrowUp":
            event.preventDefault();
            move("up");
            break;
        case "ArrowDown":
            event.preventDefault();
            move("down");
            break;
        case "ArrowLeft":
            event.preventDefault();
            move("left");
            break;
        case "ArrowRight":
            event.preventDefault();
            move("right");
            break;
    }
});

// Initialize the game
newGame();
