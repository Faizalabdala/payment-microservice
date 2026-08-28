const PaymentService = require("../services/paymentService");

describe("PaymentService.createPayment", () => {
  let stripeFalsa;
  let paymentRepoFalso;
  let notificationRepoFalso;
  let service;

  // corre ANTES de cada it
  beforeEach(() => {
    stripeFalsa = {
      paymentIntents: {
        create: vi.fn().mockResolvedValue({ id: "pi_fake_123" }),
      },
    };
    paymentRepoFalso = {
      create: vi.fn().mockResolvedValue({ id: "pay_1" }),
    };
    notificationRepoFalso = {
      create: vi.fn().mockResolvedValue({}),
    };
    service = new PaymentService(
      stripeFalsa,
      paymentRepoFalso,
      notificationRepoFalso,
    );
  });

  it("converte o valor para centavos ao chamar a Stripe", async () => {
    await service.createPayment({
      userId: "user-1",
      amount: 750,
      currency: "MZN",
    });

    expect(stripeFalsa.paymentIntents.create).toHaveBeenCalledWith(
      expect.objectContaining({ amount: 75000 }),
    );
  });

  it("grava o pagamento com status 'pending'", async () => {
    await service.createPayment({
      userId: "user-1",
      amount: 750,
      currency: "MZN",
    });

    expect(paymentRepoFalso.create).toHaveBeenCalledWith(
      expect.objectContaining({ status: "pending" }),
    );
  });

  it("não grava o pagamento se a Stripe falhar", async () => {
    // em vez de resolver, agora rejeita
    stripeFalsa.paymentIntents.create = vi
      .fn()
      .mockRejectedValue(new Error("Stripe recusou o pagamento"));

    // Espera-se que createPayment ATIRE  erro
    await expect(
      service.createPayment({ userId: "user-1", amount: 750, currency: "MZN" }),
    ).rejects.toThrow("Stripe recusou o pagamento");

    // Stripe falhou, o pagamento não deve ter sido gravado
    expect(paymentRepoFalso.create).not.toHaveBeenCalled();
  });
});
