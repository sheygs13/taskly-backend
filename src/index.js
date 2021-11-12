require("./db/db");
const express = require("express");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
// parse body
app.use(express.json());

app.post("/api/v1/auth/users", (req, res) => {
      const { name, age, email, password } = req.body;
      const user = new User({ name, age, email, password });
      user.save()
            .then(() => {
                  res.status(201).json({
                        data: {
                              user,
                              message: "User account successfully created",
                        },
                        status: "success",
                  });
            })
            .catch(({ message }) => {
                  res.status(400).json({
                        error: message,
                        status: "fail",
                  });
            });
});

app.post("/api/v1/tasks", (req, res) => {
      const { description, completed } = req.body;
      if (!description) {
            res.status(400).json({
                  error: "description is required",
                  status: "fail",
            });
      }
      const task = new Task({ description, completed });
      task.save()
            .then(() => {
                  res.status(201).json({
                        data: {
                              task,
                              message: "Task successfully created",
                        },
                        status: "success",
                  });
            })
            .catch(({ message }) => {
                  res.status(400).json({
                        error: message,
                        status: "fail",
                  });
            });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on port ${port}...`));
