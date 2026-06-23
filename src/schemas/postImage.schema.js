const Joi = require("joi");

const createPostImageSchema = Joi.object({
  url: Joi.string().uri().required(),
  postId: Joi.number().integer().required(),
});

const updatePostImageSchema = Joi.object({
  url: Joi.string().uri().required(),
});

module.exports = { createPostImageSchema, updatePostImageSchema };
