import { GET_POSTS, GET_POST, GET_USER_POSTS } from "../constants";

const initialState = {
  posts: null,
  post: null,
  userPosts: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.payload };

    case GET_POST:
      return { ...state, post: action.payload };

    case GET_USER_POSTS:
      return { ...state, userPosts: action.payload };

    default:
      return state;
  }
};
