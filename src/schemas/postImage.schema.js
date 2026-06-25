const Joi = require("joi");

const createPostImageSchema = Joi.object({
  postId: Joi.string().hex().length(24).required(),
});

module.exports = { createPostImageSchema };
