require('dotenv').config();
const mongoose = require('mongoose');

const Helpers = require('../helpers/helpers');

(async (req, res) => {
        const options = {
                useNewUrlParser: true,
        };
        try {
                await mongoose.connect(
                        `${process.env.DB_BASE_URL}/${process.env.DB_NAME}`,
                        options
                );
        } catch ({ message }) {
                return Helpers.handleErrorResponse(res, 500, message);
        }
})();
