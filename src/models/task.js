const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
      description: {
            type: String,
            trim: true,
            required: true,
            validate(val) {
                  if (val.length < 3 || val.length > 40) {
                        throw new Error(
                              "Description is lower than the required length or exceeds the maximum allowed length"
                        );
                  }
            },
      },
      completed: {
            type: Boolean,
            default: false,
      },
});

module.exports = Task;
