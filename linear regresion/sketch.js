let data = [];
let m = 1;
let b = 0;
let l;

function setup() {
  createCanvas(400, 400);
  l = new Line();
}

function draw() {
  background(51);
  if (data.length > 0) {
    l.calcSlope();
    l.calcYintigrate();
    l.update();
    l.show();
  }
  for (let p of data) {
    p.show();
  }
}

class Line {
  constructor() {
    this.xmin = 0;
    this.xmax = 1;
    this.ymin = m * this.xmin + b;
    this.ymax = m * this.xmax + b;

    let x1 = map(this.xmin, 0, 1, 0, width);
    let y1 = map(this.ymin, 1, 0, 0, height);
    let x2 = map(this.xmax, 0, 1, 0, width);
    let y2 = map(this.ymax, 1, 0, 0, height);

    this.startCords = createVector(x1, y1);
    this.endCords = createVector(x2, y2);
  }
  clacMean() {
    let sumX = 0;
    let sumY = 0;
    let total = data.length;
    for (let p of data) {
      sumX += p.point.x;
      sumY += p.point.y;
    }
    return {
      x: sumX / total,
      y: sumY / total
    }
  }

  update() {
    this.ymin = m * this.xmin + b;
    this.ymax = m * this.xmax + b;

    let x1 = map(this.xmin, 0, 1, 0, width);
    let y1 = map(this.ymin, 1, 0, 0, height);
    let x2 = map(this.xmax, 0, 1, 0, width);
    let y2 = map(this.ymax, 1, 0, 0, height);

    this.startCords = createVector(x1, y1);
    this.endCords = createVector(x2, y2);
  }

  show() {
    stroke(255);
    strokeWeight(4);
    line(this.startCords.x, this.startCords.y, this.endCords.x, this.endCords.y);
  }

  calcSlope() {
    let mean = this.clacMean();
    let xdash = mean.x;
    let ydash = mean.y;
    let num = 0;
    let dom = 0;
    for (let p of data) {
      let x = p.point.x;
      let y = p.point.y;
      num += (x - xdash) * (y - ydash);
    }
    for (let p of data) {
      let x = p.point.x;
      dom += (x - xdash) * (x - xdash);
    }
    m = num / dom;
  }

  calcYintigrate() {
    let mean = this.clacMean();
    let xdash = mean.x;
    let ydash = mean.y;
    b = ydash - (m * xdash);
  }
}

function mousePressed() {
  let p = new DataPoint(mouseX, mouseY);
  p.push();
}

class DataPoint {
  constructor(x, y) {
    this.x = map(x, 0, width, 0, 1);
    this.y = map(y, 0, height, 1, 0);
    this.point = createVector(this.x, this.y);
    this.cords = createVector(x, y);
  }
  push() {
    data.push(this);
  }

  show() {
    fill(255);
    stroke(255);
    strokeWeight(4);
    point(this.cords.x, this.cords.y);
  }
}
