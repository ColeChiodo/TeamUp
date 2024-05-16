/*
  Warnings:

  - You are about to drop the column `user_id` on the `Review` table. All the data in the column will be lost.
  - Added the required column `recipientId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewerId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_user_id_fkey`;

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `user_id`,
    ADD COLUMN `recipientId` INTEGER NOT NULL,
    ADD COLUMN `reviewerId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `GameLocationReview` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `gameLocationId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_reviewerId_fkey` FOREIGN KEY (`reviewerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_recipientId_fkey` FOREIGN KEY (`recipientId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameLocationReview` ADD CONSTRAINT `GameLocationReview_gameLocationId_fkey` FOREIGN KEY (`gameLocationId`) REFERENCES `GameLocation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameLocationReview` ADD CONSTRAINT `GameLocationReview_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
