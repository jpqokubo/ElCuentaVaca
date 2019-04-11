import {
  BATCH_PICTURES_SUCCESS,
  BATCH_PICTURES_ERROR,
  BATCH_PICTURES_REQUEST
} from "../types";

const initialState = {
  picturesBatches: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BATCH_PICTURES_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        picturesBatches: [...state.picturesBatches, action.payload]
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

    default:
      return state;
  }
}
