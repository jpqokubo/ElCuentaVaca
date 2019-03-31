import {
  PREDICTIONS_SUCCESS,
  PREDICTIONS_REQUEST,
  PREDICTIONS_ERROR
} from "../types";
const initialState = {
  predictions: "",
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PREDICTIONS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case PREDICTIONS_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    case PREDICTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        predictions: action.payload
      };

    default:
      return state;
  }
}
