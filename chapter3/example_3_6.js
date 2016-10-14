const amplitude = 100;
let angle = 0;
let aVelocity = .05;

let timeStep = 0;
function setup() {
  createCanvas(640,360);
}

function draw() {
  background(255);

  const x = amplitude*cos(angle);

  stroke(0);
  fill(175);

  translate(width/2,height/2);
  line(0,0,x,0);
  ellipse(x, 0, 16, 16);

  angle += aVelocity;
}
