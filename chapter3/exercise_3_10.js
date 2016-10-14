function Wave(o, amp, period, w) {
  this.spacing = 8;
  this.t = 0.0;
  this.origin = o;
  this.amplitude = amp;
  this.period = period;
  this.dx = (TWO_PI / period) / this.spacing;
  const y = [];
  for(let i = 0 ; i < w/this.spacing; i++) {
    y.push(0);
  }
  this.y = y;
};
Wave.prototype.update = function() {
  this.t += .01;
  let x = this.t;
  for (let i = 0; i < this.y.length; i++) {
    const y = map(sin(x), -1, 1, 0, this.amplitude);
    this.y[i] = y;
    x += this.dx;
  }
};
Wave.prototype.add = function(wave) {
  if(wave.y.length != this.y.length) {
    throw new Exception('Cannot add waves of different length');
  }
  for(let i = 0; i < wave.y.length; i++) {
      this.y[i] += wave.y[i];
  }
};

Wave.prototype.display = function() {
  push();
  beginShape();
  stroke(0);
  fill(0,50);

  let x = this.t;
  translate(this.origin.x, this.origin.y);
  for (let i = 0; i < this.y.length; i++) {
    ellipse(i*this.spacing, this.y[i], 24, 24);
  }
  endShape();
  pop();
};

const waves = [];
function setup() {
  createCanvas(640,360);
  const w1 = new Wave(new PVector(0, height/2),50,2,500);
  const w2 = new Wave(new PVector(0, height/2),100, 3, 500);
  waves.push(w1);
  waves.push(w2);
}

function draw() {
  background(255);

  waves.forEach((w) => {
    w.update();
  });

  const w1 = waves[0];
  for(let i = 1; i < waves.length; i++) {
    w1.add(waves[i]);
  }

  w1.display();
}
