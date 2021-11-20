const Task = require("../models/task");
const { ObjectId } = require("mongoose").Types;
const Helpers = require("../helpers/helpers");

const createTask = async (req, res) => {
      const { description, completed } = req.body;

      const task = new Task({ description, completed, author: req.user._id });
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
            return Helpers.handleErrorResponse(res, 400, message);
      }
};
const getSingleTask = async (req, res) => {
      const { id: _id } = req.params;

      if (!ObjectId.isValid(_id))
            return Helpers.handleErrorResponse(res, 400, "Provide a valid Id.");

      try {
            const task = await Task.findOne({ _id, author: req.user._id });
            if (!task) return Helpers.handleErrorResponse(res, 404, "No record exist.");
            res.status(200).json({
                  data: {
                        task,
                        message: "Successfully found record that matches task.",
                  },
                  status: "success",
            });
      } catch ({ message }) {
            return Helpers.handleErrorResponse(res, 500, message);
      }
};
const getAllTasks = async (req, res) => {
      try {
            const tasks = await Task.find({ author: req.user._id });
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
            return Helpers.handleErrorResponse(res, 500, message);
      }
};
const updateTask = async (req, res) => {
      const { id: _id } = req.params;

      if (!ObjectId.isValid(_id))
            return Helpers.handleErrorResponse(res, 400, "Provide a valid Id.");

      try {
            const task = await Task.findOne({ _id, author: req.user._id });

            if (!task) return Helpers.handleErrorResponse(res, 404, "Task not found.");

            if (!Helpers.hasBody(req.body))
                  return Helpers.handleErrorResponse(
                        res,
                        400,
                        "Request fields are required."
                  );

            if (!Helpers.allowedUpdates(req.body, "task"))
                  return Helpers.handleErrorResponse(res, 400, "Invalid update.");

            Helpers.updateRecord(task, req.body);

            await task.save();

            res.status(200).json({
                  data: {
                        task,
                        message: "Task details successfully updated",
                  },
                  status: "success",
            });
      } catch ({ message }) {
            return Helpers.handleErrorResponse(res, 400, message);
      }
};
const deleteTask = async (req, res) => {
      const { id: _id } = req.params;

      if (!ObjectId.isValid(_id))
            return Helpers.handleErrorResponse(res, 400, "Provide a valid Id.");
      try {
            const task = await Task.findOneAndDelete({ _id, author: req.user._id });

            if (!task) return Helpers.handleErrorResponse(res, 404, "Task not found.");

            res.status(204).json({
                  message: "Task record successfully deleted",
                  status: "success",
            });
      } catch ({ message }) {
            return Helpers.handleErrorResponse(res, 500, message);
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
