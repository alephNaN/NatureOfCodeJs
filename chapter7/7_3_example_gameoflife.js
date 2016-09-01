const ROWS = 100;
const COLS = 100;
const CELL_SIZE = 10;

const Rule90Mapping = {
  "000": 0,
  "001": 1,
  "010": 1,
  "011": 1,
  "100": 0,
  "101": 1,
  "110": 1,
  "111": 0
};



function rule90(neighborhood) {
  return Rule90Mapping[neighborhood.join('')];
}

const Grid = (function(rows, cols, cellSize) {
    const matrix = [];


    // Initialize to zero
    let i = rows;
    while (i--) {
        const row = [];
        if (i == 0 || i == rows-1) {
          let j = cols;
          while (j--) {
            row.push(0);
          }
        } else {
          let j = cols-1;
          row.push(0);
          while ((j--)-1) {
            row.push(Math.floor(2*Math.random()));
          }
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

    function render2(other) {
      let i = rows;
      while (i--) {
        let j = cols;
        while (j--) {
          if (matrix[i][j] && other.get(i,j)==0) {
            fill(0, 0, 255);
          } else if (matrix[i][j]){
            fill(0);
          } else if (other.get(i,j) ==1 && matrix[i][j] == 0) {
            fill(255, 0, 0);
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
        render2: render2,
        set: set
    };
});

function getNeighborhood(i, j) {
    return [Grid.get(i-1, j-1), Grid.get(i-1, j), Grid.get(i-1, j+1)];
}

let row;
let g;
function setup() {
  createCanvas(COLS*CELL_SIZE, ROWS*CELL_SIZE);
  background(255);

  const middleCell = COLS / 2;
  g = Grid(ROWS, COLS, CELL_SIZE);
  g.set(0, middleCell, 1);
  g.render();

  row = 1;

  frameRate(10);
}

function aliveNeighbors(g, x, y) {
  let neighbors = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      neighbors += g.get(x+i,y+j);
    }
  }
   return neighbors;
}

function draw() {
  const g2 = Grid(ROWS, COLS, CELL_SIZE);
  let i = ROWS-1;
  while (i--) {
    if (i==0) break;
    let j = COLS-1;
    while (j--) {
      if (j == 0) break;
      const curr = g.get(i, j);
      const neighbors = aliveNeighbors(g, i, j) - curr;
      let next = 0;
      if ((curr == 1) && (neighbors <  2)) {
      } else if ((curr == 1) && (neighbors >  3)) {
      } else if ((curr == 0) && (neighbors == 3)) {
        next = 1;
      } else {
        next = curr;
      }
      g2.set(i, j, next);
    }
  }

  g2.render2(g);

  g = g2;
}
