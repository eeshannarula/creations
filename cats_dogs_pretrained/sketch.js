const CATS_training_URL = 'catsdogs/training_set/cats';
const DOGS_training_URL = 'catsdogs/training_set/dogs';
const CATS_testing_URL = 'catsdogs/test_set/cats';
const DOGS_testing_URL = 'catsdogs/test_set/dogs';

let p;
let model;
let data = {};
let count = 0;
let predictionClass;
let canDraw = false;

function loadImages(dir, ext) {
  let array = [];
  var fileextension = ext;
  $.ajax({
    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
    url: dir,
    success: async function (data) {
      //List all ext file names in the page
      await $(data).find("a:contains(" + fileextension + ")").each(function () {
        var filename = this.href.replace(window.location.host, "").replace("http://", "");
        array.push(loadImage(dir + filename + ""));
      });
    }
  });
  return array;
}

function preload() {
  data.all = [];
  data.cats = loadImages(CATS_testing_URL, '.jpg');
  data.dogs = loadImages(DOGS_testing_URL, '.jpg');
  data.all = data.all.concat(data.cats);
  data.all = data.all.concat(data.dogs);
}

const loadModel = async () => {
  let jsonUpload = document.getElementById('json-upload');
  let weightsUpload = document.getElementById('weights-upload');
  model = await tf.loadModel(tf.io.browserFiles([jsonUpload.files[0], weightsUpload.files[0]]));
}

function setup() {
  createCanvas(500, 500).parent('#container');
  p = createP(predictionClass);
}

function draw() {
  background(51);
  if (canDraw) {
    data.all = data.all.concat(data.cats);
    data.all = data.all.concat(data.dogs);
    image(data.all[count], 0, 0, width, height);
  }
}

const shift = () => {
  if (canDraw == true) {
    canDraw = false;
  } else {
    canDraw = true;
  }
}

function reshape(img) {
  const copy = (array) => {
    let mainArray = [];
    for (var i = 0; i < 3136; i += 4) {
      let r = array[i + 0] * 0.3;
      let g = array[i + 1] * 0.59;
      let b = array[i + 2] * 0.11;
      mainArray.push((r + g + b) / 255);
    }
    return mainArray;
  }
  img.resize(28, 28);
  img.loadPixels();
  let array = copy(img.pixels);
  return array;
}

function maxNum(array) {
  let maximum = 0;
  for (let val of array) {
    if (maximum < val) {
      maximum = val;
    }
  }
  return array.indexOf(maximum);
}

const next = () => {
  count++;
}

const predict = () => {
  tf.tidy(() => {
    let img = get();
    let inputs = reshape(img);
    const xs = tf.tensor2d(inputs, [1, 784]);
    const reshaped = xs.reshape([1, 28, 28, 1]);
    const prediction = maxNum(model.predict(reshaped).dataSync());
    if (prediction == 0) {
      predictionClass = 'cat';
    } else {
      predictionClass = 'dog';
    }
    p.html(predictionClass);
  })
}
