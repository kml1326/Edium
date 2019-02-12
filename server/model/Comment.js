const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const CommentSchema = new mongoose.Schema({
  postId: { type: ObjectId, ref: "Post" },
  comment: String,
  createdAt: Date
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
