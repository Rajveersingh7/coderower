const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const configurationRoutes = require("./routes/configurations");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/configurations", configurationRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
