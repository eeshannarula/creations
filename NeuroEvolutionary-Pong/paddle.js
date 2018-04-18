class Paddle {
  constructor(isLeft,Game,scl) {
    this.game=Game;
    this.y = this.game.y+(this.game.height)/2;
    this.w = 20*scl;
    this.h = 100*scl;
    this.ychange = 0;

    if (isLeft) {
      this.x = this.game.x+this.w;
    } else {
      this.x = this.game.x+this.game.width - this.w;
    }


  }

  update() {
    this.y += this.ychange;
    this.y = constrain(this.y, this.game.y, this.game.y+this.game.height);
  }

  move(steps) {
    this.ychange = steps;
  }

  show() {
    fill(255);
    push()
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
    pop()
  }
}
