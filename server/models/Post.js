const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  photo: { data: Buffer, contentType: String },
  customPhoto: { type: Boolean, default: false },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  unlikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      author: { type: Schema.Types.ObjectId, ref: "User" },
      text: { type: String, required: true },
      date: { type: Date, default: Date.now }
    }
  ],
  created: { type: Date, default: Date.now }
});

module.exports = model("Post", postSchema);
