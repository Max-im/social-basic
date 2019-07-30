import axios from "axios";
import { SET_USER } from "../constants";

export const onLogin = (userData, history) => dispatch => {
  axios
    .post("/auth/login", userData)
    .then(({ data }) => {
      const { token, user } = data;
      dispatch({ type: SET_USER, payload: user });
      history.push("/");
    })
    .catch(err => console.log(err));
};

export const onRegister = (userData, history) => dispatch => {
  axios
    .post("/auth/signup", userData)
    .then(({ data }) => {
      const { token, user } = data;
      dispatch({ type: SET_USER, payload: user });
      history.push("/");
    })
    .catch(err => console.log(err));
};
