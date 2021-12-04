const Helpers = require('../helpers/helpers');
/**
 * @param  {} error
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
module.exports = (error, req, res, next) => {
        if (error) return Helpers.handleErrorResponse(res, 400, error.message);
        next();
};
