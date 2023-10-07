import { PrismaClient, OrderStatus } from "@prisma/client";

const prisma = new PrismaClient();

export interface OrderData {
  userId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}

export interface UpdateOrderData {
  status?: OrderStatus;
  deliveryAddress?: string;
  deliveryDate?: string; 
  note?: string;
  paymentMethod?: string;
  items?: {
    productId: string;
    quantity: number;
  }[];
}
