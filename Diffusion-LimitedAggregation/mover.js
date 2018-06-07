function mover(x, y) {
  this.loc = createVector(x, y);
  this.r = 10;
  this.show = function() {
    fill(255);
    ellipse(this.loc.x, this.loc.y, this.r);
  }
  this.update = function() {
    let vil = p5.Vector.random2D();
    this.loc.add(vil);
  }
}
