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

const followUser = async (userId, targetUserId) => {
  if (userId === targetUserId) throw new Error("No puedes seguirte a ti mismo");
  
  const targetUser = await User.findById(targetUserId);
  if (!targetUser) throw new ErrorNoEncontrado("Usuario a seguir no encontrado");

  await User.findByIdAndUpdate(userId, { $addToSet: { following: targetUserId } });
  await User.findByIdAndUpdate(targetUserId, { $addToSet: { followers: userId } });
  
  return { message: "Usuario seguido correctamente" };
};

const unfollowUser = async (userId, targetUserId) => {
  await User.findByIdAndUpdate(userId, { $pull: { following: targetUserId } });
  await User.findByIdAndUpdate(targetUserId, { $pull: { followers: userId } });
  
  return { message: "Dejaste de seguir al usuario" };
};

module.exports = { crear, obtenerTodos, obtenerPorId, actualizar, eliminar, followUser, unfollowUser };
