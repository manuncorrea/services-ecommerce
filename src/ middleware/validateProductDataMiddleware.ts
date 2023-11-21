import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateProductDataMiddleware = [
  body('name').isString().withMessage('Name must be a string'),
  body('description').isString().withMessage('Description must be a string'),
  body('images').isArray().withMessage('Images must be an array'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  body('stock').isInt({ gt: 0 }).withMessage('Stock must be a positive integer'),
  body('color').isString().withMessage('Color must be a string'),
  body('isVisible').isBoolean().withMessage('isVisible must be a boolean'),
  body('categoryId').isUUID().withMessage('categoryId must be a UUID'),
  body('brandId').isUUID().withMessage('brandId must be a UUID'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if(!errors.isEmpty) {
      return res.status(400).json({errors: errors.array()});
    }

    next();
  }
]