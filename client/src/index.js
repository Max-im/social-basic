import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./style.scss";

import App from "./components/App";
import store from "./store/store";
import { SET_USER } from "./store/constants";
import { setAuthToken } from "./store/actions/utils";

if (localStorage.getItem("social-basic")) {
  const { user, token } = JSON.parse(localStorage.getItem("social-basic"));
  store.dispatch({ type: SET_USER, payload: user });
  setAuthToken(token);
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
