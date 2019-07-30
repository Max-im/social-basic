import { GET_USERS, GET_USER, USER_ERROR } from "../constants";

const initialState = {
  users: null,
  user: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.payload, error: null };

    case GET_USER:
      return { ...state, user: action.payload, error: null };

    case USER_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
