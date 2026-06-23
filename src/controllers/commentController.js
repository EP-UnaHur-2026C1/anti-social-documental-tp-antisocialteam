const { Comment, Post, User } = require("../models");

const crear = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.body.postId);
    if (!post) {
      return res.status(400).json({ error: "El post indicado no existe" });
    }
    const user = await User.findByPk(req.body.userId);
    if (!user) {
      return res.status(400).json({ error: "El usuario indicado no existe" });
    }
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

const getLista = async (req, res, next) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

const getId = async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }
    res.json(comment);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }
    await comment.update(req.body);
    res.json(comment);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }
    await comment.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { crear, getLista, getId, update, remove };
