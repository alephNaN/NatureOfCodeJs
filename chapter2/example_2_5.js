function Liquid(x_, y_, w_, h_, c_) {
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;
    this.c = c_;
}
Liquid.prototype.display = function() {
  noStroke();
  fill(175);
  rect(this.x,this.y,this.w,this.h);
};

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
MovingBody.prototype.insideLiquid = function(l) {
  return this.location.x>=l.x && this.location.x<=l.x+l.w && this.location.y>=l.y
    && this.location.y<=l.y+l.h;
};
MovingBody.prototype.drag = function(l) {
  const rho = 1;
  const surfaceArea = 1;
  const dragCoefficient = l.c;
  const dragDirection = this.velocity.dupe().normalize();
  const speed = this.velocity.mag();
  const dragMag = -.5 * rho * surfaceArea * dragCoefficient *
    speed*speed;
  const drag = dragDirection.scalar(dragMag);
  this.applyForce(drag);
};

let liquid;
const movers = [];
function setup() {
  createCanvas(640, 360);
  let n = 10;
  while(n--) {
    const m = new MovingBody(random(1,2),n*width/10+50,0);
    movers.push(m);
  }
  liquid = new Liquid(0, height/2, width, height/2, .5);
}

function draw() {
  background(255);
  liquid.display();
  movers.forEach((mover) => {
    if (mover.insideLiquid(liquid)) {
      mover.drag(liquid);
    }
    const gravity = new PVector(0, .1 * mover.mass);
    mover.applyForce(gravity);
    mover.update();
    mover.checkEdges();
    mover.display();
  });
}
