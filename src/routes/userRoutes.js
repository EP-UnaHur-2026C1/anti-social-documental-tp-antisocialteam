const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const validate = require("../middlewares/validate");
const {
  createUserSchema,
  updateUserSchema,
} = require("../schemas/user.schema");

router.get("/", controller.getLista);
router.get("/:id", controller.getId);
router.post("/", validate(createUserSchema), controller.crear);
router.put("/:id", validate(updateUserSchema), controller.update);
router.delete("/:id", controller.remove);
router.post("/:id/follow", controller.follow);
router.delete("/:id/unfollow", controller.unfollow);

module.exports = router;
