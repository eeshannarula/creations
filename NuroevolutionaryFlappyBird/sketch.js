var pipes = [];
var population;

function setup() {
  createCanvas(600, 600);
  pipes.push(new Pipe());
  population = new Population();
}

function draw() {
  background(0);

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);

    }
  }

  if (population.checkIfAllDie()) {
    //population = new Population();
     population=population.meatingpool();
   pipes = [];
   pipes.push(new Pipe());
  }


  population.render(pipes);
  //population.mutation();





if (frameCount % 100 == 0) {
  pipes.push(new Pipe());
}


}
