// Take bigs steps on the long tail
class MonteCarloRandomWalker {
  /**
   * @param {int} x starting position
   * @param {int} y starting position
   */
  constructor(x, y, isFancyWalker) {
    this.x = x;
    this.y = y;
    // On scale of 0 to 1
    this.LEVY_FLIGHT_PROBABILITY = .01;
    this.SIZE = 1;
  }

  step() {
    const stepSize = monteCarlo();
    const stepX = random(-stepSize, stepSize);
    const stepY = random(-stepSize, stepSize);
    this.x += 10*stepX;
    this.y += 10*stepY;
  }

  display() {
    noStroke();
    fill(0);
    rect(this.x, this.y, this.SIZE, this.SIZE);
  }
}

function monteCarlo() {
  while(true) {
    const r1 = random(1);
    const p = r1;
    const r2 = random(1);
    if (r2 < p) {
      return r1;
    }
  }
}

let w;
function setup() {
  createCanvas(640, 360);
  w = new MonteCarloRandomWalker(width/2, height/2, true);
  background(255);
}
function draw() {
  w.step();
  w.display();
}
