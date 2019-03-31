import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import predictions from "./predictionReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  predictions: predictions
});
