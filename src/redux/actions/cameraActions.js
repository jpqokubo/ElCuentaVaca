import {
  BATCH_PICTURES_SUCCESS,
  DELETE_BATCH_PICTURES,
  PROCESS_BATCH_PICTURES
} from '../types';

export const batchPictures = (pictures, inventoryDate, id) => dispatch => {
  dispatch({
    type: BATCH_PICTURES_SUCCESS,
    payload: { pictures, inventoryDate, id }
  });
};

export const deleteBatchPictures = batch => dispatch => {
  dispatch({ type: DELETE_BATCH_PICTURES, payload: { batch } });
};
export const processBatchPictures = batch => dispatch => {
  dispatch({ type: PROCESS_BATCH_PICTURES, payload: batch });
};
