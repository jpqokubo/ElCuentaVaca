import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers/index";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash/throttle";

const persistedState = loadState();
const middleware = [thunk];
const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

export default store;
