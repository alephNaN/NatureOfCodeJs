function MouseMover(l, v) {
  this.location = l;
  this.velocity = v;
  this.topspeed = 5;
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
    this.location.add(this.velocity);

    this.acceleration = a;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
};
MouseMover.prototype.display = function() {
  stroke(0);
  fill(175);


  const angle = atan(this.velocity.y/this.velocity.x);

  push();
  rectMode(CENTER);
  translate(this.location.x,this.location.y);
  rotate(angle);
  rect(0,0,30,10);
  pop();
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
