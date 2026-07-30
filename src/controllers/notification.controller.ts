import { Request, Response } from 'express';
import { NotificationService } from '../service/notification.service';

export class NotificationController {

    static async create(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id;
            const { title, content, channel } = req.body;

            if (!userId) {
                return res.status(401).json({ error: 'No authorized user' });
            }

            if (!title || !content || !channel) {
                return res.status(400).json({ error: 'title, content, and channel are required' });
            }

            const notification = await NotificationService.create({
                userId,
                title,
                content,
                channel
            });

            return res.status(201).json(notification);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async getAllByUser(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id;

            if (!userId) {
                return res.status(401).json({ error: 'No authorized user' });
            }

            const notifications = await NotificationService.getAllByUser({ userId });
            return res.status(200).json(notifications);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id;
            const { id } = req.params;
            const { title, content, read } = req.body;

            if (!userId) {
                return res.status(401).json({ error: 'No authorized user' });
            }

            const updatedNotification = await NotificationService.update(id, { userId }, {
                title,
                content,
                read
            });

            return res.status(200).json(updatedNotification);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id;
            const { id } = req.params;

            if (!userId) {
                return res.status(401).json({ error: 'No authorized user' });
            }

            await NotificationService.delete(id, { userId });
            return res.status(200).json({ message: 'Notification deleted successfully' });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}