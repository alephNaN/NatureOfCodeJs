const ROWS = 75;
const COLS = 150;
const CELL_SIZE = 10;


const CA = (function(rows, cols, cellSize) {
    const MAXIMUM_RULE_LIFESPAN = COLS;
    function monteCarlo() {
      while(true) {
        const r1 = Math.random();
        const p = r1;
        const r2 = Math.random();
        if (r2 < p) {
          return r1;
        }
      }
    }
    function calculateGenerationLifespan() {
      return Math.floor(monteCarlo()*MAXIMUM_RULE_LIFESPAN);
    }

    let color_;

    let regions;

    let generationLifespan = calculateGenerationLifespan();
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
            row.push({
              value: 0,
              color: 255,
              next: undefined
            });
          }
          g.push(row);
      }
      return g;
    })();

    let t = 500;
    let generation = 1;
     // 0 <= ruleNumber < NUM_CONFIGURATIONS
     // Rule 130 is interesting place to start
     // And the rules
    let ruleNumber = 110;
    let ruleMapping;
    initializeCurrentRule();


    // Initialize all cells to zero
    function initializeEmptyGrid() {
      let i = rows;
      while (i--) {
        let j = cols;
        while (j--) {
          grid[i][j] = {value: 0, color: 255, next: undefined};
        }
      }
    }

    function getRuleMapping(rule, configurations) {
        rule = rule.reverse();
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


      set(0, cols-10, 1);
      // let j = cols;
      // // Random Initial
      // while (j--) {
      //   set(0, j, Math.floor(2*Math.random()));
      // }

      ruleMapping = getRuleMapping(decToBinaryArray(ruleNumber),
          CONFIGURATIONS);
    }

    // Initialize current rule without wiping grid
    function softInitializeCurrentRule() {
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

      grid[i][j] = value == 1 ? {
        value: 1,
        color: color_ ? color(255, map(noise(t, generation),0,1,0,255), 0): 0,
        next: undefined
      }: {
        value: 0,
        color: color_ ? color(map(noise(t, generation),0,1,0,255),0,  0) : 255,
        next: undefined
      };
    }

    function get(i, j) {
      checkBounds();
      return grid[i][j].value;
    }

    function lookupRule(neighborhood) {
      return ruleMapping[neighborhood.join("")];
    }
    function getNeighborhood(i, j) {
        return [get(i, j-1), get(i, j),get(i, j+1)];
    }

    function addNeighbors(x, y) {
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i == 0 && j == 0)
            continue;
          neighbors += grid[y+i][x+j].value;
       }
     }
     return neighbors;
   }

    function populate(color) {
      color_ = color;
      for(let gen = 1; gen < rows; gen++) {
        let j = cols;
        while (j--) {
          if ( j > 0 && j < cols-1) {
            const neighborhood = getNeighborhood(gen-1, j);
            set(gen, j, lookupRule(neighborhood));
          }
        }
      }
    }

    function generate() {
      if (generation === generationLifespan) {
        generationLifespan = calculateGenerationLifespan();
        ruleNumber = ((ruleNumber++) === NUM_CONFIGURATIONS - 1 ) ? 0 :
          ruleNumber;
        softInitializeCurrentRule();
        generation = 1;
      } else {
        grid.shift();
        const row = [];
        let j = cols;
        while (j--) {
          row.push({value: 0, color: 255, next: undefined});
        }
        grid.push(row);
        j = cols;
        while (j--) {
          if ( j > 0 && j < cols-1) {
            const neighborhood = getNeighborhood(rows-2, j);
            t += .1;

            set(rows-1, j, lookupRule(neighborhood));
          }
        }

        generation++;
      }
    }

    function render() {
      let i = rows;
      while (i--) {
        let j = cols;
        while (j--) {
          fill(grid[i][j].color);
          rect(cellSize*j, cellSize*i, cellSize, cellSize);
        }
      }
    }

    return {
        render: render,
        generate: generate,
        populate: populate
    };
})(ROWS, COLS, CELL_SIZE);


function setup() {
  createCanvas(COLS*CELL_SIZE, ROWS*CELL_SIZE);
  background(255);
  CA.populate(color);
  frameRate(50);
}

function draw() {
  CA.generate();
  CA.render();
}
