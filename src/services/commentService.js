const { Comment } = require("../models");
const { ErrorNoEncontrado } = require("../utils/errors");

const crear = async (commentData) => {
  return await Comment.create(commentData);
};

const obtenerTodos = async () => {
  return await Comment.find()
    .populate("userId", "nickName")
    .populate("postId", "description");
};

const obtenerPorId = async (id) => {
  const comment = await Comment.findById(id)
    .populate("userId", "nickName")
    .populate("postId", "description")
    .lean();
  if (!comment) throw new ErrorNoEncontrado("Comentario no encontrado");
  return comment;
};

const actualizar = async (id, commentData) => {
  const comment = await Comment.findByIdAndUpdate(id, commentData, { new: true, runValidators: true });
  if (!comment) throw new ErrorNoEncontrado("Comentario no encontrado");
  return comment;
};

const eliminar = async (id) => {
  const comment = await Comment.findByIdAndDelete(id);
  if (!comment) throw new ErrorNoEncontrado("Comentario no encontrado");
  return comment;
};

module.exports = { crear, obtenerTodos, obtenerPorId, actualizar, eliminar };
