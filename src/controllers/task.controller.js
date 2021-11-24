const Task = require("../models/task");
const { ObjectId } = require("mongoose").Types;
const Helpers = require("../helpers/helpers");

const createTask = async (req, res) => {
      const { description, completed } = req.body;
      const { _id } = req.user;

      const task = new Task({ description, completed, author: _id });
      try {
            await task.save();

            Helpers.handleSuccessResponse(res, 201, {
                  task,
                  message: "Task created.",
            });
      } catch ({ message }) {
            return Helpers.handleErrorResponse(res, 400, message);
      }
};
const getSingleTask = async (req, res) => {
      const { id: _id } = req.params;
      const { _id: authorId } = req.user;

      if (!ObjectId.isValid(_id))
            return Helpers.handleErrorResponse(res, 400, "Provide a valid Id.");

      try {
            const task = await Task.findOne({ _id, author: authorId });

            if (!task) return Helpers.handleErrorResponse(res, 404, "No record exist.");

            Helpers.handleSuccessResponse(res, 200, {
                  task,
                  message: "Task details retrieved.",
            });
      } catch ({ message }) {
            return Helpers.handleErrorResponse(res, 500, message);
      }
};

// GET/ api/v1/tasks?completed=true
// GET/ api/v1/tasks?limit=10&skip=2
const getAllTasks = async (req, res) => {
      const { _id } = req.user;

      const { completed, limit: Limit, skip: Skip } = req.query;

      try {
            const tasks = await Task.find(
                  {
                        author: _id,
                        ...(completed && { completed }),
                  },
                  null,
                  { limit: +Limit, skip: +Skip }
            );

            if (!tasks.length)
                  return Helpers.handleSuccessResponse(res, 200, {
                        tasks,
                        message: "No record exist for the moment.",
                  });

            return Helpers.handleSuccessResponse(res, 200, {
                  tasks,
                  message: Helpers.message(tasks),
            });
      } catch ({ message }) {
            return Helpers.handleErrorResponse(res, 500, message);
      }
};
const updateTask = async (req, res) => {
      const { id: _id } = req.params;
      const { _id: authorId } = req.user;

      if (!ObjectId.isValid(_id))
            return Helpers.handleErrorResponse(res, 400, "Provide a valid Id.");

      try {
            const task = await Task.findOne({ _id, author: authorId });

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

            Helpers.handleSuccessResponse(res, 200, {
                  task,
                  message: "Task updated successfully.",
            });
      } catch ({ message }) {
            return Helpers.handleErrorResponse(res, 400, message);
      }
};
const deleteTask = async (req, res) => {
      const { id: _id } = req.params;
      const { _id: authorId } = req.user;

      if (!ObjectId.isValid(_id))
            return Helpers.handleErrorResponse(res, 400, "Provide a valid Id.");
      try {
            const task = await Task.findOneAndDelete({ _id, author: authorId });

            if (!task) return Helpers.handleErrorResponse(res, 404, "Task not found.");

            Helpers.handleSuccessResponse(res, 204, {});
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
