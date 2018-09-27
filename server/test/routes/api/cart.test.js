const { app } = require('../../../server');
const request = require('supertest').agent(app.listen());
const {
  getToken,
  supertestWithJest,
  connectTestDB,
  disconnectTestDB
} = require('../../../utils/testHelper');

describe('Cart Route testing', () => {
  beforeAll((done) => {
    const callback = (err) => {
      expect(err).toBeNull();
      getToken(true).then((token) => {
        request
          .post('/api/books')
          .set('Authorization', token)
          .send('title=TestCart')
          .send('description=Just for testing')
          .send('publishDate=1 1 1970')
          .send('stock=100')
          .send('price=100')
          .send('isbn=9780672317248')
          .send('authors=Tester Frank')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((_, res) => {
            supertestWithJest(err, res, done, () => {
              expect(res.body.title).toBe('TestCart');
              expect(res.body.description).toBe('Just for testing');
            });
          });
      });
    };
    connectTestDB(callback);
  });

  afterAll((done) => {
    request
      .get('/api/books/slug/testcart')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        getToken(true).then((token) => {
          request
            .delete(`/api/books/${res.body._id}`)
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, response) => {
              supertestWithJest(error, response, done, () => {
                expect(response.body.success).toBeTruthy();
                disconnectTestDB();
              });
            });
        });
      });
  });

  it('GET /api/cart/test Tests cart route', (done) => {
    request
      .get('/api/cart/test')
      .expect('Content-Type', /json/)
      .expect(200, {
        msg: 'Cart Works',
      })
      .end(done);
  });

  it('GET /api/cart Get all books in the user cart', (done) => {
    getToken().then((token) => {
      request
        .get('/api/cart')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          supertestWithJest(err, res, done, () => {
            expect(res.body).toHaveLength(0);
          });
        });
    });
  });

  it('POST /api/cart/{id} Add one book into cart', (done) => {
    request
      .get('/api/books/slug/testcart')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        getToken().then((token) => {
          request
            .post(`/api/cart/${res.body._id}`)
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, response) => {
              supertestWithJest(error, response, done, () => {
                expect(response.body[0].title).toBe('TestCart');
                expect(response.body[0].price).toBe(100);
                expect(response.body[0].quantity).toBe(1);
                expect(response.body).toHaveLength(1);
              });
              return false;
            });
        });
      });
  });

  it('POST /api/cart/{id}/{quantity} Edit purchase quantity of book in cart', (done) => {
    request
      .get('/api/books/slug/testcart')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        getToken().then((token) => {
          request
            .post(`/api/cart/${res.body._id}/10`)
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, response) => {
              supertestWithJest(error, response, done, () => {
                expect(response.body[0].title).toBe('TestCart');
                expect(response.body[0].price).toBe(100);
                expect(response.body[0].quantity).toBe(10);
                expect(response.body).toHaveLength(1);
              });
              return false;
            });
        });
      });
  });

  it('DELETE /api/cart/{test id} Delete one book from cart', (done) => {
    request
      .get('/api/books/slug/testcart')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        getToken().then((token) => {
          request
            .delete(`/api/cart/${res.body._id}`)
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, response) => {
              supertestWithJest(error, response, done, () => {
                expect(response.body).toHaveLength(0);
              });
              return false;
            });
        });
      });
  });
});
