function PVector(x_, y_) {
  this.x = x_;
  this.y = y_;
}
PVector.prototype.add = function(o) {
  this.x += o.x;
  this.y += o.y;
  return this;
};
PVector.prototype.sub = function(o) {
  this.x -= o.x;
  this.y -= o.y;
  return this;
};
PVector.prototype.scalar = function(n) {
  this.x *= n;
  this.y *= n;
  return this;
};
PVector.prototype.div = function(n) {
  this.x /= n;
  this.y /= n;
  return this;
};
PVector.prototype.mag = function() {
  return Math.sqrt(this.x*this.x + this.y*this.y);
};
PVector.prototype.normalize = function() {
  const m = this.mag();
  if ( m !== 0 ) {
    this.div(m);
  }
  return this;
};
PVector.prototype.limit = function(lim) {
  if (this.mag() >= lim) {
    this.normalize();
    this.scalar(lim);
  }
  return this;
};
PVector.random = function() {
  const x = Math.random() - .5;
  const y = Math.random() - .5;
  const v = new PVector(x, y);
  v.normalize();
  return v;
};

function MouseMover(l, v) {
  this.location = l;
  this.velocity = v;
  this.topspeed = 10;
};
MouseMover.prototype.checkEdges = function() {
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
MouseMover.prototype.update = function() {
    const mouse = new PVector(mouseX, mouseY);
    const dir =  mouse.sub(this.location);
    const a = dir.scalar(.1);
    this.location.add(this.velocity);

    this.acceleration = a;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
};
MouseMover.prototype.display = function() {
  stroke(0);
  fill(175);
  ellipse(this.location.x,this.location.y,16,16);
};


let mover;
function setup() {
  createCanvas(640, 360);
  const location = new PVector(width/2, height/2);
  const velocity = new PVector(0,0);
  mover = new MouseMover(location, velocity);
}

function draw() {
  background(255);
  mover.update();
  mover.checkEdges();
  mover.display();
}
