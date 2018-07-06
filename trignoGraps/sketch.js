let scl = 10;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0);
  drawGraph();
  drawFunction(sin);
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

function drawFunction(func) {
  beginShape();
  noFill();
  stroke(0, 255, 100);
  for (var i = 0; i < 360; i += 0.001) {
    let val = 10 * (func(i));
    vertex(width / 2 + (i * scl * 1.9), height / 2 + (val * scl * 1 / 2));
  }
  endShape();
}
