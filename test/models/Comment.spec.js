const { expect } = require('chai');
const { ObjectId } = require('mongoose').Schema.Types;


const { fakeComments, fakeUser, fakeBlogs } = require('../lib/fake');
const createModelExpectations = require('../lib/createModelExpectations');

const Comment = require('../../server/models/Comment');
const User = require('../../server/models/User');
const Blog = require('../../server/models/Blog');

describe('Comment Model', () => {
    it('should define all the specified fields', () => {
        const c = new Comment(fakeComments[0]);

        const expectedModel = {
            comment: 'string',
            date: Date,
        };

        createModelExpectations(expect, c, expectedModel);
    });

    it('should define required fields correctly', () => {
        const c = new Comment();

        c.validate((err) => {
            expect(err.errors).to.have.keys('comment', 'date')
        });
    });

    it('should correctly establish relationship between Comment and Users and Blogs', (done) => {
      const u = new User(fakeUser);

      u
          .save()
          .then(user => {
              const b = new Blog(fakeBlogs[0]);

              b.author = user._id;

              return Promise.all([Promise.resolve(user), b.save()]);
          })
          .then(([user, blog]) => {
              user.blogs.push(blog);

              const c = new Comment(fakeComments[0]);

              c.author = user._id;
              c.blog = blog._id;

              return Promise.all([user.save(), Promise.resolve(blog), c.save()]);
          })
          .then(([user, blog, comment]) => {
              user.comments.push(comment);
              blog.comments.push(comment);

              return Promise.all([user.save(), blog.save(), Promise.resolve(comment)]);
          })
          .then(([user, blog, comment]) => {
              expect(user.comments.every(c => c._id === comment._id)).to.be.true;
              expect(blog.comments.every(c => c._id === comment._id)).to.be.true;

              done();
          })
      // .catch(error => console.error(error));        
  });    
});