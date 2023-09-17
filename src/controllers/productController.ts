import { PrismaClient } from "@prisma/client";
import { ProductData, UpdatedProductData } from "../types/productTypes";

const prisma = new PrismaClient();

export const createProduct = async (productData: ProductData) => {
  return prisma.product.create({
    data: productData
  });
};

export const getProduct = async (productId: string) => {
  return prisma.product.findUnique({
    where: {
      id: productId
    }
  });
};

export const updateProduct = async (productId: string, updatedData: UpdatedProductData) => {
  return prisma.product.update({
    where: {
      id: productId
    },
    data: updatedData
  });
};

export const deleteProduct = async (productId: string) => {
  return prisma.product.delete({
    where: {
      id: productId
    }
  });
};

export const getAllProducts = async () => {
  return prisma.product.findMany();
};
