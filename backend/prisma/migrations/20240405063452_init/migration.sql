-- DropForeignKey
ALTER TABLE `house` DROP FOREIGN KEY `House_userId_fkey`;

-- AlterTable
ALTER TABLE `house` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `House` ADD CONSTRAINT `House_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
