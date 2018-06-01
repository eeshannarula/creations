let xs = [];
let ys = [];
let points = [];

let p;

const learningRate = 0.1;
const optimizer = tf.train.adam(learningRate);

function loss(pred, labels) {
  return pred.sub(labels).square().mean();
}

class point {
  constructor(x, y) {
    this.x = map(x, 0, width, 0, 1);
    this.y = map(y, 0, height, 1, 0);
    this.cords = createVector(x, y);
    this.data = createVector(this.x, this.y);
  }
  push() {
    xs.push(this.x);
    ys.push(this.y);
    points.push(this);
  }

  show() {
    fill(255);
    ellipse(this.cords.x, this.cords.y, 10);
  }
}

function setup() {
  createCanvas(400, 400);
  p = new poly(10);
}

function draw() {
  background(51);
  for (let p of points) {
    p.show();
  }
  for (var i = 0; i < 5; i++) {
    tf.tidy(() => {
      if (xs.length > 0) {
        const y__ = tf.tensor1d(ys);
        optimizer.minimize(() => loss(p.formEq(xs), y__));
      }
    });
  }

  let curveX = [];
  for (var x = 0; x < 1; x += 0.001) {
    curveX.push(x);
  }

  const y_ = tf.tidy(() => p.formEq(curveX));
  let curveY = y_.dataSync();
  y_.dispose();
  beginShape();
  stroke(255);
  strokeWeight(2);
  noFill();
  for (var i = 0; i < curveX.length; i++) {
    let x = map(curveX[i], 0, 1, 0, width);
    let y = map(curveY[i], 1, 0, 0, height);
    vertex(x, y);
  }
  endShape();
}

function mousePressed() {
  new point(mouseX, mouseY).push();
}
