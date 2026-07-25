const paymentService = require("../services/paymentService");
const { createPaymentSchema } = require("../schemas/createPaymentSchema");

class PaymentController {
  async createPayment(req, res) {
    const result = createPaymentSchema.safeParse(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ error: "dados inválidos", details: result.error.issues });
    }

    const pagamento = await paymentService.createPayment(result.data);
    return res.status(201).json(pagamento);
  }

  async getById(req, res) {
    const id = req.params.id;
    const payment = await paymentService.getPayment(id);
    if (!payment) {
      return res.status(404).json({ error: "Pagamento não encontrado" });
    }
    return res.status(200).json(payment);
  }
}

module.exports = new PaymentController();
