const express = require("express");
const UserController = require("../controllers/UserController");
const validateSchema = require("../middlewares/validateSchema");
const validateUserData = require("../middlewares/validateUserData");
const userSchema = require("../schemas/userSchema");

const setUserRoutes = (app) => {
  const router = express.Router();
  const userController = new UserController();

  router.get("/users", userController.getAllUsers.bind(userController));
  router.get("/users/:id", userController.getUserById.bind(userController));

  router.post(
    "/users",
    validateSchema(userSchema),
    validateUserData({ checkEmail: true, checkCpf: true }),
    userController.createUser.bind(userController)
  );

  app.use("/api", router);
};

module.exports = setUserRoutes;
