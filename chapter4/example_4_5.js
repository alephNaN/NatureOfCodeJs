function ParticleSystem(numParticles, o) {
  this.particles = [];
  for(let i = numParticles - 1; i >=0; i--) {
    const p = new Particle(new PVector(0, 0));
    this.particles.push(p);
  }
  this.origin = o;
}
ParticleSystem.prototype.run = function() {
  this.addParticle();
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
};
ParticleSystem.prototype.addParticle = function() {
  const position = new PVector(0, 0);
  const r = Math.random();
  // We have a 50% chance of adding each kind of Particle.
  if (r < 0.5) {
    this.particles.push(new Particle(position));
  } else {
    const p = new Confetti(position);
    this.particles.push(p);
  }
};
ParticleSystem.prototype.setOrigin = function(o) {
  this.origin = o.dupe();
};


function Particle(l) {
  this.location = l;
  this.acceleration = new PVector(0, 0);
  this.velocity = new PVector(Math.random(-1,1),Math.random(-2,0));
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


Confetti.prototype = new Particle();
Confetti.prototype.constructor = Confetti;
function Confetti(l) {
  this.location = l;
  this.acceleration = new PVector(0, 0);
  this.velocity = new PVector(random(-1,1),random(-2,0));
  this.lifespan = 255;
}
Confetti.prototype.display = function() {
  stroke(0, this.lifespan);
  fill(175, this.lifespan);
  rect(this.location.x, this.location.y, 8, 8);
};

let ps;
function setup() {
  createCanvas(640,360);
  ps = new ParticleSystem(20, new PVector(width/4, height/2));
  ps.setOrigin(new PVector(width/2, height/2));
}

function draw() {
  background(255);
  ps.run();
}