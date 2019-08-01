const { Router } = require("express");
const {
  getAllUsers,
  getSingleUser,
  userPhoto,
  updateUser,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  deleteUser
} = require("../controllers/user");
const { isAuth } = require("../controllers/auth");
const { attachUserToRequest } = require("../controllers/user");

const router = Router();

router.get("/", getAllUsers);
router.get("/:userId", isAuth, getSingleUser);
router.get("/photo/:userId", userPhoto);
router.put("/:userId", isAuth, updateUser);
router.put("/follow/:userId", isAuth, addFollowing, addFollower);
router.put("/unfollow/:userId", isAuth, removeFollowing, removeFollower);
router.delete("/:userId", isAuth, deleteUser);

// any route contains userId param - execute the method
router.param("userId", attachUserToRequest);

module.exports = router;
