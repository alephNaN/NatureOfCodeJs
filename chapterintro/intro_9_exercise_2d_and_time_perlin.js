let t;

function setup() {
  createCanvas(400,200);
  background(255);
  t = 0.0;
}

function draw() {
  let xoff = 0.0;
  loadPixels();
  for (let x = 0; x < width; x++) {
    let yoff = 0.0;
    for (let y = 0; y < height; y++) {
      const bright = map(noise(xoff,yoff, t),0,1,0,255);
      set(x, y, color(bright));
      yoff+=.01;
    }
    xoff+=.01;
  }
  updatePixels();
  t +=.02;
}
