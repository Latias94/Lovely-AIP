const { app } = require('../../../server');
const request = require('supertest').agent(app.listen());


describe('Category Route testing', () => {
  // get admin token from promise
  // getAdminToken().then(token => console.log(`token is ${token}`));
  function getAdminToken() {
    return new Promise(((resolve) => {
      request
        .post('/api/users/login')
        .send({ email: 'frankorz@qq.com', password: '123456' })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          resolve(response.body.token);
        });
    }));
  }

  test('GET /api/categories/test Tests categories route', (done) => {
    request
      .get('/api/categories/test')
      .expect('Content-Type', /json/)
      .expect(200, {
        msg: 'Category Works',
      })
      .end(done);
  });

  test('GET /api/categories Get all categories', (done) => {
    request
      .get('/api/categories')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done);
  });
});
