const User = require("../models/user");

const Helpers = require("../utils/helpers");

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
                        user: Helpers.getPublicProfile(user),
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

const logInUser = async (req, res) => {
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
                        user: Helpers.getPublicProfile(user),
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

// logout from individual session
const logOutUser = async (req, res) => {
      try {
            // delete the session token from the tokens array
            req.user.tokens = req.user.tokens.filter(
                  (tokenObj) => tokenObj.token !== req.token
            );
            await req.user.save();
            res.status(200).json({
                  message: "Successfully logged out.",
                  status: "success",
            });
      } catch ({ message }) {
            res.status(500).json({ error: message, status: "fail" });
            return;
      }
};

// logout from all sessions
const logOutUserAll = async (req, res) => {
      try {
            req.user.tokens = [];
            await req.user.save();
            res.status(200).json({
                  message: "Successfully logged out from all sessions",
                  status: "success",
            });
      } catch ({ message }) {
            res.status(500).json({ error: message, status: "fail" });
            return;
      }
};

const getUserProfile = async (req, res) => {
      try {
            res.status(200).json({
                  data: {
                        user: Helpers.getPublicProfile(req.user),
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

const updateUserProfile = async (req, res) => {
      try {
            if (!Object.keys(req.body).length)
                  return res.status(400).json({
                        error: "Input fields are required.",
                        status: "fail",
                  });

            if (!Helpers.allowedUpdates(req.body))
                  return res.status(400).json({
                        error: "Invalid update.",
                        status: "fail",
                  });

            Helpers.updateProfile(req.user, req.body);

            await req.user.save();

            res.status(200).json({
                  data: {
                        user: Helpers.getPublicProfile(req.user),
                        message: "User profile successfully updated",
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

const deleteUserProfile = async (req, res) => {
      try {
            await User.findByIdAndDelete(req.user._id);

            res.status(204).json({
                  message: "User profile has successfully been deleted",
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
      logInUser,
      logOutUser,
      logOutUserAll,
      getUserProfile,
      updateUserProfile,
      deleteUserProfile,
};

module.exports = UserController;
