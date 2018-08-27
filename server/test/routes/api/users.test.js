const { app } = require('../../../server');
const request = require('supertest').agent(app.listen());
const { BAD_REQUEST } = require('http-status-codes');
const {
  getToken,
  supertestWithJest,
  connectTestDB,
  disconnectTestDB
} = require('../../../utils/testHelper');
const expectError = require('../../../utils/expectError');

describe('User Route testing', () => {
  beforeAll(() => {
    connectTestDB();
  });

  afterAll(() => {
    disconnectTestDB();
  });

  it('GET /api/users/test Tests users route', (done) => {
    request
      .get('/api/users/test')
      .expect('Content-Type', /json/)
      .expect(200, {
        msg: 'User Works',
      })
      .end(done);
  });

  it('POST /api/users/login Login user into the system', (done) => {
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

  it('POST /api/users/login Should fail to login user without input', (done) => {
    const response = request.post('/api/users/login');
    expectError(response, done, BAD_REQUEST);
  });


  it('POST /api/users/register Register user with duplicate email', (done) => {
    const response = request
      .post('/api/users/register')
      .send({
        name: 'duplicate',
        email: 'test@test.com',
        password: '1234567',
        password2: '1234567',
      });
    expectError(response, done, BAD_REQUEST);
  });

  it('GET /api/users/current Return current user', (done) => {
    getToken(true).then((token) => {
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
