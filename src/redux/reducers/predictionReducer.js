import {
  PREDICTIONS_SUCCESS,
  PREDICTIONS_REQUEST,
  PREDICTIONS_ERROR
} from "../types";
const initialState = {
  loading: false,
  predictionsResult: []
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
        errors: action.payload,
        loading: false
      };
    case PREDICTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        predictionsResult: [...state.predictionsResult, action.payload]
      };

    default:
      return state;
  }
}
