"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (orderId: string) => {
  const session = await auth();
  if (!session?.user) {
    return {
      ok: false,
      message: "Debe de estar autenticado",
    };
  }
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    // Validaciones
    if (!order) throw new Error(`${orderId} no existe`);

    if (session.user.role === "user") {
      if (session.user.id !== order.userId) {
        throw new Error(`${orderId} no es de ese usuario`);
      }
    }

    return {
      ok: true,
      order,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo recuperar la orden",
    };
  }
};
