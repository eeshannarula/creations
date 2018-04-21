class snake {

  constructor(brain) {
    this.x = 40;
    this.y = 40;
    this.dead = false;
    this.direction = null;
    this.fitness = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];
    if (brain) {
      this.brain = brain;
    } else {}
    this.brain = new NeuralNetwork(6, 8, 4);

  }

  update() {

    let d = dist(this.x, this.y, food.x, food.y);

    this.think();

    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    this.x = this.x + this.xspeed * scl
    this.y = this.y + this.yspeed * scl
    // this.x = constrain(this.x, 0, width - scl);
    // this.y = constrain(this.y, 0, height - scl);

    //if(this.x<0){this.x=0}
    //if(this.y<0){this.y=0}
    //if(this.x>490){this.x=490}
    //if(this.y>490){this.y=490}

    if (dis(this.x, this.y, food.x, food.y) < scl) {
      food.x = random(width)
      food.y = random(height)
      this.total = this.total + 1
      this.fitness *= 15;

    }
    let newd = dist(this.x, this.y, food.x, food.y);

    if (d > newd) {
      this.fitness++;
    }

  }

  dir(x, y) {
    this.xspeed = x
    this.yspeed = y
  }


  death() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i]
      if ((sqrt(sq(this.x - pos.x) + sq(this.y - pos.y))) < 1) {
        this.total = 0
        this.tail = []
      }
      if (this.x <= 0 || this.x >= width || this.y <= 0 || this.y >= height) {
        this.total = 0;
        //this.fitness-=5;
        this.tail = [];
      }
    }

  }

  think() {
    let inputs = [];
    inputs[0] = this.x/width;
    inputs[1] = this.y/height;
    inputs[2] = food.x/width;
    inputs[3] = food.y/height;
    inputs[4] = this.xspeed/width;
    inputs[5] = this.yspeed/height;
    // inputs[6] = this.total/10;
    // inputs[7] = this.direction/10;
    let output = this.brain.predict(inputs);
    let m = max(output);
    let lable = output.indexOf(m);
    switch (lable) {
      case 0:
        if (this.direction !== 2) {
          this.dir(0, -1);
          this.direction = 0;
        } else {
          this.dir(0, 1);
        }
        break;
      case 1:
        if (this.direction !== 3) {
          this.dir(1, 0);
          this.direction = 1;
        } else {
          this.dir(-1, 0);
        }
        break;
      case 2:
        if (this.direction !== 0) {
          this.dir(0, 1);
          this.direction = 2;
        } else {
          this.dir(0, -1);
        }
        break;
      case 3:
        if (this.direction !== 1) {
          this.dir(-1, 0);
          this.direction = 3;
        } else {
          this.dir(1, 0);
        }
        break;
      default:

    }
  }


  show() {
    fill(225, 225, 225)
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl)
  }

}
