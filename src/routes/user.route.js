const express = require("express");
const UserController = require("../controllers/user.controller");
const authMiddleWare = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/register", UserController.createUser);

router.post("/login", UserController.loginUser);

router.get("/me", authMiddleWare, UserController.getUserProfile);

router.get("/:id", UserController.getSingleUser);

router.patch("/:id", authMiddleWare, UserController.updateUser);

router.delete("/:id", authMiddleWare, UserController.deleteUser);

module.exports = router;
