function Particle(l) {
  this.location = l.dupe();
  this.acceleration = new PVector(0, 0);
  this.velocity = new PVector(random(-1,1),random(-2,0));
  this.lifespan = 255;
}
Particle.prototype.update = function() {
  this.lifespan -= 2;

  this.velocity.add(this.acceleration);
  this.location.add(this.velocity);
};
Particle.prototype.display = function() {
  stroke(0, this.lifespan);
  fill(175, this.lifespan);
  ellipse(this.location.x,this.location.y,8,8);
};
Particle.prototype.isDead = function() {
  return this.lifeSpan <= 0;
};
Particle.prototype.run = function() {
  this.update();
  this.display();
}

let p;
function setup() {
  createCanvas(640,360);
  p = new Particle(new PVector(width/2, height/2));
}

function draw() {
  background(255);
  p.run();
}
