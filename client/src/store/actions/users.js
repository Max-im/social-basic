import axios from "axios";
import { GET_USERS, GET_USER, USER_ERROR } from "../constants";
import { signout } from "./auth";

export const getUsers = () => dispatch => {
  axios
    .get("/user")
    .then(({ data }) => dispatch({ type: GET_USERS, payload: data }))
    .catch(err => console.log(err));
};

export const getUserProfile = userId => dispatch => {
  axios
    .get(`/user/${userId}`)
    .then(({ data }) => dispatch({ type: GET_USER, payload: data }))
    .catch(err => dispatch({ type: USER_ERROR, payload: err.response.data }));
};

export const onDeleteUser = (userId, history) => dispatch => {
  axios
    .delete(`/user/${userId}`)
    .then(() => dispatch(signout(history)))
    .catch(err => dispatch({ type: USER_ERROR, payload: err.response.data }));
};

export const onUpdateProfile = (userId, userData, history) => dispatch => {
  axios
    .put(`/user/${userId}`, userData)
    .then(() => history.push(`/users/${userId}`))
    .catch(err => dispatch({ type: USER_ERROR, payload: err.response.data }));
};
