const paymentRepository = require("../repositories/paymentRepository");
const stripe = require("../lib/stripe");
const notificationRepository = require("../repositories/notificationRepository");

class PaymentService {
  async createPayment(input) {
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(input.amount * 100),
      currency: (input.currency || "MZN").toLowerCase(),
      metadata: { userId: input.userId },
    });

    const dados = {
      userId: input.userId,
      amount: input.amount,
      currency: input.currency || "MZN",
      stripeId: intent.id,
      status: "pending",
    };

    const pagamento = await paymentRepository.create(dados);
    await notificationRepository.createNotification({
      paymentId: pagamento.id,
      type: "email",
      recipient: input.userId, // Mudar para email(Não se esqueça)
      sent: false,
    });

    return pagamento;
  }

  async getPayment(id) {
    return paymentRepository.findById(id);
  }
}

module.exports = new PaymentService();
