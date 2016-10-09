const G = 2;
function Attractor() {
  this.location = new PVector(width/2, height/2);
  this.m = 20;
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
  fill(175,200);
  ellipse(this.location.x,this.location.y,this.m*2,this.m*2);
};

function MovingBody(m, x, y) {
  if (m <= 0) {
    throw new Exception("Illegal Argument");
  }
  this.location = new PVector(x,y);
  this.velocity = new PVector(0,0);
  this.netForce = new PVector(0, 0);
  this.mass = m;
  this.acceleration = this.netForce.div(this.mass);
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
  fill(175);
  ellipse(this.location.x,this.location.y,this.mass*16,this.mass*16);
};

let m;
let a;
function setup() {
  createCanvas(640, 360);
  m =  new MovingBody(1,width/2 + 10,100);
  m.velocity = new PVector(.5, .2);
  a = new Attractor();
}

function draw() {
  background(255);

  const attractionForce = a.attract(m);
  m.applyForce(attractionForce);
  m.update();

  a.display();
  m.display();
}
