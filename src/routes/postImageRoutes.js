const express = require("express");
const router = express.Router();
const controller = require("../controllers/postImageController");
const validate = require("../middlewares/validate");
const {
  createPostImageSchema,
  updatePostImageSchema,
} = require("../schemas/postImage.schema");

router.get("/", controller.getLista);
router.get("/:id", controller.getId);
router.post("/", validate(createPostImageSchema), controller.crear);
router.put("/:id", validate(updatePostImageSchema), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
