const { app } = require('../../../server');
const request = require('supertest').agent(app.listen());

describe('User Route testing', () => {
  test('GET /api/users/test Tests users route', (done) => {
    request
      .get('/api/users/test')
      .expect('Content-Type', /json/)
      .expect(200, {
        msg: 'User Works',
      })
      .end(done);
  });

  test('POST /api/users/login Login user into the system', () => {
    request
      .post('/api/users/login')
      .send({ email: 'test@test.com', password: '123456' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.success).toBe(true);
      });
  });
});
