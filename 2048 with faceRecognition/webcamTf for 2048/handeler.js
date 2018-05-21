let learningRateElement;
let denseUnitsElement;
let batchSizeFractionElement;
let epochsElement;
let trainElement;
let isPredictingElement;
let dirPelement;
let dirP = null;

let addExampleHandler;

const NUM_CLASSES = 4;

let up;
let right;
let down;
let left;

let video;
let webcam;

let mobilenet;
let model;

let manager;

let controllerDataset;
let isPredicting = true;

class Handler {
  constructor() {
    this.controlls = ['up', 'down', 'left', 'right'];
    this.initializeHtml();
  }

  getLearningRate() {
    return learningRateElement.value * 1;
  }

  getDenseUnits() {
    return denseUnitsElement.value * 1;
  }

  getBatchSizeFraction() {
    return batchSizeFractionElement.value * 1;
  };

  getEpochs() {
    return epochsElement.value * 1;
  };

  tellClass(id) {
    dirP = this.controlls[id];
  }

  setExampleHandler(handler) {
    addExampleHandler = handler;
  }

  async handler(label) {
    addExampleHandler(label);
    await tf.nextFrame();
  }

  handleButtons() {

    up = createButton('up');
    right = createButton('right');
    down = createButton('down');
    left = createButton('left');

    trainElement = createButton('train')
    isPredictingElement = createButton('start/stop Predicting')

    dirPelement = createP(dirP);

    up.mousePressed(() => this.handler(0));
    down.mousePressed(() => this.handler(1));
    left.mousePressed(() => this.handler(2));
    right.mousePressed(() => this.handler(3));

    trainElement.mousePressed(() => train());
    isPredictingElement.mousePressed(() => {
      if (isPredicting) {
        isPredicting = false;
      } else {
        isPredicting = true;
      }
    })
  }

  initializeWebcam() {
    video = document.querySelector("#videoElement");

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    if (navigator.getUserMedia) {
      navigator.getUserMedia({
          video: true
        },
        (stream) => video.src = window.URL.createObjectURL(stream),
        (e) => console.log('error'));
    }
    webcam = new Webcam(video);
  }

  handleModel() {
    model = tf.sequential({
      layers: [
        // Flattens the input to a vector so we can use it in a dense layer. While
        // technically a layer, this only performs a reshape (and has no training
        // parameters).
        tf.layers.flatten({
          inputShape: [7, 7, 256]
        }),
        // // Layer 1
        tf.layers.dense({
          units: this.getDenseUnits(),
          activation: 'relu',
          kernelInitializer: 'varianceScaling',
          useBias: true
        }),
        // Layer 2. The number of units of the last layer should correspond
        // to the number of classes we want to predict.
        tf.layers.dense({
          units: NUM_CLASSES,
          kernelInitializer: 'varianceScaling',
          useBias: false,
          activation: 'softmax'
        })
      ]
    });

    // Creates the optimizers which drives training of the model.
    const optimizer = tf.train.adam(this.getLearningRate());
    // We use categoricalCrossentropy which is the loss function we use for
    // categorical classification which measures the error between our predicted
    // probability distribution over classes (probability that an input is of each
    // class), versus the label (100% probability in the true class)>
    model.compile({
      optimizer: optimizer,
      loss: 'categoricalCrossentropy'
    });
    loadMobilenet();
  }

  initializeHtml() {
    learningRateElement = document.getElementById('learningRate');
    denseUnitsElement = document.getElementById('dense-units');
    batchSizeFractionElement = document.getElementById('batchSizeFraction');
    epochsElement = document.getElementById('epochs');
    this.handleModel();
    this.handleButtons();
    this.initializeWebcam();
    this.setExampleHandler(label => {
      tf.tidy(() => {
        const img = webcam.capture();
        controllerDataset.addExample(mobilenet.predict(img), label);
      });
    });
  }

  repeatWork() {
    dirPelement.html(dirP);
    // if (isPredicting) {
    //   predict();
    // }
  }
}
