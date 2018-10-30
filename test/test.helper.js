import mongoose from 'mongoose'
mongoose.Promise = global.Promise

// call once before test suit runs
before((done) => {
    mongoose.connect('mongodb://localhost/users_test')
    mongoose.connection
        .once('open', () => { done() })
        .on('error', (error) => {
            console.warn('Warning', error)
        })
})

//call before each test
beforeEach((done) => {
    const { users, comments, blogposts } = mongoose.connection.collections;
    users.drop(() => {
      comments.drop(() => {
        blogposts.drop(() => {
          done();
        });
      });
    });
  });