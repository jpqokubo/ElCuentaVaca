import React, { Component } from 'react';
import store from './store';
import { logoutUser, setCurrentUser } from './redux/actions/authActions';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import Login from './components/auth/Login';
import Landing from './components/layout/Landing';
import jwt_decode from 'jwt-decode';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import NavBar from './components/layout/NavBar';
import './App.css';
import ProcessPictures from './components/pictureBatches/ProcessPictures';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <NavBar />
            <Route exact path='/' component={Landing} />
            <div className='container'>
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/process' component={ProcessPictures} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
