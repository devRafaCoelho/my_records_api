const express = require("express");
const UserController = require("../controllers/UserController");
const validateSchema = require("../middlewares/validateSchema");
const validateUserData = require("../middlewares/validateUserData");
const validateAuthentication = require("../middlewares/validateAuthentication");
const userSchema = require("../schemas/userSchema");
const loginSchema = require("../schemas/loginSchema");
const newPasswordSchema = require("../schemas/newPasswordSchema");

const setUserRoutes = (app) => {
  const router = express.Router();
  const userController = new UserController();

  router.post(
    "/users",
    validateSchema(userSchema),
    validateUserData({ checkEmail: true, checkCpf: true }),
    userController.createUser.bind(userController)
  );

  router.post(
    "/login",
    validateSchema(loginSchema),
    validateUserData({ checkEmailExists: true, checkPassword: true }),
    userController.login.bind(userController)
  );

  const protectedRouter = express.Router();

  protectedRouter.use(validateAuthentication);

  protectedRouter.get(
    "/users",
    userController.getUserByLogin.bind(userController)
  );

  protectedRouter.put(
    "/users",
    validateSchema(userSchema),
    validateUserData({
      checkIdExists: true,
      checkPassword: true,
      checkEmail: true,
      checkCpf: true,
    }),
    userController.updateUser.bind(userController)
  );

  protectedRouter.put(
    "/users/account",
    validateSchema(newPasswordSchema),
    validateUserData({ checkPassword: true, checkIdExists: true }),
    userController.updateUserPassword.bind(userController)
  );

  protectedRouter.put("/users/account", validateSchema(newPasswordSchema));

  protectedRouter.delete(
    "/users",
    userController.deleteUser.bind(userController)
  );

  router.use(protectedRouter);

  app.use("/api", router);
};

module.exports = setUserRoutes;
