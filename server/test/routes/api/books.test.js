const { app } = require('../../../server');
const request = require('supertest').agent(app.listen());
const {
  getToken,
  supertestWithJest,
  connectTestDB,
  disconnectTestDB
} = require('../../../utils/testHelper');

describe('Book Route testing', () => {
  beforeAll(() => {
    connectTestDB();
  });

  afterAll(() => {
    disconnectTestDB();
  });

  it('GET /api/books/test Tests books route', (done) => {
    request
      .get('/api/books/test')
      .expect('Content-Type', /json/)
      .expect(200, {
        msg: 'Book Works',
      })
      .end(done);
  });

  it('GET /api/books Get all books', (done) => {
    request
      .get('/api/books')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done);
  });

  it('POST /api/books Create Test book', (done) => {
    getToken().then((token) => {
      request
        .post('/api/books')
        .set('Authorization', token)
        .send('title=TestGame')
        .send('description=Just for testing')
        .send('publishDate=1 1 1970')
        .send('stock=100')
        .send('price=100')
        .send('isbn=9780672317248')
        .send('authors=Tester Frank')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          supertestWithJest(err, res, done, () => {
            expect(res.body.title).toBe('TestGame');
            expect(res.body.description).toBe('Just for testing');
          });
        });
    });
  });

  it('GET /api/books/slug/testgame Get Test book by slug', (done) => {
    request
      .get('/api/books/slug/testgame')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        supertestWithJest(err, res, done, () => {
          expect(res.body.title).toBe('TestGame');
        });
      });
  });

  it('GET /api/books/{test id} Get Test book by id', (done) => {
    request
      .get('/api/books/slug/testgame')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        // edit book
        request
          .get(`/api/books/${res.body._id}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((error, response) => {
            supertestWithJest(error, response, done, () => {
              expect(response.body.title).toBe('TestGame');
              expect(response.body.description).toBe('Just for testing');
            });
            return false;
          });
      });
  });

  it('POST /api/books/review/{test id} Add review to Test book', (done) => {
    // get Test book id by slug
    request
      .get('/api/books/slug/testgame')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        getToken().then((token) => {
          // edit book
          request
            .post(`/api/books/review/${res.body._id}`)
            .set('Authorization', token)
            .send('content=For the Alliance!!!')
            .send('star=5')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, response) => {
              supertestWithJest(error, response, done, () => {
                // assert Test user id
                expect(response.body.reviews).toHaveLength(1);
                expect(response.body.reviews[0].content).toBe('For the Alliance!!!');
                expect(response.body.reviews[0].star).toBe(5);
              });
            });
        });
      });
  });

  it('DELETE /api/books/review/{test id}/{review_id} Delete review to Test book', (done) => {
    // get Test book id by slug
    request
      .get('/api/books/slug/testgame')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        getToken().then((token) => {
          // get the first review id
          const reviewId = res.body.reviews[0].reviewid.toString();
          // edit book
          request
            .delete(`/api/books/review/${res.body._id}/${reviewId}`)
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

  it('POST /api/books/{test id} Edit Test book', (done) => {
    // get Test book id by slug
    request
      .get('/api/books/slug/testgame')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        getToken().then((token) => {
          // edit book
          request
            .post(`/api/books/${res.body._id}`)
            .set('Authorization', token)
            .send('title=TestGame2')
            .send('description=After modified')
            .send('publishDate=1 1 1970')
            .send('stock=12')
            .send('price=89')
            .send('isbn=9780672317248')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, response) => {
              supertestWithJest(error, response, done, () => {
                expect(response.body.title).toBe('TestGame2');
                expect(response.body.description).toBe('After modified');
                expect(response.body.price).toBe(89);
                expect(response.body.stock).toBe(12);
              });
            });
          return false;
        });
      });
  });

  it('DELETE /api/books/{test id} Delete Test book', (done) => {
    // get Test book id by slug
    request
      .get('/api/books/slug/testgame')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        getToken().then((token) => {
          // edit book
          request
            .delete(`/api/books/${res.body._id}`)
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
