class GaussianRandomWalker {
  /* @param {int} x starting position
   * @param {int} y starting position
   */

  constructor(x, y, isFancyWalker) {
    this.x = x;
    this.y = y;
    this.SIZE = 2;
  }

  step() {
    const gaussianX = randomGaussian();
    const gaussianY = randomGaussian();
    const sd_x = 2;
    const sd_y = 2;
    const mean = 0;
    const stepX = Math.round(sd_x * gaussianX + mean);
    const stepY = Math.round(sd_y * gaussianY + mean);
    this.x += stepX;
    this.y += stepY;
  }

  display() {
    noStroke();
    fill(0);
    ellipse(this.x, this.y, this.SIZE);
  }
}

let w;
function setup() {
  createCanvas(640, 360);
  w = new GaussianRandomWalker(width/2, height/2, true);
  background(255);
}
function draw() {
  w.step();
  w.display();
}
