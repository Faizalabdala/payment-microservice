const prisma = require("../lib/prisma");

class NotificationRepository {
  async createNotification(data) {
    return prisma.Notification.create({ data });
  }
}

module.exports = new NotificationRepository();
