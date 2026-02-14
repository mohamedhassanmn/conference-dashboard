const express = require("express");

const app = express();
const PORT = process.env.PORT || 4500;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
