const { Post, User, PostImage, Comment, Tag } = require("../models");
const { ErrorNoEncontrado, ErrorDatoInvalido } = require("../utils/errors");
const { getVisibilityCutoffDate } = require("../utils/commentVisibility");

const crear = async (postData) => {
  const { description, userId, tags, images } = postData;

  const user = await User.findById(userId);
  if (!user) throw new ErrorDatoInvalido("El usuario indicado no existe");

  const post = await Post.create({ description, userId, tags: tags || [] });

  if (Array.isArray(images) && images.length > 0) {
    const imagesToInsert = images.map((url) => ({ url, postId: post._id }));
    await PostImage.insertMany(imagesToInsert);
  }

  return await obtenerPorId(post._id);
};

const obtenerTodos = async () => {
  const posts = await Post.find()
    .populate("userId", "nickName")
    .populate("tags")
    .lean();
    
  for (let post of posts) {
    post.PostImages = await PostImage.find({ postId: post._id });
    post.Comments = await Comment.find({
      postId: post._id,
      createdAt: { $gte: getVisibilityCutoffDate() }
    }).populate("userId", "nickName");
  }

  return posts;
};

const obtenerPorId = async (id) => {
  const post = await Post.findById(id)
    .populate("userId", "nickName")
    .populate("tags")
    .lean();

  if (!post) throw new ErrorNoEncontrado("Post no encontrado");

  post.PostImages = await PostImage.find({ postId: post._id });

  const comments = await Comment.find({
    postId: post._id,
    createdAt: { $gte: getVisibilityCutoffDate() }
  }).populate("userId", "nickName");

  post.Comments = comments;

  return post;
};

const actualizar = async (id, postData) => {
  const post = await Post.findByIdAndUpdate(id, postData, { new: true, runValidators: true });
  if (!post) throw new ErrorNoEncontrado("Post no encontrado");
  return post;
};

const eliminar = async (id) => {
  const post = await Post.findByIdAndDelete(id);
  if (!post) throw new ErrorNoEncontrado("Post no encontrado");
  
  await PostImage.deleteMany({ postId: id });
  await Comment.deleteMany({ postId: id });
  
  return post;
};

const addTag = async (postId, tagId) => {
  const tag = await Tag.findById(tagId);
  if (!tag) throw new ErrorNoEncontrado("Etiqueta no encontrada");

  const post = await Post.findByIdAndUpdate(
    postId,
    { $addToSet: { tags: tagId } },
    { new: true }
  );
  
  if (!post) throw new ErrorNoEncontrado("Post no encontrado");
  
  return await obtenerPorId(postId);
};

const removeTag = async (postId, tagId) => {
  const tag = await Tag.findById(tagId);
  if (!tag) throw new ErrorNoEncontrado("Etiqueta no encontrada");

  const post = await Post.findByIdAndUpdate(
    postId,
    { $pull: { tags: tagId } },
    { new: true }
  );

  if (!post) throw new ErrorNoEncontrado("Post no encontrado");
  
  return post;
};

module.exports = { crear, obtenerTodos, obtenerPorId, actualizar, eliminar, addTag, removeTag };
