const express = require("express");
const router = express.Router();
const controller = require("../controllers/postController");
const validate = require("../middlewares/validate");
const {
  createPostSchema,
  updatePostSchema,
} = require("../schemas/post.schema");

router.get("/", controller.getLista);
router.get("/:id", controller.getId);
router.post("/", validate(createPostSchema), controller.crear);
router.put("/:id", validate(updatePostSchema), controller.update);
router.delete("/:id", controller.remove);

router.post("/:id/tags", controller.addTag);
router.delete("/:id/tags/:tagId", controller.removeTag);

module.exports = router;
