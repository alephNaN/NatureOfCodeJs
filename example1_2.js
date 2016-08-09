class PVector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(v2) {
    this.x = this.x + v2.x;
    this.y = this.y + v2.y;
  }
  sub(v2) {
    this.x = this.x - v2.x;
    this.y = this.y - v2.y;
  }
  setX(x) { this.x = x; }
  setY(y) { this.y = y; }

}


let loc = new PVector(100, 100);
let velocity = new PVector(1, 1);

function setup() {
  createCanvas(640, 360);
  background(255);
}
function draw() {
  background(255);
  loc.add(velocity);

  if (checkHorizontalBoundary(loc))
      velocity.setX( -1 * velocity.x);
  if (checkVerticalBoundary(loc))
      velocity.setY( -1 * velocity.y);

  drawBall(loc);
}

const checkHorizontalBoundary = (location) => (location.x > width
    || location.x < 0);
const checkVerticalBoundary = (location) => (location.y > height
    || location.y < 0);

function drawBall(location) {
  const circumference = 16;
  stroke(0);
  fill(175);
  ellipse(location.x,location.y,circumference,circumference);
}
