const { app } = require('../../../server');
const request = require('supertest').agent(app.listen());
const { getToken, supertestWithJest } = require('./helper');


describe('Product Route testing', () => {
  test('GET /api/products/test Tests products route', (done) => {
    request
      .get('/api/products/test')
      .expect('Content-Type', /json/)
      .expect(200, {
        msg: 'Product Works',
      })
      .end(done);
  });

  test('GET /api/products Get all products', (done) => {
    request
      .get('/api/products')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done);
  });

  test('GET /api/products/{wow id} Get Wow product by id', (done) => {
    request
      .get('/api/products/5b5d7d18b5369b4c50eae907')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        supertestWithJest(err, res, done, () => {
          expect(res.body.name).toBe('War of Warcraft');
        });
      });
  });

  test('POST /api/products Create Test product', (done) => {
    getToken().then((token) => {
      request
        .post('/api/products')
        .set('Authorization', token)
        .send('name=TestGame')
        .send('text=Just for testing')
        .send('totalInventory=100')
        .send('price=100')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          supertestWithJest(err, res, done, () => {
            expect(res.body.name).toBe('TestGame');
            expect(res.body.text).toBe('Just for testing');
          });
        });
    });
  });

  test('GET /api/products/slug/testgame Get Test product by slug', (done) => {
    request
      .get('/api/products/slug/testgame')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        supertestWithJest(err, res, done, () => {
          expect(res.body.name).toBe('TestGame');
        });
      });
  });

  test('POST /api/products/{test id} Edit Test product', (done) => {
    // get Test product id by slug
    request
      .get('/api/products/slug/testgame')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        getToken().then((token) => {
          // edit product
          request
            .post(`/api/products/${res.body._id}`)
            .set('Authorization', token)
            .send('name=TestGame2')
            .send('text=After modified')
            .send('price=89')
            .send('totalInventory=12')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, response) => {
              supertestWithJest(error, response, done, () => {
                expect(response.body.name).toBe('TestGame2');
                expect(response.body.text).toBe('After modified');
                expect(response.body.price).toBe(89);
                expect(response.body.totalInventory).toBe(12);
              });
            });
          return false;
        });
      });
  });

  test('DELETE /api/products/{test id} Delete Test product', (done) => {
    // get Test product id by slug
    request
      .get('/api/products/slug/testgame')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        getToken().then((token) => {
          // edit product
          request
          /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
            .delete(`/api/products/${res.body._id}`)
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
