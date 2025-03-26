const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
require("dotenv").config();
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const hostRoutes = require("./src/routes/hostRoutes");
const donationRoutes = require("./src/routes/donationRoutes");
const centerRoutes = require("./src/routes/centerRoutes");

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    return res.status(500).json({ message: "Database connection error" });
  }
});


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/host", hostRoutes);
app.use("/api/v1/donation", donationRoutes);
app.use("/api/v1/center", centerRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Server is running" });
});
app.get("/api/v1", (req, res) => {
  res.send({ message: "server v1 is running" });
});

if (require.main === module) {
  connectDB();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;
