class Puck {
  constructor(Game, scl) {
    this.game = Game;
    this.x = (this.game.x + this.game.width) / 2; //width / 2;
    this.y = (this.game.y + this.game.height) / 2; //height / 2;
    this.xspeed = 0;
    this.yspeed = 0;
    this.r = 12 * scl;

    this.reset();
  }

  checkPaddleLeft(p) {
    if (this.y - this.r < p.y + p.h / 2 &&
      this.y + this.r > p.y - p.h / 2 &&
      this.x - this.r < p.x + p.w / 2) {
        //this.game.died=true;
      if (this.x > p.x) {
        let diff = this.y - (p.y - p.h / 2);
        let rad = radians(45);
        let angle = map(diff, 0, p.h, -rad, rad);
        this.xspeed = 5 * cos(angle);
        this.yspeed = 5 * sin(angle);
        this.x = p.x + p.w / 2 + this.r;
      }

    }
  }
  checkPaddleRight(p) {
    if (this.y - this.r < p.y + p.h / 2 &&
      this.y + this.r > p.y - p.h / 2 &&
      this.x + this.r > p.x - p.w / 2) {
      //this.game.died=true;
      if (this.x < p.x) {
        let diff = this.y - (p.y - p.h / 2);
        let angle = map(diff, 0, p.h, radians(225), radians(135));
        this.xspeed = 5 * cos(angle);
        this.yspeed = 5 * sin(angle);
        this.x = p.x - p.w / 2 - this.r;
      }
    }
  }

  update() {
    this.x += this.xspeed / 2;
    this.y += this.yspeed / 2;
  }

  reset() {
    this.x = this.game.x + this.game.halfWidth; //width / 2;
    this.y = this.game.y + this.game.halfHeight; //height / 2;
    let angle = random(-PI / 4, PI / 4);
    this.xspeed = 5 * Math.cos(angle);
    this.yspeed = 5 * Math.sin(angle);

    if (random(1) < 0.5) {
      this.xspeed *= -1;
    }
  }

  edges() {
    if (this.y < this.game.y || this.y > this.game.y + this.game.height) {
      this.yspeed *= -1;
    }

    if (this.x  > this.game.x + this.game.width) {
      // ding.play();
      this.game.leftscore++;
      //this.reset();

      this.game.died=true;


    }

    if (this.x  < this.game.x) {
      // ding.play();
      this.game.rightscore++;
      this.reset();
      //this.game.died=true;
    }
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
  }

  liveScore() {
    fill(255);
    textSize(32 * this.game.scl);
    text(this.game.leftscore, this.game.x + 32, this.game.y + 20);
    text(this.game.rightscore, this.game.x + this.game.width - 64, this.game.y + 20);

  }



}
