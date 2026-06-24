const { tagService } = require("../services");

const crear = async (req, res, next) => {
  try {
    const tag = await tagService.crear(req.body);
    res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
};

const getLista = async (req, res, next) => {
  try {
    const tags = await tagService.obtenerTodos();
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

const getId = async (req, res, next) => {
  try {
    const tag = await tagService.obtenerPorId(req.params.id);
    res.json(tag);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const tag = await tagService.actualizar(req.params.id, req.body);
    res.json(tag);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await tagService.eliminar(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { crear, getLista, getId, update, remove };
