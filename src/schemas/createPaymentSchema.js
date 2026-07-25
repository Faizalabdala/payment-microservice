const { z } = require("zod");

const createPaymentSchema = z.object({
  userId: z.string().min(1, "UserId é obrigatório"),
  amount: z.number().positive("O valor deve ser maior que zero"),
  currency: z.string().optional(),
});

module.exports = { createPaymentSchema };
