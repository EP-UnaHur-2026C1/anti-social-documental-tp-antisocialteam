const { Op } = require("sequelize");
const { Post, User, PostImage, Comment, Tag } = require("../models");
const { getVisibilityCutoffDate } = require("../utils/commentVisibility");

const crear = async (req, res, next) => {
  try {
    const { description, userId, tags, images } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ error: "El usuario indicado no existe" });
    }

    const post = await Post.create({ description, userId });

    if (Array.isArray(images) && images.length > 0) {
      await PostImage.bulkCreate(
        images.map((url) => ({ url, postId: post.id }))
      );
    }

    if (Array.isArray(tags) && tags.length > 0) {
      await post.setTags(tags);
    }

    const result = await Post.findByPk(post.id, {
      include: [PostImage, Tag],
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getLista = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ["id", "nickName"] },
        PostImage,
        Tag,
      ],
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const getId = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["id", "nickName"] },
        PostImage,
        Tag,
        {
          model: Comment,
          where: { createdAt: { [Op.gte]: getVisibilityCutoffDate() } },
          required: false,
          include: [{ model: User, attributes: ["id", "nickName"] }],
        },
      ],
    });

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    await post.update(req.body);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    await post.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const addTag = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    const tag = await Tag.findByPk(req.body.tagId);
    if (!tag) {
      return res.status(404).json({ error: "Etiqueta no encontrada" });
    }
    await post.addTag(tag);
    const result = await Post.findByPk(post.id, { include: [Tag] });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const removeTag = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    const tag = await Tag.findByPk(req.params.tagId);
    if (!tag) {
      return res.status(404).json({ error: "Etiqueta no encontrada" });
    }
    await post.removeTag(tag);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { crear, getLista, getId, update, remove, addTag, removeTag };
