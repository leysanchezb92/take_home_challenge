import { prisma } from '../config/db';
import { NotificationContext } from '../strategies/notification-context';

export interface NotificationObj {
  userId: string;
  title: string;
  content: string;
  channel: 'EMAIL' | 'SMS' | 'PUSH';
}

export class NotificationService {
  static async create(data: NotificationObj) {
    const notification = await prisma.notification.create({
      data: {
        title: data.title,
        content: data.content,
        channel: data.channel,
        userId: data.userId,
        status: 'PENDING',
      },
      include: {
        user: true,
      },
    });

    this.processNotification(
      notification.id,
      notification.user.email,
      data.title,
      data.content,
      data.channel
    ).catch((error) => {
      console.error('Error processing notification in background:', error);
    });

    return notification;
  }

  static async processNotification(
    notificationId: string,
    recipient: string,
    title: string,
    content: string,
    channel: 'EMAIL' | 'SMS' | 'PUSH'
  ) {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
      include: { user: true },
    });

    if (!notification) {
      throw new Error('Notification not found');
    }

    const strategy = NotificationContext.getStrategy(channel);

    try {
      const success = await strategy.send(recipient, title, content);

      if (success) {
        await prisma.notification.update({
          where: { id: notification.id },
          data: { status: 'SENT' },
        });

        await prisma.notificationLog.create({
          data: {
            notificationId: notification.id,
            channel: channel,
            details: `Success: ${recipient}`,
          },
        });
      }
    } catch (error: any) {
      await prisma.notification.update({
        where: { id: notification.id },
        data: { status: 'FAILED' },
      });

      await prisma.notificationLog.create({
        data: {
          notificationId: notification.id,
          channel: channel,
          details: `Sending error: ${error.message}`,
        },
      });
    }

    return notification;
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