import { GET_API } from "../constants";

const initialState = {
  api: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_API:
      return { ...state, api: action.payload };

    default:
      return state;
  }
};
