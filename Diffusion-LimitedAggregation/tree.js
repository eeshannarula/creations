function tree(x, y) {
  this.loc = createVector(x, y);
  this.r = 10;
  this.show = function() {
    fill(255, 0, 0);
    ellipse(this.loc.x, this.loc.y, this.r);
  }
  this.hit = function(mover) {
    let d = p5.Vector.dist(this.loc, mover.loc);
    if (d < (mover.r)) {
      return true;
    }
    return false;
  }
}
