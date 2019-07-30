const { check, validationResult } = require("express-validator");

exports.createPostValidation = async (req, res, next) => {
  await check("title")
    .not()
    .isEmpty()
    .withMessage("Title fields is required")
    .trim()
    .escape()
    .isLength({ min: 5, max: 50 })
    .withMessage("Title must be from 5 to 50 characters")
    .run(req);

  await check("body")
    .exists()
    .withMessage("Body fields is required")
    .isLength({ min: 5, max: 1000 })
    .withMessage("Body must be from 5 to 100 characters")
    .run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }
  return next();
};
