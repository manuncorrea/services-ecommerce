import { Request, Response, NextFunction } from 'express';

export const validateCategoryDataMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: 'Invalid category data' });
  }

  next();
};
