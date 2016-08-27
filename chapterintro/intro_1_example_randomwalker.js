class RandomWalker {
  /**
   * @param {int} x starting position
   * @param {int} y starting position
   * @param {boolean} isFancyWalker picks one of 9 directions,
   *    rather than default 4
   */
  constructor(x, y, isFancyWalker) {
    this.x = x;
    this.y = y;
    this.STEP_SIZE = 5;
    this.isFancyWalker = isFancyWalker;
  }

  // Goes N, S, E, W, as well as NW, NE, SW, SE
  _9step() {
    const stepX = floor(random(0, 3)) - 1; // range(-1, 0, 1)
    const stepY = floor(random(0, 3)) - 1;
    this.x = this.x + stepX * this.STEP_SIZE;
    this.y = this.y + stepY * this.STEP_SIZE;
  }

  // Goes N, S, E, W
  _4step() {
    const choice = floor(random(0, 4));
    switch(choice) {
      case 0:
        this.x = this.x + this.STEP_SIZE;
        break;
      case 1:
        this.x = this.x - this.STEP_SIZE;
        break;
      case 2:
        this.y = this.y + this.STEP_SIZE;
        break;
      case 3:
        this.y = this.y - this.STEP_SIZE;
        break;
      default:
        break;
    }
  }

  step() { this.isFancyWalker ? this._9step() : this._4step(); }

  display() {
    stroke(255);
    fill(0);
    rect(this.x, this.y,this.STEP_SIZE,this.STEP_SIZE);
  }
}

let w;
function setup() {
  createCanvas(640, 360);
  w = new RandomWalker(width/2, height/2, true);
  background(255);
}
function draw() {
  w.step();
  w.display();
}
