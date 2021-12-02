require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
        try {
                await mongoose.connect(`${process.env.DB_BASE_URL}/${process.env.DB_NAME}`, {
                        useNewUrlParser: true,
                });
        } catch ({ message }) {
                console.error(message);
        }
})();
