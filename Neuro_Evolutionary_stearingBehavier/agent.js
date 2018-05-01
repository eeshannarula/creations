// This is a class for an individual sensor
// Each vehicle will have 8 sensors
class sensor {
  constructor(angle) {
    this.phasing = p5.Vector.fromAngle(angle);
    this.value = 0;
  }
}
// This is the class for each agent...
class agent {
  constructor(x, y, brain) {
    if (x && y) {
      this.loc = createVector(x, y);
    } else {
      this.loc = createVector(random(foodBuffer, width - foodBuffer), random(foodBuffer, height - foodBuffer));
    }
    this.vel = createVector();
    this.acc = createVector();
    this.dis = 5;
    this.sensors = [];

    this.maxspeed = 4;
    this.minspeed = 0.50;

    this.helth = 1;
    this.score = 0;
    this.maxHealth = 3;

    for (var angle = 0; angle < Math.PI * 2; angle += sensorAngle) {
      this.sensors.push(new sensor(angle));
    }
    if (brain) {
      this.brain = brain;
    } else {
      let inputs = this.sensors.length + 6;
      this.brain = new NeuralNetwork(inputs, 32, 2);
    }
  }
  applyforce(f) {
    this.acc.add(f)
  }
  update() {

    //basic pyhsics engine...
    this.vel.add(this.acc);

    this.vel.limit(this.maxspeed);

    if (this.vel.mag() < this.minspeed) {
      this.vel.setMag(this.minspeed);
    }

    this.loc.add(this.vel);
    this.acc.mult(0);
    //health dec. and score inc. every time...
    this.helth -= 0.005;
    this.score += 1;

    if (this.helth > this.maxHealth) {
      this.helth = this.maxHealth;
    }
  }
  // Return true if health is less than zero
  // or if vehicle leaves the canvas
  dead() {
    return (this.helth < 0 ||
      this.loc.x < foodBuffer ||
      this.loc.y < foodBuffer ||
      this.loc.x > width - foodBuffer ||
      this.loc.y > height - foodBuffer
    );
  }

  think(food) {
    for (var i = 0; i < this.sensors.length; i++) {
      this.sensors[i].value = sensorLength;
    }
    for (var i = 0; i < food.length; i++) {
      let other = food[i];
      let dist = p5.Vector.dist(other.loc, this.loc);
      if (dist > sensorLength) {
        continue;
      }

      let dirToFood = p5.Vector.sub(other.loc, this.loc);

      for (var j = 0; j < this.sensors.length; j++) {
        let delta = this.sensors[j].phasing.angleBetween(dirToFood);
        if (delta < sensorAngle / 2) {
          // Sensor value is the closest food
          this.sensors[j].value = min(this.sensors[j].value, dist);
        }
      }
    }

    let inputs = [];
    //position and velocity into inputs..
    inputs[0] = constrain(map(this.loc.x, foodBuffer, 0, 0, 1), 0, 1);
    inputs[1] = constrain(map(this.loc.y, foodBuffer, 0, 0, 1), 0, 1);
    inputs[2] = constrain(map(this.loc.x, width - foodBuffer, width, 0, 1), 0, 1);
    inputs[3] = constrain(map(this.loc.y, height - foodBuffer, height, 0, 1), 0, 1);
    inputs[4] = this.vel.x / this.maxspeed;
    inputs[5] = this.vel.y / this.maxspeed;
    //sensor readings into inputs
    for (var i = 0; i < this.sensors.length; i++) {
      inputs.push(map(this.sensors[i].value, 0, sensorLength, 1, 0));
    }

    let outputs = this.brain.predict(inputs);

    // Turn it into a desired velocity and apply steering formula
    let desired = createVector(2 * outputs[0] - 1, 2 * outputs[1] - 1);
    desired.mult(this.maxspeed);
    // Craig Reynolds steering formula
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    // Apply the force
    this.applyForce(steer);
  }

  applyForce(f) {
    this.acc.add(f);
  }
  // eat the food if dist is very less and gain helth!!
  eat(food) {
    for (var i = 0; i < food.length; i++) {
      let d = p5.Vector.dist(food[i].loc, this.loc);
      if (d < food[i].r) {
        food.splice(i, 1);
        this.helth++;
      }
    }
  }
  // Craig Reynolds steering formula...
  steer(target) {

    let disired = p5.Vector.sub(target, this.loc);
    disired.setMag(this.maxspeed);

    let newVel = p5.Vector.sub(disired, this.vel);
    newVel.limit(this.maxspeed);

    return newVel;
  }
  //draw it on screen
  show() {
    //color is related to its health..
    let green = color(0, 255, 255, 255);
    let red = color(255, 0, 100, 100);
    let col = lerpColor(red, green, this.helth)


    push()

    let theta = this.vel.heading() + PI / 2;
    translate(this.loc.x, this.loc.y);
    noFill();
    stroke(col);
    rotate(theta);
    triangle(0, -this.dis * 2, -this.dis, this.dis * 2, this.dis, this.dis * 2);

    pop()

  }

}
