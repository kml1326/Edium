const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  body: String,
  createdAt: Date
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
