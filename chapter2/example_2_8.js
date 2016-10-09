const G = .4;

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
MovingBody.prototype.attract = function(mover) {
  const force = this.location.dupe().sub(mover.location);
  let distance = force.mag();
  distance = constrain(distance,5.0,25.0);
  force.normalize();
  const strength = (G * this.mass * mover.mass) / (distance * distance);
  force.scalar(strength);
  return force;
};

let movers = [];
function setup() {
  createCanvas(400, 400);
  for(let i = 0 ; i < 20; i ++) {
    movers[i] = new MovingBody(random(0.1,2),random(width),random(height));
  }
}

function draw() {
  background(255);

  for (let i = 0; i < movers.length; i++) {
    for (let j = 0; j < movers.length; j++) {
      // Don’t attract yourself!
      if (i != j) {
        const force = movers[j].attract(movers[i]);
        movers[i].applyForce(force);
      }
    }
    movers[i].update();
    movers[i].display();
  }
}
