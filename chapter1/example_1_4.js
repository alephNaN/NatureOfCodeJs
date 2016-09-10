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

function setup() {
  createCanvas(640, 360);
}
function draw() {
  background(255);
  const mouse  = new PVector(mouseX,mouseY);
  const center = new PVector(width/2,height/2);
  
  mouse.sub(center);
  mouse.scalar(.5);

  translate(width/2, height/2);
  line(0,0,mouse.x,mouse.y);
}
