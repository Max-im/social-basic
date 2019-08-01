import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Users from "./Users";
import Posts from "./Posts";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import PrivateRoute from "./Permission/PrivateRoute";

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
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Register} />
            <Route path="/posts" exact component={Posts} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
