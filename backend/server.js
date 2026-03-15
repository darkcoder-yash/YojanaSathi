const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chat");
const updatesRoutes = require("./routes/updates");

const { PORT } = require("./config/env");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", chatRoutes);
app.use("/api", updatesRoutes);


app.get("/", (req, res) => {
  res.json({
    status: "YojanaSathi AI Backend is running"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
