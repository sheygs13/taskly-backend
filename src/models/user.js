const mongoose = require("mongoose");
const { isEmail } = require("validator/validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true,
            trim: true,
            validate(name) {
                  if (!/^[a-z]{3,}[\s][a-z]{3,}$/i.test(name)) {
                        throw new Error("Format: firstname lastname");
                  }
            },
      },

      email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
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
            maxLength: 30,
            validate(pwd) {
                  if (pwd.includes("password")) {
                        throw new Error("Not an allowed password");
                  }
            },
      },
});

userSchema.statics.verifyEmailPassword = async (email, password) => {
      const user = await User.findOne({ email });
      if (!user) {
            throw new Error("Invalid Email");
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
            throw new Error("Invalid Password");
      }
      return user;
};

userSchema.pre("save", async function (next) {
      // only hash the password if it's been modified
      if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 8);
      }
      // this refers to the document
      // console.log("this", this);
      next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
