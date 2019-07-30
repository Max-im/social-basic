const { Router } = require("express");
const { signup, login, signout, returnToken } = require("../controllers/auth");
const { signupValidation, loginValidation } = require("../validations/auth");
const { attachUserToRequest } = require("../controllers/user");

const router = Router();

router.post("/signup", signupValidation, signup, returnToken);
router.post("/login", loginValidation, login, returnToken);
router.get("/signout", signout);

// any route contains userId param - execute the method
router.param("userId", attachUserToRequest);

module.exports = router;
