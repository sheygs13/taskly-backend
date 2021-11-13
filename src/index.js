require("./db/db");
const express = require("express");
const User = require("./models/user");
const Task = require("./models/task");
const { ObjectId } = require("mongoose").Types;

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

app.get("/api/v1/users", (req, res) => {
      User.find({})
            .then((users) => {
                  users.length
                        ? res.status(200).json({
                                data: {
                                      users,
                                      message: "Successfully spooled all users record",
                                },
                                status: "success",
                          })
                        : res.status(200).json({
                                data: {
                                      users,
                                      message: "No record exist at the moment",
                                },
                                status: "success",
                          });
            })
            .catch(({ message }) => {
                  res.status(500).json({
                        error: message,
                        status: "fail",
                  });
            });
});

app.get("/api/v1/users/:id", (req, res) => {
      const { id: _id } = req.params;

      if (!ObjectId.isValid(_id)) {
            return res.status(400).json({
                  error: "Provide a valid ID.",
                  status: "fail",
            });
      }
      User.findOne({ _id })
            .then((user) => {
                  user
                        ? res.status(200).json({
                                data: {
                                      user,
                                      message: "Successfully found record that matches user.",
                                },
                                status: "success",
                          })
                        : res.status(404).json({
                                user: {},
                                error: "User with the given ID does not exist.",
                                status: "fail",
                          });
            })
            .catch(({ message }) => {
                  res.status(500).json({
                        error: message,
                        status: "fail",
                  });
            });
});

app.post("/api/v1/tasks", (req, res) => {
      const { description, completed } = req.body;
      if (!description) {
            return res.status(400).json({
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

app.get("/api/v1/tasks", (req, res) => {
      Task.find({})
            .then((tasks) => {
                  tasks.length
                        ? res.status(200).json({
                                data: {
                                      tasks,
                                      message: "Successfully spooled all tasks",
                                },
                                status: "success",
                          })
                        : res.status(200).json({
                                data: {
                                      tasks,
                                      message: "No record exist at the moment.",
                                },
                          });
            })
            .catch(({ message }) => {
                  res.status(500).json({
                        error: message,
                        status: "fail",
                  });
            });
});

app.get("/api/v1/tasks/:id", (req, res) => {
      const { id: _id } = req.params;

      if (!ObjectId.isValid(_id)) {
            return res.status(400).json({
                  error: "Provide a valid ID",
                  status: "fail",
            });
      }

      Task.findOne({ _id })
            .then((task) => {
                  if (!task) {
                        return res.status(404).json({
                              error: "No record exist for the provided task ID",
                              status: "fail",
                        });
                  }
                  res.status(200).json({
                        task,
                        message: "Successfully found record that matches task",
                        status: "success",
                  });
            })
            .catch(({ message }) => {
                  res.status(500).json({
                        error: message,
                        status: "fail",
                  });
            });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on port ${port}...`));
