import { PrismaClient, OrderStatus } from "@prisma/client";
import { OrderData, UpdateOrderData } from "../types/orderTypes";

const prisma = new PrismaClient();

export const createOrder = async (orderData: OrderData) => {
  return prisma.$transaction(async (prisma) => {
    const user = await prisma.user.findUnique({
      where: { id: orderData.userId }
    });

    if(!user) {
      throw new Error('User not found');
    }

    const order = await prisma.order.create({
      data: {
        userId: orderData.userId,
        status: OrderStatus.PREPARING  
      }
    });

    const orderItems = orderData.items.map(async (item) => {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        select: { price: true, stock: true }
      });

      if(!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for product with ID ${item.productId}`);
      }

      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
        }
      });

      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    });

    await Promise.all(orderItems);

    return order;
  });
};

export const getOrder = async (orderId: string) => {
  return prisma.order.findUnique({
    where: { id: orderId }
  });
};

export const updateOrderItems = async (orderId: string, items: { productId: string; quantity: number; }[]) => {
  return prisma.$transaction(items.map(item => 
    prisma.orderItem.updateMany({
      where: { orderId, productId: item.productId },
      data: { quantity: item.quantity }
    })
  ));
};

export const updateOrder = async (orderId: string, updateData: UpdateOrderData) => {
  const { items, ...otherUpdates } = updateData;

  await prisma.order.update({
    where: { id: orderId },
    data: otherUpdates
  });

  if (items) {
    await updateOrderItems(orderId, items);
  }
};

export const deleteOrder = async (orderId: string) => {
  return prisma.order.delete({
    where: { id: orderId }
  });
};
