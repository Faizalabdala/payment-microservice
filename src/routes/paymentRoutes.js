const paymentController = require("../controllers/paymentController");
const express = require("express");

const router = express.Router();

router.post("/", (req, res) => paymentController.createPayment(req, res));
router.get("/:id", (req, res) => paymentController.getById(req, res));

module.exports = router;
