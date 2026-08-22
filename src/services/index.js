const PaymentService = require("./paymentService");
const stripe = require("../lib/stripe");
const paymentRepository = require("../repositories/paymentRepository");
const notificationRepository = require("../repositories/notificationRepository");

const paymentService = new PaymentService(
  stripe,
  paymentRepository,
  notificationRepository,
);

module.exports = paymentService;
