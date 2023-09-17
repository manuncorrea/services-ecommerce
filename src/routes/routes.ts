import express from 'express';
import * as userRoutes from './userRoutes';
import * as productRoutes from './productRoutes';  

const router = express.Router();

// User routes
router.post('/api/register', userRoutes.register);
router.post('/api/login', userRoutes.login);

// Product routes
router.post('/api/products', productRoutes.create);
router.get('/api/products/:id', productRoutes.get);
router.put('/api/products/:id', productRoutes.update);
router.delete('/api/products/:id', productRoutes.remove);
router.get('/api/products', productRoutes.getAll);

export default router;
