let world;
let slider;
let foodBuffer = 50;
let totalSensors = 8;
let sensorLength = 150;
let sensorAngle = (Math.PI * 2) / totalSensors;

function setup() {
  createCanvas(800, 600);
  world = new World();
  slider = createSlider(0, 10, 1);
}

function draw() {
  background(51);
  for (var i = 0; i < slider.value(); i++) {
    world.keepCheckOfFood();
    world.keepCheckOfAgents();
  }
  world.show();
}
