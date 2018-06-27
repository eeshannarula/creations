let elivator;
let sh = false;
let passno = [99, 99, 99, 99, 99];

function setup() {
  createCanvas(600, 600);
  elivator = new Elivator(5);
}

function draw() {
  background(51);
  elivator.show();
  if (sh) {
    mapDoing(elivator.classified);
  }
}

class Elivator {
  constructor(floors) {
    this.passengers = [];
    this.floors = floors;
    this.classified = null;
    this.onBoard = [];
    this.current = 1;
  }
  addPassenger(nofloor, tofloor) {
    this.passengers.push(new Passenger(nofloor, tofloor));
  }
  addRandomPassengers(count) {
    for (var i = 0; i < count; i++) {
      let tofloor = floor(random(0, this.floors));
      let onfloor = floor(random(0, this.floors));
      this.addPassenger(onfloor, tofloor);
    }
  }
  classifiy() {
    let floors = createMatrix(this.floors);
    for (var i = 0; i < this.passengers.length; i++) {
      let passenger = this.passengers[i];
      let onfloor = passenger.onFloor;
      floors[onfloor].push(passenger);
    }
    this.classified = floors;
    console.log(floors);
  }
  checkBoardCount() {
    return (4 - this.onBoard.length);
  }
  pickup() {
    let boardCount = this.checkBoardCount();
    for (var i = 0; i < boardCount; i++) {
      let passenger = this.classified[this.current].splice(0, 1)[0];
      if (passenger !== undefined) {
        this.onBoard.push(passenger);
      }
    }
  }
  dropout() {
    for (var i = 0; i < this.onBoard.length; i++) {
      if (this.onBoard[i].toFloor == this.current) {
        this.onBoard.splice(this.onBoard.indexOf(this.onBoard[i]), 1);
      }
    }
  }
  move() {
    let upvotes = 0;
    let downvotes = 0;
    for (let p of this.onBoard) {
      p.toFloor > this.current ? upvotes++ : downvotes++;
    }
    upvotes > downvotes ? this.current++ : this.current--;
  }
  show() {
    fill(255);
    let yCord = map(this.current, 0, 4, height, 50);
    rect(10, yCord, 50, 50);
  }
}

class Passenger {
  constructor(onFloor, toFloor) {
    this.onFloor = onFloor;
    this.toFloor = toFloor;
    this.xpos = passno[onFloor];
    passno[onFloor] += 50;
  }
  show() {
    let color = map(this.onFloor, 0, 4, 0, 255);
    fill(100, 100, 255);
    ellipse(this.xpos, map(this.onFloor, 0, 4, height, 50), 50);
  }
}

const createMatrix = (rows) => {
  let mainArray = [];
  for (var i = 0; i < rows; i++) {
    mainArray[i] = [];
  }
  return mainArray;
}

const copy = (array) => {
  let result = [];
  for (var i = 0; i < array.length; i++) {
    result[i] = array[i];
  }
  return result;
}

const mapDoing = (matrix) => {
  for (var i = 0; i < matrix.length; i++) {
    for (let p of matrix[i]) {
      p.show();
    }
  }
}

const move = () => {
  elivator.move()
};

const lift = () => {
  elivator.dropout();
  elivator.pickup();
  elivator.dropout()
}

const manage = (no) => {
  elivator.addRandomPassengers(no);
  elivator.classifiy();







}

const prt = () => {
  console.log(elivator.classified);
}
