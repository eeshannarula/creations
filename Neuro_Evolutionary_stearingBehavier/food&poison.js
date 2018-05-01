class Food {
  constructor() {
    this.loc = createVector(random(foodBuffer, width - foodBuffer), random(foodBuffer, height - foodBuffer));
    this.r = 25;
  }
  show() {
    fill(100, 255, 150, 150);
    ellipse(this.loc.x, this.loc.y, this.r);
  }
}
