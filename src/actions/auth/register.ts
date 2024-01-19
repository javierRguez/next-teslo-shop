"use server";

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const registerUser = async (
  email: string,
  name: string,
  password: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return {
      ok: true,
      user: user,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.meta.target.includes("email")
        ? "El email ya está registrado"
        : "No se pudo crear el usuario",
    };
  }
};
