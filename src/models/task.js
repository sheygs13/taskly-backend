const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
        {
                author: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                        ref: 'User',
                },

                description: {
                        type: String,
                        trim: true,
                        required: true,
                        validate(val) {
                                if (val.length < 3 || val.length > 40) {
                                        throw new Error(
                                                'Lower than the minimum allowed length(3)|exceeds the maximum allowed length(40)'
                                        );
                                }
                        },
                },
                completed: {
                        type: Boolean,
                        default: false,
                },
        },
        { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
