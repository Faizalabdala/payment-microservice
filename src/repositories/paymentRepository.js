const prisma = require("../lib/prisma");

class PaymentRepository {
  async create(data) {
    return prisma.payment.create({ data });
  }

  async findById(id) {
    return prisma.payment.findUnique({ where: { id } });
  }
}

module.exports = new PaymentRepository();
