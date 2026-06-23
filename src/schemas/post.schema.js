const Joi = require("joi");

const createPostSchema = Joi.object({
  description: Joi.string().min(1).required(),
  userId: Joi.number().integer().required(),
  tags: Joi.array().items(Joi.number().integer()),
  images: Joi.array().items(Joi.string().uri()),
});

const updatePostSchema = Joi.object({
  description: Joi.string().min(1),
}).min(1);

module.exports = { createPostSchema, updatePostSchema };
