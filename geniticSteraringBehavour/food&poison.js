class Food {
  constructor(x, y) {
    this.loc = createVector(x, y);
  }
  show() {
    fill(100, 255, 150);
    ellipse(this.loc.x, this.loc.y, 10, 10);
  }
}

class Poison {
  constructor(x, y) {
    this.loc = createVector(x, y);
  }
  show() {
    fill(255, 0, 100);
    ellipse(this.loc.x, this.loc.y, 10, 10);
  }
}
