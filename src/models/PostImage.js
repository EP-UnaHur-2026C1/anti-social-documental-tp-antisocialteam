const mongoose = require("mongoose");

const postImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("PostImage", postImageSchema);
