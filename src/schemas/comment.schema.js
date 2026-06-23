const Joi = require("joi");

const createCommentSchema = Joi.object({
  content: Joi.string().min(1).required(),
  userId: Joi.number().integer().required(),
  postId: Joi.number().integer().required(),
});

const updateCommentSchema = Joi.object({
  content: Joi.string().min(1).required(),
});

module.exports = { createCommentSchema, updateCommentSchema };
