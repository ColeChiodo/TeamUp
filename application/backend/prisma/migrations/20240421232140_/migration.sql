/*
  Warnings:

  - You are about to drop the `adminteam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `adminteam` DROP FOREIGN KEY `AdminTeam_admin_id_fkey`;

-- DropForeignKey
ALTER TABLE `adminteam` DROP FOREIGN KEY `AdminTeam_team_id_fkey`;

-- DropTable
DROP TABLE `adminteam`;
