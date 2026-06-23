const { PostImage, Post } = require("../models");

const crear = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.body.postId);
    if (!post) {
      return res.status(400).json({ error: "El post indicado no existe" });
    }
    const image = await PostImage.create(req.body);
    res.status(201).json(image);
  } catch (error) {
    next(error);
  }
};

const getLista = async (req, res, next) => {
  try {
    const images = await PostImage.findAll();
    res.json(images);
  } catch (error) {
    next(error);
  }
};

const getId = async (req, res, next) => {
  try {
    const image = await PostImage.findByPk(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Imagen no encontrada" });
    }
    res.json(image);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const image = await PostImage.findByPk(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Imagen no encontrada" });
    }
    await image.update(req.body);
    res.json(image);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const image = await PostImage.findByPk(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Imagen no encontrada" });
    }
    await image.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { crear, getLista, getId, update, remove };
