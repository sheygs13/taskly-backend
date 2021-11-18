const express = require("express");

const UserController = require("../controllers/user.controller");

const verifyAuthToken = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", UserController.createUser);

router.post("/sign-in", UserController.logInUser);

router.post("/sign-out", verifyAuthToken, UserController.logOutUser);

router.post("/sign-out-all", verifyAuthToken, UserController.logOutUserAll);

router.get("/me", verifyAuthToken, UserController.getUserProfile);

router.patch("/me", verifyAuthToken, UserController.updateUserProfile);

router.delete("/me", verifyAuthToken, UserController.deleteUserProfile);

module.exports = router;
