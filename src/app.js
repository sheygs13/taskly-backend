require('./db/db');

require('dotenv').config();

// const _ = require('./middleware/maintenance');

const express = require('express');

const userRoute = require('./routes/user.route');

const taskRoute = require('./routes/task.route');

const Helpers = require('./helpers/helpers');

const app = express();

// app.use('/', _);

// parse request body
app.use(express.json());

app.use('/api/v1/auth/users', userRoute);

app.use('/api/v1/tasks', taskRoute);

// base path
app.get('/', (req, res) => {
        Helpers.handleSuccessResponse(res, 200, { message: 'Taskly service here for you!' });
});

// non-existent patch
app.all('*', (req, res, next) => {
        next(
                Helpers.handleErrorResponse(
                        res,
                        404,
                        `Unable to find requested route ${req.originalUrl} on this server.`
                )
        );
});

module.exports = app;
