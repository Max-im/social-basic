import axios from "axios";

export const setAuthToken = token => {
  if (!token) delete axios.defaults.headers.common["Authorization"];
  else axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
