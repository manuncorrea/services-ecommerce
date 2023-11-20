import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginUserParams, RegisterUserParams } from "../types/userTypes";

const prisma = new PrismaClient();

export const registerUser = async ({email, password, name, cpf, address}: RegisterUserParams) => {
  const existingUser = await prisma.user.findUnique({ where: { email }});
  if (existingUser) {
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      cpf,
      address
    }
  });
};

export const loginUser = async ({email, password}: LoginUserParams) => {
  const user = await prisma.user.findUnique({ where: { email }});

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Password mismatch');
  }

  if (!process.env.JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY is not defined');
  }

  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true
    }
  });
};

export const getUserById = async(userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId
    }
  })
};
