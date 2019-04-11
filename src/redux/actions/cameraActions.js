import { BATCH_PICTURES_SUCCESS } from "../types";

export const batchPictures = (pictures, todaysDate) => dispatch => {
  dispatch({ type: BATCH_PICTURES_SUCCESS, payload: { pictures, todaysDate } });
};
