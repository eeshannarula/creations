class ImageClassifier {
  constructor(classes) {
    this.classes = classes;
    //data...
    this.data = {};
    this.data.testingdata = [];
    this.data.trainingdata = [];
    this.data.testinglabels = [];
    this.data.traininglabels = [];

    this.oneSide = 50;
    this.GREYlen = 2500;
    this.RGBlen = 10000;
  }
  //============================================================================
  // load images from a file for p5 js
  loadImages(dir, ext) {
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
  //============================================================================
  copy(array) {
    let mainArray = [];
    for (var i = 0; i < this.RGBlen; i += 4) {
      let r = array[i + 0] * 0.3;
      let g = array[i + 1] * 0.59;
      let b = array[i + 2] * 0.11;
      mainArray.push((r + g + b) / 255);
    }
    return mainArray;
  }
  //============================================================================
  organiseData(data, offset) {
    for (var i = 0; i < data.length; i += offset) {
      let subArray = [];
      for (var j = 0; j < offset; j++) {
        subArray[i] = data[i + j];
      }
      mainArray.push(subArray);
    }
    return mainArray;
  }
  //============================================================================
  // for p5 js
  reshape(data, label) {
    let mainArray = [];
    for (let img of data) {
      img.resize(this.oneSide, this.oneSide);
      img.loadPixels();
      let array = this.copy(img.pixels);
      array.label = label;
      mainArray.push(array);
    }
    return mainArray;
  }
  //============================================================================
  // static version for single image
  static reshape(img, size) {
    const copy = (array) => {
      let mainArray = [];
      for (var i = 0; i < size * size * 4; i += 4) {
        let r = array[i + 0] * 0.3;
        let g = array[i + 1] * 0.59;
        let b = array[i + 2] * 0.11;
        mainArray.push((r + g + b) / 255);
      }
      return mainArray;
    }
    img.resize(size, size);
    img.loadPixels();
    let array = copy(img.pixels);
    return array;
  }
  //============================================================================
  addTrainingData(data) {
    this.data.trainingdata = this.data.trainingdata.concat(data);
    shuffle(this.data.trainingdata, true);
  }
  //============================================================================
  addTestingData(data) {
    this.data.testingdata = this.data.testingdata.concat(data);
    shuffle(this.data.testingdata, true);
  }
  //============================================================================
  divideData(data, offset) {
    let mainArray1 = [];
    let mainArray2 = [];
    for (var i = 0; i < data.length; i++) {
      if (i < offset) {
        mainArray1.push(data[i]);
      } else {
        mainArray2.push(data[i]);
      }
    }
    this.data.trainingdata = this.data.trainingdata.concat(mainArray1);
    this.data.testingdata = this.data.testingdata.concat(mainArray2);

    shuffle(this.data.trainingdata, true);
    shuffle(this.data.testingdata, true);
  }
  //============================================================================

  maxNum(array) {
    let maximum = 0;
    for (let val of array) {
      if (maximum < val) {
        maximum = val;
      }
    }
    return array.indexOf(maximum);
  }
  // ===========================================================================
  makeBatch(images, targets, batchSize, offset) {
    let batch = [];
    let labels = [];
    for (var i = 0; i < batchSize; i++) {
      batch[i] = images[offset + i];
      labels[i] = targets[offset + i];
    }
    return {
      data: batch,
      targets: labels
    }
  }
  // ===========================================================================
  makeTargets(data) {
    let labels = [];
    for (let img of data) {
      let array = Array.apply(null, Array(this.classes)).map(Number.prototype.valueOf, 0);
      array[img.label] = 1;
      labels.push(array);
    }
    return labels;
  }
  // ===========================================================================
  addlabels() {
    this.data.traininglabels = this.makeTargets(this.data.trainingdata);
    this.data.testinglabels = this.makeTargets(this.data.testingdata);
  }
  // ===========================================================================

  //save the model
  async saveModel(model) {
    const saveResult = await model.save('downloads://my-model-1');
  }
  // ===========================================================================
  // load pretrained model
  async loadModel(jsonUpload, weightsUpload) {
    return await tf.loadModel(
      tf.io.browserFiles([jsonUpload.files[0], weightsUpload.files[0]]));
  }
  // ===========================================================================
  test() {
    let count = 0;
    tf.tidy(() => {
      for (let img of this.data.testingdata) {
        let label = img.label;
        let xs = tf.tensor2d(img, [1, this.GREYlen]);
        let reshaped = xs.reshape([1, this.oneSide, this.oneSide, 1]);
        let prediction = this.maxNum(model.predict(reshaped).dataSync());
        if (prediction === label) {
          count++
        }
      }
      console.log((count / this.data.testingdata.length) * 100 + '%');
    })
  }
  // ===========================================================================

  async train() {
    for (var i = 0; i < this.data.trainingdata.length; i += 100) {
      let batch = this.makeBatch(this.data.trainingdata, this.data.traininglabels, 100, i);
      const data = batch.data;
      const targets = batch.targets;
      const xs = tf.tensor2d(data, [100, this.GREYlen]);
      const ys = tf.tensor2d(targets, [100, this.classes]);
      const reshaped = xs.reshape([100, this.oneSide, this.oneSide, 1]);
      const result = await model.fit(reshaped, ys, {
        epochs: 20,
        shuffle: true
      });
      console.log(result.history.loss[0]);
      xs.dispose();
      ys.dispose();
      reshaped.dispose();
    }
  }
  // ===========================================================================
  // photo shoul be a prototype of p5 images
  predict(photo) {
    tf.tidy(() => {
      let img = photo;
      img.resize(this.oneSide, this.oneSide);
      img.loadPixels();
      let inputs = ImageClassifier.reshape(img.pixels, this.oneSide);
      const xs = tf.tensor4d(inputs, [1, this.oneSide, this.oneSide, 1]);
      const prediction = this.maxNum(model.predict(xs).dataSync());
      console.log(prediction);
    })
  }
  // ===========================================================================


  buildModel() {

    let model;
    model = tf.sequential();

    model.add(tf.layers.conv2d({
      inputShape: [this.oneSide, this.oneSide, 1],
      kernelSize: 5,
      filters: 32,
      strides: 1,
      activation: 'relu',
      kernelInitializer: 'VarianceScaling'
    }))

    model.add(tf.layers.maxPooling2d({
      poolSize: [2, 2],
      strides: [2, 2]
    }));

    model.add(tf.layers.conv2d({
      kernelSize: 5,
      filters: 32,
      strides: 1,
      activation: 'relu',
    }))


    model.add(tf.layers.maxPooling2d({
      poolSize: [2, 2],
      strides: [2, 2]
    }));

    model.add(tf.layers.conv2d({
      kernelSize: 5,
      filters: 8,
      strides: 1,
      activation: 'relu',
    }))


    model.add(tf.layers.flatten());

    model.add(tf.layers.dense({
      units: 10,
      activation: 'relu'
    }));

    model.add(tf.layers.dropout({
      rate: 0.2,
    }));

    model.add(tf.layers.dense({
      units: this.classes,
      activation: 'softmax',
    }));

    const LEARNINIG_RATE = 0.0001;
    const optimizer = tf.train.adam(LEARNINIG_RATE);

    model.compile({
      optimizer: optimizer,
      loss: 'categoricalCrossentropy',
    });

    return model;
  }
  // ===========================================================================
}
