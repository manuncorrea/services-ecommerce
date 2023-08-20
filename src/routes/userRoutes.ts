import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const register = async(req: Request, res: Response) => {
  try {
    const { email, password, name, cpf, address } = req.body;

    const extistingUser = await prisma.user.findUnique({ where: { email }});

    if(extistingUser) {
      return res.status(400).json({ message: 'User already exists'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        cpf,
        address
      },
  });

  res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: 'Register: Server error' });
  }
};

export const login = async(req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email }});

    if(!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return res.status(400).json({ message: 'Password mismatch' });
    }

    if (!process.env.JWT_SECRET_KEY) {
      throw new Error('JWT_SECRET_KEY is not defined');
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  
    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: 'Login: Server error' });
  }
}