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

const handleResponse = (
      req,
      res,
      statusCode = 200,
      data = { user: {}, message: "" },
      error = "",
      status = "success"
) => {
      const successCodes = [200, 201, 204];
      successCodes.includes(statusCode)
            ? res.status(statusCode).json({
                    data: {
                          user,
                          message,
                    },
                    status,
              })
            : res.status(statusCode).json({
                    error,
                    status,
              });
};

module.exports = {
      getPublicProfile,

      allowedUpdates,

      updateProfile,
};
