-- Add certificate_threshold field to courses table
-- This field determines the minimum progress percentage required to claim certificate
-- Default is 100 (must complete 100% of the course)

ALTER TABLE `courses` 
ADD COLUMN `certificate_threshold` INT NOT NULL DEFAULT 100 
COMMENT 'Minimum progress percentage (0-100) required to claim certificate' 
AFTER `total_students`;

-- Update existing courses to have 100% threshold
UPDATE `courses` SET `certificate_threshold` = 100 WHERE `certificate_threshold` IS NULL;
