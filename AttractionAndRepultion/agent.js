function agent(x, y) {
  this.loc = createVector(x, y);
  this.vil = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.radius = 10;
  this.range = 50;

  this.show = function() {
    fill(255);
    ellipse(this.loc.x, this.loc.y, this.radius);
  }

  this.addForce = function(f) {
    this.acc.add(f);
  }

  this.update = function() {
    this.vil.add(this.acc);
    this.loc.add(this.vil);
    this.acc.mult(0);


  }

  this.attract = function(attractor) {
    let Apos = createVector(attractor.x, attractor.y);
    let d = dist(attractor.x, attractor.y, this.loc.x, this.loc.y);
    if (d > this.range) {
      let attractionForce = p5.Vector.sub(Apos, this.loc);
      let dsq = attractionForce.magSq()
      let g = 200;
      let mag = g / dsq;

      attractionForce.mult(2);
      attractionForce.setMag(mag)
      this.addForce(attractionForce);

    } else {
      let attractionForce = p5.Vector.sub(Apos, this.loc);
      attractionForce.mult(-1);
      let dsq = attractionForce.magSq()
      let g = 50;
      let mag = g / dsq;
      attractionForce.setMag(mag)
      this.addForce(attractionForce)

    }
  }
}
