const User = require("../models/user");
const Helpers = require("../helpers/helpers");

const createUser = async (req, res) => {
      const { name, email, password } = req.body;

      const user = new User({ name, email, password });

      try {
            await user.save();

            const token = await user.generateAuthToken();

            Helpers.handleSuccessResponse(res, 201, {
                  user: Helpers.getPublicProfile(user),
                  token,
                  message: "Successfully created",
            });
      } catch ({ message }) {
            Helpers.handleErrorResponse(res, 400, message);
            return;
      }
};

const logInUser = async (req, res) => {
      const { email, password } = req.body;
      // if the email does not exist, flag the user
      // if the password does not match the db password, flag the user

      try {
            const user = await User.verifyEmailPassword(email, password);

            if (!user)
                  return Helpers.handleErrorResponse(res, 400, "Unable to login user");

            const token = await user.generateAuthToken();

            Helpers.handleSuccessResponse(res, 200, {
                  user: Helpers.getPublicProfile(user),
                  token,
                  message: "Successfully logged in.",
            });
      } catch ({ message }) {
            Helpers.handleErrorResponse(res, 400, message);
            return;
      }
};

// logout from individual session
const logOutUser = async (req, res) => {
      try {
            // delete the session token from the tokens array
            req.user.tokens = Helpers.removeSessionTokens(req.user.tokens, req.token);

            await req.user.save();

            Helpers.handleSuccessResponse(res, 200, {
                  user: Helpers.getPublicProfile(req.user),
                  message: "Logged out successfully",
            });
      } catch ({ message }) {
            Helpers.handleErrorResponse(res, 500, message);
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
            Helpers.handleErrorResponse(res, 500, message);
            return;
      }
};

const getUserProfile = async (req, res) => {
      try {
            Helpers.handleSuccessResponse(res, 200, {
                  user: Helpers.getPublicProfile(req.user),
                  message: "Spooled successfully",
            });
      } catch ({ message }) {
            Helpers.handleErrorResponse(res, 500, message);
            return;
      }
};

const updateUserProfile = async (req, res) => {
      try {
            if (!Helpers.hasBody(req.body))
                  return Helpers.handleErrorResponse(
                        res,
                        400,
                        "Request fields are required"
                  );

            if ((!Helpers.allowedUpdates(req.body), "user"))
                  return Helpers.handleErrorResponse(res, 400, "Invalid update.");

            Helpers.updateRecord(req.user, req.body);

            await req.user.save();

            Helpers.handleSuccessResponse(res, 200, {
                  user: Helpers.getPublicProfile(req.user),
                  message: "Successfully updated",
            });
      } catch ({ message }) {
            return Helpers.handleErrorResponse(res, 500, message);
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
            return Helpers.handleErrorResponse(res, 400, message);
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
