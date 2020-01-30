require('colors');
const { logger } = require('../startup/logging');

module.exports = (req, res, next) => {
  logger.info(
    `             hasAccessTokenInHeaders: ${!!req.headers
      .access_token}, hasAccessTokenInBody: ${!!req.body
      .access_token}, hasAccessTokenInQuery: ${!!req.query
      .access_token},      headers: ${JSON.stringify(req.headers)}`.blue
  );
  return next();
};
