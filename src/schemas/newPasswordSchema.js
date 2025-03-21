const Joi = require("joi");

const newPasswordSchema = Joi.object({
  password: Joi.string().min(5).required().messages({
    "any.required": "The password is required.",
    "string.empty": "The password is required.",
    "string.min": "The password must contain at least 5 characters.",
  }),
  newPassword: Joi.string().min(5).required().messages({
    "any.required": "The new password is required.",
    "string.empty": "The new password is required.",
    "string.min": "The new password must contain at least 5 characters.",
  }),
  confirmNewPassword: Joi.any()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "The passwords do not match.",
      "any.required": "The new password confirmation is required.",
      "any.empty": "The new password confirmation is required.",
    }),
});

module.exports = newPasswordSchema;
