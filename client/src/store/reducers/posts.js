import { GET_POSTS, GET_POST } from "../constants";

const initialState = {
  posts: null,
  post: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.payload };

    case GET_POST:
      return { ...state, post: action.payload };

    default:
      return state;
  }
};
