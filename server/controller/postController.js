const Post = require("../model/Post");
const Comment = require("../model/Comment");

module.exports = {
  create: (req, res) => {
    console.log(req.body)
    const { title, description, body ,id } = req.body;
    const newPost = new Post({
      title,
      description,
      body,
      createdAt: new Date()
    });
    newPost.save((err, data) => {
      if (err) throw err;
      else {
        Post.find({}, (err, data) => {
          res.json(data);
        });
      }
    });
  },

  update: (req, res) => {
    console.log(req.body)
    const { title, description, body, id } = req.body;
    Post.findByIdAndUpdate(id,{title,description,body,createdAt:new Date()},(err,data) =>{
      if(data) {
        Post.find({}, (err, data) => {
          res.json(data);
        });
      }
    });
  },

  allPosts: (req, res) => {
    Post.find({}, (err, data) => {
      res.json(data);
    });
  },

  singlePost: (req, res) => {
    Post.findById(req.params.id, (err, data) => {
      res.json(data);
    });
  },

  createComment: (req, res) => {
    const { id, comment } = req.body;
    const newComment = new Comment({
      postId: id,
      comment,
      createdAt: new Date()
    });
    newComment.save((err, data) => {
      if (data) {
        Comment.find({ postId: id }, (err, data) => {
          if (err) throw err;
          else {
            res.status(200).json(data);
          }
        });
      }
    });
  },

  allComments: (req, res) => {
    const { id } = req.params;
    Comment.find({ postId: id }, (err, data) => {
      if (err) throw err;
      else {
        res.status(200).json(data);
      }
    });
  }
};
