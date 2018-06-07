class Data {
  constructor() {
    this.data = {
      trainingImages: [],
      testingImages: []
    };
  }
  loadData(data, label) {
    for (var i = 0; i < data_len; i++) {
      let offset = i * len;
      let threshold = floor(0.8 * data_len);
      let img = [];
      for (var j = 0; j < len; j++) {
        img[j] = data.bytes[offset + j];
      }
      img.label = label;
      if (i < threshold) {
        this.data.trainingImages.push(img);
      } else {
        this.data.testingImages.push(img);
      }
    }
    shuffle(this.data.trainingImages, true);
  }
  makeBatch(offset, batchSize) {
    let batch = [];
    let labels = [];
    for (var i = 0; i < batchSize; i++) {
      batch[i] = this.data.trainingImages[offset + i];
      let l = batch[i].label;
      let target = Array.apply(null, Array(CLASSES)).map(Number.prototype.valueOf, 0);
      target[l] = 1;
      labels[i] = target;
    }
    return {
      data: batch,
      targets: labels
    };
  }
  makeTestingBatch(offset, batchSize) {
    let batch = [];
    let labels = [];
    for (var i = 0; i < batchSize; i++) {
      batch[i] = this.data.testingImages[offset + i];
      let l = batch[i].label;
      let target = Array.apply(null, Array(CLASSES)).map(Number.prototype.valueOf, 0);
      target[l] = 1;
      labels[i] = target;
    }
    return {
      data: batch,
      targets: labels
    };
  }
}
