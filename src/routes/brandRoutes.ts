import { Request, Response } from "express";
import * as brandController from '../controllers/brandController';

export const create = async (req: Request, res: Response) => {
  try {
    const brand = await brandController.createBrand(req.body);
    res.status(201).json(brand);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const brands = await brandController.getAllBrands();
    res.json(brands);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const brand = await brandController.getBrand(req.params.id);
    if (brand) {
      res.json(brand);
    } else {
      res.status(404).json({ message: "Brand not found" });
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const brand = await brandController.updateBrand(req.params.id, req.body);
    res.json(brand);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await brandController.deleteBrand(req.params.id);
    res.status(204).send();
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
 
  }
}