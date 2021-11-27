const Helpers = require("../helpers/helpers");

module.exports = (error, req, res, next) => {
      if (error) return Helpers.handleErrorResponse(res, 400, error.message);
      next();
};
