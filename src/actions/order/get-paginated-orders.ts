"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getpaginatedOrders = async () => {
  try {
    const session = await auth();
    if (session?.user.role !== "admin") {
      return {
        ok: false,
        message: "Debe de estar autenticado",
      };
    }

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
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
