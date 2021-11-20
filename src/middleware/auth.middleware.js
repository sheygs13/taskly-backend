const jwt = require("jsonwebtoken");
const Helpers = require("../helpers/helpers");
const User = require("../models/user");

const verifyAuthToken = async (req, res, next) => {
      const authHeader = req.header("Authorization");

      if (typeof authHeader === "undefined")
            return Helpers.handleErrorResponse(
                  res,
                  401,
                  "Unauthorized - Headers not set."
            );

      const token = authHeader.split(" ")[1];

      if (!token)
            return Helpers.handleErrorResponse(res, 401, "Unauthorized. Provide a token");

      try {
            const decoded = jwt.verify(token, "trojan");
            // ensure that the user id and token exists
            const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

            if (!user) {
                  throw new Error("Invalid Authentication.");
            }
            req.user = user;
            req.token = token;
            next();
      } catch ({ message }) {
            return Helpers.handleErrorResponse(res, 401, message);
      }
};

module.exports = verifyAuthToken;
