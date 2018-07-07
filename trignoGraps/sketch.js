let scl = 10;
let mouseVector;
let currentFunction;

function setup() {
  createCanvas(600, 600).parent('#container');
  currentFunction = cos;
  mouseVector = createVector(mouseX, mouseY);
}

function draw() {
  background(0);
  drawGraph();
  mouseVector = createVector(mouseX, mouseY);
  line(0, mouseVector.y, width, mouseVector.y);
  line(mouseVector.x, 0, mouseVector.x, height);
  ellipse(mouseVector.x, mouseVector.y, 10, 10);
  drawFunction(currentFunction, 10, 0, 1, -30, 30);
}

function drawGraph() {
  stroke(255);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);

  for (var i = 0; i < width + 1; i += scl) {
    stroke(255, 100, 0);
    ellipse(i, height / 2, 5);
  }
  for (var i = 0; i < height + 1; i += scl) {
    stroke(255, 100, 0);
    ellipse(width / 2, i, 5);
  }
  stroke(100, 100, 255);
  textSize(20);
  text('scl_X : 30 degree per block', 30, 40);
  text('scl_Y : 2 units per block', 30, 70);

}

function drawFunction(func, verticalShift, horizontalShift, intervals, start, stop) {
  beginShape();
  noFill();
  stroke(0, 255, 100);
  for (var i = start; i < stop; i += 0.001) {
    let val = verticalShift * ((map(func(intervals * i + horizontalShift), -1, 1, 1, -1)));
    vertex(width / 2 + (i * scl * 1.9), height / 2 + (val * scl * 1 / 2));
  }
  endShape();
}
