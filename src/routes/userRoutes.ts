import { Request, Response } from "express";
import { registerUser, loginUser } from '../controllers/userController';
import { RegisterUserParams, LoginUserParams } from '../types/userTypes';

export const register = async (req: Request, res: Response) => {
  try {
    const userData: RegisterUserParams = req.body;
    const user = await registerUser(userData);
    res.status(200).json(user);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ message: errorMessage });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const loginData: LoginUserParams = req.body;
    const token = await loginUser(loginData);
    res.json({ token });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ message: errorMessage });
  }
};
