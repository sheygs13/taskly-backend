const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleWare = async (req, res, next) => {
      const authHeader = req.header("Authorization");

      if (typeof authHeader === "undefined") {
            return res.status(401).json({
                  error: "Unauthorized - Headers not set.",
                  status: "fail",
            });
      }
      const token = authHeader.split(" ")[1];

      if (!token)
            return res.status(401).json({
                  error: "Unauthorized. Provide a token",
                  status: "fail",
            });

      try {
            const decoded = jwt.verify(token, "trojan");
            // ensure that the user id and token exists
            const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
            req.user = user;
            next();
      } catch ({ message }) {
            res.status(400).json({ error: message, status: "fail" });
            return;
      }
};

module.exports = authMiddleWare;
