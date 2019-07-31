const { Router } = require("express");
const api = require("./api");
const posts = require("./posts");
const auth = require("./auth");
const user = require("./user");

const router = Router();

router.use("/api", api);
router.use("/posts", posts);
router.use("/auth", auth);
router.use("/user", user);

// 404 not found
router.use("*", (req, res) => {
  res.status(404).json({ error: { message: "not found" } });
});

module.exports = router;
