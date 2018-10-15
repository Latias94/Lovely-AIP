const { app } = require('../../../server');
const request = require('supertest').agent(app.listen());
const {
  getToken,
  supertestWithJest,
  connectTestDB,
  disconnectTestDB
} = require('../../../utils/testHelper');

describe('Category Route testing', () => {
  beforeAll(() => {
    connectTestDB();
  });

  afterAll(() => {
    disconnectTestDB();
  });

  it('GET /api/categories/test Tests categories route', (done) => {
    request
      .get('/api/categories/test')
      .expect('Content-Type', /json/)
      .expect(200, {
        msg: 'Category Works',
      })
      .end(done);
  });

  it('GET /api/categories Get all categories', (done) => {
    request
      .get('/api/categories')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done);
  });

  it('GET /api/categories Get all categories with their books', (done) => {
    request
      .get('/api/categories/list')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(done);
  });

  it('POST /api/categories Create Test category', (done) => {
    getToken(true).then((token) => {
      request
        .post('/api/categories')
        .set('Authorization', token)
        .send('name=Test')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          supertestWithJest(err, res, done, () => {
            expect(res.body.success).toBeTruthy();
          });
        });
    });
  });

  it('GET /api/categories/slug/test Get Test category by slug', (done) => {
    request
      .get('/api/categories/slug/test')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        supertestWithJest(err, res, done, () => {
          expect(res.body.name).toBe('Test');
        });
      });
  });


  it('GET /api/categories/{test id} Get Test category by id', (done) => {
    request
      .get('/api/categories/slug/test')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        // get category by id
        request
          .get(`/api/categories/${res.body._id}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((error, response) => {
            supertestWithJest(error, response, done, () => {
              expect(response.body.name).toBe('Test');
            });
            return false;
          });
      });
  });

  it('DELETE /api/categories/{test id} Delete Test category', (done) => {
    // get Test category id by slug
    request
      .get('/api/categories/slug/test')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        getToken(true).then((token) => {
          request
            .delete(`/api/categories/${res.body._id}`)
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, response) => {
              supertestWithJest(error, response, done, () => {
                expect(response.body.success).toBeTruthy();
              });
            });
        });
      });
  });
});
