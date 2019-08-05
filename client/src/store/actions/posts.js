import axios from "axios";
import {
  GET_POSTS,
  GET_USER_POSTS,
  GET_POST,
  CHANGE_LIKES,
  CHANGE_COMMENTS
} from "../constants";

export const getPosts = () => dispatch => {
  axios
    .get("/posts")
    .then(({ data }) => dispatch({ type: GET_POSTS, payload: data }))
    .catch(err => console.log(err));
};

export const getUserPosts = userId => dispatch => {
  axios
    .get(`/posts/by/${userId}`)
    .then(({ data }) => dispatch({ type: GET_USER_POSTS, payload: data }))
    .catch(err => console.log(err));
};

export const onCreatePost = (userId, postData, setState) => dispatch => {
  const options = { headers: { "Content-Type": "multipart/form-data" } };
  const formData = new FormData();
  Object.keys(postData)
    .filter(key => postData[key])
    .forEach(key => formData.set(key, postData[key]));

  axios
    .post(`/posts/${userId}`, formData, options)
    .then(() => {
      setState({ title: "", body: "" });
      dispatch(getUserPosts(userId));
    })
    .catch(err => {
      if (err.response.data) console.log(err.response.data);
      else console.log(err);
      setState({ error: "Error creating post" });
    });
};

export const getSinglePost = postId => dispatch => {
  axios
    .get(`/posts/${postId}`)
    .then(({ data }) => dispatch({ type: GET_POST, payload: data }))
    .catch(error => console.log(error));
};

export const updatePost = (postId, postData, history, setState) => dispatch => {
  const options = { headers: { "Content-Type": "multipart/form-data" } };
  const formData = new FormData();
  Object.keys(postData)
    .filter(key => postData[key])
    .forEach(key => formData.set(key, postData[key]));

  axios
    .put(`/posts/${postId}`, formData, options)
    .then(() => {
      history.push(`/posts/${postId}`);
    })
    .catch(err => {
      if (err.response.data) console.log(err.response.data);
      else console.log(err);
      setState({ error: "Error updating post" });
    });
};

export const onDeletePost = (id, history) => dispatch => {
  axios
    .delete(`/posts/${id}`)
    .then(() => history.push("/"))
    .catch(err => console.log(err));
};

export const onLike = (postId, userId) => dispatch => {
  axios
    .put(`/posts/like/${postId}`, { userId })
    .then(({ data }) => dispatch({ type: CHANGE_LIKES, payload: data }))
    .catch(err => console.log(err));
};

export const onUnlike = (postId, userId) => dispatch => {
  axios
    .put(`/posts/unlike/${postId}`, { userId })
    .then(({ data }) => dispatch({ type: CHANGE_LIKES, payload: data }))
    .catch(err => console.log(err));
};

export const toggleLike = (postId, userId) => dispatch => {
  axios
    .put(`/posts/togglelike/${postId}`, { userId })
    .then(({ data }) => dispatch({ type: CHANGE_LIKES, payload: data }))
    .catch(err => console.log(err));
};

export const toggleUnlike = (postId, userId) => dispatch => {
  axios
    .put(`/posts/toggleunlike/${postId}`, { userId })
    .then(({ data }) => dispatch({ type: CHANGE_LIKES, payload: data }))
    .catch(err => console.log(err));
};

export const addComment = (postId, userId, text) => dispatch => {
  axios
    .post(`/posts/comment/${postId}`, { userId, text })
    .then(({ data }) => dispatch({ type: CHANGE_COMMENTS, payload: data }))
    .catch(err => console.log(err));
};

export const onDeleteComment = (commentId, postId) => dispatch => {
  axios
    .delete(`/posts/comment/${postId}/${commentId}`)
    .then(({ data }) => dispatch({ type: CHANGE_COMMENTS, payload: data }))
    .catch(err => console.log(err));
};
