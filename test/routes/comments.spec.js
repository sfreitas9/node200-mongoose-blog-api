/* global define, it, describe, beforeEach, document */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server/app');

const { fakeBlogs, fakeComments, nonExistentObjectId, createUserInDB, createBlogInDB, createCommentInDB } = require('../lib/fake');

const expect = chai.expect;
chai.use(chaiHttp);

describe('/api/comments', function () {
    this.timeout(6500);

    it('GET / should respond with comments', (done) => {
        chai.request(app)
            .get('/api/comments')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.instanceOf(Array);
                done();
            })
    });

    it('GET /:id should respond with a comment when a valid ID is presented', (done) => {
        createUserInDB().then(createBlogInDB).then(createCommentInDB).then(comment => {
            chai.request(app)
                .get(`/api/comments/${comment._id}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.instanceOf(Object);
                    expect(res.body._id).to.equal(String(comment._id));
                    done();
                })
        });
    });

    it('GET /:id should respond with 404 when an invalid ID is passed', (done) => {
        chai.request(app)
            .get(`/api/comments/${nonExistentObjectId}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it('POST / should save a new comment to the database', (done) => {
      createUserInDB().then(createBlogInDB).then(blog => {
        chai.request(app)
          .post('/api/comments')
          .send(Object.assign( { author: blog.author._id}, { blog: blog._id}, fakeComments[1]))
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.not.be.null;
            expect(res.body._id).to.exist;

            const savedCommentId = res.body._id;

            chai.request(app)
              .get(`/api/comments/${res.body._id}`)
              .end((err, res) => {
                  expect(res).to.have.status(200);
                  expect(err).to.be.null;
                  expect(res.body._id).to.exist;
                  expect(res.body._id).to.equal(savedCommentId);
                  expect(res.body.author).to.equal(String(blog.author._id));

                  done();
              });
          });
        });
    });

    it('PUT /:id should update a comment', (done) => {
        createUserInDB().then(createBlogInDB).then(createCommentInDB).then(comment => {
            chai.request(app)
                .put(`/api/comments/${comment._id}`)
                .send({ comment: 'Hello World is silly' })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(204);

                    chai.request(app)
                        .get(`/api/comments/${comment._id}`)
                        .end((err, res) => {
                            expect(err).to.be.null;
                            expect(res).to.have.status(200);
                            expect(res.body._id).to.equal(String(comment._id));
                            expect(res.body.title).to.not.equal('Helo World is silly');
                            done();
                        })
                });
        });
    });

    it('DELETE /:id should delete a comment', (done) => {
        createUserInDB().then(createBlogInDB).then(createCommentInDB).then(comment => {
            chai.request(app)
                .delete(`/api/comments/${comment._id}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);

                    chai.request(app)
                        .get(`/api/comments/${comment._id}`)
                        .end((err, res) => {
                            expect(res).to.have.status(404);
                            done();
                        });
                });
        });
    });
});
