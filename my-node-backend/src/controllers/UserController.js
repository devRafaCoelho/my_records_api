const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving users");
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving user");
    }
  }

  async createUser(req, res) {
    try {
      const userData = req.body;

      userData.password = await bcrypt.hash(userData.password, 10);

      const user = new UserModel(userData);
      const newUser = await user.create();
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creating user");
    }
  }
}

module.exports = UserController;
