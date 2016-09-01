const ROWS = 80;
const COLS = 150;
const CELL_SIZE = 10;

const Rule90Mapping = {
  "000": 0,
  "001": 1,
  "010": 0,
  "011": 1,
  "100": 1,
  "101": 0,
  "110": 1,
  "111": 0
}

function rule90(neighborhood) {
  return Rule90Mapping[neighborhood.join('')];
}

const Grid = (function(rows, cols, cellSize) {
    const matrix = [];

    // Initialize to zero
    let i = rows;
    while (i--) {
        let j = cols;
        const row = [];
        while (j--) {
          row.push(0);
        }
        matrix.push(row);
    }

    function checkBounds(i, j) {
      if (i >= rows.length || j >= cols.length) {
        throw new Exception("index out of bounds");
      }
    }

    function set(i, j, value) {
      checkBounds();
      matrix[i][j] = value ? 1 : 0;
    }

    function setBlack(i, j) {
      set(i, j, 1);
    }

    function setWhite(i, j) {
      set(i, j, 0);
    }

    function get(i, j) {
      checkBounds();
      return matrix[i][j];
    }

    function render() {
      let i = rows;
      while (i--) {
        let j = cols;
        while (j--) {
          if (matrix[i][j]) {
            fill(0);
          } else {
            fill(255);
          }
          rect(cellSize*j, cellSize*i, cellSize, cellSize);
        }
      }
    }

    return {
        get: get,
        render: render,
        set: set
    };
})(ROWS, COLS, CELL_SIZE);

function getNeighborhood(i, j) {
    return [Grid.get(i-1, j-1), Grid.get(i-1, j), Grid.get(i-1, j+1)];
}

let row;

function setup() {
  createCanvas(COLS*CELL_SIZE, ROWS*CELL_SIZE);
  background(255);

  const middleCell = COLS / 2;
  Grid.set(0, middleCell, 1);
  Grid.render();

  row = 1;

  frameRate(5);
}

function draw() {
  if (row < ROWS) {
    let j = COLS;
    while (j--) {
      if ( j > 0 && j < COLS-1) {
        const neighborhood = getNeighborhood(row, j);
        Grid.set(row, j, rule90(neighborhood));
      }
    }
    Grid.render();
    row++;
  }
}
