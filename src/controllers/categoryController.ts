import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCategory = async (categoryData: { name: string }) => {
  return prisma.category.create({
    data: categoryData
  });
};

export const getAllCategories = async () => {
  return prisma.category.findMany();
};

export const getCategory = async (categoryId: string) => {
  return prisma.category.findUnique({
    where: {
      id: categoryId
    }
  });
};

export const updateCategory = async (categoryId: string, updatedData: { name: string }) => {
  return prisma.category.update({
    where: {
      id: categoryId
    },
    data: updatedData
  });
};

export const deleteCategory = async (categoryId: string) => {
  return prisma.category.delete({
    where: {
      id: categoryId
    }
  });
};
