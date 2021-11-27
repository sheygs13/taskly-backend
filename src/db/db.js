const mongoose = require("mongoose");

const BASE_URL = "mongodb://127.0.0.1:27017";

const DB_NAME = "taskly-backend";

const Helpers = require("../helpers/helpers");

(async (req, res, next) => {
      const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
      };
      try {
            await mongoose.connect(`${BASE_URL}/${DB_NAME}`, options);
            next();
      } catch ({ message }) {
            return Helpers.handleErrorResponse(res, 500, message);
      }
})();
