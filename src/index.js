require("./db/db");
const express = require("express");
const userRoute = require("./routes/user.route");
const taskRoute = require("./routes/task.route");

const app = express();
const port = process.env.PORT || 3000;

// parse request body
app.use(express.json());

app.use("/api/v1", userRoute);
app.use("/api/v1/tasks", taskRoute);

app.listen(port, () => console.log(`Server listening on port ${port}...`));
