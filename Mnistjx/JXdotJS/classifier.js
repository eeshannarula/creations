class ImageClassifier {
  constructor(model) {
    this.rgb = 1;
    this.rate = 1;
    this.data = {};
    this.losses = [];
    this.params = {};
    this.loss = Infinity;
    if (model) {
      this.compiled = true;
      this.model = model;
    } else {
      this.compiled = false;
      this.model = tf.sequential();
    }
    this.data.testingdata = [];
    this.data.trainingdata = [];
    this.data.testinglabels = [];
    this.data.traininglabels = [];
  }
  //save the model
  async saveModel() {
    const saveResult = await this.model.save('downloads://my-model-1');
  }
  // load pretrained model
  async loadModel(jsonUpload, weightsUpload) {
    return await tf.loadModel(
      tf.io.browserFiles([jsonUpload.files[0], weightsUpload.files[0]]));
  }
  //set the learning rate
  setLearningRate(lr) {
    this.params.learningRate = lr;
  }
  // set all the params you want
  setAll() {
    this.params.learningRate = 0.1;
    this.params.activation = 'relu';
    this.params.lossFunc = 'categoricalCrossentropy';
    this.params.metrics = ['accuracy'];
    this.params.epochs = 1;
    this.params.rate = 1;
  }
  // set the batchSize
  setBatchSize(size) {
    this.params.BatchSize = size;
  }
  // set the input shape of model
  setInputShape(inputShape) {
    this.params.inputShape = inputShape;
  }
  // set the number of outputs for classification
  setOutputUnits(outputUnits) {
    this.params.outputUnits = outputUnits;
  }
  // set the activation function
  setActivation(activation) {
    this.params.activation = activation;
  }
  // set the loss function
  setLossFunction(lossFunc) {
    this.params.lossFunc = lossFunc;
  }
  // set the metrics
  setMetrics(param) {
    this.params.metrics = param;
  }
  //set the no of inputs at once
  setOffset(offset) {
    this.params.offset = offset;
  }
  // comile the model after all the reqierd prams
  compileModel() {
    if (this.paramsOk() && !this.compiled) {
      this.model.add(tf.layers.conv2d({
        inputShape: this.params.inputShape,
        kernelSize: 5,
        filters: 8,
        strides: 1,
        useBias: true,
        activation: this.params.activation,
        kernelInitializer: 'VarianceScaling'
      }))

      this.model.add(tf.layers.maxPooling2d({
        poolSize: [2, 2],
        strides: [2, 2]
      }));

      this.model.add(tf.layers.conv2d({
        kernelSize: 5,
        filters: 16,
        strides: 1,
        activation: this.params.activation,
        kernelInitializer: 'VarianceScaling'
      }));

      this.model.add(tf.layers.maxPooling2d({
        poolSize: [2, 2],
        strides: [2, 2]
      }));

      this.model.add(tf.layers.flatten());

      this.model.add(tf.layers.dense({
        units: this.params.outputUnits,
        kernelInitializer: 'VarianceScaling',
        activation: 'sigmoid'
      }));

      const LEARNING_RATE = this.params.learningRate;
      const optimizer = tf.train.sgd(LEARNING_RATE);

      this.model.compile({
        optimizer: optimizer,
        loss: this.params.lossFunc, //'categoricalCrossentropy',
        metrics: this.params.metrics // ['accuracy'],
      });
      this.compiled = true;
    } else if (this.compiled) {
      throw new Error(['the model is alread combined!!'])
    }
  }
  // cheking if the model is ready to be compiled
  paramsOk() {
    if (this.params.learningRate !== null) {
      if (this.params.inputShape !== null) {
        if (this.params.outputUnits !== null) {
          if (this.params.activation !== null) {
            if (this.params.lossFunc !== null) {
              if (this.params.metrics !== null) {
                if (this.params.BatchSize !== null) {
                  if (this.params.BatchSize !== null) {
                    return true;
                    //do nothing...
                  } else {
                    return false;
                    throw new Error(['offset not provided !!'])
                  }
                } else {
                  return false;
                  throw new Error(['BatchSize not provided !!'])
                }
              } else {
                return false;
                throw new Error(['metrics not provided !!'])
              }
            } else {
              return false;
              throw new Error(['lossFunc not provided!!'])
            }
          } else {
            return false;
            throw new Error(['activation not provided'])
          }
        } else {
          return false;
          throw new Error(['outputUnits not provided'])
        }
      } else {
        return false;
        throw new Error(['input Shape not give!!!!!'])
      }
    } else {
      return false;
      throw new Error(['learning rate not given!!'])
    }
  }
  // organise the data into seprate images
  organiseData(array, labels, offset) {
    let mainArray = [];
    let Targets = [];
    let total = array.length;
    let condition = total / offset;
    let floor = Math.floor(condition);
    if (condition - floor == 0) {
      for (var i = 0; i < total; i += offset) {
        let subArray = [];
        for (var j = 0; j < offset; j++) {
          subArray[j] = array[i + j] / 255.0;
        }
        Targets.push(labels[i / offset]);
        mainArray.push(subArray);
      }
      return {
        data: mainArray,
        targets: Targets
      };
    } else {
      throw new Error(['total length of data must be divisible by offset for the proper division!!!']);
      return undefined;
    }
  }
  //static method of organing data without labels
  static organiseData(array, offset) {
    let mainArray = [];
    let total = array.length;
    let condition = total / offset;
    let floor = Math.floor(condition);
    if (condition - floor == 0) {
      for (var i = 0; i < total; i += offset) {
        let subArray = [];
        for (var j = 0; j < offset; j++) {
          subArray[j] = array[i + j] / 255.0;
        }
        mainArray.push(subArray);
      }
      return mainArray;
    } else {
      throw new Error(['total length of data must be divisible by offset for the proper division!!!']);
      return undefined;
    }
  }
  // make batches of organised images
  MakeBatches(data, BatchSize, outputUnits) {
    let total = data.data.length;
    let condition = total / BatchSize;
    let floor = Math.floor(total / BatchSize);
    if (floor - condition == 0) {
      let batchs = [];
      let labels = [];
      for (var i = 0; i < total; i += BatchSize) {
        let subBatch = [];
        let subTargets = [];
        for (var j = 0; j < BatchSize; j++) {
          subBatch[j] = data.data[i + j];
          let array = Array.apply(null, Array(outputUnits)).map(Number.prototype.valueOf, 0);
          array[data.targets[i + j]] = 1;
          subTargets.push(array);
          // subTargets = Array.apply(null, Array(outputUnits)).map(Number.prototype.valueOf, 0);
          // subTargets[data.targets[i + j]] = 1;
        }
        batchs.push(subBatch);
        labels.push(subTargets);
      }
      return {
        data: batchs,
        target: labels
      };
    } else {
      throw new Error(['total length of data must be divisible by BatchSize for the proper division!!!']);
      return undefined;
    }
  }
  //add trainingdata to the object
  addTrainingData(data, labels) {
    this.data.trainingdata = data; //this.data.trainingdata.concat(data);
    this.data.traininglabels = labels; //this.data.traininglabels.concat(labels);
  }
  //add testing data to object
  addTestingData(data, labels) {
    this.data.testingdata = data; //this.data.testingdata.concat(data);
    this.data.testinglabels = labels; //this.data.testinglabels.concat(labels);
  }
  //is it rgb or grayScale
  isGreayScaled(tell) {
    if (tell == true) {
      this.rgb = 1;
    } else {
      this.rgb = 3;
    }
  }
  // add the loss
  addLoss(loss) {
    this.losses.push(loss);
  }
  //clac total loss
  clacLoss() {
    let total = 0;
    let length = this.losses.length;
    for (let val of this.losses) {
      total += val;
    }
    this.loss = total / length;
    console.log(this.loss);
  }
  //set no of time the model will be trained per call
  setRate(rate) {
    this.rate = rate;
  }
  // prepare data for training
  prepareDataForTraining() {
    return this.MakeBatches(this.organiseData(this.data.trainingdata, this.data.traininglabels, this.params.offset), this.params.BatchSize, this.params.outputUnits);
  }
  //train the model
  async train() {

    const BatchedData = this.prepareDataForTraining();
    for (var i = 0; i < BatchedData.data.length; i++) {
      let batch = BatchedData.data[i];
      let targets = BatchedData.target[i];
      const xs = tf.tensor2d(batch, [this.params.BatchSize, this.params.offset]);
      const ys = tf.tensor2d(targets, [this.params.BatchSize, this.params.outputUnits]);
      const reshaped = xs.reshape([this.params.BatchSize, Math.sqrt(this.params.offset), Math.sqrt(this.params.offset), this.rgb]);
      const result = await this.model.fit(reshaped, ys, {
        epochs: this.params.epochs ? this.params.epochs : 1,
        shuffle: this.params.shuffle ? this.params.shuffle : false
      })
      console.log(i);
      xs.dispose();
      ys.dispose();
      reshaped.dispose();
    }
  }
  //find the index of the maximum no in an array
  max(array) {
    let max = 0;
    for (let val of array) {
      if (max < val) {
        max = val;
      }
    }
    return array.indexOf(max);
  }
  //test the model
  test() {
    tf.tidy(() => {
      let counter = 0;
      const data = this.organiseData(this.data.testingdata, this.data.testinglabels, this.params.offset);
      const images = data.data;
      const labels = data.targets;
      const totalImages = images.length;
      let targets = [];
      for (var i = 0; i < labels.length; i++) {
        let array = Array.apply(null, Array(this.params.outputUnits)).map(Number.prototype.valueOf, 0);
        array[labels[i]] = 1;
        targets.push(array);
      }
      const xs = tf.tensor2d(images, [images.length, this.params.offset]);
      const reshaped = xs.reshape([images.length, Math.sqrt(this.params.offset), Math.sqrt(this.params.offset), this.rgb]);
      const prediction = this.model.predict(reshaped).dataSync();
      const organiseData = ImageClassifier.organiseData(prediction, 10);
      for (var i = 0; i < totalImages; i++) {
        let max = this.max(organiseData[i]);
        let correct = labels[i];
        if (correct == max) {
          counter++;
        }
      }
      console.log('percentCorrect:' + ((counter / totalImages) * 100) + '%');
    })
  }
  //predict a give input
  predict(inputs) {
    let returndata;
    tf.tidy(() => {
      const xs = tf.tensor2d(inputs, [1, this.params.offset]);
      const reshaped = xs.reshape([1, Math.sqrt(this.params.offset), Math.sqrt(this.params.offset), this.rgb])
      let prediction = this.model.predict(reshaped);
      let data = prediction.dataSync();
      returndata = this.max(data);
    })
    return returndata;
  }
  //convert RRB array to grayScaled value array
  toGrayScaled(array, offset) {
    if ((array.length / offset - Math.floor(array.length / offset)) == 0) {
      let greyScaled = [];
      for (var i = 0; i < array.length; i += offset) {
        let r = array[i + 0];
        let g = array[i + 1];
        let b = array[i + 2];
        let GSval = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        greyScaled.push(GSval);
      }
      return greyScaled;
    } else {
      throw new Error(['array length is no divisible by the offset']);
    }
  }
  //from greay Scaled to rgb ...
  toRGB(array) {
    let rgb = [];
    for (var i = 0; i < array.length; i++) {
      let val = array[i];
      rgb.push(val / 0.299);
      rgb.push(val / 0.587);
      rgb.push(val / 0.114);
    }
    return rgb;
  }
}
