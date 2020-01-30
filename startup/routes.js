const contactsRouter = require('../components/contacts').Router;
const errorHandler = require('../middlewares/errorHandlerMiddleware');

module.exports = app => {
  app.use('/api/contacts', contactsRouter);
  app.use(errorHandler.catch404Errors);
  app.use(errorHandler.handleUnexpectedErrors);
};
