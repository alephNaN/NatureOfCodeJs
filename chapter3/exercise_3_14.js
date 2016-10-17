const G = .4;
const mu = .4;
function Box(l, m) {
  this.location = l;
  this.velocity = new PVector(0, 0);
  this.acceleration = new PVector(0, 0);
  this.mass = m;
};
Box.prototype.update = function(theta) {
  const f_incline_mag = G*this.mass*sin(theta);
  const f_incline = (new PVector(cos(theta), sin(theta))).scalar(
    f_incline_mag);

  const normal_mag = G*this.mass / cos(theta);
  const friction_mag = Math.min(mu * normal_mag, f_incline_mag);
  const f_friction = (new PVector(cos(theta), sin(theta))).scalar(
    -1*friction_mag);

  const f_sum = f_incline.add(f_friction);
  this.acceleration = f_sum.scalar(this.mass);
  this.velocity = this.velocity.add(this.acceleration);
  this.location = this.location.add(this.velocity);
};
Box.prototype.display = function(theta) {
  stroke(0);
  fill(175);
  
  push();
  translate(-8, 8);
  line(0, 0, 1000*cos(theta), 1000*sin(theta));
  pop();

  push();
  translate(this.location.x, this.location.y);
  rotate(theta);
  rect(-8,-8, 16,16);
  pop();
};


function Plane(theta) {
  this.theta = theta;
}
Plane.prototype.radian = function() {
  return this.theta * PI / 180;
};

let m;
const plane = new Plane(45);
function setup() {
  createCanvas(640,360);
  m = new Box(new PVector(0, 0), 1);
}

function draw() {
  background(255);
  m.update(plane.radian());
  m.display(plane.radian());
}
