const express = require("express");
const UserController = require("../controllers/user.controller");
const router = express.Router();

router.post("/auth/users", UserController.createUser);

router.get("/users", UserController.getAllUsers);

router.get("/users/:id", UserController.getSingleUser);

router.patch("/users/:id", UserController.updateUser);

router.delete("/users/:id",UserController.deleteUser);

module.exports = router;
