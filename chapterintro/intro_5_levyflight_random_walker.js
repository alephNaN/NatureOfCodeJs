// Take bigs steps on the long tail
class LevyFlightRandomWalker {
  /**
   * @param {int} x starting position
   * @param {int} y starting position
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // On scale of 0 to 1
    this.LEVY_FLIGHT_PROBABILITY = .01;
    this.SIZE = 3;
  }

  step() {
    const r = random();
    let stepX, stepY;
    if ( r < this.LEVY_FLIGHT_PROBABILITY) {
      stepX = random(-100, 100);
      stepY = random(-100, 100);
    } else {
      stepX = random(-1, 1);
      stepY = random(-1, 1);
    }
    this.x += stepX;
    this.y += stepY;
  }

  display() {
    noStroke();
    fill(0);
    rect(this.x, this.y, this.SIZE, this.SIZE);
  }
}

let w;
function setup() {
  createCanvas(640, 360);
  w = new LevyFlightRandomWalker(width/2, height/2, true);
  background(255);
}
function draw() {
  w.step();
  w.display();
}
