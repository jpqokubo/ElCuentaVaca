import {
  BATCH_PICTURES_SUCCESS,
  BATCH_PICTURES_ERROR,
  BATCH_PICTURES_REQUEST,
  DELETE_BATCH_PICTURES,
  PROCESS_BATCH_PICTURES,
  DELETE_SINGLE_PICTURE
} from '../types';

const initialState = {
  pictureBatches: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BATCH_PICTURES_SUCCESS:
      return {
        ...state,
        loading: false,
        pictureBatches: [...state.pictureBatches, action.payload]
      };
    case BATCH_PICTURES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case BATCH_PICTURES_ERROR:
      return {
        ...state,
        loadging: false,
        error: action.payload
      };
    case DELETE_SINGLE_PICTURE:
      let id = action.payload;
      let pictures = state.batch.pictures;
      let pictureBatches = state.pictureBatches;
      let currentBatch = state.batch;
      return {
        ...state,
        batch: { ...state.batch, pictures: pictures.filter(i => i.id !== id) },
        pictureBatches: [
          ...pictureBatches.filter(batches => batches.id !== currentBatch.id),
          { ...state.batch, pictures: pictures.filter(i => i.id !== id) }
        ]
      };

    case DELETE_BATCH_PICTURES:
      let batch = action.payload.batch;
      return {
        ...state,
        pictureBatches: state.pictureBatches.filter(
          item => item.id !== batch.id
        )
      };
    case PROCESS_BATCH_PICTURES:
      return {
        ...state,
        batch: action.payload
      };

    default:
      return state;
  }
}
