const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

// Redis Client, for data caching
const client = redis.createClient({
  host: require('../config/keys').redisURI,
  port: require('../config/keys').redisPort,
  auth_pass: require('../config/keys').redisPwd,
});

// Add promise feature to client.hget
client.hget = util.promisify(client.hget);
const { exec } = mongoose.Query.prototype;
const underTestEnv = process.env.NODE_ENV === 'test';

// Add hook to mongoose Query, provide a new method for caching data easily
// Book.find().cache().then()...Caching data of this query
mongoose.Query.prototype.cache = function (options = {}) {
  // do not use caching when the app is under test env
  if (!underTestEnv) {
    this.useCache = true;
  }
  this.hashKey = JSON.stringify(options.key || '');
  return this;
};

// add hook to exec function, this function will be call after query
// caching data according to the flag which set in cache function
mongoose.Query.prototype.exec = async function (...args) {
  // If don't use cache, don't do anything to query
  if (!this.useCache) {
    return exec.apply(this, args);
  }
  // Generate unique key from query condition
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      // add collection name to specify condition
      collection: this.collection.name,
    })
  );

  // See if we have a value for 'key' in redis
  const cacheValue = await client.hget(this.hashKey, key);
  // if we do, return that
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }
  // Otherwise, issue the query and store the result in redis
  const result = await exec.apply(this, args);
  client.hset(this.hashKey, key, JSON.stringify(result));
  client.expire(this.hashKey, 10); // 10 => clean cache after 10 seconds
  // console.log(`expire: ${client.ttl(this.hashKey)}`);

  return result;
};

module.exports = {
  client,
  // Delete item according to hash Key
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
  // Delete everything in Redis
  clearAll() {
    client.flushdb((_, succeed) => console.log(`delete all cache: ${succeed}`));
  }
};
