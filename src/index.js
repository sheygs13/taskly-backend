require('./db/db');

const _ = require('./middleware/maintenance.middleware');

const express = require('express');

const userRoute = require('./routes/user.route');

const taskRoute = require('./routes/task.route');

const app = express();

const port = process.env.PORT || 3000;

// app.use('/', _);

// parse request body
app.use(express.json());

app.use('/api/v1/auth/users', userRoute);

app.use('/api/v1/tasks', taskRoute);

app.listen(port, () => console.log(`Server listening on port ${port}...`));
