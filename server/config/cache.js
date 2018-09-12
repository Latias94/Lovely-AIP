const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const client = redis.createClient({
  host: require('../config/keys').redisURI,
  port: require('../config/keys').redisPort,
  auth_pass: require('../config/keys').redisPwd,
});

client.hget = util.promisify(client.hget);
const { exec } = mongoose.Query.prototype;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');
  return this;
};

mongoose.Query.prototype.exec = async function (...args) {
  if (!this.useCache) {
    return exec.apply(this, args);
  }
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      // generate cache key
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
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  }
};
