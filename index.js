const FIGURES = [
  [
    [false, true, false],
    [false, true, false],
    [false, true, false],
    [false, true, false],
  ],
  [
    [false, false, false],
    [false, true, false],
    [false, true, false],
    [false, true, true],
  ],
  [
    [false, false, false],
    [false, true, false],
    [false, true, false],
    [true, true, false],
  ],
  [
    [false, false, false],
    [false, false, false],
    [false, true, false],
    [true, true, true],
  ],
  [
    [false, false, false],
    [false, false, false],
    [false, true, true],
    [true, true, false],
  ],
  [
    [false, false, false],
    [false, false, false],
    [true, true, false],
    [false, true, true],
  ],
  [
    [false, false, false],
    [false, false, false],
    [false, true, true],
    [false, true, true],
  ],
];

let gameField = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const mainRows = document.querySelectorAll('.row');

const previewWindow = document.querySelector('.preview-window');

let gameSpeed = 1000;
let initialPosition = [4, 0];
let currentFigureColor = 'coral';

function generateFigure() {
  let figureIndex = Math.trunc(Math.random() * FIGURES.length);
  return FIGURES[figureIndex];
}

function drawNextFigure(nextFigure) {
  const rows = previewWindow.querySelectorAll('.preview-row');

  let currentRow = 0;

  rows.forEach(row => {
    let currentCell = 0;
    const cells = row.querySelectorAll('.preview-cell');

    cells.forEach(cell => {

      if (nextFigure[currentRow][currentCell] === true) {
        cell.classList.add('coral');
      } else {
        cell.classList.add('invisible');
      }

      currentCell++;
    });

    currentRow++;
  });
}

function placeCurrentFigure(positionX, positionY) {
  for (let i = 0; i < currentFigure.length; i++) {
    for (let j = 0; j < currentFigure[i].length; j++) {
      if (currentFigure[i][j] === true) {
        gameField[i+ positionY][j + positionX] = 1;
      }
    }
  }
}

function clearGameField(positionX, positionY) {
  for (let i = 0; i < currentFigure.length; i++) {
    for (let j = 0; j < currentFigure[i].length; j++) {
      if (currentFigure[i][j] === true) {
        gameField[i+ positionY][j + positionX] = 0;
      }
    }
  }
}

function drawGameField() {
  let currentRow = 0;

  mainRows.forEach(row => {
    const cells = row.querySelectorAll('.cell');
    let currentCell = 0;

    cells.forEach(cell => {
      if (gameField[currentRow][currentCell] === 1) {
        cell.classList.add(currentFigureColor);
      }

      currentCell++;
    });

    currentRow++;
  });
}

function clearMainWindow() {
  const cells = document.querySelectorAll(`.${currentFigureColor}`);
  cells.forEach(cell => {
    console.log(cell.classList);
    cell.classList.remove(currentFigureColor);
  });
}

function gameTimer() {
  clearGameField(...currentPosition);
  currentPosition[1] += 1;

  placeCurrentFigure(...currentPosition);


  clearMainWindow();
  drawGameField();
}

let currentFigure = generateFigure();
let nextFigure = generateFigure();

drawNextFigure(nextFigure);
placeCurrentFigure(...initialPosition);
drawGameField();

let currentPosition = initialPosition;

let game = setInterval(gameTimer, gameSpeed);