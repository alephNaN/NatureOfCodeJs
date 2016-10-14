function Oscillator() {
  this.amplitude = new PVector(width/2, height/2);
  this.velocity = new PVector(random(-0.05,0.05),random(-0.05,0.05));
  this.angle = new PVector(0, 0);
};
Oscillator.prototype.update = function() {
  this.angle.add(this.velocity);
};
Oscillator.prototype.display = function() {
  const x = sin(this.angle.x)*this.amplitude.x;
  const y = sin(this.angle.y)*this.amplitude.y;

  push();
  translate(width/2,height/2);
  stroke(0);
  fill(175);
  line(0,0,x,y);
  ellipse(x,y,16,16);
  pop();
};

const oscillators = [];
function setup() {
  createCanvas(640,360);
  for(let i = 0 ; i < 8; i++) {
    const o = new Oscillator();
    oscillators.push(o);
  }
}

function draw() {
  background(255);

  oscillators.forEach((o) => {
    o.update();
    o.display();
  });
}
