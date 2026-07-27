import { prisma } from '../config/db';

export interface NotificationObj {
  userId: string;
  title: string;
  content: string;
  channel: 'EMAIL' | 'SMS' | 'PUSH'
}

export class NotificationService {
  static async create(data: NotificationObj) {
    return await prisma.notification.create({
      data: {
        title: data.title,
        content: data.content,
        channel: data.channel,
        userId: data.userId,
      },
    });
  }

  static async getAllByUser(notificationObj: { userId: string }) {
    return await prisma.notification.findMany({
      where: { userId: notificationObj.userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async update(
    id: string,
    notificationObj: { userId: string },
    data: { title?: string; content?: string; read?: boolean }
  ) {
    const notification = await prisma.notification.findFirst({
      where: { id, userId: notificationObj.userId },
    });

    if (!notification) {
      throw new Error('notification not found or not authorized');
    }

    return await prisma.notification.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string, notificationObj: { userId: string }) {
    const notification = await prisma.notification.findFirst({
      where: { id, userId: notificationObj.userId },
    });

    if (!notification) {
      throw new Error('notification not found or not authorized');
    }

    return await prisma.notification.delete({
      where: { id },
    });
  }
}