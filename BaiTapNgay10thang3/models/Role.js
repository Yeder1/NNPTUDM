const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, default: "" }
}, { timestamps: true });

const Role = mongoose.model("Role", RoleSchema);

module.exports = Role;
