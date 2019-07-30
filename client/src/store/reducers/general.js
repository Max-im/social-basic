import { ACTION } from "../constants";

const initialState = {
  data: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION:
      return { ...state, data: action.payload };

    default:
      return state;
  }
};
