import { SET_USER, AUTH_ERROR, LOADING_AUTH } from "../constants";

const initialState = {
  user: {},
  isAuth: false,
  error: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        error: {},
        isAuth: Object.keys(action.payload).length > 0
      };

    case AUTH_ERROR:
      return { ...state, error: action.payload };

    case LOADING_AUTH:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};
