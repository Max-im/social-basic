const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  photo: { data: Buffer, contentType: String },
  customPhoto: { type: Boolean, default: false },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  created: { type: Date, default: Date.now }
});

module.exports = model("Post", postSchema);
