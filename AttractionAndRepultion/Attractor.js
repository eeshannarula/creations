function attractor(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 10;

  this.show = function() {
    fill(0, 128, 128);
    ellipse(this.x, this.y, this.radius);
  }
}
