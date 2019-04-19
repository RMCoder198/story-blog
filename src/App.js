import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {
  setCurrentUser,
  logoutUser,
  clearCurrentUser
} from "./actions/authActions";
import Header from "./components/Header";
import { Provider } from "react-redux";
import store from "./store";

import Feed from "./components/Feed";
import Signup from "./components/signup";
import Login from "./components/Login";
import CreatePost from "./components/CreatePost";
import ManagePost from "./components/ManagePost";
import EditPost from "./components/Edit";
import Post from "./components/Post";

import "./App.css";

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Feed} />

            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Switch>
              <Route path="/post/create" component={CreatePost} />
              <Route path="/post/manage" component={ManagePost} />
              <Route path="/post/edit/:id" component={EditPost} />
              <Route path="/post/:id" component={Post} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
