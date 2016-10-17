function ParticleSystem(numParticles, o) {
  this.particles = [];
  for(let i = numParticles - 1; i >=0; i--) {
    const p = new Particle(new PVector(0, 0));
    this.particles.push(p);
  }
  this.origin = o;
}
ParticleSystem.prototype.run = function() {
  this.particles.push(new Particle(new PVector(0,0)));
  push();
  translate(this.origin.x, this.origin.y);
  for(let i = this.particles.length -1; i >=0; i--) {
    const p  = this.particles[i];
    if(p.isDead()) {
      this.particles.remove(i);
    } else {
      p.run();
    }
  }
  pop();
}

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

let ps;
function setup() {
  createCanvas(640,360);
  ps = new ParticleSystem(20, new PVector(width/4, height/2));
}

function draw() {
  background(255);
  ps.run();
}
