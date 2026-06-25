const Joi = require("joi");

const createCommentSchema = Joi.object({
  content: Joi.string().min(1).required(),
  userId: Joi.string().hex().length(24).required(),
  postId: Joi.string().hex().length(24).required(),
});

const updateCommentSchema = Joi.object({
  content: Joi.string().min(1).required(),
});

module.exports = { createCommentSchema, updateCommentSchema };
