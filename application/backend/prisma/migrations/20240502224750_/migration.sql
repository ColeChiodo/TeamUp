/*
  Warnings:

  - You are about to drop the column `team_id` on the `game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `game` DROP COLUMN `team_id`,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `imageUrl` VARCHAR(191) NULL;
