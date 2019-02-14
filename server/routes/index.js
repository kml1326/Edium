const Comment = require("../model/Comment");
const Post = require("../model/Post");

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

router.delete("/posts/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, data) => {
    console.log(data, "deleted Post data");
    if (data) {
      Comment.remove({ postId: req.params.id }, err => {
        if (err) throw err;
        else {
          Post.find({}, (err, data) => {
            res.json(data);
          });
        }
      });
    }
  });
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

router.put("/comment/:id", (req, res) => {
  console.log(req.params.id, req.headers, "comment edit");
  Comment.findByIdAndUpdate(
    req.params.id,
    {
      comment: req.headers.comment,
      postId: req.headers.postid,
      createdAt: new Date()
    },
    (err, data) => {
      console.log(data, "update data");
      if (data) {
        Comment.find({ postId: req.headers.postid }, (err, data) => {
          if (err) throw err;
          else {
            res.status(200).json(data);
          }
        });
      }
    }
  );
});

router.get("*", (req, res) => {
  res.send(
    "<div><h1>Oop's Page Not Find</h1><img src='https://msegceporticoprodassets.blob.core.windows.net/asset-blobs/4095088_en_1'/></div>"
  );
});

module.exports = router;
