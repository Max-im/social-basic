const { Schema, model } = require("mongoose");
const uuid = require("uuid/v1");
const crypto = require("crypto");

const userSchema = new Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  password_hashed: { type: String },
  salt: { type: String },
  customPhoto: { type: Boolean, default: false },
  photo: { data: Buffer, contentType: String },
  about: { type: String, trim: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date }
});

// virtual field
userSchema
  .virtual("password")
  .set(function(password) {
    // store in tmpr var _password
    this._password = password;

    // generation salt
    this.salt = uuid();

    // encript password
    this.password_hashed = this.encriptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// methods
userSchema.methods = {
  authenticate: function(pass) {
    return this.encriptPassword(pass) === this.password_hashed;
  },

  encriptPassword: function(password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};

module.exports = model("User", userSchema);
