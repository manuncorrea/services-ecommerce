import { Request, Response } from "express";
import * as userController from '../controllers/userController'; // Adicione esta linha
import { RegisterUserParams, LoginUserParams } from '../types/userTypes';

export const register = async (req: Request, res: Response) => {
  try {
    const userData: RegisterUserParams = req.body;
    const user = await userController.registerUser(userData);
    res.status(200).json(user);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ message: errorMessage });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const loginData: LoginUserParams = req.body;
    const token = await userController.loginUser(loginData);
    res.json({ token });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ message: errorMessage });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await userController.getAllUsers();
    res.json(users);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};
