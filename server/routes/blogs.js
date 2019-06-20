const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

let dbUser = null;

router.get('/', (req, res) => {
  Blog
    .find()
    .then(blogs => {
      res.status(200).json(blogs);
    });
});

router.get('/featured', (req, res) => {
  Blog
    .find({ featured: true })
    .then(blogs => {
      res.status(200).json(blogs);
    });
});

router.get('/:id', (req, res) => {
  Blog
    .findById(req.params.id)
    .then(blog => {
      if (!blog) {
        res.status(404).send(`blog not found`);
        return;
      }
      res.status(200).json(blog);
    });
});

router.post('/', (req, res) => {
  User.findById(req.body.author)
    .then(user => {
      dbUser = user;
      const newBlog = new Blog(req.body);
      newBlog.author = user._id;
      return newBlog.save();
    })
    .then(blog => {
      dbUser.blogs.push(blog);
      dbUser.save().then(() => res.status(201).json(blog));
    });
});

router.put('/:id', (req, res) => {
  Blog
    .findByIdAndUpdate( {"_id" : req.params.id}, req.body)
    .then(blog => {
      if (!blog) {
        res.status(404).send(`blog not found`);
        return;
      }
      res.status(204).json(blog);
    });
});

router.delete('/:id', (req, res) => {
  Blog
    .findByIdAndRemove(req.params.id)
    .then(blog => {
      if (!blog) {
        res.status(404).send(`blog not found`);
        return;
      }
      res.status(200).json(blog);
    });
});

module.exports = router;
