const { userService } = require("../services");

const crear = async (req, res, next) => {
  try {
    const user = await userService.crear(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const getLista = async (req, res, next) => {
  try {
    const users = await userService.obtenerTodos();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getId = async (req, res, next) => {
  try {
    const user = await userService.obtenerPorId(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const user = await userService.actualizar(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await userService.eliminar(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const follow = async (req, res, next) => {
  try {
    const result = await userService.followUser(req.params.id, req.body.targetUserId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const unfollow = async (req, res, next) => {
  try {
    const result = await userService.unfollowUser(req.params.id, req.body.targetUserId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { crear, getLista, getId, update, remove, follow, unfollow };
