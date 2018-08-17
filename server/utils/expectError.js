const { NOT_FOUND } = require('http-status-codes');

const { supertestWithJest } = require('./testHelper');

module.exports = (response, done, expectedStatusCode = NOT_FOUND) => {
  response
    .expect('Content-Type', /json/)
    .expect(expectedStatusCode)
    .end((err, res) => {
      supertestWithJest(err, res, done, () => {
        expect(err).toBeNull();
      });
    });
};
