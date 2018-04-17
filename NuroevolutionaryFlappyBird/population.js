class Population {
  constructor(birds) {

    this.popSize = 400;

    if (birds) {
      this.birds = birds;
    } else {
      this.birds = [];

      for (var i = 0; i < this.popSize; i++) {
        this.birds[i] = new Bird();
      }
    }

  }

  render(pipes) {
    for (var i = 0; i < this.birds.length; i++) {
      if (!this.birds[i].die) {
        this.birds[i].show();
        this.birds[i].update();
        this.birds[i].think(pipes);
      }

      for (var j = 0; j < pipes.length; j++) {
        if (pipes[j].hits(this.birds[i])) {
          this.birds[i].die = true;
        }
      }
    }
  }

  checkIfAllDie() {
    let counter = 0;
    for (var i = 0; i < this.birds.length; i++) {
      if (this.birds[i].die == true) {
        counter++
      }
    }
    if (counter == this.birds.length) {
      return true
    } else {
      return false;
    }
  }

  calcFintess() {
    let fitnessArray = [];
    for (var i = 0; i < this.birds.length; i++) {
      let count = floor(this.birds[i].fitness / 100);
      for (var j = 0; j < count; j++) {
        fitnessArray.push(this.birds[i]);
      }
    }
    return fitnessArray;
  }

  meatingpool() {

    let newPopulation = [];
    let dna = this.calcFintess();

    for (var i = 0; i < this.popSize; i++) {

      let parent1 = random(dna).brain;
      let parent2 = random(dna).brain;

      if (random(1) > 0.5) {
        let childBrain = parent1.crossOver(parent2);
        childBrain.mutate(0.01)
        let child = new Bird(childBrain);
        newPopulation.push(child);


      } else {
        let childBrain = parent2.crossOver(parent1);
        childBrain.mutate(0.01)
        let child = new Bird(childBrain);
        newPopulation.push(child);
      }

    }

    return new Population(newPopulation);


  }

  
}
