const Task = require("../models/task");

const { ObjectId } = require("mongoose").Types;

const createTask = async (req, res) => {
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
};
const getSingleTask = async (req, res) => {
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
};
const getAllTasks = async (req, res) => {
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
};
const updateTask = async (req, res) => {
      const { id: _id } = req.params;

      if (!ObjectId.isValid(_id))
            return res.status(400).json({
                  error: "Provide a valid ID",
                  status: "fail",
            });

      const clientUpdates = Object.keys(req.body);
      const allowedUpdates = ["description", "completed"];

      const isValidOperation = clientUpdates.every((update) =>
            allowedUpdates.includes(update)
      );

      if (!isValidOperation)
            return res.status(400).json({
                  error: "Invalid update.",
                  status: "fail",
            });

      try {
            const task = await Task.findById(_id);

            if (!task)
                  return res.status(404).json({
                        error: "Task with the given ID does not eixst",
                        status: "fail",
                  });

            if (!Object.keys(req.body).length)
                  return res.status(400).json({
                        error: "Input field(s) is/are required",
                        status: "fail",
                  });

            // update
            clientUpdates.forEach((update) => (task[update] = req.body[update]));

            await task.save();

            res.status(200).json({
                  data: {
                        task,
                        message: "Task details successfully updated",
                  },
                  status: "success",
            });
      } catch ({ message }) {
            return res.status(400).json({
                  error: message,
                  status: "fail",
            });
      }
};
const deleteTask = async (req, res) => {
      const { id: _id } = req.params;

      if (!ObjectId.isValid(_id))
            return res.status(400).json({ error: "Provide a valid ID", status: "fail" });
      try {
            const task = await Task.findByIdAndDelete(_id);
            if (!task)
                  return res.status(404).json({
                        error: "Task with the given ID does not exist",
                        status: "fail",
                  });
            res.status(204).json({
                  message: "Task record successfully deleted",
                  status: "success",
            });
      } catch ({ message }) {
            res.status(400).json({ error: message, status: "fail" });
            return;
      }
};

const TaskController = {
      createTask,
      getSingleTask,
      getAllTasks,
      updateTask,
      deleteTask,
};

module.exports = TaskController;
