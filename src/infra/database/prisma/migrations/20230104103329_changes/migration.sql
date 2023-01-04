-- CreateEnum
CREATE TYPE "registration_steps" AS ENUM ('PENDING', 'VERIFIED');

-- CreateEnum
CREATE TYPE "role_types" AS ENUM ('ADMIN', 'STUDENT', 'INSTRUCTOR');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "registration_step" "registration_steps" NOT NULL DEFAULT 'PENDING',
    "account_verification_code" VARCHAR(6),
    "account_verification_code_expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "type" "role_types" NOT NULL DEFAULT 'STUDENT',
    "description" VARCHAR(200),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_user_roles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_id_key" ON "roles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_user_roles_AB_unique" ON "_user_roles"("A", "B");

-- CreateIndex
CREATE INDEX "_user_roles_B_index" ON "_user_roles"("B");

-- AddForeignKey
ALTER TABLE "_user_roles" ADD CONSTRAINT "_user_roles_A_fkey" FOREIGN KEY ("A") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_roles" ADD CONSTRAINT "_user_roles_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
