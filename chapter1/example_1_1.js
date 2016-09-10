let x = 100;
let y = 100;
let xspeed = 1;
let yspeed = 3.3;

function setup() {
  createCanvas(640, 360);
  background(255);
}

function draw() {

  x += xspeed;
  y += yspeed;
  if (x > width || x < 0) {
    xspeed *= -1;
  }
  if (y > height || y < 0) {
    yspeed *= -1;
  }

  background(255);
  stroke(0);
  fill(175);
  ellipse(x, y, 16, 16);
}
