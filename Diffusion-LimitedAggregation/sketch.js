var trees = [];
var movers = [];
var moverCounter;

function setup() {
  createCanvas(windowWidth, windowHeight);
  moverCounter = 1000;
  for (var i = 0; i < moverCounter; i++) {
    movers[i] = new mover(random(width), random(height));
  }
}

function draw() {
  background(51)
  for (var i = 0; i < movers.length; i++) {
    movers[i].show();
    movers[i].update();
    for (var j = 0; j < trees.length; j++) {
      var isStuck = trees[j].hit(movers[i])
      if (isStuck) {
        trees.push(new tree(movers[i].loc.x, movers[i].loc.y));
        movers.splice(i, 1);
      }
    }
  }
   for (var i = 0; i < trees.length; i++) {
     trees[i].show();
   }

}

function mousePressed() {
  trees.push(new tree(mouseX, mouseY));
}
