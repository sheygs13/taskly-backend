require("./db/db");
const express = require("express");
const User = require("./models/user");
const Task = require("./models/task");
const { ObjectId } = require("mongoose").Types;

const app = express();
// parse body
app.use(express.json());

app.post("/api/v1/auth/users", async (req, res) => {
      const { name, age, email, password } = req.body;
      const user = new User({ name, age, email, password });
      try {
            await user.save();
            res.status(201).json({
                  data: {
                        user,
                        message: "User account successfully created",
                  },
                  status: "success",
            });
      } catch ({ message }) {
            return res.status(400).json({
                  error: message,
                  status: "fail",
            });
      }
});

app.get("/api/v1/users", async (req, res) => {
      try {
            const users = await User.find({});
            if (!users.length)
                  return res.status(200).json({
                        data: {
                              users,
                              message: "No record exist at the moment.",
                        },
                        status: "success",
                  });

            res.status(200).json({
                  data: {
                        users,
                        message: "Successfully spooled all users record.",
                  },
                  status: "success",
            });
      } catch ({ message }) {
            res.status(500).json({
                  error: message,
                  status: "fail",
            });
      }
});

app.get("/api/v1/users/:id", async (req, res) => {
      const { id: _id } = req.params;

      if (!ObjectId.isValid(_id))
            return res.status(400).json({
                  error: "Provide a valid ID.",
                  status: "fail",
            });

      try {
            const user = await User.findOne({ _id });
            if (!user)
                  return res.status(404).json({
                        user,
                        error: "User with the given ID does not exist.",
                        status: "fail",
                  });

            res.status(200).json({
                  data: {
                        user,
                        message: "Successfully found record that matches user.",
                  },
                  status: "success",
            });
      } catch ({ message }) {
            res.status(500).json({
                  error: message,
                  status: "fail",
            });
      }
});

app.patch("/api/v1/users/:id", async (req, res) => {
      const { id: _id } = req.params;

      if (!ObjectId.isValid(_id))
            return res.status(400).json({
                  error: "Provide a valid ID.",
                  status: "fail",
            });

      if (!Object.keys(req.body).length)
            return res.status(400).json({
                  error: "Input fields required for update.",
                  status: "fail",
            });

      const clientUpdates = Object.keys(req.body);

      const allowedUpdates = ["email", "password"];

      const isValid = clientUpdates.every((update) => allowedUpdates.includes(update));

      try {
            const user = await User.findByIdAndUpdate(_id, req.body, {
                  new: true,
                  runValidators: true,
            });

            if (!user)
                  return res.status(404).json({
                        user,
                        error: "User with the given ID does not exist.",
                        status: "fail",
                  });

            if (!isValid)
                  return res.status(400).json({
                        error: "Update not allowed for this field.",
                        status: "fail",
                  });

            res.status(200).json({
                  data: {
                        user,
                        message: "User details successfully updated",
                  },
                  status: "success",
            });
      } catch ({ message }) {
            return res.status(400).json({
                  error: message,
                  status: "fail",
            });
      }
});

app.post("/api/v1/tasks", async (req, res) => {
      const { description, completed } = req.body;

      const task = new Task({ description, completed });
      try {
            await task.save();
            res.status(201).json({
                  data: {
                        task,
                        message: "Task successfully created",
                  },
                  status: "success",
            });
      } catch ({ message }) {
            res.status(400).json({
                  error: message,
                  status: "fail",
            });
      }
});

app.get("/api/v1/tasks", async (req, res) => {
      try {
            const tasks = await Task.find({});
            if (!tasks.length)
                  return res.status(200).json({
                        data: {
                              tasks,
                              message: "No record exist at the moment.",
                        },
                        status: "success",
                  });

            res.status(200).json({
                  data: {
                        tasks,
                        message: "Successfully spooled all tasks",
                  },
                  status: "success",
            });
      } catch ({ message }) {
            res.status(500).json({
                  error: message,
                  status: "fail",
            });
      }
});

app.get("/api/v1/tasks/:id", async (req, res) => {
      const { id: _id } = req.params;

      if (!ObjectId.isValid(_id))
            return res.status(400).json({
                  error: "Provide a valid ID",
                  status: "fail",
            });

      try {
            const task = await Task.findOne({ _id });
            if (!task)
                  return res.status(404).json({
                        error: "No record exist for the requested ID",
                        status: "fail",
                  });
            res.status(200).json({
                  task,
                  message: "Successfully found record that matches task.",
            });
      } catch ({ message }) {
            res.status(500).json({
                  error: message,
                  status: "fail",
            });
            return;
      }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening on port ${port}...`));
