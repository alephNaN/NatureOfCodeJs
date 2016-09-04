const ROWS = 40;
const COLS = 100;
const CELL_SIZE = 10;


const CA = (function(rows, cols, cellSize) {
    const NUM_STATES_PER_CELL = 2;
    const NEIGHBORHOOD_SIZE = 3;
    const NUM_CONFIGURATIONS = Math.pow(NUM_STATES_PER_CELL,
        NEIGHBORHOOD_SIZE);
    const CONFIGURATIONS = (function() {
      const configurations = [];
      for(let i = 0; i < NUM_CONFIGURATIONS; i++) {
        configurations.push(getBinaryString(i, NEIGHBORHOOD_SIZE));
      }
      return configurations;
    })();
    const grid = (function() {
      const g = [];
      let i = rows;
      while (i--) {
          let j = cols;
          const row = [];
          while (j--) {
            row.push(0);
          }
          g.push(row);
      }
      return g;
    })();
    let generation = 1;
     // 0 <= ruleNumber < NUM_CONFIGURATIONS
    let ruleNumber = 130;
    let ruleMapping;
    initializeCurrentRule();

    // Initialize all cells to zero
    function initializeEmptyGrid() {
      let i = rows;
      while (i--) {
        let j = cols;
        while (j--) {
          grid[i][j] = 0;
        }
      }
    }

    function getRuleMapping(rule, configurations) {
        const ruleMapping = {};
        configurations.forEach((e, i) => {
          ruleMapping[e] = rule[i];
        });
        return ruleMapping;
    }

    function getBinaryString(ruleNumber, length) {
      const configuration = (ruleNumber).toString(2);
      const zeroPadding = (new Array(length-configuration.length+1)).join('0');
      return zeroPadding + configuration;
    }

    function decToBinaryArray(ruleNumber) {
      return getBinaryString(ruleNumber, NUM_CONFIGURATIONS).split('');
    }

    function initializeCurrentRule() {
      initializeEmptyGrid();
      let j = cols;
      // Random values for cells in first row
      while (j--) {
        set(0, j, Math.floor(2*Math.random()));
      }
      ruleMapping = getRuleMapping(decToBinaryArray(ruleNumber),
          CONFIGURATIONS);
    }

    function checkBounds(i, j) {
      if (i >= rows.length || j >= cols.length) {
        throw new Exception("index out of bounds");
      }
    }

    function set(i, j, value) {
      checkBounds();
      grid[i][j] = value == 1 ? 1 : 0;
    }

    function get(i, j) {
      checkBounds();
      return grid[i][j];
    }

    function lookupRule(neighborhood) {
      return ruleMapping[neighborhood.join("")];
    }
    function getNeighborhood(i, j) {
        return [get(i, j-1), get(i, j),get(i, j+1)];
    }

    function generate() {
      // Start new rule set
      if(generation == rows) {
        // Increment rule, going to zero if at max
        ruleNumber = ((ruleNumber++) === NUM_CONFIGURATIONS - 1 ) ? 0 : ruleNumber;

        initializeCurrentRule();
        generation = 1;
      } else {
        let j = cols;
        while (j--) {
          if ( j > 0 && j < cols-1) {
            const neighborhood = getNeighborhood(generation-1, j);
            set(generation, j, lookupRule(neighborhood));
          }
        }
      }
      generation++;
    }

    function render() {
      let i = rows;
      while (i--) {
        let j = cols;
        while (j--) {
          if (grid[i][j]) {
            fill(0);
          } else {
            fill(255);
          }
          rect(cellSize*j, cellSize*i, cellSize, cellSize);
        }
      }
    }

    return {
        render: render,
        generate: generate,
        wipe:  initializeEmptyGrid
    };
})(ROWS, COLS, CELL_SIZE);


function setup() {
  createCanvas(COLS*CELL_SIZE, ROWS*CELL_SIZE);
  background(255);
  frameRate(20);
}

function draw() {
  CA.generate();
  CA.render();
}
