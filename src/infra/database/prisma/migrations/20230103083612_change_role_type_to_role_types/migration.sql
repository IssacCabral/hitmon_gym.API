/*
  Warnings:

  - The `type` column on the `Role` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RoleTypes" AS ENUM ('ADMIN', 'STUDENT', 'INSTRUCTOR');

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "type",
ADD COLUMN     "type" "RoleTypes" NOT NULL DEFAULT 'STUDENT';

-- DropEnum
DROP TYPE "RoleType";
