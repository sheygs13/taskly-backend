const mongoose = require('mongoose');
const { isEmail } = require('validator/validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const Task = require("./task");

const userSchema = new mongoose.Schema(
        {
                name: {
                        type: String,
                        required: true,
                        trim: true,
                        validate(name) {
                                if (!/^[a-z]{3,}[\s][a-z]{3,}$/i.test(name)) {
                                        throw new Error('Format: firstname lastname');
                                }
                        },
                },

                email: {
                        type: String,
                        trim: true,
                        unique: true,
                        required: true,
                        validate(val) {
                                if (!isEmail(val)) {
                                        throw new Error('Invalid email');
                                }
                        },
                },
                // extra validation
                password: {
                        type: String,
                        trim: true,
                        required: true,
                        minLength: 6,
                        maxLength: 255,
                        validate(pwd) {
                                if (pwd.length < 6 || pwd.length > 255) {
                                        throw new Error('Password not within range');
                                }
                        },
                },

                tokens: [
                        {
                                token: {
                                        type: String,
                                        required: true,
                                },
                        },
                ],

                avatar: {
                        type: Buffer,
                },
        },
        { timestamps: true }
);

userSchema.virtual('tasks', {
        ref: 'Task',
        localField: '_id',
        foreignField: 'author',
});

userSchema.statics.verifyEmailPassword = async (email, password) => {
        try {
                const user = await User.findOne({ email });
                if (!user) {
                        throw new Error('Invalid Email');
                }

                const validPassword = await bcrypt.compare(password, user.password);

                if (!validPassword) {
                        throw new Error('Invalid Password');
                }
                return user;
        } catch ({ message }) {
                throw new Error(message);
        }
};

userSchema.methods.generateAuthToken = async function () {
        try {
                // console.log("typeof", typeof this._id);
                // this - user;
                const token = jwt.sign({ _id: String(this._id) }, 'trojan', {
                        expiresIn: '1 hr',
                });

                this.tokens = [...this.tokens, { token }];

                await this.save();

                return token;
        } catch ({ message }) {
                throw new Error(message);
        }
};

// hash plain password before saving
userSchema.pre('save', async function (next) {
        // only hash the password if it's been modified
        if (this.isModified('password')) {
                this.password = await bcrypt.hash(this.password, 8);
        }
        // this refers to the document
        next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
