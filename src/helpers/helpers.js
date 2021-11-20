const getPublicProfile = ({ _id, email, name }) => ({ _id, email, name });

const allowedUpdates = (req = {}) => {
      const clientUpdates = Object.keys(req);

      const allowed = ["email", "password"];

      const isValid = clientUpdates.every((update) => allowed.includes(update));

      return isValid;
};

const updateProfile = (user = {}, req = {}) => {
      const clientUpdates = Object.keys(req);
      for (const update of clientUpdates) {
            user[update] = req[update];
      }
};

const removeSessionTokens = (tokens = [], reqToken = "") => {
      return tokens.filter((tokenObj) => tokenObj.token !== reqToken);
};

const handleSuccessResponse = (res, statusCode, data = {}) => {
      res.status(statusCode).json({
            status: "success",
            data,
      });
};


const handleErrorResponse = (res, statusCode, errorMessage = "") => {
      res.status(statusCode).json({
            error: errorMessage,
            status: "fail",
      });
};

const hasBody = (obj = {}) => Object.keys(obj).length;

module.exports = {
      getPublicProfile,

      handleErrorResponse,

      handleSuccessResponse,

      allowedUpdates,

      updateProfile,

      removeSessionTokens,

      hasBody,
};
