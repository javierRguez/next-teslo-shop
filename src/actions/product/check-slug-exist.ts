"use server";
import prisma from "@/lib/prisma";

export const checkSlugExist = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({ where: { slug } });

    console.log(!!product);
    return !!product;
  } catch (error) {
    console.log(error);
    return false;
  }
};
