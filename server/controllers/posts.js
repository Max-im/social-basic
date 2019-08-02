const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const Post = require("../models/Post");

exports.attachPostById = (req, res, next, id) => {
  Post.findOne({ _id: id })
    .populate("author", "_id name")
    .then(post => {
      if (!post) return res.status(404).json({ error: "Post not found" });
      req.post = post;
      return next();
    })
    .catch(error => res.status(400).json(error));
};

exports.isAuthor = (req, res, next) => {
  const isAuthor = req.post && req.auth && req.post.author._id == req.auth._id;
  if (!isAuthor) return res.status(403).json({ error: "Permission denied" });
  return next();
};

exports.postPhoto = (req, res, next) => {
  if (req.post.photo.data) {
    res.set(("Content-Type", req.post.photo.contentType));
    return res.send(req.post.photo.data);
  }
  next();
};

exports.getSinglePost = (req, res) => {
  Post.findOne({ _id: req.post._id })
    .select("_id title body customPhoto author created updated")
    .populate("author")
    .then(post => res.json(post))
    .catch(error => res.status(400).json(error));
};

exports.getPosts = (req, res) => {
  Post.find()
    .populate("author", "_id, name")
    .select("_id title body customPhoto")
    .then(posts => res.json(posts))
    .catch(error => res.status(400).json({ error }));
};

exports.createPost = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, function(error, fields, files) {
    if (error) return res.status(400).json(error);
    let post = new Post(fields);

    //save author
    const { _id, name, email } = req.profile;
    post.author = { _id, name, email };

    // save photo
    if (files.photo) {
      // reading files sync is extremely bad approach!!!
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
      post.customPhoto = true;
    }

    post.save((error, result) => {
      if (error) return res.status(400).json({ error });
      return res.json(result);
    });
  });
};

exports.getUserPosts = (req, res) => {
  Post.find({ author: req.profile._id })
    .populate("author", "_id, name")
    .select("_id title body customPhoto")
    .sort("_created")
    .then(posts => res.json(posts))
    .catch(error => res.status(400).json(error));
};

exports.updatePost = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, function(error, fields, files) {
    if (error) return res.status(400).json(error);
    const { post } = req;
    const upPost = _.extend(post, fields);

    // save photo
    if (files.photo) {
      // reading files sync is extremely bad approach!!!
      upPost.photo.data = fs.readFileSync(files.photo.path);
      upPost.photo.contentType = files.photo.type;
      upPost.customPhoto = true;
    }

    upPost
      .save()
      .then(() => res.end())
      .catch(err => res.status(400).json(err));
  });
};

exports.deletePost = (req, res) => {
  const { post } = req;
  post
    .remove()
    .then(() => res.json({ message: "The post was deleted" }))
    .catch(error => res.status(400).json({ error }));
};
