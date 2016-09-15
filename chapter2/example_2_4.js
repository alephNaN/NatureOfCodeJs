// Accelarates towards mouse
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

let movers = []
const mu = .10;
const wind = new PVector(.04, 0);
const normalForceMagnitude = 1;
function setup() {
  createCanvas(640, 360);
  let n = 10;
  while(n--) {
    const m = new MovingBody(random(0.1,5),0,0);
    movers.push(m);
  }
}

function draw() {
  background(255);
  movers.forEach((mover) => {
    const gravity = new PVector(0, .5 * mover.mass);
    const frictionDirection = mover.velocity.dupe().normalize().scalar(-1);
    const frictionMag = mu*normalForceMagnitude;
    const friction = frictionDirection.scalar(frictionMag);
    mover.applyForce(friction);
    mover.applyForce(gravity);
    mover.applyForce(wind);
    mover.update();
    mover.checkEdges();
    mover.display();
  });
}
