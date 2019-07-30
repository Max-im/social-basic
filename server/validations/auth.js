const { check, validationResult } = require("express-validator");

exports.signupValidation = async (req, res, next) => {
  await check("email")
    .exists()
    .withMessage("Email fields is required")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email is invalid")
    .run(req);

  await check("name")
    .exists()
    .withMessage("Name fields is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be from 3 to 100 characters")
    .run(req);

  await check("password")
    .exists()
    .withMessage("Password fields is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }
  return next();
};

exports.loginValidation = async (req, res, next) => {
  await check("email")
    .exists()
    .withMessage("Email fields is required")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email is invalid")
    .run(req);

  await check("password")
    .exists()
    .withMessage("Password fields is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }
  return next();
};
