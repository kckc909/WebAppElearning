-- Add approval workflow fields to courses table
ALTER TABLE `courses` 
ADD COLUMN `rejection_reason` TEXT NULL COMMENT 'Lý do từ chối duyệt',
ADD COLUMN `reviewed_at` DATETIME(0) NULL COMMENT 'Thời gian admin duyệt/từ chối',
ADD COLUMN `reviewed_by` INT NULL COMMENT 'ID của admin duyệt/từ chối',
ADD COLUMN `submitted_at` DATETIME(0) NULL COMMENT 'Thời gian giảng viên submit';

-- Add index for reviewed_by
CREATE INDEX `courses_reviewed_by_idx` ON `courses`(`reviewed_by`);
