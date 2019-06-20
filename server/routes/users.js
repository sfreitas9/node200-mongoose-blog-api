const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  User  
    .find()
    .then(users => {
      res.status(200).json(users);
    });
});

router.get('/:id', (req, res) => {
  User  
    .findById(req.params.id)
    .then(user => {
      if (!user) {
        res.status(404).send(`user not found`);
        return;
      }
      res.status(200).json(user);
    });
});

router.post('/', (req, res) => {
  const newUser = new User(req.body);
  newUser  
    .save()
    .then(result => {
      res.status(201).json(result);
    });
});

router.put('/:id', (req, res) => {
  User  
    .findByIdAndUpdate( {_id: req.params.id}, req.body)
    .then(user => {
      if (!user) {
        res.status(404).send(`user not found`);
        return;
      }
      res.status(204).json(user);
    });
});

router.delete('/:id', (req, res) => {
  User  
    .findByIdAndRemove(req.params.id)
    .then(user => {
      // console.log(`after delete user error=${err} blog=${blog}`);
      if (!user) {
        res.status(404).send(`user not found`);
        return;
      }
      res.status(200).json(user);
    });
});

module.exports = router;
