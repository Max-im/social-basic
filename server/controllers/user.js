const _ = require("lodash");
const User = require("../models/User");

exports.attachUserToRequest = (req, res, next, id) => {
  User.findOne({ _id: id }).exec((err, user) => {
    if (err || !user) return res.status(400).json({ error: "User not found" });
    req.profile = user;
    next();
  });
};

exports.hasAuthorization = (req, res, next) => {
  const { profile, auth } = req;
  const authorized = profile && auth && profile._id === auth._id;
  if (!authorized) {
    return res
      .status(403)
      .json({ error: "User not authorized, check permissions" });
  }
  return next();
};

exports.getAllUsers = (req, res) => {
  User.find()
    .select("_id name email created updated")
    .then(users => res.json(users))
    .catch(error => res.status(400).json(error));
};

exports.getSingleUser = (req, res) => {
  const { _id, email, name, created, updated } = req.profile;
  return res.json({ _id, email, name, created, updated });
};

exports.updateUser = (req, res) => {
  const { profile } = req;
  const updatedUser = _.extend(profile, req.body);
  updatedUser.updated = new Date();
  const { _id, email, name, created, updated } = updatedUser;
  updatedUser.save(err => {
    if (err) return res.status(400).json(err);
    return res.json({ _id, email, name, created, updated });
  });
};

exports.deleteUser = (req, res) => {
  const { profile } = req;
  profile.remove((error, user) => {
    if (error) return res.status(400).json(error);
    const { _id, email, name, created, updated } = user;
    res.json({ _id, email, name, created, updated });
  });
};
