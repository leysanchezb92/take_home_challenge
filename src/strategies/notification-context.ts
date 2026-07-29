import { Channel } from '@prisma/client';
import { NotificationStrategy, EmailStrategy, PushStrategy, SmsStrategy } from './notification-strategy.interface';

export class NotificationContext {
  private static strategies: Record<Channel, NotificationStrategy> = {
    [Channel.EMAIL]: new EmailStrategy(),
    [Channel.SMS]: new SmsStrategy(),
    [Channel.PUSH]: new PushStrategy(),
  };

  static getStrategy(channel: Channel): NotificationStrategy {
    const strategy = this.strategies[channel];
    if (!strategy) {
      throw new Error(`Notification channel not supported: ${channel}`);
    }
    return strategy;
  }
}