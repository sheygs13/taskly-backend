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

const User = mongoose.model("User", {
      name: {
            type: String,
      },
      age: {
            type: Number,
      },
});

function createUser(name, age) {
      const user = new User({ name, age });
      user.save()
            .then((result) => {
                  console.log(result);
            })
            .catch(({ message }) => {
                  console.error(message);
            });
}

createUser("John Doe", 30);
