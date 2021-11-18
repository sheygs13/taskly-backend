const express = require("express");

const UserController = require("../controllers/user.controller");

const verifyAuthToken = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", UserController.createUser);

router.post("/login", UserController.loginUser);

router.get("/me", verifyAuthToken, UserController.getUserProfile);

router.get("/:id", verifyAuthToken, UserController.getSingleUser);

router.patch("/:id", verifyAuthToken, UserController.updateUser);

router.delete("/:id", verifyAuthToken, UserController.deleteUser);

module.exports = router;
