const express = require('express');

const UserController = require('../controllers/user.controller');

const verifyAuthToken = require('../middleware/auth');

const uploadAvatar = require('../middleware/multer');

const handleErrorUpload = require('../middleware/handleErrorUpload');

const router = express.Router();

router.post('/register', UserController.createUser);

router.post('/sign-in', UserController.logInUser);

router.post('/sign-out', verifyAuthToken, UserController.logOutUser);

router.post('/sign-out-all', verifyAuthToken, UserController.logOutUserAll);

router.post(
        '/me/avatar',
        verifyAuthToken,
        uploadAvatar('2MB').single('image'),
        handleErrorUpload,
        UserController.addAvatar
);

router.get('/me', verifyAuthToken, UserController.getUserProfile);

router.get('/:id/avatar', verifyAuthToken, UserController.getAvatar);

router.patch('/me', verifyAuthToken, UserController.updateUserProfile);

router.delete('/me/avatar', verifyAuthToken, UserController.deleteAvatar);

router.delete('/me', verifyAuthToken, UserController.deleteUserProfile);

module.exports = router;
