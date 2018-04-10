function flake(x, y, size, r, alpha) {
  this.loc = createVector(x, y);
  this.size = size;
  this.alpha = alpha;
  this.r = r;
  this.halfSize = size / 2;
  this.scale = 2;
  this.vil = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.gravity = createVector(0, 0.01);
  this.angle=0
  this.applyForce = function(f) {
    this.acc.add(f);
  }

  this.show = function() {

    fill(255, this.alpha);
    ellipse(this.loc.x, this.loc.y, this.r);
    push()
    translate(this.loc.x,this.loc.y)
    rotate(this.angle)
    strokeWeight(2)
    stroke(255, this.alpha)
    line(0, 0 - this.halfSize, 0, 0 + this.halfSize);
    line(0 - this.halfSize, 0, 0 + this.halfSize, 0);
    line(0 - this.halfSize + 3, 0 - this.halfSize + 3, 0 + this.halfSize - 3, 0 + this.halfSize - 3);
    line(0 + this.halfSize - 3, 0 - this.halfSize + 3, 0 - this.halfSize + 3, 0 + this.halfSize - 3);
    pop()
  }

  this.update = function() {
    this.vil.add(this.acc);
    this.loc.add(this.vil);
    this.acc.mult(0);
    this.alpha -= 0.7;
    this.angle+=0.1/this.size;
  }

  this.fall = function() {
    this.applyForce(this.gravity);
  }




}
