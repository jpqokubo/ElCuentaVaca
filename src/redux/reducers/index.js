import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import errorReducer from "./errors/errorReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
