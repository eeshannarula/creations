class Population {
  constructor(snakes) {
    this.popsize = 500;
    if (snakes) {
      this.snakes = snakes;
    } else {
      this.snakes = [];
      for (var i = 0; i < this.popsize; i++) {
        this.snakes[i] = new snake();
      }
    }
  }

  render() {
    for (let snake of this.snakes) {
      if (!snake.dead) {
        snake.update();
        snake.show();
        snake.death();

      }
    }
  }
  checkIfAllDead() {
    let counter = 0;
    for (let snake of this.snakes) {
      if (snake.x <= 0 || snake.x >= width || snake.y <= 0 || snake.y >= height) {
        counter++;
      }
    }
    if (counter == this.popsize) {
      return true;
    } else {
      return false;
    }
  }

  meatingpool() {
    let parents = [];
    let newpopulation = [];

    for (let snake of this.snakes) {
      let val = snake.fitness;
      for (var i = 0; i < val; i++) {
        parents.push(snake);
      }
    }
    for (var i = 0; i < this.popsize; i++) {
      let parent1 = random(parents).brain;
      let parent2 = random(parents).brain;

      if (random(1) > 0.5) {

        let childBrain = parent1.crossOver(parent2);
        childBrain.mutate(0.2);
        let child = new snake(childBrain);
        newpopulation.push(child);

      } else {

        let childBrain = parent2.crossOver(parent1);
        childBrain.mutate(0.2)
        let child = new snake(childBrain);
        newpopulation.push(child);

      }

    }
    return new Population(newpopulation);
  }


}
