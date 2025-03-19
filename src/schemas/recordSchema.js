const Joi = require("joi").extend(require("@joi/date"));

const recordSchema = Joi.object({
  description: Joi.string().max(100).required().messages({
    "string.max": "The description must contain a maximum of 100 characters.",
    "any.required": "The description is required.",
    "string.empty": "The description is required.",
  }),
  due_date: Joi.date().format("DD-MM-YYYY").required().messages({
    "date.format": "The due date must be in the format DD-MM-YYYY.",
    "any.required": "The due date is required.",
    "date.base": "The due date must be a valid date.",
  }),
  value: Joi.number().required().messages({
    "any.required": "The record value is required.",
    "number.base": "The record value must be a number.",
  }),
  paid_out: Joi.boolean().required().messages({
    "any.required": "The payment status is required.",
    "boolean.base": "The payment status must be true or false.",
  }),
});

module.exports = recordSchema;
