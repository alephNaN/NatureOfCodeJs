const G = 2;
function Attractor(x, y, m) {
  this.location = new PVector(x, y);
  this.m = m;
};
Attractor.prototype.attract = function(mover) {
  const force = this.location.dupe().sub(mover.location);
  let distance = force.mag();
  distance = constrain(distance, 5.0,25.0);
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

function Mover(m, x, y) {
  if (m <= 0) {
    throw new Exception("Illegal Argument");
  }
  this.location = new PVector(x,y);
  this.velocity = new PVector(
    random(-2, 2),random(-2, 2));
  this.netForce = new PVector(0, 0);
  this.acceleration = new PVector(0, 0);

  this.angle = 0;
  this.aVelocity = 0;
  this.aAcceleration = 0.0;
  this.mass = m;
};
Mover.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.location.add(this.velocity);

  this.aAcceleration = this.acceleration.x / 10;
  this.aVelocity += this.aAcceleration;
  this.aVelocity = constrain(this.aVelocity,-0.1,0.1);
  this.angle += this.aVelocity;

  this.acceleration = this.netForce.div(this.mass);

  this.netForce.scalar(0);
};
Mover.prototype.display = function() {
  fill(175);
  stroke(0);
  rectMode(CENTER);
  push();

  translate(this.location.x,this.location.y);
  rotate(this.angle);
  rect(0,0,this.mass*16,this.mass*16);
  pop();
};
Mover.prototype.applyForce = function(f) {
    this.netForce.add(f);
};
Mover.prototype.checkEdges = function() {
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

const movers = [];
let attractor;
function setup() {
  createCanvas(640, 320);
  for(let i = 0 ; i < 10; i++) {
    const m = new Mover(
      random()*3,
      Math.floor(random()*width),
      Math.floor(random()*height)
    );
    m.velocity = new PVector(Math.random()*5 - 2.5, Math.random() * 3 - 1.5);
    movers.push(m);
  }

  attractor = new Attractor(width/2, height/2, 15);
}

function draw() {
  background(255);

  attractor.display();

  movers.forEach((m) => {
    const attractionForce = attractor.attract(m);
    m.applyForce(attractionForce);
  });

  for(let i = 0; i < movers.length; i++) {
    const m = movers[i];
    m.update();
    m.display();
  }
}
