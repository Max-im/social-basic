import axios from "axios";
import { GET_API } from "../constants";

export const getApiData = () => dispatch => {
  axios
    .get("/api")
    .then(({ data }) => dispatch({ type: GET_API, payload: data }))
    .catch(err => console.log(err));
};
