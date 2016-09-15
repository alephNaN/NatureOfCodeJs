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

// Accelarates towards mouse
function MouseMover() {
  this.location = new PVector(random(width),random(height));
  this.velocity = new PVector(0,0);
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
    const a = mouse.sub(this.location).normalize().scalar(.5);

    this.acceleration = a;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.location.add(this.velocity);
};
MouseMover.prototype.display = function() {
  stroke(0);
  fill(175);
  ellipse(this.location.x,this.location.y,16,16);
};

const movers = [];
const NUM_MOVERS = 10;
function setup() {
  createCanvas(640, 360);
  let i = NUM_MOVERS;
  while(i--) {
    const mover = new MouseMover();
    movers.push(mover);
  }
}

function draw() {
  background(255);
  let i = NUM_MOVERS;
  while(i--) {
    const mover = movers[i];
    mover.update();
    mover.checkEdges();
    mover.display();
  }
}
