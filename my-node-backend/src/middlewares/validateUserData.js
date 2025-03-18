const UserModel = require("../models/UserModel");

const validateUserData =
  (options = {}) =>
  async (req, res, next) => {
    const { email, cpf } = req.body;
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

    if (errors.length > 0) {
      return res.status(400).json({ details: errors });
    }

    next();
  };

module.exports = validateUserData;
