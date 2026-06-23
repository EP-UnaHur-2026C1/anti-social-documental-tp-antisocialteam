const { Tag, Post } = require("../models");

const crear = async (req, res, next) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
};

const getLista = async (req, res, next) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

const getId = async (req, res, next) => {
  try {
    const tag = await Tag.findByPk(req.params.id, { include: Post });
    if (!tag) {
      return res.status(404).json({ error: "Etiqueta no encontrada" });
    }
    res.json(tag);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({ error: "Etiqueta no encontrada" });
    }
    await tag.update(req.body);
    res.json(tag);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({ error: "Etiqueta no encontrada" });
    }
    await tag.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { crear, getLista, getId, update, remove };
