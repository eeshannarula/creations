const len = 784;
const data_len = 1000;

const CAT = 0;
const TRAIN = 1;
const RAINBOW = 2;

const CLASSES = 3;

const BATCH_SIZE = 100;
const BATCHES = data_len / BATCH_SIZE;

var cats_data;
var rainbow_data;
var train_data;

let data;
let classifier;

function preload() {
  cats_data = loadBytes("data/cats1000.bin");
  rainbow_data = loadBytes('data/rainbow1000.bin');
  train_data = loadBytes('data/train1000.bin');

}

function setup() {
  createCanvas(350, 350);
  background(0);
  data = new Data();
  classifier = new Classifier(data);
  data.loadData(cats_data, CAT);
  data.loadData(train_data, TRAIN);
  data.loadData(rainbow_data, RAINBOW);
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(8)
    stroke(255)
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}
