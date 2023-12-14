/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `item_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `reporter` on the `items` table. All the data in the column will be lost.
  - The `id` column on the `items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `categoryId` column on the `items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `tags` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `item_id` on the `item_tags` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tag_id` on the `item_tags` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "item_tags" DROP CONSTRAINT "item_tags_item_id_fkey";

-- DropForeignKey
ALTER TABLE "item_tags" DROP CONSTRAINT "item_tags_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_categoryId_fkey";

-- DropIndex
DROP INDEX "items_reporter_idx";

-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "item_tags" DROP CONSTRAINT "item_tags_pkey",
DROP COLUMN "item_id",
ADD COLUMN     "item_id" INTEGER NOT NULL,
DROP COLUMN "tag_id",
ADD COLUMN     "tag_id" INTEGER NOT NULL,
ADD CONSTRAINT "item_tags_pkey" PRIMARY KEY ("item_id", "tag_id");

-- AlterTable
ALTER TABLE "items" DROP CONSTRAINT "items_pkey",
DROP COLUMN "reporter",
ADD COLUMN     "newspaperId" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "categoryId",
ADD COLUMN     "categoryId" INTEGER,
ADD CONSTRAINT "items_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tags" DROP CONSTRAINT "tags_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tags_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "newspapers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "newspapers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "newspapers_name_key" ON "newspapers"("name");

-- CreateIndex
CREATE INDEX "newspapers_name_idx" ON "newspapers"("name");

-- CreateIndex
CREATE INDEX "item_tags_item_id_idx" ON "item_tags"("item_id");

-- CreateIndex
CREATE INDEX "item_tags_tag_id_idx" ON "item_tags"("tag_id");

-- CreateIndex
CREATE INDEX "items_categoryId_idx" ON "items"("categoryId");

-- CreateIndex
CREATE INDEX "items_newspaperId_idx" ON "items"("newspaperId");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_newspaperId_fkey" FOREIGN KEY ("newspaperId") REFERENCES "newspapers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_tags" ADD CONSTRAINT "item_tags_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_tags" ADD CONSTRAINT "item_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
