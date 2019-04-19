const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const fs = require("fs");
const cloudinary = require("cloudinary");
// Post model
const Post = require("../../models/Post");
/*
GET get all posts
public api
*/

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: "No posts found" }));
});

/*
POST create post
private api
*/
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newPost = new Post({
      text: req.body.text,
      title: req.body.title,
      author: req.body.author,
      img: req.body.img,
      authorId: req.body.authorId,
      avatar: req.body.avatar
    });

    newPost.save().then(post => res.json(post));
  }
);
/*GET get post by user id
private api
*/

router.get(
  "/getByUserId/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = { _id: req.params.id };

    Post.find({ authorId: id })
      .then(posts => {
        res.json(posts);
      })
      .catch(err => res.status(400).json({ err: "no post found" }));
  }
);
/*
GET get  specific post
public api

 */
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ nopostfound: "No post found with that ID" });
      }
    })
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});
/*
PUT edit post
private 
*/
router.put(
  "/edit/:id",
  // passport.authenticate('jwt', {session:false}),
  (req, res) => {
    const newPost = {
      text: req.body.text,
      title: req.body.title,
      author: req.body.author,
      img: req.body.img,
      authorId: req.body.authorId,
      avatar: req.body.avatar
    };
    Post.findOneAndUpdate(
      { _id: req.params.id },
      { $set: newPost },
      { new: false }
    )
      .then(post => res.json({ success: true }))
      .catch(err => res.status(400).json(err));
  }
);
/*
  DELETE delete post
  private
   */
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
