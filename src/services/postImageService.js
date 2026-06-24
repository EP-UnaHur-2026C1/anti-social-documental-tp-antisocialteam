const { PostImage } = require("../models");
const { ErrorNoEncontrado } = require("../utils/errors");

const crear = async (imageData) => {
  return await PostImage.create(imageData);
};

const obtenerTodos = async () => {
  return await PostImage.find();
};

const obtenerPorId = async (id) => {
  const image = await PostImage.findById(id).lean();
  if (!image) throw new ErrorNoEncontrado("Imagen no encontrada");
  return image;
};

const actualizar = async (id, imageData) => {
  const image = await PostImage.findByIdAndUpdate(id, imageData, { new: true, runValidators: true });
  if (!image) throw new ErrorNoEncontrado("Imagen no encontrada");
  return image;
};

const eliminar = async (id) => {
  const image = await PostImage.findByIdAndDelete(id);
  if (!image) throw new ErrorNoEncontrado("Imagen no encontrada");
  return image;
};

module.exports = { crear, obtenerTodos, obtenerPorId, actualizar, eliminar };
