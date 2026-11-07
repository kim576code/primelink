
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/health", (req, res) => {
  res.json({ status: "PRIMELINK server is running" });
});

// Payment endpoint — safely disabled until
// Daraja credentials and callback are verified.
app.post("/api/deposit", (req, res) => {
  const { amount, phone } = req.body;

  if (Number(amount) !== 300 || !phone) {
    return res.status(400).json({
      message: "Please provide a valid KSh 300 deposit request."
    });
  }

  if (
    !process.env.DARAJA_CONSUMER_KEY ||
    !process.env.DARAJA_CONSUMER_SECRET ||
    !process.env.DARAJA_PASSKEY ||
    !process.env.DARAJA_SHORTCODE
  ) {
    return res.status(503).json({
      message: "M-Pesa credentials are incomplete."
    });
  }

  return res.status(503).json({
    message: "M-Pesa integration is not activated yet. No payment has been requested."
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`PRIMELINK running on port ${PORT}`);
});

