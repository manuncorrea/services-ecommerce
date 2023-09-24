import { Request, Response } from "express";
import * as categoryController from '../controllers/categoryController';

export const create = async (req: Request, res: Response) => {
  try {
    const category = await categoryController.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const categories = await categoryController.getAllCategories();
    res.json(categories);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const category = await categoryController.getCategory(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const category = await categoryController.updateCategory(req.params.id, req.body);
    res.json(category);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await categoryController.deleteCategory(req.params.id);
    res.status(204).send();
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};
