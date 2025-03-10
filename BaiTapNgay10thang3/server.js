const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Kết nối MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/baitap10thang3", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.log("❌ MongoDB Connection Failed:", err));

// Routes
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
