class Bird {
  constructor(brain) {
    this.y = height / 2;
    this.x = 64;

    this.die = false;
    this.fitness=0;

    this.gravity = 0.6;
    this.lift = -15;
    this.velocity = 0;

    if(brain) {
      this.brain=brain;
    } else {
      this.brain = new NeuralNetwork(4, 4, 1);
    }
  }

  show() {
    fill(255,170);
    ellipse(this.x, this.y, 32, 32);
  }

  up() {
    this.velocity += this.lift;
  }

  update() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

    this.fitness++

  }

  think(pipes) {

    let current = null;
    let currentD = Infinity;
    for (var i = 0; i < pipes.length; i++) {
      let d = pipes[i].x - this.x;
      if (d < currentD && d > 0) {
        current = pipes[i];
        currentD = d;
      }
    }



    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = current.top / height;
    inputs[2] = current.bottom / height;
    inputs[3] = current.x / width;

    let output = this.brain.predict(inputs);

    if (output[0] < 0.5) {
      this.up();
    }
  }
}
