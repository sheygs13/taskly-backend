const mongoose = require("mongoose");
const { isEmail } = require("validator/validator");

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

module.exports = User;
