const g = 10 // m/s^2 accelaration
let graph1;
let graph2;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  graph1 = new ProjectileGraph(45, 40, [255, 0, 0]);
  graph2 = new ProjectileGraph(60, 40, [0, 255, 0]);

}

function draw() {
  background(51);
  ProjectileGraph.drawStructure();
  graph1.drawGraph();
  graph2.drawGraph();

}

class ProjectileGraph {
  constructor(theta, initialV, color) { // theta is in degrees
    this.r = color[0];
    this.g = color[1];
    this.b = color[2];
    this.angle = theta;
    this.initialV = initialV;
    this.diplacement = (sq(this.initialV) * sin(2 * this.angle)) / g;
    this.XYtarget = [this.diplacement, 0];
    this.points = [];
    this.graphPixels();
  }

  update() {
    this.diplacement = (sq(this.initialV) * sin(2 * this.angle)) / g;
    this.XYtarget = [this.diplacement, 0];
    this.points = [];
    this.graphPixels();
  }

  graphPixels() {
    for (var i = 0; i < this.diplacement; i++) {
      const x = i;
      const y = x * tan(this.angle) * (1 - x / this.diplacement);
      this.points.push({
        x: x,
        y: y,
      })
    }
  }

  static drawStructure() {
    stroke(255);
    line(width / 2, 0, width / 2, height);
    line(0, height / 2, width, height / 2);
    stroke(100, 100, 255)
    fill(255, 100, 200)
    line(mouseX - 10, 0, mouseX - 10, height);
    line(0, mouseY - 10, width, mouseY - 10);
    ellipse(mouseX - 10, mouseY - 10, 4, 4);
    text((mouseX - width / 2 - 10) + ' : ' + (-1 * (mouseY - height / 2 - 10)), mouseX + 20, mouseY - 20);
    for (var i = -width / 2; i < width; i += 10) {
      ellipse(i, height / 2, 4, 4);
    }
    for (var i = -height / 2; i < height; i += 10) {
      ellipse(width / 2, i, 4, 4);
    }
  }

  drawGraph() {
    push()
    beginShape();
    noFill();
    stroke(this.r, this.g, this.b);
    translate(width / 2, height / 2);
    for (let point of this.points) {
      vertex(point.x, -point.y);
    }
    endShape()
    pop()
  }
}
