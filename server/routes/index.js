const Comment = require("../model/Comment");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/create", (req, res) => {
  res.render("index");
});

router.get("/posts/:id", (req, res) => {
  res.render("index");
});

router.delete("/comment/:id", (req, res) => {
  console.log(req.params.id, req.headers, "comment Deleted");
  Comment.findByIdAndRemove(req.params.id, (err, data) => {
    console.log(data, "deleted data");
    if (data) {
      Comment.find({ postId: req.headers.postid }, (err, data) => {
        if (err) throw err;
        else {
          res.status(200).json(data);
        }
      });
    }
  });
});

module.exports = router;
