const G = .4;
function Pendulum(r, theta, angVel, angA) {
  this.origin = new PVector(width/2, 0);
  this.r = r;
  this.theta = theta;
  this.angVel = angVel;
  this.angA = angA;
  this.damping = .995;
  this.absLocation = null;
}
Pendulum.prototype.setOrigin = function(o) {
  this.origin = o;
}
Pendulum.prototype.update = function() {
  this.angA = -1*G*sin(this.theta) / this.r;
  this.angVel += this.angA;
  this.angVel *= this.damping;
  this.theta += this.angVel;
};
Pendulum.prototype.display = function() {
  const origin = this.origin;
  const location = new PVector(
    this.r*sin(this.theta),
    this.r*cos(this.theta));
  stroke(0);
  fill(175);
  push();
  translate(origin.x, origin.y);
  line(0,0,location.x,location.y);
  ellipse(location.x,location.y,16,16);
  pop();
  this.absLocation = location.dupe().add(origin.dupe());
}

let p;
let p2;
function setup() {
  createCanvas(640,360);
  p = new Pendulum(height/2, 45, 0, 0);
  p2 = new Pendulum(height/4, 80, 0, 0);
}

function draw() {
  background(255);
  p.update();
  p.display();

  p2.setOrigin(p.absLocation.dupe());
  p2.update();
  p2.display();
}
