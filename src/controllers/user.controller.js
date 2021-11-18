const User = require("../models/user");
const { ObjectId } = require("mongoose").Types;

const createUser = async (req, res) => {
      const { name, email, password } = req.body;
      // check if the email exist
      // if it does not, create the user
      const user = new User({ name, email, password });
      try {
            await user.save();
            const token = await user.generateAuthToken();
            res.status(201).json({
                  data: {
                        user,
                        token,
                        message: "User account successfully created",
                  },
                  status: "success",
            });
      } catch ({ message }) {
            return res.status(400).json({
                  error: message,
                  status: "fail",
            });
      }
};

const loginUser = async (req, res) => {
      const { email, password } = req.body;
      // if the email does not exist, flag the user
      // if the password does not match the db password, flag the user

      try {
            const user = await User.verifyEmailPassword(email, password);

            if (!user)
                  return res.status(400).json({
                        error: "Unable to login user",
                        status: "fail",
                  });
            const token = await user.generateAuthToken();
            res.status(200).json({
                  data: {
                        user,
                        token,
                        message: "User successfully logged in.",
                  },
                  status: "success",
            });
      } catch ({ message }) {
            res.status(400).json({
                  error: message,
                  status: "fail",
            });
      }
};

const getSingleUser = async (req, res) => {
      const { id: _id } = req.params;

      if (!ObjectId.isValid(_id))
            return res.status(400).json({
                  error: "Provide a valid ID.",
                  status: "fail",
            });

      try {
            const user = await User.findOne({ _id });
            if (!user)
                  return res.status(404).json({
                        user,
                        error: "User with the given ID does not exist.",
                        status: "fail",
                  });

            res.status(200).json({
                  data: {
                        user,
                        message: "Successfully found record that matches user.",
                  },
                  status: "success",
            });
      } catch ({ message }) {
            res.status(500).json({
                  error: message,
                  status: "fail",
            });
      }
};
const getUserProfile = async (req, res) => {
      try {
            res.status(200).json({
                  data: {
                        user: req.user,
                        message: "Successfully spooled my profile.",
                  },
                  status: "success",
            });
      } catch ({ message }) {
            res.status(500).json({
                  error: message,
                  status: "fail",
            });
      }
};
const updateUser = async (req, res) => {
      const { id: _id } = req.params;

      if (!ObjectId.isValid(_id))
            return res.status(400).json({
                  error: "Provide a valid ID.",
                  status: "fail",
            });

      if (!Object.keys(req.body).length)
            return res.status(400).json({
                  error: "Input fields are required.",
                  status: "fail",
            });

      const clientUpdates = Object.keys(req.body);

      const allowedUpdates = ["email", "password"];

      const isValid = clientUpdates.every((update) => allowedUpdates.includes(update));

      try {
            const user = await User.findById(_id);

            if (!user)
                  return res.status(404).json({
                        user,
                        error: "User with the given ID does not exist.",
                        status: "fail",
                  });

            if (!isValid)
                  return res.status(400).json({
                        error: "Invalid update.",
                        status: "fail",
                  });

            for (const update of clientUpdates) {
                  user[update] = req.body[update];
            }

            await user.save();

            res.status(200).json({
                  data: {
                        user,
                        message: "User details successfully updated",
                  },
                  status: "success",
            });
      } catch ({ message }) {
            return res.status(400).json({
                  error: message,
                  status: "fail",
            });
      }
};
const deleteUser = async (req, res) => {
      const { id: _id } = req.params;

      if (!ObjectId.isValid(_id))
            return res.status(400).json({ error: "Provide a valid ID", status: "fail" });

      try {
            const user = await User.findByIdAndDelete(_id);
            if (!user)
                  return res.status(404).json({
                        error: "User with the given ID does not exist",
                        status: "fail",
                  });
            res.status(204).json({
                  message: "User record successfully deleted",
                  status: "success",
            });
      } catch ({ message }) {
            res.status(400).json({
                  error: message,
                  status: "fail",
            });
            return;
      }
};

const UserController = {
      createUser,
      loginUser,
      getSingleUser,
      getUserProfile,
      updateUser,
      deleteUser,
};

module.exports = UserController;
