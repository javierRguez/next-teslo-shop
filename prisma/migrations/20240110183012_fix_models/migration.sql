/*
  Warnings:

  - Added the required column `title` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Size" ADD VALUE 'S';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "title" TEXT NOT NULL;
