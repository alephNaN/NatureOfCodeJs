function PVector(x_, y_) {
  this.x = x_;
  this.y = y_;
};
PVector.prototype.add = (o) => {
  this.x += o.x;
  this.y += o.y;
};
PVector.prototype.sub = (o) => {
  this.x -= o.x;
  this.y -= o.y;
}

function setup() {
  createCanvas(640, 360);
}
function draw() {
  background(255);

  const mouse  = new PVector(mouseX,mouseY);
  const center = new PVector(width/2,height/2);

  mouse.sub(center);
  line(width/2,height/2,mouse.x,mouse.y);
}
