const mongoose = require("mongoose");

/* UsersSchema will correspond to a collection in your MongoDB database. */
const UsersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide a Email."],
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Users || mongoose.model("Users", UsersSchema);
