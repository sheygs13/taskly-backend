require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
        try {
                await mongoose.connect(`${process.env.DB_CONN_URL}`, {
                        useNewUrlParser: true,
                });
        } catch ({ message }) {
                console.error(message);
        }
})();
