const len = 784;
const data_len = 1000;

const CAT = 0;
const TRAIN = 1;
const Rainbow = 2;

var nn;


var cats_data;
var rainbow_data;
var train_data;

var cats_training = [];
var train_training = [];
var rainbow_training = [];

var cats_testing = [];
var train_testing = [];
var rainbow_testing = [];




function preload() {
  cats_data = loadBytes("data/cats1000.bin");
  rainbow_data = loadBytes('data/rainbow1000.bin');
  train_data = loadBytes('data/train1000.bin');

}

function drawWallpaper() {
  for (var n = 0; n < 100; n++) {
    let img = createImage(28, 28);
    img.loadPixels();
    let offset = n * 784
    for (var i = 0; i < 784; i++) {
      let val = 255 - cats.bytes[i + offset];
      img.pixels[i * 4 + 0] = val;
      img.pixels[i * 4 + 1] = val;
      img.pixels[i * 4 + 2] = val;
      img.pixels[i * 4 + 3] = 255;
    }
    img.updatePixels();
    let x = (n % 10) * 28;
    let y = floor(n / 10) * 28;
    image(img, x, y)
  }
}


function prepareData() {
  for (var i = 0; i < data_len; i++) {
    let offset = i * len;
    let threshold = floor(0.8 * data_len);
    if (i < threshold) {
      cats_training[i] = cats_data.bytes.subarray(offset, offset + len);
      train_training[i] = train_data.bytes.subarray(offset, offset + len);
      rainbow_training[i] = rainbow_data.bytes.subarray(offset, offset + len);
      cats_training[i].lable = 0;
      train_training[i].lable = 1;
      rainbow_training[i].lable = 2;


    } else {
      cats_testing[i - threshold] = cats_data.bytes.subarray(offset, offset + len);
      train_testing[i - threshold] = train_data.bytes.subarray(offset, offset + len);
      rainbow_testing[i - threshold] = rainbow_data.bytes.subarray(offset, offset + len);
      cats_testing[i - threshold].lable = 0;
      train_testing[i - threshold].lable = 1;
      rainbow_testing[i - threshold].lable = 2;
    }
  }
}

function trainEpoch() {
  let training = [];


  training = training.concat(cats_training);
  training = training.concat(train_training);
  training = training.concat(rainbow_training);

  shuffle(training, true);

  for (var i = 0; i < training.length; i++) {
    let data = training[i];
    let inputs = [];
    for (var j = 0; j < data.length; j++) {
      inputs[j] = data[j] / 255.0;
    }
    let lable = data.lable;
    //console.log(inputs);
    let targets = [0, 0, 0];
    targets[lable] = 1;
    //console.log(targets);

    nn.train(inputs, targets);



  }

  console.log('done')

}

function test() {

  let correct = 0;
  let test_data = [];


  test_data = test_data.concat(cats_testing);
  test_data = test_data.concat(train_testing);
  test_data = test_data.concat(rainbow_testing);



  for (var i = 0; i < test_data.length; i++) {
    let data_ = test_data[i];
    let inputs = [];
    for (var j = 0; j < data_.length; j++) {
      inputs[j] = data_[j] / 255.0;
    }
    let lable = data_.lable;

    let guess = nn.predict(inputs);
    let m = max(guess);
    let classification = guess.indexOf(m);

    if (classification === lable) {
      correct++
    }




  }

  let percentage = (correct / test_data.length) * 100
  console.log(percentage)
  return percentage;



}


function setup() {
  createCanvas(350, 350);
  background(0);
  nn = new NeuralNetwork(784, 64, 3);
  prepareData();
  // for (var i = 0; i < 1; i++) {
  //   trainEpoch();
  // }

}

function clearScreen() {
  background(0);
}

function guessPressed() {
  let img = get();
  img.resize(28, 28);
  img.loadPixels();
  //console.log(img);
  let inputs = [];
  for (var i = 0; i < len; i++) {
    let val = img.pixels[i * 4]
    inputs[i] = val / 255.0;
  }
  let guess = nn.predict(inputs);
  let m = max(guess);
  let classification = guess.indexOf(m);

  switch (classification) {
    case 0:
      console.log('cat')
      break;
    case 1:
      console.log('train')
      break;
    case 2:
      console.log('rainbow')
      break;
    default:
      console.log('something went wrong!!')


  }



}







function draw() {
  if (mouseIsPressed) {
    strokeWeight(8)
    stroke(255)
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

}
