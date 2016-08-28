// TIME
let t = 0.0;

/**
 * Step size affected by perlin noise
 */
class PerlinNoiseStepSizeWalker {
  /**
   * @param {int} x starting position
   * @param {int} y starting position
   * @param {boolean} isFancyWalker picks one of 9 directions,
   *    rather than default 4
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tx = 0;
    this.ty = 10000;
  }

  step() {
    this.x += map(noise(this.tx), 0, 1, -5, 5);
    this.y += map(noise(this.ty), 0, 1, -5, 5);
    this.tx += 0.01;
    this.ty += 0.01;
  }

}

let w;

function setup() {
  createCanvas(400,200);
  background(255);
  w = new PerlinNoiseStepSizeWalker (200, 100);
}


function draw() {
  background(255);
  ellipse(w.x, w.y,16,16);
  w.step();
}
