const G = 2;
function Attractor(x, y, m) {
  this.location = new PVector(x, y);
  this.m = m;
};
Attractor.prototype.attract = function(mover) {
  const force = this.location.dupe().sub(mover.location);
  const distance = force.mag();
  force.normalize();
  const strength = (G * this.m * mover.mass) / (distance * distance);
  force.scalar(strength);
  return force;
};
Attractor.prototype.display = function() {
  stroke(0);
  fill(0);
  ellipse(this.location.x,this.location.y,this.m*2,this.m*2);
};

function MovingBody(m, x, y, color) {
  if (m <= 0) {
    throw new Exception("Illegal Argument");
  }
  this.location = new PVector(x,y);
  this.velocity = new PVector(0,0);
  this.netForce = new PVector(0, 0);
  this.mass = m;
  this.acceleration = this.netForce.div(this.mass);
  this.color = color;
};
MovingBody.prototype.checkEdges = function() {
   if (this.location.x > width) {
     this.location.x = width;
     this.velocity.x *= -1;
   } else if (this.location.x < 0) {
     this.velocity.x *= -1;
     this.location.x = 0;
   }
   if (this.location.y > height) {
     this.velocity.y *= -1;
     this.location.y = height;
   } else if (this.location.y < 0) {
     this.velocity.y *= -1;
     this.location.y = 0;
   }
};
MovingBody.prototype.applyForce = function(f) {
    this.netForce.add(f);
};
MovingBody.prototype.update = function() {
    this.acceleration = this.netForce.div(this.mass);
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);

    // Zero out net force for next call to update
    this.netForce.scalar(0);
};
MovingBody.prototype.display = function() {
  stroke(0);
  fill(this.color);
  ellipse(this.location.x,this.location.y,this.mass*16,this.mass*16);
};

let movers = [];
let attractors = [];
function setup() {
  createCanvas(2000, 800);
  for(let i = 0 ; i < 10; i ++) {
    movers.push(new MovingBody(
      Math.ceil(Math.random()*5),
      Math.floor(Math.random()*1000),
      Math.floor(Math.random()*500),
      175
    ));
    movers[i].velocity = new PVector(Math.random()*5 - 2.5, Math.random() * 3 - 1.5);
  }
  const m = new MovingBody(1,400,100, 255);
  m.velocity = new PVector(.5, .2);
  movers.push(m);

  attractors.push(new Attractor(100, 100, 40));
  attractors.push(new Attractor(200, 100, 20));
  attractors.push(new Attractor(300, 200, 40));
  attractors.push(new Attractor(2000, 200, 1000));
}

function draw() {
  background(255);

  attractors.forEach((a) => {
    a.display();

    movers.forEach((m) => {
      const attractionForce = a.attract(m);
      m.applyForce(attractionForce);
    });
  });

  movers.forEach((m) => {
    m.update();
    m.display();
  });
}
