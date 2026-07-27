import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_ACCESS = process.env.JWT_ACCESS || 'secret_fallback';

export interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_ACCESS) as { id?: string; userId?: string };

        req.user = {
            id: decoded.id || decoded.userId || ''
        };

        next();
    } catch (error) {
        return res.status(403).json({ error: 'invalid or expired token' });
    }
};