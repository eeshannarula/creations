class pongGame {
  constructor(x, y, w, h, scl, nn1, nn2) {

    this.x = x;
    this.y = y;

    this.scl = scl;

    this.died = false;
    this.lived=0;

    this.width = w;
    this.height = h;

    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;

    if (nn1 && nn2) {
      this.brain1 = nn1;
      this.brain2 = nn2;
    } else {
      this.brain1 = new NeuralNetwork(3, 4, 1);
      this.brain2 = new NeuralNetwork(3, 4, 1);
    }

    this.leftscore = 0;
    this.rightscore = 0;

    this.puck = new Puck(this, this.scl);

    this.left = new Paddle(true, this, this.scl);
    this.right = new Paddle(false, this, this.scl);

  }

  render() {

    if (!this.died) {

      this.think();

      this.lived++;

      this.puck.checkPaddleRight(this.right);
      this.puck.checkPaddleLeft(this.left);


      this.puck.update();
      this.puck.edges();
      this.puck.show();
      this.puck.liveScore();

      this.left.show();
      this.right.show();
      this.left.update();
      this.right.update();


      push()
      noFill();
      stroke(255, 111, 1);
      rect(this.x, this.y, this.width, this.height);
      pop()

    }

  }

  think() {

    //LEFT PART...

    let LeftInputs = [];
    LeftInputs[0] = this.left.y / height;
    LeftInputs[1] = this.puck.x / width;
    LeftInputs[2] = this.puck.y / height;

    let leftOutput = this.brain1.predict(LeftInputs);

    if (leftOutput[0] > 0.5) {
      this.left.move(-2);
    } else {
      this.left.move(2);
    }



    //RIGHT PART...

    let RightInput = [];
    RightInput[0] = this.left.y / height;
    RightInput[1] = this.puck.x / width;
    RightInput[2] = this.puck.y / height;

    let rightOutput = this.brain2.predict(RightInput);

    if (rightOutput[0] > 0.5) {
      this.right.move(-2);
    } else {
      this.right.move(2);
    }

  }

}
