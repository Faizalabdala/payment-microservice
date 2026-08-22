const prisma = require("../lib/prisma");

class NotificationRepository {
  async create(data) {
    return prisma.notification.create({ data });
  }
}

module.exports = new NotificationRepository();
