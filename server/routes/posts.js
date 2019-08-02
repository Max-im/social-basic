const { Router } = require("express");
const {
  getPosts,
  getUserPosts,
  getSinglePost,
  postPhoto,
  createPost,
  updatePost,
  deletePost,
  isAuthor,
  attachPostById
} = require("../controllers/posts");
const { isAuth } = require("../controllers/auth");

const { createPostValidation } = require("../validations/posts");
const { attachUserToRequest } = require("../controllers/user");

const router = Router();

router.get("/", getPosts);
router.get("/by/:userId", getUserPosts);
router.get("/:postId", getSinglePost);
router.get("/photo/:postId", postPhoto);
router.post("/:userId", isAuth, createPost, createPostValidation);
router.put("/:postId", isAuth, isAuthor, updatePost);
router.delete("/:postId", isAuth, isAuthor, deletePost);

// any route contains userId param - execute the method
router.param("userId", attachUserToRequest);
router.param("postId", attachPostById);

module.exports = router;
