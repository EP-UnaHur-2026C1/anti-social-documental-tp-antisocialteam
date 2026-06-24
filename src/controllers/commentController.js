const { commentService } = require("../services");

const crear = async (req, res, next) => {
  try {
    const comment = await commentService.crear(req.body);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

const getLista = async (req, res, next) => {
  try {
    const comments = await commentService.obtenerTodos();
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

const getId = async (req, res, next) => {
  try {
    const comment = await commentService.obtenerPorId(req.params.id);
    res.json(comment);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const comment = await commentService.actualizar(req.params.id, req.body);
    res.json(comment);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await commentService.eliminar(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { crear, getLista, getId, update, remove };
