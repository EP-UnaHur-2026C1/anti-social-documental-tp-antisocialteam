const express = require("express");
const router = express.Router();

router.use("/users", require("./userRoutes"));
router.use("/posts", require("./postRoutes"));
router.use("/postimages", require("./postImageRoutes"));
router.use("/comments", require("./commentRoutes"));
router.use("/tags", require("./tagRoutes"));

module.exports = router;
