const {
  connectTestDB,
} = require('../utils/testHelper');
const mongoose = require('mongoose');


describe('db tests', () => {
  it('should pass this canary test', () => {
    expect(true)
      .toBeTruthy();
  });

  it('get should return null connection by default', () => {
    expect(mongoose.connection.readyState)
      .toBe(0);
  });

  it('close should close existing connection', (done) => {
    const callback = (err) => {
      expect(err)
        .toBeNull();
      mongoose.connection.close();
      expect(mongoose.connection.readyState)
        .toBe(0);
      done();
    };
    connectTestDB(callback);
  });

  it('connect should set connection given valid database name',
    (done) => {
      const callback = (err) => {
        expect(err)
          .toBeNull();
        expect(mongoose.connection.name)
          .toBe('lovely-aip-test');
        mongoose.connection.close();
        done();
      };

      connectTestDB(callback);
    });
});
