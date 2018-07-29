const { app } = require('../../../server');
const request = require('supertest').agent(app.listen());
const { getAdminToken, supertestWithJest } = require('./helper');

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

  test('POST /api/users/login Login user into the system', (done) => {
    request
      .post('/api/users/login')
      .send({ email: 'test@test.com', password: '123456' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        supertestWithJest(err, res, done, () => {
          expect(err).toBeNull();
          expect(res.body.success).toBeTruthy();
        });
      });
  });

  test('POST /api/users/register Register user with duplicate email', (done) => {
    request
      .post('/api/users/register')
      .send({
        name: 'duplicate',
        email: 'test@test.com',
        password: '1234567',
        password2: '1234567',
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        supertestWithJest(err, res, done, () => {
          expect(res.body.email).toBe('Email already exists');
        });
      });
  });

  test('GET /api/users/current Return current user', (done) => {
    getAdminToken().then((token) => {
      request
        .get('/api/users/current')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          supertestWithJest(err, res, done, () => {
            expect(res.body.name).toBe('admin');
            expect(res.body.email).toBe('frankorz@qq.com');
          });
        });
    });
  });
});
