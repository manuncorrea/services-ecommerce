import { Request, Response } from "express";
import * as productController from '../controllers/productController';

export const create = async (req: Request, res: Response) => {
  try {
    const product = await productController.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};


export const update = async (req: Request, res: Response) => {
  try {
    const product = await productController.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await productController.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const products = await productController.getAllProducts();
    res.json(products);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};
