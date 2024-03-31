/*
  Warnings:

  - You are about to drop the column `email` on the `token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `token` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `email` ON `token`;

-- AlterTable
ALTER TABLE `recoverPassword` MODIFY `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `token` DROP COLUMN `email`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `userId` ON `token`(`userId`);

-- AddForeignKey
ALTER TABLE `token` ADD CONSTRAINT `token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recoverPassword` ADD CONSTRAINT `recoverPassword_email_fkey` FOREIGN KEY (`email`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
