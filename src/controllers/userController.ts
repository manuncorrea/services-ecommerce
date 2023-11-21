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

  const newAddress = await prisma.address.create({
    data: {
      ...address, 
    }
  })

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      cpf,
      addressId: newAddress.id,
    }
  });

  await prisma.address.update({
    where: { id: newAddress.id },
    data: { userId: user.id }
  });

  return user;
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
    },

    include: {
      userAddress: true
    }
  })
};

export const deleteUser = async(userId: string) => {
  return prisma.user.delete({
    where: {
      id: userId
    }
  })
};

export const getUserAddress = async(userId: string) => {
  const userWithAddress = await prisma.user.findUnique({
    where: {
      id: userId
    },

    include: {
      userAddress: true,
    }
  });

  if(!userWithAddress) {
    throw new Error("User not found")
  }

  return userWithAddress.userAddress
};
