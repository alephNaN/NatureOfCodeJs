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
