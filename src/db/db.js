const mongoose = require("mongoose");

const BASE_URL = "mongodb://127.0.0.1:27017";

const DB_NAME = "taskly-api";

(() => {
      const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
      };
      mongoose
            .connect(`${BASE_URL}/${DB_NAME}`, options)
            .then((result) => {
                  console.log(result);
            })
            .catch(({ message }) => {
                  console.error(message);
            });
})();

const Task = mongoose.model("Task", {
      description: {
            type: String,
            required: true,
            trim: true,
      },
      completed: {
            type: Boolean,
            required: true,
            default: false,
      },
});
