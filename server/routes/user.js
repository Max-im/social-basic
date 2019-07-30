const { Router } = require("express");
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
} = require("../controllers/user");
const { isAuth } = require("../controllers/auth");
const { attachUserToRequest } = require("../controllers/user");

const router = Router();

router.get("/", getAllUsers);
router.get("/:userId", isAuth, getSingleUser);
router.put("/:userId", isAuth, updateUser);
router.delete("/:userId", isAuth, deleteUser);

// any route contains userId param - execute the method
router.param("userId", attachUserToRequest);

module.exports = router;
