// port of Daniel Shiffman's Pong coding challenge
// by madacoo

// let leftscore = 0;
// let rightscore = 0;

//var game1;

var population;

function setup() {
  createCanvas(1600, 1600);
  population = new Population();
  //game1 = new pongGame(0, 0, width / 3, height / 3, 0.3);
  //console.log(game1.died)

  // ding = loadSound("data/ding.mp3");
  // puck = new Puck();
  // left = new Paddle(true);
  // right = new Paddle(false);
}

function draw() {
  background(0);
  if (population.alldie()) {
    population=population.meatingpool();
    //population = new Population();
    //console.log('new gen')
  }
  population.render();

  //transpose(width/2,height/2);
  //game1.render();


  // puck.checkPaddleRight(right);
  // puck.checkPaddleLeft(left);
  //
  // left.show();
  // right.show();
  // left.update();
  // right.update();
  //
  // puck.update();
  // puck.edges();
  // puck.show();

  // fill(255);
  // textSize(32);
  // text(leftscore, 32, 40);
  // text(rightscore, width - 64, 40);
}


// function keyReleased() {
//   population.games[0].left.move(0);
//   population.games[0].right.move(0);
// }
//
// function keyPressed() {
//   console.log(key);
//   if (key == 'A') {
//     population.games[0].left.move(-10);
//   } else if (key == 'Z') {
//     population.games[0].left.move(10);
//   }
//
//   if (key == 'J') {
//     population.games[0].right.move(-10);
//   } else if (key == 'M') {
//     population.games[0].right.move(10);
//   }
// }
