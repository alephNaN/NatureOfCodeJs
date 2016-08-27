/**
 * Draws a bunch of opaque circles with horizontal positions
 * normally distributed 
 */

function setup() {
  createCanvas(640, 360);
  background(255);
}

function draw() {
  const g = randomGaussian();
  const sd = 60;
  const mean = 320;
  const x = sd*g + mean;

  noStroke();
  fill(0, 0, 0, 20);
  ellipse(x,180,16,16);
}
