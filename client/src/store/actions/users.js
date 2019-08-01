import axios from "axios";
import { GET_USERS, GET_USER, USER_ERROR, SET_USER } from "../constants";
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

export const onUpdateProfile = (userId, userData, h, setState) => dispatch => {
  const formData = new FormData();
  Object.keys(userData)
    .filter(key => userData[key])
    .forEach(key => formData.set(key, userData[key]));
  const options = { headers: { "Content-Type": "multipart/form-data" } };

  axios
    .put(`/user/${userId}`, formData, options)
    .then(() => {
      const user = { ...userData, _id: userId };

      // update auth user data
      dispatch({ type: SET_USER, payload: user });

      // update localstorate
      const userStore = localStorage.getItem("social-basic");
      const { token } = JSON.parse(userStore);
      localStorage.setItem("social-basic", JSON.stringify({ token, user }));

      // redirect to update user data
      h.push(`/users/${userId}`);
    })
    .catch(err => setState({ error: "Error updating data, try again" }));
};
