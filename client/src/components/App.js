import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./Permission/PrivateRoute";
import AuthorRoute from "./Permission/AuthorRoute";

import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Login from "./Layout/Login";
import Register from "./Layout/Register";
import Home from "./Layout/Home";

import Users from "./User/Users";
import Profile from "./User/Profile";
import EditProfile from "./User/EditProfile";

import SinglePost from "./Post/SinglePost";
import EditPost from "./Post/EditPost";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main">
          <Switch>
            <Route path="/" exact component={Home} />

            <Route path="/users" exact component={Users} />
            <Route path="/users/:userId" exact component={Profile} />
            <PrivateRoute path="/users/edit/:userId" component={EditProfile} />

            <Route path="/posts/:postId" exact component={SinglePost} />
            <AuthorRoute path="/posts/edit/:postId" component={EditPost} />

            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Register} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
