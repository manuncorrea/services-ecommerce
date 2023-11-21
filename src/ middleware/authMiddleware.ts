import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  iat: number;
  exp: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    console.log('Usuário logado:', req.userId);

    if (typeof decoded !== 'object' || decoded === null || !('userId' in decoded)) {
      throw new Error('Token is invalid');
    }

    const tokenPayload = decoded as TokenPayload;

    req.userId = tokenPayload.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
