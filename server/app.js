const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost/my-blog', { useMongoClient: true});
mongoose.Promise = Promise;

app.use(bodyParser.json());
app.use('/api/users', require('./routes/users'))
app.use('/api/blogs', require('./routes/blogs'))
app.use('/api/comments', require('./routes/comments'))

app.get('/', (req, res) => {
  res.status(200).send("all ok");
});

app.get('*', (req, res) => {
  res.status(404).send('oops, something went wrong');
});

module.exports = app;
