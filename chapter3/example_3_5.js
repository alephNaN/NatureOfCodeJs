const amplitude = 100;
const period = 120;
let timeStep = 0;
function setup() {
  createCanvas(640,360);
}

function draw() {
  background(255);

  const x = amplitude*cos(2*PI*timeStep/period);

  stroke(0);
  fill(175);

  translate(width/2,height/2);
  line(0,0,x,0);
  ellipse(x, 0, 16, 16);
  timeStep++;
}
