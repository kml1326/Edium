const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");

router.get("/check", (req, res) => {
  res.send("connected");
});

router.post("/create", postController.create);

router.get("/posts", postController.allPosts);

router.get("/posts/:id", postController.singlePost);

router.post("/posts/:id/comment", postController.createComment);

router.get("/:id/comments", postController.allComments);

module.exports = router;
