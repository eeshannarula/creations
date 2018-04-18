class Population {
  constructor(game) {
    this.popsize = 100;
    this.gamewidth = width / 10;
    this.gameHeight = height / 10;
    if (game) {
      this.games = game;
    } else {
      this.games = [];
      let y = 0;
      let xoff = 0;
      for (var i = 0; i < this.popsize; i++) {
        let x = xoff * this.gamewidth;
        if (xoff < width / this.gamewidth) {
          this.games[i] = new pongGame(x, y, this.gamewidth, this.gameHeight, 0.3);
          xoff++;
        }
        if (xoff >= width / this.gamewidth) {
          xoff = 0;
          y += this.gameHeight;
        }
      }
    }
  }
  render() {
    for (let game of this.games) {
      game.render();
    }
  }

  alldie() {
    let counter = 0;
    for (let game of this.games) {
      if (game.died) {
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

    let gamesCollection = [];
    let newgames = [];

    for (let game of this.games) {
      let val = round(game.lived / 10);
      for (var i = 0; i < val; i++) {
        gamesCollection.push(game);
      }
    }

    for (var i = 0; i < this.popsize; i++) {
      let parent1 = random(gamesCollection);
      let parent2 = random(gamesCollection);

      if (random(1) < 0.5) {
        let childBrain1 = parent1.brain1.crossOver(parent2.brain1);
        let childBrain2 = parent1.brain2.crossOver(parent2.brain2);
        let child = new pongGame(this.games[i].x, this.games[i].y, this.gamewidth, this.gameHeight, 0.3, childBrain1, childBrain2);
        newgames.push(child);
      } else {
        let childBrain1 = parent2.brain1.crossOver(parent1.brain1);
        let childBrain2 = parent2.brain2.crossOver(parent1.brain2);
        let child = new pongGame(this.games[i].x, this.games[i].y, this.gamewidth, this.gameHeight, 0.3, childBrain1, childBrain2);
        newgames.push(child);
      }
    }

    let newpopulation = new Population(newgames);

    return newpopulation;

  }



}
