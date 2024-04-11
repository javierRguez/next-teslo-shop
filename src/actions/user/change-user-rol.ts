"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const ChangeUserRole = async (
  userId: string,
  role: "admin" | "user"
) => {
  try {
    const session = await auth();
    if (session?.user.role !== "admin") {
      return {
        ok: false,
        message: "Debe estar autenticado como admin",
      };
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        role: role,
      },
    });

    revalidatePath("/admin/users");

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: error,
    };
  }
};
