import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBrand = async (brandData: { name: string }) => {
  return prisma.brand.create({
    data: brandData
  });
};

export const getAllBrands = async () => {
  return prisma.brand.findMany();
};

export const getBrand = async (brandId: string) => {
  return prisma.brand.findUnique({
    where: {
      id: brandId
    }
  });
};

export const updateBrand = async (brandId: string, updatedData: { name: string }) => {
  return prisma.brand.update({
    where: {
      id: brandId
    },
    data: updatedData
  });
};

export const deleteBrand = async (brandId: string) => {
  return prisma.brand.delete({
    where: {
      id: brandId
    }
  });
};
