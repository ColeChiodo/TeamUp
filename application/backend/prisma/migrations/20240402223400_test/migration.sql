-- DropForeignKey
ALTER TABLE `Game` DROP FOREIGN KEY `Game_team_id_fkey`;

-- CreateTable
CREATE TABLE `GameOnTeam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `team_id` INTEGER NOT NULL,
    `game_id` INTEGER NOT NULL,

    UNIQUE INDEX `GameOnTeam_team_id_game_id_key`(`team_id`, `game_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GameOnTeam` ADD CONSTRAINT `GameOnTeam_team_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameOnTeam` ADD CONSTRAINT `GameOnTeam_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
