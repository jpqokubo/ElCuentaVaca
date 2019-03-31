import React, { Component } from "react";
import store from "./store";
import { logoutUser } from "./redux/actions/auth/authActions";
import { setCurrentUser } from "./redux/actions/auth/authActions";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import Login from "./components/auth/Login";
import Landing from "./components/layout/Landing";
import jwt_decode from "jwt-decode";
import "./App.css";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Login} />
            <div className="container">
              <Route exact path="/home" component={Landing} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
