class World {
  constructor() {
    this.food = [];
    this.agents = [];

    this.record = -1;
    this.best = null;

    this.popsize = 100;
    this.totalfood = 30;

    this.repoPop = 20;
    this.reproductionEligable = 20;

    for (var i = 0; i < this.totalfood; i++) {
      this.food[i] = new Food();
    }

    for (var i = 0; i < this.popsize; i++) {
      this.agents[i] = new agent();
    }

  }

  keepCheckOfFood() {


    while (this.food.length < this.totalfood) {
      this.food.push(new Food());
    }

  }

  keepCheckOfAgents() {
    for (let a of this.agents) {
      if (!a.dead()) {
        a.update();
        a.think(this.food);
        a.eat(this.food);
        if (a.score > this.record) {
          this.record = a.score;
          this.best = a;
        }
      }
    }

    for (var i = 0; i < this.agents.length; i++) {
      if (this.agents[i].dead()) {
        this.agents.splice(i, 1)
      }
    }

    if (this.agents.length < this.reproductionEligable) {
      let parents = [];
      for (let a of this.agents) {
        let val = round(0.1 * a.helth * a.score);
        for (var k = 0; k < val; k++) {
          parents.push(a);
        }
      }
      for (var i = 0; i < this.repoPop; i++) {
        let parent1 = random(parents);
        let parent2 = random(parents);
        let child = this.crossOver(parent1, parent2);
        this.agents.push(child);
      }
    }
  }

  crossOver(p1, p2) {
    let b1 = p1.brain.copy();
    let b2 = p2.brain.copy();

    if (random(1) < 0.5) {
      let childBrain = b1.crossOver(b2);
      childBrain.mutate(0.3);
      return new agent(childBrain);
    } else {
      let childBrain = b2.crossOver(b1);
      childBrain.mutate(0.3);
      return new agent(childBrain);
    }
  }

  show() {
    for (let a of this.agents) {
      a.show();
    }
    for (let f of this.food) {
      f.show();
    }
  }

}
