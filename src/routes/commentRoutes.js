const express = require("express");
const router = express.Router();
const controller = require("../controllers/commentController");
const validate = require("../middlewares/validate");
const {
  createCommentSchema,
  updateCommentSchema,
} = require("../schemas/comment.schema");

router.get("/", controller.getLista);
router.get("/:id", controller.getId);
router.post("/", validate(createCommentSchema), controller.crear);
router.put("/:id", validate(updateCommentSchema), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
