const { Tag, Post } = require("../models");
const { ErrorNoEncontrado } = require("../utils/errors");

const crear = async (tagData) => {
  return await Tag.create(tagData);
};

const obtenerTodos = async () => {
  return await Tag.find();
};

const obtenerPorId = async (id) => {
  const tag = await Tag.findById(id).lean();
  if (!tag) throw new ErrorNoEncontrado("Etiqueta no encontrada");
  
  const posts = await Post.find({ tags: id });
  tag.Posts = posts;
  
  return tag;
};

const actualizar = async (id, tagData) => {
  const tag = await Tag.findByIdAndUpdate(id, tagData, { new: true, runValidators: true });
  if (!tag) throw new ErrorNoEncontrado("Etiqueta no encontrada");
  return tag;
};

const eliminar = async (id) => {
  const tag = await Tag.findByIdAndDelete(id);
  if (!tag) throw new ErrorNoEncontrado("Etiqueta no encontrada");
  return tag;
};

module.exports = { crear, obtenerTodos, obtenerPorId, actualizar, eliminar };
