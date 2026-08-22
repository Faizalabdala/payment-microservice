const { notificarPagamento } = require("./notificador");

describe("notificarPagamento", () => {
  it("chama o servico com a mensagem correcta", () => {
    const servicoFalso = { enviar: vi.fn() };
    notificarPagamento(servicoFalso, "pay-123");
    expect(servicoFalso.enviar).toHaveBeenCalledWith(
      "Pagamento pay-123 criado",
    );
  });

  it("chama apenas uma vez", () => {
    const servicoFalso = { enviar: vi.fn() };
    notificarPagamento(servicoFalso, "pay-321");
    expect(servicoFalso.enviar).toHaveBeenCalledTimes(1);
  });
});
