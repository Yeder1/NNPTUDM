const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, default: "" },
}, { timestamps: true });

const Role = mongoose.model("Role", RoleSchema);

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fullName: { type: String, default: "" },
  avatarUrl: { type: String, default: "" },
  status: { type: Boolean, default: false },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  loginCount: { type: Number, default: 0, min: 0 }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = { User, Role };
