const { app } = require('../../../server');
const request = require('supertest').agent(app.listen());

// get admin token from promise
// getAdminToken().then(token => console.log(`token is ${token}`));
const getToken = isAdmin => new Promise((resolve) => {
  const email = isAdmin ? 'frankorz@qq.com' : 'test@test.com';
  request
    .post('/api/users/login')
    .send({ email, password: '123456' })
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => resolve(response.body.token));
});

// To wrap the horrible try catch block can use
const supertestWithJest = (err, res, done, asserts) => {
  try {
    expect(err).toBeNull();
    asserts();
    done();
  } catch (error) {
    done.fail(error);
  }
};

module.exports = { getToken, supertestWithJest };
