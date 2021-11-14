const mongoose = require("mongoose");

const BASE_URL = "mongodb://127.0.0.1:27017";

const DB_NAME = "taskly-api";

(async () => {
      const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
      };
      try {
            await mongoose.connect(`${BASE_URL}/${DB_NAME}`, options);
      } catch ({ message }) {
            console.log(message);
      }
})();
