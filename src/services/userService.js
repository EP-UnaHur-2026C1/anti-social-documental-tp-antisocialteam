const { User, Post } = require("../models");
const { ErrorNoEncontrado } = require("../utils/errors");

const crear = async (userData) => {
  return await User.create(userData);
};

const obtenerTodos = async () => {
  return await User.find();
};

const obtenerPorId = async (id) => {
  const user = await User.findById(id).lean();
  if (!user) throw new ErrorNoEncontrado("Usuario no encontrado");
  
  // Emular el include de Sequelize
  const posts = await Post.find({ userId: id });
  user.Posts = posts;
  
  return user;
};

const actualizar = async (id, userData) => {
  const user = await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
  if (!user) throw new ErrorNoEncontrado("Usuario no encontrado");
  return user;
};

const eliminar = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new ErrorNoEncontrado("Usuario no encontrado");
  return user;
};

module.exports = { crear, obtenerTodos, obtenerPorId, actualizar, eliminar };
