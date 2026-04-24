require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // ✅ ONLY ONCE

const bookingRoutes = require("./routes/bookingRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("Mongo Error ❌", err));

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/api/booking", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Server running ✅");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});