let t = 0;
const angleVel = 0.1;
const amplitude = 100;
function setup() {
  createCanvas(640,360);
}

function draw() {
  background(255);
  stroke(0);
  strokeWeight(2);
  noFill();
  beginShape();
  let angle = t;
  for (let x = 0; x <= width; x += 24) {
    // Calculate the y location according to amplitude and sine of the angle.
    const y = map(sin(angle),-1,1,0,height);
    stroke(0);
    fill(0,50);
    ellipse(x,y,48,48);
    angle += angleVel;
  }
  endShape();

  t += .01;
}
