var pipes = [];
var slider;
var counter;
var bird;
var birdData;
var birdBrain;

function preload() {

birdData = loadJSON("best birds/superBird.json");

}

function setup() {
  createCanvas(600, 600);
  counter = 1;
  pipes.push(new Pipe());
  slider = createSlider(0, 10, 1);
  birdBrain = NeuralNetwork.deserialize(birdData);
  bird = new Bird(birdBrain);
}

function draw() {
  background(0);

  for (var k = 0; k < slider.value(); k++) {

    for (var i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    bird.update();
    bird.think(pipes);

    for (var j = 0; j < pipes.length; j++) {
      if (pipes[j].hits(bird)) {
        console.log('collusion')
      }
    }



    if (counter % 100 == 0) {
      pipes.push(new Pipe());
      counter = 1;
    }

    counter++

  }


  bird.show();

  for (pipe of pipes) {
    pipe.show();
  }


}

// function keyPressed() {
//   if (key === 'S') {
//     let birdcounter = 0;
//     let alivebird = null;
//     for (var i = 0; i < population.birds.length; i++) {
//       if (population.birds[i].die == false) {
//         birdcounter++;
//       }
//     }
//     if (birdcounter == 1) {
//       for (var i = 0; i < population.birds.length; i++) {
//         if (population.birds[i].die == false) {
//           alivebird = population.birds[i];
//         }
//       }
//     }
//     if (alivebird !== null) {
//       saveJSON(alivebird.brain, 'best_bird.json');
//     }
//   }
// }
