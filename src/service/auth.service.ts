import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/db';

const JWT_SECRET = process.env.JWT_ACCESS || 'secret_fallback';

interface User {
  id: string;
  email: string;
}

export class AuthService {
  static async register(email: string, password: string): Promise<User> {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return { id: user.id, email: user.email };
  }

  static async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('invalid credentials');
    }

    // JWT Token (24 hours expiration time)
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '24h',
    });

    return { token, user: { id: user.id, email: user.email } };
  }
}