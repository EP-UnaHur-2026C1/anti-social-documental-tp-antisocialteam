const express = require("express");
const router = express.Router();
const controller = require("../controllers/tagController");
const validate = require("../middlewares/validate");
const { createTagSchema, updateTagSchema } = require("../schemas/tag.schema");

router.get("/", controller.getLista);
router.get("/:id", controller.getId);
router.post("/", validate(createTagSchema), controller.crear);
router.put("/:id", validate(updateTagSchema), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
