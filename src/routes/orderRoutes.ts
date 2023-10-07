import { Request, Response } from 'express';
import * as orderController from '../controllers/orderController';
import { OrderData, UpdateOrderData } from '../types/orderTypes';

export const create = async (req: Request, res: Response) => {
  try {
    const orderData: OrderData = req.body;
    const order = await orderController.createOrder(orderData);
    res.status(201).json(order);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ message: errorMessage });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const order = await orderController.getOrder(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ message: errorMessage });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const updateData: UpdateOrderData = req.body;
    await orderController.updateOrder(req.params.id, updateData);
    res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ message: errorMessage });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await orderController.deleteOrder(req.params.id);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ message: errorMessage });
  }
};
