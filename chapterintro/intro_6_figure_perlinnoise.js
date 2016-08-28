// TIME
let t = 0.0;

function setup() {
  createCanvas(400,200);
  smooth();
  background(255);
}


function draw() {
  background(255);
  let xoff = t;
  noFill();
  stroke(0);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < width; i++) {
    const y = noise(xoff)*height;
    xoff += 0.01;
    vertex(i,y);
  }
  endShape();
  t += 0.01;
}
