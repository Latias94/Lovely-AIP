const { clearHash } = require('../config/cache');

// Clean caching data which is related to user id
module.exports = async (req, res, next) => {
  await next();
  clearHash(req.user.id);
};
