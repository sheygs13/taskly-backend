const ALLOWED_USER_UPDATES = ["email", "password"];

const ALLOWED_TASK_UPDATES = ["description", "completed"];

const trimPublicProfile = ({ _id, email, name }) => ({ _id, email, name });

const handleUserUpdate = (update) => ALLOWED_USER_UPDATES.includes(update);

const handleTaskUpdate = (update) => ALLOWED_TASK_UPDATES.includes(update);

const allowedUpdates = (req = {}, updateType = "") => {
      const clientUpdates = Object.keys(req);

      let isValid = false;

      if (updateType === "user") {
            isValid = clientUpdates.every(handleUserUpdate);
      }
      if (updateType === "task") {
            isValid = clientUpdates.every(handleTaskUpdate);
      }

      return isValid;
};

const updateRecord = (item = {}, bodyReq = {}) => {
      const clientUpdates = Object.keys(bodyReq);
      for (const update of clientUpdates) {
            item[update] = bodyReq[update];
      }
};

const removeSessionTokens = (tokens = [], reqToken = "") =>
      tokens.filter((tokenObj) => tokenObj.token !== reqToken);

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
      trimPublicProfile,

      handleErrorResponse,

      handleSuccessResponse,

      allowedUpdates,

      updateRecord,

      removeSessionTokens,

      hasBody,
};
