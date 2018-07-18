let p;
let model;
let count = 0;
let data = {};
const size = 50;
let candraw = false;

const EXT = '.jpg';
const ROSES_URL = 'flowers/rose';
const SUNFLOWER_URL = 'flowers/sunflower';

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
  data.roses = loadImages(ROSES_URL, EXT);
  data.sunflower = loadImages(SUNFLOWER_URL, EXT);
}

async function loadModeltf() {
  let jsonUpload = document.getElementById('json-upload');
  let weightsUpload = document.getElementById('weights-upload');
  model = await tf.loadModel(tf.io.browserFiles([jsonUpload.files[0], weightsUpload.files[0]]));
  for (let rose of data.roses) {
    rose.label = 0;
  }
  for (let sunflower of data.sunflower) {
    sunflower.label = 1;
  }
  data.all = [];
  data.all = data.all.concat(data.roses);
  data.all = data.all.concat(data.sunflower);
  shuffle(data.all, true);
}

function predict() {
  tf.tidy(() => {
    let img = get();
    let rawinputs = ImageClassifier.reshape(img, size);
    let finalinputs = tf.tensor4d(rawinputs, [1, size, size, 1]);
    let classification = ImageClassifier.maxNum(model.predict(finalinputs).dataSync());

    if (classification === 0) {
      let correct;
      if (data.all[count].label == 0) {
        correct = 'roses'
      } else {
        correct = 'sunflower'
      }
      p.html('predicted : rose' + '-- Correct answer :' + correct);
    } else {
      let correct;
      if (data.all[count].label == 0) {
        correct = 'roses'
      } else {
        correct = 'sunflower'
      }
      p.html('predicted : sunflower' + ' -- Correct answer :' + correct);
    }
  })
}

function shift() {
  if (!candraw) {
    candraw = true;
  } else {
    canDraw = false;
  }
}

function next() {
  count++
}

function setup() {
  createCanvas(500, 500).parent('#container');
  p = createP('');

}

function draw() {
  background(51);
  if (candraw) {
    image(data.all[count], 0, 0, width, height);
  }
}
