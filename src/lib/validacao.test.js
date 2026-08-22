const { valorehvalido } = require("./validacao");

describe("valorehvalido", () => {
  it("valor acima do minimo", () => {
    expect(valorehvalido(50)).toBe(true);
  });

  it("valor Igual ao minimo", () => {
    expect(valorehvalido(10)).toBe(true);
  });

  it("valor menor que o minimo", () => {
    expect(valorehvalido(9)).toBe(false);
  });
});
