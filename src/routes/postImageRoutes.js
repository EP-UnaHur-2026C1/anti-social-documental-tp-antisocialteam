const express = require("express");
const router = express.Router();
const controller = require("../controllers/postImageController");
const validate = require("../middlewares/validate");
const {
  createPostImageSchema,
  updatePostImageSchema,
} = require("../schemas/postImage.schema");
const upload = require("../middlewares/upload");

router.get("/", controller.getLista);
router.get("/:id", controller.getId);
router.post("/", upload.single("image"), validate(createPostImageSchema), controller.crear);
router.delete("/:id", controller.remove);

module.exports = router;
