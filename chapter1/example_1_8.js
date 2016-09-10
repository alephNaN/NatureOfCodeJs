function PVector(x_, y_) {
  this.x = x_;
  this.y = y_;
}
PVector.prototype.add = function(o) {
  this.x += o.x;
  this.y += o.y;
};
PVector.prototype.sub = function(o) {
  this.x -= o.x;
  this.y -= o.y;
};
PVector.prototype.scalar = function(n) {
  this.x *= n;
  this.y *= n;
};
PVector.prototype.div = function(n) {
  this.x /= n;
  this.y /= n;
};
PVector.prototype.mag = function() {
  return Math.sqrt(this.x*this.x + this.y*this.y);
}
PVector.prototype.normalize = function() {
  const m = this.mag();
  if ( m !== 0 ) {
    this.div(m);
  }
}

function Mover(l, v, a) {
  this.location = l;
  this.velocity = v;
  this.acceleration = a;
}
Mover.prototype.checkEdges = function() {
    // Teleport / wrap around to alternate edge
    if (this.location.x > width) {
      this.location.x = 0;
    }
    if (this.location.x < 0) {
      this.location.x = width;
    }
    if (this.location.y > height) {
      this.location.y = 0;
    }
    if (this.location.y < 0) {
      this.location.y = height;
    }
};
Mover.prototype.update = function() {
    this.location.add(this.velocity);
    this.velocity.add(this.acceleration);
};
Mover.prototype.display = function() {
  stroke(0);
  fill(175);
  ellipse(this.location.x,this.location.y,16,16);
};


let mover;
function setup() {
  createCanvas(640, 360);
  const location = new PVector(width/2, height/2);
  const velocity = new PVector(1,1);
  const acceleration = new PVector(.05, .01);
  mover = new Mover(location, velocity, acceleration);
}

function draw() {
  background(255);
  mover.update();
  mover.checkEdges();
  mover.display();
}
