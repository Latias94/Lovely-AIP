const { app } = require('../../../server');
const request = require('supertest').agent(app.listen());
const { getAdminToken, supertestWithJest } = require('./helper');


describe('Category Route testing', () => {
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

  test('GET /api/categories/{game id} Get Game category by id', (done) => {
    request
      .get('/api/categories/5b5d5d21a9928090b84fa168')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        supertestWithJest(err, res, done, () => {
          expect(res.body.name).toBe('Game');
        });
      });
  });

  test('POST /api/categories Create Test category', (done) => {
    getAdminToken().then((token) => {
      request
        .post('/api/categories')
        .set('Authorization', token)
        .send('name=Test')
        .send('description=Just for testing')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          supertestWithJest(err, res, done, () => {
            expect(res.body.name).toBe('Test');
            expect(res.body.description).toBe('Just for testing');
          });
        });
    });
  });

  test('GET /api/categories/slug/test Get Test category by slug', (done) => {
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

  test('POST /api/categories/{test id} Edit Test category', (done) => {
    // get Test category id by slug
    request
      .get('/api/categories/slug/test')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        getAdminToken().then((token) => {
          // edit category
          request
            .post(`/api/categories/${res.body.id}`)
            .set('Authorization', token)
            .send('name=Test')
            .send('description=After modified')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, response) => {
              supertestWithJest(error, response, done, () => {
                expect(response.body.name).toBe('Test');
                expect(response.body.description).toBe('After modified');
              });
            });
          return false;
        });
      });
  });

  test('DELETE /api/categories/{test id} Delete Test category', (done) => {
    // get Test category id by slug
    request
      .get('/api/categories/slug/test')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        getAdminToken().then((token) => {
          // edit category
          request
            .delete(`/api/categories/${res.body.id}`)
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .end((error, response) => {
              supertestWithJest(error, response, done, () => {
                expect(response.body.success).toBeTruthy();
              });
            });
        });
      });
  });
});
