import { SET_USER } from "../constants";

const initialState = {
  user: {},
  isAuth: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuth: Object.keys(action.payload).length > 0
      };

    default:
      return state;
  }
};
