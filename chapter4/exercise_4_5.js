function ParticleSystem(numParticles, o) {
  this.particles = [];
  for(let i = numParticles - 1; i >=0; i--) {
    const p = new Particle(new PVector(0, 0));
    this.particles.push(p);
  }
  this.origin = o;
  this.age = 0;
  this.ageLimit = 100;
}
ParticleSystem.prototype.run = function() {
  this.age++;
  if (this.age <= this.ageLimit) {
    this.particles.push(new Particle(new PVector(0,0)));
  }
  
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
ParticleSystem.prototype.isDead = function() {
  return this.particles.length == 0;
};

ParticleSystem.prototype.setOrigin = function(o) {
  this.origin = o.dupe();
};


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


const particleSystems = [];
function setup() {
  createCanvas(640,360);
}

function draw() {
  background(255);
  const length = particleSystems.length;
  for(let i = length - 1; i >= 0; i--) {
    const system = particleSystems[i];
    if(system.isDead()) {
      particleSystems.remove(i);
    } else {   
      system.run();
    }
  }
}

function mouseClicked() {
  const x = mouseX;
  const y = mouseY;

  const ps = new ParticleSystem(20, new PVector(width/4, height/2));
  ps.setOrigin(new PVector(x, y));
  particleSystems.push(ps);
  // prevent default
  return false;
}
