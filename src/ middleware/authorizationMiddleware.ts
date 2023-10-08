import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId; 

    if (!userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.role !== 'ADMIN') { 
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
