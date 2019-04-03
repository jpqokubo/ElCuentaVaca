import React, { useEffect, useState } from "react";
import cattle from "../../images/cattle5.jpg";
function displayResults(props) {
  const [imageId, setImageId] = useState([]);
  const [canvasId, setCanvasId] = useState([]);
  const handleImageCanvas = () => {
    props.predictionsResult.map(prediction => {
      console.log("run");
      const result = prediction.predictions;
      const image = document.createElement("img");
      image.src = prediction.image;
      image.id = prediction.id;
      setImageId([...imageId, prediction.id]);
      console.log(image);
      const c = document.createElement("canvas");
      c.id = prediction.id + "canvas";
      const context = c.getContext("2d");
      context.drawImage(image, 0, 0);
      context.font = "14px Arial";

      for (let i = 0; i < result.length; i++) {
        console.log("for loop");
        context.beginPath();
        context.rect(...result[i].bbox);
        context.lineWidth = 3;
        context.strokeStyle = "green";
        context.fillStyle = "black";
        context.stroke();
        context.fillText(
          result[i].score.toFixed(3) + " " + result[i].class,
          result[i].bbox[0],
          result[i].bbox[1] > 10 ? result[i].bbox[1] - 5 : 10
        );
      }
    });
  };

  useEffect(() => {}, [props.predictionsResult]);

  return <div>{props.predictionsResult ? handleImageCanvas() : null}</div>;
}
export default displayResults;
