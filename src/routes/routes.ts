import express from 'express';
import * as userRoutes from './userRoutes';
import * as productRoutes from './productRoutes';
import * as categoryRoutes from './categoryRoutes';
import * as brandRoutes from './brandRoutes';
import * as orderRoutes from './orderRoutes'; 
import { authMiddleware } from '../ middleware/authMiddleware';
import { validateProductDataMiddleware } from '../ middleware/validateProductDataMiddleware';


const router = express.Router();

// User routes
router.post('/api/register', userRoutes.register);
router.post('/api/login', userRoutes.login);

// Product routes
router.post('/api/products', authMiddleware, validateProductDataMiddleware, productRoutes.create); 
router.get('/api/products/:id', productRoutes.get); 
router.put('/api/products/:id', authMiddleware, productRoutes.update); 
router.delete('/api/products/:id', authMiddleware, productRoutes.remove); 
router.get('/api/products', productRoutes.getAll); 

// Category routes
router.post('/api/categories', categoryRoutes.create);
router.get('/api/categories', categoryRoutes.getAll);
router.get('/api/categories/:id', categoryRoutes.get);
router.put('/api/categories/:id', categoryRoutes.update);
router.delete('/api/categories/:id', categoryRoutes.remove);

// Brand routes
router.post('/api/brands', brandRoutes.create);
router.get('/api/brands', brandRoutes.getAll);
router.get('/api/brands/:id', brandRoutes.get);
router.put('/api/brands/:id', brandRoutes.update);
router.delete('/api/brands/:id', brandRoutes.remove);

// Order routes
router.post('/api/orders', authMiddleware, orderRoutes.create); 
router.get('/api/orders/:id', authMiddleware, orderRoutes.get); 
router.put('/api/orders/:id', authMiddleware, orderRoutes.update); 
router.delete('/api/orders/:id', authMiddleware, orderRoutes.remove); 

export default router;
