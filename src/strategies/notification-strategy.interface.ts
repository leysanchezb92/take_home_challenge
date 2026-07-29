export interface NotificationStrategy {
  send(to: string, title: string, content: string): Promise<boolean>;
}

const log = (prefix: string, to: string, title: string, content: string) =>
  console.log(`[${prefix}] To: ${to} | Title: ${title} | Body: ${content}`);

export class EmailStrategy implements NotificationStrategy {
  async send(to: string, title: string, content: string) {
    log('EMAIL SENT', to, title, content);
    return true;
  }
}

export class PushStrategy implements NotificationStrategy {
  async send(to: string, title: string, content: string) {
    log('PUSH SENT', to, title, content);
    return true;
  }
}

export class SmsStrategy implements NotificationStrategy {
  async send(to: string, title: string, content: string) {
    log('SMS SENT', to, title, content);
    return true;
  }
}