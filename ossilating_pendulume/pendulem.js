class pendulem {
  constructor(orign, angle, mass, draged, length, gravitation, stopRate) {
    this.mass = mass;
    this.orign = orign;
    this.angle = angle;
    this.angularVil = 0;
    this.angularAcc = 0;
    this.couldBeDragged = draged;
    this.pos = createVector();
    if (gravitation) {
      this.gravitation = -1 * gravitation;
    } else {
      this.gravitation = -1 * 9.65;
    }
    if (length) {
      this.len = length;
    } else {
      this.len = 200;
    }
    if (stopRate) {
      this.stopRate = stopRate;
    } else {
      this.stopRate = 0.99;
    }
  }
  go() {
    this.handlePhy();
    this.show();
    if (this.couldBeDragged) {
      this.draged();
    }
  }
  show() {
    fill(255);
    stroke(255);
    line(this.orign.x, this.orign.y, this.pos.x, this.pos.y);
    ellipse(this.pos.x, this.pos.y, 20, 20);
  }
  handlePhy() {
    this.angularVil += this.angularAcc;
    this.angle += this.angularVil;
    this.angularVil *= this.stopRate;
    this.angularAcc *= 0;

    this.pos.x = this.orign.x + this.len * sin(this.angle);
    this.pos.y = this.orign.y + this.len * cos(this.angle);

    let Fp = this.gravitation / this.len * sin(this.angle);
    this.angularAcc = Fp / this.mass;
  }
  draged() {
    if (this.couldBeDragged) {
      if (mouseIsPressed) {
        let mouse = createVector(mouseX, mouseY);
        let angleBetween = this.orign.angleBetween(mouse.mult(0.1));
        this.angle = angleBetween;
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
