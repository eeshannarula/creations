const len = 784;
const data_len = 1000;
const threshold = 800;

const nn = new NeuralNetwork(len, [64, 2], 5);

const CATS = 0;
const APPLE = 1;
const BIRDS = 2;
const BANANA = 3;
const AIRPLANE = 4;

let cats_data;
let apple_data;
let birds_data;
let banana_data;
let planes_data;

let training_data = [];

let cats_train = [];
let apple_train = [];
let birds_train = [];
let banana_train = [];
let planes_train = [];

let test_data = [];

let cats_test = [];
let apple_test = [];
let birds_test = [];
let banana_test = [];
let planes_test = [];

let epoches = 0;

function preload() {
  cats_data = loadBytes("data/cats1000.bin");
  apple_data = loadBytes("data/apple1000.bin");
  banana_data = loadBytes("data/banana1000.bin");
  birds_data = loadBytes("data/bird1000.bin");
  planes_data = loadBytes("data/airplane1000.bin");
}

function prepareData(array_train, arr_test, data, lable) {
  for (var i = 0; i < data_len; i++) {
    let offset = i * len;
    if (i < threshold) {
      array_train[i] = data.bytes.subarray(offset, offset + len);
      array_train[i].lable = lable;
    } else {
      let index = i - threshold;
      arr_test[index] = data.bytes.subarray(offset, offset + len);
      arr_test[index].lable = lable;
    }
  }
}

function mergeToTrainingArray(b) {
  training_data = training_data.concat(b);
}

function mergeToTestingArray(b) {
  test_data = test_data.concat(b);
}

function manageData() {
  prepareData(cats_train, cats_test, cats_data, CATS);
  prepareData(apple_train, apple_test, apple_data, APPLE);
  prepareData(birds_train, birds_test, birds_data, BIRDS);
  prepareData(banana_train, banana_test, banana_data, BANANA);
  prepareData(planes_train, planes_test, planes_data, AIRPLANE);

  mergeToTrainingArray(cats_train);
  mergeToTrainingArray(apple_train);
  mergeToTrainingArray(birds_train);
  mergeToTrainingArray(banana_train);
  mergeToTrainingArray(planes_train);

  mergeToTestingArray(cats_test);
  mergeToTestingArray(apple_test);
  mergeToTestingArray(birds_test);
  mergeToTestingArray(banana_test);
  mergeToTestingArray(planes_test);

  shuffle(training_data, true);
}



function fit() {
  epoches++;
  console.log('training...');
  for (var i = 0; i < training_data.length; i++) {
    let data = training_data[i];
    let inputs = [];
    for (var j = 0; j < data.length; j++) {
      inputs[j] = data[j] / 255.0
    }
    let index = data.lable;
    let targets = [0, 0, 0, 0, 0];
    targets[index] = 1;

    nn.train(inputs, targets);
  }
  console.log('epoch:' + epoches);
}

function test() {
  let counter = 0;
  let total = test_data.length;
  for (var i = 0; i < total; i++) {
    let data = test_data[i];
    let inputs = [];
    for (var j = 0; j < data.length; j++) {
      inputs[j] = data[j] / 255.0;
    }
    let correct = data.lable;
    let guess = nn.predict(inputs);

    let m = max(guess);
    let guessed_lable = guess.indexOf(m);

    if (guessed_lable === correct) {
      counter++;
    }
  }
  let percentage = (counter / total) * 100;
  console.log(round(percentage) + '%');
}

function tell(c) {
  switch (c) {
    case 0:
      console.log('cat')
      break;
    case 1:
      console.log('apple')
      break;
    case 2:
      console.log('bird')
      break;
    case 3:
      console.log('banana')
      break;
    case 4:
      console.log('plane')
      break;
  }
}

function guess() {
  let img = get();
  img.resize(28, 28);
  img.loadPixels();
  let inputs = [];
  for (var i = 0; i < len; i++) {
    let val = img.pixels[i * 4]
    inputs[i] = val / 255.0;
  }
  let guessArray = nn.predict(inputs);
  let m = max(guessArray);
  let classification = guessArray.indexOf(m);

  tell(classification);
}

function clearScreen() {
  background(0);
}

function setup() {
  createCanvas(600, 600);
  background(51);
  manageData();
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(8)
    stroke(255)
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}
