const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chat");
const authRoutes = require("./routes/auth");
const { PORT } = require("./config/env");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", chatRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "YojanaSathi AI Backend is running"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
