const User = require('../models/User');

// find out whether current user is staff
async function isStaff(req) {
  const user = await User.findOne({ _id: req.user.id })
    .cache({ key: req.user.id });
  if (user) {
    return user.isStaff;
  }
  return false;
}

module.exports = isStaff;
