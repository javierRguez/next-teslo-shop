"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderByUser = async () => {
  try {
    const session = await auth();
    if (!session?.user) {
      return {
        ok: false,
        message: "Debe de estar autenticado",
      };
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return {
      ok: true,
      orders: orders,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: error,
    };
  }
};
