import axios from "axios";
import { SET_USER, AUTH_ERROR, LOADING_AUTH } from "../constants";
import { setAuthToken } from "./utils";

export const onLogin = (userData, history) => dispatch => {
  dispatch({ type: LOADING_AUTH, payload: true });
  axios
    .post("/auth/login", userData)
    .then(({ data }) => {
      const { token, user } = data;
      dispatch({ type: SET_USER, payload: user });
      localStorage.setItem("social-basic", JSON.stringify(data));
      setAuthToken(token);
      history.push("/");
      dispatch({ type: LOADING_AUTH, payload: false });
    })
    .catch(err => {
      dispatch({ type: LOADING_AUTH, payload: false });
      const { errors, error } = err.response.data;
      if (errors) {
        const payload = {};
        errors.forEach(item => {
          payload[item.param] = item.msg;
        });
        dispatch({ type: AUTH_ERROR, payload });
      }
      if (error) {
        dispatch({ type: AUTH_ERROR, payload: { email: error } });
      }
    });
};

export const onRegister = (userData, history) => dispatch => {
  dispatch({ type: LOADING_AUTH, payload: true });
  axios
    .post("/auth/signup", userData)
    .then(({ data }) => {
      dispatch({ type: LOADING_AUTH, payload: false });
      const { token, user } = data;
      localStorage.setItem("social-basic", JSON.stringify(data));
      setAuthToken(token);
      dispatch({ type: SET_USER, payload: user });
      history.push("/");
    })
    .catch(err => {
      dispatch({ type: LOADING_AUTH, payload: false });
      const { errors, error } = err.response.data;
      if (errors) {
        const payload = {};
        errors.forEach(item => {
          payload[item.param] = item.msg;
        });
        dispatch({ type: AUTH_ERROR, payload });
      }
      if (error) {
        dispatch({ type: AUTH_ERROR, payload: { email: error } });
      }
    });
};

export const signout = history => dispatch => {
  axios
    .get("/auth/signout")
    .then(() => {
      dispatch({ type: SET_USER, payload: {} });
      localStorage.removeItem("social-basic");
      setAuthToken(false);
      history.push("/");
    })
    .catch(err => console.log(err));
};
