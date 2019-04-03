import {
  PREDICTIONS_SUCCESS,
  PREDICTIONS_ERROR,
  PREDICTIONS_REQUEST
} from "../types";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import uuid from "uuid";
export const getPredictions = image => async dispatch => {
  dispatch({ type: PREDICTIONS_REQUEST });
  console.log(image.src);
  cocoSsd
    .load()
    .then(model => model.detect(image, 100))
    .then(predictions => {
      dispatch({
        type: PREDICTIONS_SUCCESS,
        payload: { predictions, image: image.src, id: uuid() }
      });
    })
    .catch(err =>
      dispatch({
        type: PREDICTIONS_ERROR,
        payload: err.response.data
      })
    );
};
