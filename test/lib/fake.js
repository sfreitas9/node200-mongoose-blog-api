const mongoose = require('mongoose');
const User = require('../../server/models/User');
const Blog = require('../../server/models/Blog');
const Comment = require('../../server/models/Comment');

mongoose.models = {};
mongoose.modelSchemas = {};

const fakeUser = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@gmail.com',
    social: {
        twitter: '@johnsmith',
        linkedIn: 'https://www.linkedin.com/in/johnsmith',
        facebook: 'john.smith'
    }
};
const fakeUser2 = {
  firstName: 'Sally',
  lastName: 'Ride',
  email: 'sally.ride@gmail.com',
};

const fakeBlogs = [{
    title: 'Helo World',
    article: `Brian Kernighan wrote the first "hello, world" program as part of the
        documentation for the BCPL programming language developed by Martin Richards. 
        BCPL was used while C was being developed at Bell Labs a few years before the 
        publication of Kernighan and Ritchie's C book in 1972.`,
    published: Date.now(),
    featured: false
}, {
    title: 'Yak Shaving',
    article: `Yak shaving is programming lingo for the seemingly endless series of small
        tasks that have to be completed before the next step in a project can move forward.`,
    published: Date.now(),
    featured: true
}];

const fakeComments = [{
  comment: `Hello World apps are awesome!`,
  date: Date.now(),
}, {
  comment: `Yaks are tedious`,
  date: Date.now(),
}];


const nonExistentObjectId = '507f191e810c19729de860ea';

const createUserInDB = () => new User(fakeUser).save();

const createBlogInDB = (author) => {
    const newBlog = new Blog(fakeBlogs[0]);

    newBlog.author = author;

    return newBlog
        .save()
        .then(blog => {
            author.blogs.push(blog);
            author.save();
            return blog;
        })
}
const createCommentInDB = (blog) => {
  const newComment = new Comment(fakeComments[0]);
  const author = new User(fakeUser2);

  newComment.author = author;
  newComment.blog = blog;

  return newComment
      .save()
      .then(comment => {
          author.comments.push(comment);
          author.save();

          blog.comments.push(comment);
          blog.save();

          return comment;
      })
}

module.exports = {
    fakeUser,
    fakeBlogs,
    fakeComments,
    nonExistentObjectId,
    createUserInDB,
    createBlogInDB,
    createCommentInDB
};
