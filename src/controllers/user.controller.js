const User = require('../models/user');
const Helpers = require('../helpers/helpers');
const Task = require('../models/task');
const sharp = require('sharp');
const { welcomeEmail, cancelationMail } = require('../service/email');

const createUser = async (req, res) => {
        const { name, email, password } = req.body;

        const user = new User({ name, email, password });

        try {
                await user.save();

                const token = await user.generateAuthToken();

                Helpers.handleSuccessResponse(res, 201, {
                        user: Helpers.trimPublicProfile(user),
                        token,
                        message: 'User account created.',
                });

                welcomeEmail(name, email);
        } catch ({ message }) {
                return Helpers.handleErrorResponse(res, 400, message);
        }
};

const logInUser = async (req, res) => {
        const { email, password } = req.body;

        try {
                const user = await User.verifyEmailPassword(email, password);

                if (!user)
                        return Helpers.handleErrorResponse(
                                res,
                                400,
                                'Email or Password is invalid.'
                        );

                const token = await user.generateAuthToken();

                Helpers.handleSuccessResponse(res, 200, {
                        user: Helpers.trimPublicProfile(user),
                        token,
                        message: 'Logged in successfully.',
                });
        } catch ({ message }) {
                return Helpers.handleErrorResponse(res, 400, message);
        }
};

// logout from individual session
const logOutUser = async (req, res) => {
        try {
                // delete the session token from the tokens array
                req.user.tokens = Helpers.removeSessionTokens(req.user.tokens, req.token);

                await req.user.save();

                Helpers.handleSuccessResponse(res, 200, {
                        user: Helpers.trimPublicProfile(req.user),
                        message: 'Logged out successfully.',
                });
        } catch ({ message }) {
                return Helpers.handleErrorResponse(res, 500, message);
        }
};

// logout from all sessions
const logOutUserAll = async (req, res) => {
        try {
                req.user.tokens = [];

                await req.user.save();

                Helpers.handleSuccessResponse(res, 200, {
                        user: req.user,
                        message: 'Logged out successfully from all sessions.',
                });
        } catch ({ message }) {
                return Helpers.handleErrorResponse(res, 500, message);
        }
};

const getUserProfile = async (req, res) => {
        try {
                Helpers.handleSuccessResponse(res, 200, {
                        user: Helpers.trimPublicProfile(req.user),
                        message: 'Profile spooled successfully.',
                });
        } catch ({ message }) {
                return Helpers.handleErrorResponse(res, 500, message);
        }
};

const updateUserProfile = async (req, res) => {
        try {
                if (!Helpers.hasBody(req.body))
                        return Helpers.handleErrorResponse(res, 400, 'Request fields are required');

                if (!Helpers.allowedUpdates(req.body, 'user'))
                        return Helpers.handleErrorResponse(res, 400, 'Invalid update.');

                Helpers.updateRecord(req.user, req.body);

                await req.user.save();

                Helpers.handleSuccessResponse(res, 200, {
                        user: Helpers.trimPublicProfile(req.user),
                        message: 'Update(s) successful.',
                });
        } catch ({ message }) {
                return Helpers.handleErrorResponse(res, 500, message);
        }
};

const deleteUserProfile = async (req, res) => {
        const { _id, name, email } = req.user;

        try {
                await User.findByIdAndDelete(_id);

                await Task.deleteMany({ author: _id });

                Helpers.handleSuccessResponse(res, 204, {});

                cancelationMail(name, email);
        } catch ({ message }) {
                return Helpers.handleErrorResponse(res, 400, message);
        }
};

const addAvatar = async (req, res) => {
        try {
                const {
                        file: { buffer },
                } = req;

                const avatarBuffer = await sharp(buffer)
                        .resize({ width: 150, height: 150 })
                        .jpeg()
                        .toBuffer();

                req.user.avatar = avatarBuffer;

                await req.user.save();

                return Helpers.handleSuccessResponse(res, 200, {});
        } catch ({ message }) {
                return Helpers.handleErrorResponse(res, 500, message);
        }
};

const deleteAvatar = async (req, res) => {
        try {
                req.user.avatar = undefined;

                await req.user.save();

                return Helpers.handleSuccessResponse(res, 200, {});
        } catch ({ message }) {
                return Helpers.handleErrorResponse(res, 500, message);
        }
};

const getAvatar = async (req, res) => {
        const { id: _id } = req.params;
        try {
                const user = await User.findById(_id);

                if (!user) return Helpers.handleErrorResponse(res, 404, 'User does not exist.');

                if (!user?.avatar)
                        return Helpers.handleErrorResponse(res, 404, 'Avatar does not exist.');

                res.set('Content-Type', 'image/jpeg').send(user.avatar);
        } catch ({ message }) {
                return Helpers.handleErrorResponse(res, 500, message);
        }
};

const UserController = {
        createUser,
        addAvatar,
        getAvatar,
        deleteAvatar,
        logInUser,
        logOutUser,
        logOutUserAll,
        getUserProfile,
        updateUserProfile,
        deleteUserProfile,
};

module.exports = UserController;
