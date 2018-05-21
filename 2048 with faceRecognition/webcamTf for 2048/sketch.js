/*
AUTHOR:Eeshan Narula
MachineLearningLIb: Tensorflow : https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.10.0
WebCam Lib: By Google : path : tfjs-examples/webcam-transfer-learning/webcam.js
GitHub:https://github.com/eeshannarula/creations/tree/master/webcamTf
*/

function setup() {
  noCanvas();
  manager = new Handler();
  controllerDataset = new ControllerDataset(4);
}

function draw() {
  manager.repeatWork();
}
