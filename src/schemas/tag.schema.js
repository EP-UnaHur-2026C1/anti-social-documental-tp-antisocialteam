const Joi = require("joi");

const createTagSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
});

const updateTagSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
});

module.exports = { createTagSchema, updateTagSchema };
