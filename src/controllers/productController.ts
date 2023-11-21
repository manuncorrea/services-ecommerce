import { PrismaClient } from "@prisma/client";
import { ProductData, UpdatedProductData } from "../types/productTypes";

const prisma = new PrismaClient();

export const createProduct = async (productData: ProductData) => {
  const { categoryId, brandId } = productData;

  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  if (!category) {
    throw new Error('Category not found');
  }

  const brand = await prisma.brand.findUnique({
    where: {
      id: brandId,
    },
  });
  if (!brand) {
    throw new Error('Brand not found');
  }

  return prisma.product.create({
    data: productData,
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
