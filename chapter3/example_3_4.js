let r = 0;
let theta = 0;

function setup() {
  createCanvas(640,360);
  background(255);
}

function draw() {
  // convert polar coordinates to cartesian
  const x = r * cos(theta);
  const y = r * sin(theta);

  noStroke();
  fill(0);
  ellipse(x+width/2, y+height/2, 8, 8);

  theta += 0.05;
  r += .1
}
