import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import predictionsReducer from "./predictionReducer";
import cameraReducer from "./cameraReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  predictions: predictionsReducer,
  camera: cameraReducer
});
