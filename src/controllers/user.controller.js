const User = require("../models/user");
const { ObjectId } = require("mongoose").Types;

const createUser = async (req, res) => {
      const { name, age, email, password } = req.body;
      const user = new User({ name, age, email, password });
      try {
            await user.save();
            res.status(201).json({
                  data: {
                        user,
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
const getAllUsers = async (req, res) => {
      try {
            const users = await User.find({});
            if (!users.length)
                  return res.status(200).json({
                        data: {
                              users,
                              message: "No record exist at the moment.",
                        },
                        status: "success",
                  });

            res.status(200).json({
                  data: {
                        users,
                        message: "Successfully spooled all users record.",
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
                  error: "Input fields required for update.",
                  status: "fail",
            });

      const clientUpdates = Object.keys(req.body);

      const allowedUpdates = ["email", "password"];

      const isValid = clientUpdates.every((update) => allowedUpdates.includes(update));

      try {
            const user = await User.findByIdAndUpdate(_id, req.body, {
                  new: true,
                  runValidators: true,
            });

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
      getSingleUser,
      getAllUsers,
      updateUser,
      deleteUser,
};

module.exports = UserController;
