import {
  BATCH_PICTURES_SUCCESS,
  BATCH_PICTURES_ERROR,
  BATCH_PICTURES_REQUEST,
  DELETE_BATCH_PICTURES
} from "../types";

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
    case DELETE_BATCH_PICTURES: 
    return { 
      ...state, 
      pictureBatches: state.pictureBatches.filter( batch => ( batch !== action.payload))
    }

    default:
      return state;
  }
}
