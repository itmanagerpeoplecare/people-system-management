/*
  Warnings:

  - You are about to drop the column `nameProject` on the `titular` table. All the data in the column will be lost.
  - You are about to drop the `project` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `project` to the `titular` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `titular` DROP FOREIGN KEY `titular_nameProject_fkey`;

-- AlterTable
ALTER TABLE `titular` DROP COLUMN `nameProject`,
    ADD COLUMN `project` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `project`;
