const { app } = require('../../../server');
const request = require('supertest').agent(app.listen());
const {
  getToken,
  supertestWithJest,
  connectTestDB,
  disconnectTestDB
} = require('../../../utils/testHelper');

describe('BookList Route testing', () => {
  beforeAll((done) => {
    // add test book
    const callback = (err) => {
      expect(err).toBeNull();
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
          .end((_, res) => {
            supertestWithJest(err, res, done, () => {
              expect(res.body.title).toBe('TestGame');
              expect(res.body.description).toBe('Just for testing');
            });
          });
      });
    };
    connectTestDB(callback);
  });

  afterAll((done) => {
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
                disconnectTestDB();
              });
            });
        });
      });
  });

  it('GET /api/booklists/test Tests booklists route', (done) => {
    request
      .get('/api/booklists/test')
      .expect('Content-Type', /json/)
      .expect(200, {
        msg: 'BookList Works',
      })
      .end(done);
  });

  it('GET /api/booklists Get all booklists', (done) => {
    request
      .get('/api/booklists')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done);
  });

  it('POST /api/booklists Create Test booklist', (done) => {
    getToken().then((token) => {
      request
        .post('/api/booklists')
        .set('Authorization', token)
        .send('title=TestBookList')
        .send('description=Just for testing')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          supertestWithJest(err, res, done, () => {
            expect(res.body.title).toBe('TestBookList');
            expect(res.body.description).toBe('Just for testing');
            expect(res.body.username).toBe('test');
          });
        });
    });
  });

  it('GET /api/booklists/slug/testgame Get Test booklist by slug', (done) => {
    request
      .get('/api/booklists/slug/testbooklist')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        supertestWithJest(err, res, done, () => {
          expect(res.body.title).toBe('TestBookList');
          expect(res.body.description).toBe('Just for testing');
          expect(res.body.username).toBe('test');
        });
      });
  });

  it('GET /api/booklists/{test id} Get Test booklist by id', (done) => {
    request
      .get('/api/booklists/slug/testbooklist')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        // edit book
        request
          .get(`/api/booklists/${res.body._id}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((error, response) => {
            supertestWithJest(error, response, done, () => {
              expect(res.body.title).toBe('TestBookList');
              expect(res.body.description).toBe('Just for testing');
              expect(res.body.username).toBe('test');
            });
            return false;
          });
      });
  });

  it('POST /api/booklists/like/{test id} Like Test booklist', (done) => {
    // get Test book id by slug
    request
      .get('/api/booklists/slug/testbooklist')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        getToken().then((token) => {
          // edit book
          request
            .post(`/api/booklists/like/${res.body._id}`)
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, response) => {
              supertestWithJest(error, response, done, () => {
                expect(response.body.likes).toHaveLength(1);
              });
            });
        });
      });
  });

  it('POST /api/booklists/unlike/{test id} Unlike Test booklist', (done) => {
    // get Test book id by slug
    request
      .get('/api/booklists/slug/testbooklist')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        getToken().then((token) => {
          // edit book
          request
            .post(`/api/booklists/unlike/${res.body._id}`)
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, response) => {
              supertestWithJest(error, response, done, () => {
                expect(response.body.likes).toHaveLength(0);
              });
            });
        });
      });
  });

  it('POST /api/booklists/{test id} Edit Test booklist', (done) => {
    // get Test book id by slug
    request
      .get('/api/booklists/slug/testbooklist')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        getToken().then((token) => {
          // edit book
          request
            .post(`/api/booklists/${res.body._id}`)
            .set('Authorization', token)
            .send('title=TestBookList2')
            .send('description=After modified')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, response) => {
              supertestWithJest(error, response, done, () => {
                expect(response.body.title).toBe('TestBookList2');
                expect(response.body.description).toBe('After modified');
                expect(res.body.username).toBe('test');
              });
            });
          return false;
        });
      });
  });

  it('POST /api/booklists/book/{test id}/{testbook id} Add book to Test booklist', (done) => {
    // get Test book id by slug
    request
      .get('/api/booklists/slug/testbooklist')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((_, r) => {
        const booklistId = r.body._id;
        request
          .get('/api/books/slug/testgame')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            const bookId = res.body._id;
            getToken().then((token) => {
              // edit book
              request
                .post(`/api/booklists/book/${booklistId}/${bookId}`)
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((error, response) => {
                  supertestWithJest(error, response, done, () => {
                    expect(response.body.title).toBe('TestBookList2');
                    expect(response.body.description).toBe('After modified');
                    expect(response.body.username).toBe('test');
                    expect(response.body.books).toHaveLength(1);
                  });
                });
              return false;
            });
          });
      });
  });

  it('DELETE /api/booklists/{test id} Delete Test booklist', (done) => {
    // get Test book id by slug
    request
      .get('/api/booklists/slug/testbooklist')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        getToken().then((token) => {
          // edit book
          request
            .delete(`/api/booklists/${res.body._id}`)
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
