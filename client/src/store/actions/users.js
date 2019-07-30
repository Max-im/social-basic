import axios from "axios";
import { GET_USERS, GET_USER, USER_ERROR } from "../constants";

export const getUsers = () => dispatch => {
  axios
    .get("/user")
    .then(({ data }) => dispatch({ type: GET_USERS, payload: data }))
    .catch(err => console.log(err));
};

export const getSingleUser = userId => dispatch => {
  axios
    .get(`/user/${userId}`)
    .then(({ data }) => dispatch({ type: GET_USER, payload: data }))
    .catch(err => dispatch({ type: USER_ERROR, payload: err.response.data }));
};
