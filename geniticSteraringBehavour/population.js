class Population {
  constructor(agents) {
    this.popsize = 20;
    if (agents) {
      this.agents = agents;
    } else {
      this.agents = [];

      for (var i = 0; i < this.popsize; i++) {
        this.agents[i] = new agent();
      }
    }
  }
  render() {
    for (agent of this.agents) {
      if (!agent.die) {
        agent.show();
        agent.edges();
        agent.update();
        agent.behaver(food, poison);
      }
    }
  }
  checkAllDie() {
    let counter = 0;
    for (agent of this.agents) {
      if (agent.die) {
        counter++;
      }
    }
    if (counter === this.popsize) {
      return true;
    } else {
      return false;
    }
  }
  meatingpool() {
    let selection = [];
    let newPopulation = [];

    for (let agent of this.agents) {
      let val = agent.lifeLived / 10;
      for (var i = 0; i < val; i++) {
        selection[i] = agent;
      }
    }
    for (var i = 0; i < this.popsize; i++) {
      let parent1 = random(selection);
      let parent2 = random(selection);

      if (random(1) > 0.5) {
        let child = parent1.crossOver(parent2);
        child.mutate(0.1);
        newPopulation.push(child);
      } else {
        let child = parent2.crossOver(parent1);
        child.mutate(0.1);
        newPopulation.push(child);
      }
    }
    return new Population(newPopulation);
  }
}
