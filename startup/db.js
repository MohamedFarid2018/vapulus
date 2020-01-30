const mongoose = require("mongoose");
const config = require("config");

const { logger } = require("./logging");

mongoose.Promise = Promise;

module.exports = {
  connect: () => {
    const db = config.get("db");

    mongoose.connect(
      db,
      { useNewUrlParser: true },
      err => {
        if (err) {
          throw err;
        }
        logger.info(`Connected to ${db}...`);
      }
    );
  }
};
