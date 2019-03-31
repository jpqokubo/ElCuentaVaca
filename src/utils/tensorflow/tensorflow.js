import * as cocoSsd from "@tensorflow-models/coco-ssd";
function objectDetection(image) {
  cocoSsd
    .load()
    .then(model => model.detect(image, 100))
    .then(predections => predections);
}

export default objectDetection;
