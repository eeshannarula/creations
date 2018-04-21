var food;
const scl = 20;
var population;

function setup() {
  createCanvas(1200, 1200);
  food = createVector(random(width - scl), random(height - scl));
  population = new Population();
  frameRate(30)
}

function draw() {
  background(51);
  population.render();
  if (population.checkIfAllDead()) {
      population = population.meatingpool();
  }
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}

function dis(x, y, x1, y1) {
  return sqrt(sq(x1 - x) + sq(y1 - y))
}

// function keyPressed()
// {
// 	 if(keyCode==38)
// 		{
// 		population.snakes[1].dir(0,-1)
//
// 		}
//
//     if(keyCode==40)
//     {
//       population.snakes[1].dir(0,1)
//
//     }
//
// 	if(keyCode==37)
// 		{
// 			population.snakes[1].dir(-1,0)
// 		}
// 	if(keyCode==39)
// 		{
// 			population.snakes[1].dir(1,0)
// 		}
// }
