const { postService } = require("../services");

const crear = async (req, res, next) => {
  try {
    const result = await postService.crear(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getLista = async (req, res, next) => {
  try {
    const posts = await postService.obtenerTodos();
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const getId = async (req, res, next) => {
  try {
    const post = await postService.obtenerPorId(req.params.id);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const post = await postService.actualizar(req.params.id, req.body);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await postService.eliminar(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const addTag = async (req, res, next) => {
  try {
    const result = await postService.addTag(req.params.id, req.body.tagId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const removeTag = async (req, res, next) => {
  try {
    await postService.removeTag(req.params.id, req.params.tagId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { crear, getLista, getId, update, remove, addTag, removeTag };
