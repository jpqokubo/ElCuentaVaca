import {
  PREDICTIONS_SUCCESS,
  PREDICTIONS_ERROR,
  PREDICTIONS_REQUEST
} from "../types";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import uuid from "uuid";
export const getPredictions = image => async dispatch => {
  dispatch({ type: PREDICTIONS_REQUEST });
  console.log(image);
  cocoSsd
    .load()
    .then(model => model.detect(image))
    .then(predictions => {
      dispatch({
        type: PREDICTIONS_SUCCESS,
        payload: { predictions, image: image.src, id: uuid() }
      });
    })
    .catch(err =>
      dispatch({
        type: PREDICTIONS_ERROR,
        payload: err
      })
    );
};
