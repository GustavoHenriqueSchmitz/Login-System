/*
  Warnings:

  - You are about to alter the column `email` on the `token` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(80)`.
  - A unique constraint covering the columns `[token]` on the table `token` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `token` MODIFY `token` VARCHAR(700) NOT NULL,
    MODIFY `email` VARCHAR(80) NOT NULL;

-- CreateTable
CREATE TABLE `recoverPassword` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(700) NOT NULL,
    `email` VARCHAR(80) NOT NULL,

    UNIQUE INDEX `token`(`token`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `token` ON `token`(`token`);
