const { toCents } = require("../lib/money");

class PaymentService {
  constructor(stripe, paymentRepository, notificationRepository) {
    this.stripe = stripe;
    this.paymentRepository = paymentRepository;
    this.notificationRepository = notificationRepository;
  }

  async createPayment(input) {
    const intent = await this.stripe.paymentIntents.create({
      amount: toCents(input.amount),
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

    const pagamento = await this.paymentRepository.create(dados);

    await this.notificationRepository.create({
      paymentId: pagamento.id,
      type: "email",
      recipient: input.userId,
      sent: false,
    });

    return pagamento;
  }

  async getPayment(id) {
    return this.paymentRepository.findById(id);
  }
}

module.exports = PaymentService; // a CLASSE, não uma instância
