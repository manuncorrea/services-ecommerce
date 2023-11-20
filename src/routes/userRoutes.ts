import { Request, Response } from "express";
import * as userController from '../controllers/userController'; 
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

export const getById = async (req: Request, res: Response) => {
  try {
    const user = await userController.getUserById(req.params.id);
    if(user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await userController.deleteUser(req.params.id)
    res.status(200).json({ message: "User deleted successfully"});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ message: errorMessage });
  }
};
