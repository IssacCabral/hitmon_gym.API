-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password_reset_code" VARCHAR(6),
ADD COLUMN     "password_reset_code_expires_at" TIMESTAMP(3);
