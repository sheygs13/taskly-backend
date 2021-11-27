const express = require("express");

const UserController = require("../controllers/user.controller");

const verifyAuthToken = require("../middleware/auth.middleware");

const avatarUpload = require("../middleware/upload.middleware");

const handleUploadError = require("../middleware/handleUploadError.middleware");

const router = express.Router();

router.post("/register", UserController.createUser);

router.post(
      "/me/avatar",
      verifyAuthToken,
      avatarUpload("2mb").single("image"),
      handleUploadError,
      UserController.uploadAvatar
);

router.post("/sign-in", UserController.logInUser);

router.post("/sign-out", verifyAuthToken, UserController.logOutUser);

router.post("/sign-out-all", verifyAuthToken, UserController.logOutUserAll);

router.get("/me", verifyAuthToken, UserController.getUserProfile);

router.patch("/me", verifyAuthToken, UserController.updateUserProfile);

router.delete("/me", verifyAuthToken, UserController.deleteUserProfile);

module.exports = router;
