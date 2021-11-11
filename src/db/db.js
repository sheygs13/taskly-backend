const mongoose = require("mongoose");
const { isEmail } = require("validator/validator");

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
            required: true,
            trim: true,
      },
      age: {
            type: Number,
            default: 1,
            validate(val) {
                  if (val < 0) {
                        throw new Error("Age can only be positive");
                  }
            },
      },
      email: {
            type: String,
            trim: true,
            validate(val) {
                  if (!isEmail(val)) {
                        throw new Error("Invalid email");
                  }
            },
      },

      password: {
            type: String,
            trim: true,
            required: true,
            minLength: 6,
            validate(pwd) {
                  if (pwd.includes("password")) {
                        throw new Error("Not an allowed password");
                  }
            },
      },
});

function createUser(name, age, email) {
      const user = new User({ name, age, email });
      user.save()
            .then((result) => {
                  console.log(result);
            })
            .catch(({ message }) => {
                  console.error(message);
            });
}

// createUser("Olufunmbi Adeosun", 25, "funmbi.Adeosun@gmail.com");

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

function createTask(description, completed) {
      const task = new Task({
            description,
            completed,
      });
      task.save()
            .then((result) => {
                  console.log(result);
            })
            .catch(({ message }) => {
                  console.log(message);
            });
}

// createTask("Fix issues on single-max-advance", false);
