const { Router } = require("express");
const fs = require("fs");

const router = Router();

router.get("/", (req, res) => {
  fs.readFile("./server/docs/index.json", (error, data) => {
    if (error) return res.json(error);
    res.json(JSON.parse(data));
  });
});

module.exports = router;
