const request = require('supertest');
const { app, server, mongoose } = require('../../../server');

afterAll(() => {
  mongoose.connection.close();
  server.close();
});

test('GET /api/users/test Tests users route', (done) => {
  request(app)
    .get('/api/users/test')
    .expect('Content-Type', /json/)
    .expect(200, {
      msg: 'User Works',
    })
    .end((err) => {
      if (err) throw done(err);
      done();
    });
});

test('POST /api/users/login Login user into the system', (done) => {
  request(app)
    .post('/api/users/login')
    .send({ email: 'test@test.com', password: '123456' })
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err) => {
      if (err) throw done(err);
      done();
    });
});
