/*
  Warnings:

  - You are about to drop the column `equipmentId` on the `EquipmentCategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EquipmentCategory" DROP CONSTRAINT "EquipmentCategory_equipmentId_fkey";

-- AlterTable
ALTER TABLE "Equipment" ADD COLUMN     "category_id" TEXT;

-- AlterTable
ALTER TABLE "EquipmentCategory" DROP COLUMN "equipmentId";

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "EquipmentCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
