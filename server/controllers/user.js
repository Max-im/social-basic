const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");
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
    .select("_id name email created updated customPhoto")
    .then(users => res.json(users))
    .catch(error => res.status(400).json(error));
};

exports.userPhoto = (req, res) => {
  if (req.profile.photo.data) {
    res.set(("Content-Type", req.profile.photo.contentType));
    return res.send(req.profile.photo.data);
  }
  next();
};

exports.getSingleUser = (req, res) => {
  const {
    _id,
    email,
    name,
    created,
    updated,
    customPhoto,
    about
  } = req.profile;
  return res.json({ _id, email, name, created, updated, customPhoto, about });
};

exports.updateUser = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields, files) => {
    if (error) return res.status(400).json(error);
    const { profile } = req;
    const user = _.extend(profile, fields);

    user.updated = Date.now();
    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
      user.customPhoto = true;
    }

    user
      .save()
      .then(() => res.end())
      .catch(err => res.status(400).json({ error: err }));
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
