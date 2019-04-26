import {
  BATCH_PICTURES_SUCCESS,
  DELETE_BATCH_PICTURES,
  PROCESS_BATCH_PICTURES,
  DELETE_SINGLE_PICTURE
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

export const deleteSinglePicture = id => dispatch => {
  dispatch({ type: DELETE_SINGLE_PICTURE, payload: id });
};
