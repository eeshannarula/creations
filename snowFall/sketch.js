var flakes = [];
var flakeCount;

function setup() {
  createCanvas(600, 600);
  flakeCount = 0;
  for (var i = 0; i < flakeCount; i++) {
    var ss = random(shapesSizes);
    flakes[i] = new flake(random(width), random(-100, -500), ss.size, ss.r, ss.alpha)

  }
}

function draw() {
  background(51);
  if (frameCount % 10 == 0) {
    var ss = random(shapesSizes);
    flakes.push(new flake(random(width), -20, ss.size, ss.r, ss.alpha))

  }

  for (var i = 0; i < flakes.length; i++) {
    flakes[i].show();
    flakes[i].fall();
    flakes[i].update();
    if (flakes[i].alpha < 10) {
      flakes.splice(i, 1);
    }
  }

}
