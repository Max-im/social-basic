import axios from "axios";
import { GET_POSTS } from "../constants";

export const getPosts = () => dispatch => {
  axios
    .get("/posts")
    .then(({ data }) => dispatch({ type: GET_POSTS, payload: data }))
    .catch(err => console.log(err));
};
