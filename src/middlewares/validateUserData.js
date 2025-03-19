const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");

const validateUserData =
  (options = {}) =>
  async (req, res, next) => {
    const { email, cpf, password } = req.body;
    const errors = [];

    if (options.checkEmail && email) {
      const emailExists = await UserModel.findByEmail(email);
      if (emailExists) {
        errors.push({
          message: "E-mail already registered.",
          type: "email",
        });
      }
    }

    if (options.checkCpf && cpf) {
      const cpfExists = await UserModel.findByCpf(cpf);
      if (cpfExists) {
        errors.push({
          message: "CPF already registered.",
          type: "cpf",
        });
      }
    }

    if (options.checkEmailExists && email) {
      const user = await UserModel.findByEmail(email);
      if (!user) {
        errors.push({
          message: "User not found.",
          type: "email",
        });
      } else {
        req.user = user;
      }
    }

    if (options.checkPassword && password) {
      const user = req.user;
      if (!user) {
        errors.push({
          message: "User not found.",
          type: "password",
        });
      } else {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          errors.push({
            message: "Invalid password.",
            type: "password",
          });
        }
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ details: errors });
    }

    next();
  };

module.exports = validateUserData;
