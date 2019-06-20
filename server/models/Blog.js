const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  title: 'string',
  article: 'string',
  published: Date,
  featured: 'boolean',
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]    
});

module.exports = mongoose.model('Blog', BlogSchema);
