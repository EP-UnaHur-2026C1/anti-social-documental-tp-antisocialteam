const { postImageService } = require("../services");
const { BadRequestError } = require("../utils/errors");

const crear = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new BadRequestError("Se requiere un archivo de imagen válido");
    }
    const url = `/uploads/${req.file.filename}`;
    const postImage = await postImageService.crear({ ...req.body, url });
    res.status(201).json(postImage);
  } catch (error) {
    next(error);
  }
};

const getLista = async (req, res, next) => {
  try {
    const images = await postImageService.obtenerTodos();
    res.json(images);
  } catch (error) {
    next(error);
  }
};

const getId = async (req, res, next) => {
  try {
    const image = await postImageService.obtenerPorId(req.params.id);
    res.json(image);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await postImageService.eliminar(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { crear, getLista, getId, remove };
