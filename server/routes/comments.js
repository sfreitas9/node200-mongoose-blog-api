const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const Comment = require('../models/Comment');

let dbUser = null;
let dbBlog = null;

router.get('/', (req, res) => {
  Comment
    .find()
    .then(comments => {
      res.status(200).json(comments);
    });
});

router.get('/:id', (req, res) => {
  Comment
    .findById(req.params.id)
    .then(comment => {
      if (!comment) {
        res.status(404).send(`comment not found`);
        return;
      }
      res.status(200).json(comment);
    });
});

router.post('/', (req, res) => {
  let input = req.body;
  User.findById(input.author)
    .then(user => {
      dbUser = user;
      Blog
        .findById(input.blog)
        .then(blog => {
          dbBlog = blog;
          const newComment = new Comment(input);
          newComment.author = dbUser._id;
          newComment.blog = dbBlog._id;
          return newComment.save();
        })
        .then(comment => {
          dbUser.comments.push(comment);
          dbBlog.comments.push(comment);
          dbUser.save()
            .then(() => dbBlog.save().then(() => res.status(201).json(comment)));
        });
    });
});

router.put('/:id', (req, res) => {
  Comment
    .findByIdAndUpdate( {"_id" : req.params.id}, req.body)
    .then(comment => {
      if (!comment) {
        res.status(404).send(`comment not found`);
        return;
      }
      res.status(204).json(comment);
    });
});

router.delete('/:id', (req, res) => {
  Comment
    .findByIdAndRemove(req.params.id)
    .then(comment => {
      if (!comment) {
        res.status(404).send(`comment not found`);
        return;
      }
      res.status(200).json(comment);
    });
});

module.exports = router;
