class agent {
  constructor() {
    this.loc = createVector(random(width), random(height));
    this.vel = createVector();
    this.acc = createVector();
    this.dis = 5;
    this.lifeLived = 0;
    this.die = false;
    this.leftlife = 200;
    this.maxspeed = 3;
    this.dna = [];
    this.dna[0] = random(2, -2);
    this.dna[1] = random(2, -2);
  }

  applyforce(f) {
    this.acc.add(f)
  }


  behaver(food, poison) {
    let steerG = this.eat(food, true);
    let steerB = this.eat(poison);


    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);

    this.applyforce(steerG);
    this.applyforce(steerB);
  }

  eat(list, isgood) {
    //steer and eat the food and poison...
    let currentD = Infinity;
    let current = -1;
    for (var i = 0; i < list.length; i++) {
      let d = this.loc.dist(list[i].loc);
      if (d < currentD) {
        currentD = d;
        current = i;
      }
    }

    if (currentD < 5) {
      list.splice(current, 1);
      if (isgood) {
        this.leftlife += 50;
      } else {
        this.leftlife -= 400;
      }
      return createVector(0, 0);
    } else if (current) {
      return this.steer(list[current].loc);
    } else {
      return createVector(0, 0);
    }
  }



  steer(target) {
    //seek the target...
    let disired = p5.Vector.sub(target, this.loc);
    disired.setMag(this.maxspeed);
    let newVel = p5.Vector.sub(disired, this.vel);
    newVel.limit(0.1);
    return newVel;
  }

  show() {
    push()
    let theta = this.vel.heading() + PI / 2;
    translate(this.loc.x, this.loc.y);
    noFill();
    stroke(255);
    rotate(theta);
    line(0, 0, 0, -this.dis * 4);
    triangle(0, -this.dis * 2, -this.dis, this.dis * 2, this.dis, this.dis * 2);
    pop()
  }
  edges(){
    if(this.loc.x < 0 || this.loc.x > width){
      this.vel.x *= -1;
    }
    if(this.y < 0 || this.y > height) {
      this.vel.y *= -1;
    }
  }
  update() {
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.acc.mult(0);

    this.leftlife--;
    this.lifeLived++;
    if (this.leftlife <= 0) {
      this.die = true;
    }
  }
  crossOver(other) {
    let child = new agent();
    child.dna[0] = this.dna[0];
    child.dna[1] = other.dna[1];
    return child;
  }

  mutate(rate) {
    if (random(1) < rate) {
      this.dna[0] = random(-2, 2);
      this.dna[1] = random(-2, 2);
    }
  }
}
