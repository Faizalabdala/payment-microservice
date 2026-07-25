const express = require("express");

const app = express();
const paymentRoutes = require("./routes/paymentRoutes");

app.use(express.json());
app.use("/payments", paymentRoutes);

module.exports = app;
