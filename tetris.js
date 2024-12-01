const gameContainer = document.getElementById("game");
const rows = 20;
const cols = 10;
const grid = [];


for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < cols; c++) {
        const block = document.createElement("div");
        block.classList.add("block");
        gameContainer.appendChild(block);
        grid[r][c] = block;
    }
}


const shapes = [

    [[1, 1, 1, 1]],

    [
        [1, 1],
        [1, 1],
    ],

    [
        [0, 1, 0],
        [1, 1, 1],
    ],

    [
        [0, 1, 1],
        [1, 1, 0],
    ],

    [
        [1, 1, 0],
        [0, 1, 1],
    ],

    [
        [1, 0],
        [1, 0],
        [1, 1],
    ],

    [
        [0, 1],
        [0, 1],
        [1, 1],
    ],
];


let currentShape = shapes[0]; // Başlangıç şekli (I şekli)
let currentPos = { x: 3, y: 0 }; // Başlangıç pozisyonu

function drawShape() {
    currentShape.forEach((row, r) => {
        row.forEach((cell, c) => {
            if (cell) {
                const x = currentPos.x + c;
                const y = currentPos.y + r;
                if (y >= 0) grid[y][x].classList.add("active");
            }
        });
    });
}

function clearShape() {
    currentShape.forEach((row, r) => {
        row.forEach((cell, c) => {
            if (cell) {
                const x = currentPos.x + c;
                const y = currentPos.y + r;
                if (y >= 0) grid[y][x].classList.remove("active");
            }
        });
    });
}


function moveDown() {
    clearShape();
    currentPos.y += 1;
    drawShape();
}

setInterval(moveDown, 1000); // Şekil 1 saniyede bir aşağı iner


document.addEventListener("keydown", (e) => {
    clearShape();
    if (e.key === "ArrowLeft") currentPos.x -= 1; // Sol
    if (e.key === "ArrowRight") currentPos.x += 1; // Sağ
    if (e.key === "ArrowDown") currentPos.y += 1; // Hızlı iniş
    drawShape();
});


function freezeShape() {
    currentShape.forEach((row, r) => {
        row.forEach((cell, c) => {
            if (cell) {
                const x = currentPos.x + c;
                const y = currentPos.y + r;
                if (y >= 0) grid[y][x].classList.add("frozen");
            }
        });
    });
}

function checkCollision() {
    return currentShape.some((row, r) =>
        row.some((cell, c) => {
            if (cell) {
                const x = currentPos.x + c;
                const y = currentPos.y + r + 1;
                return y >= rows || (y >= 0 && grid[y][x].classList.contains("frozen"));
            }
            return false;
        })
    );
}

function moveDown() {
    if (checkCollision()) {
        freezeShape();
        currentShape = shapes[Math.floor(Math.random() * shapes.length)];
        currentPos = { x: 3, y: 0 };
    } else {
        clearShape();
        currentPos.y += 1;
        drawShape();
    }
}


function clearFullRows() {
    for (let r = 0; r < rows; r++) {
        if (grid[r].every((block) => block.classList.contains("frozen"))) {
            grid[r].forEach((block) => block.classList.remove("frozen"));
            for (let y = r; y > 0; y--) {
                grid[y].forEach((block, c) => {
                    if (grid[y - 1][c].classList.contains("frozen")) {
                        block.classList.add("frozen");
                    } else {
                        block.classList.remove("frozen");
                    }
                });
            }
        }
    }
}

