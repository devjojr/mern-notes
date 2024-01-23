const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      maxlength: 50,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      minlength: 10,
      maxlength: 150,
      trim: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
