const users = require('../config/users');

const isAuthorized = async (req, res, next) => {
  try {
    req.user = {};
    const { body } = req;
    const checkUser = users.filter(user => (user.authorization === body.authorization && user.deviceToken === body.deviceToken && user.fingerPrint === body.fingerPrint));
    if (checkUser[0]) {
      req.user.userId = checkUser[0].userId;
      return next();
    }
    return res.status(403).json({ message: 'unAuthorized to access this api ' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

module.exports = isAuthorized;
