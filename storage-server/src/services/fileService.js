import fs from 'fs';
import path from 'path';
import config from '../config/index.js';
import { FILE_STRUCTURE } from '../config/fileStructure.js';
import { scanDirectory, countFiles } from '../utils/storageHelpers.js';

/**
 * List files with optional filtering
 */
export const listFiles = (category = null, purpose = null) => {
    const allFiles = [];
    
    if (category && purpose) {
        // Specific category and purpose
        if (FILE_STRUCTURE[category] && FILE_STRUCTURE[category][purpose]) {
            const relativePath = FILE_STRUCTURE[category][purpose];
            const dirPath = path.join(config.uploadDir, relativePath);
            const files = scanDirectory(dirPath, relativePath, config.baseUrl);
            allFiles.push(...files);
        }
    } else if (category) {
        // All purposes in category
        if (FILE_STRUCTURE[category]) {
            Object.values(FILE_STRUCTURE[category]).forEach(relativePath => {
                const dirPath = path.join(config.uploadDir, relativePath);
                const files = scanDirectory(dirPath, relativePath, config.baseUrl);
                allFiles.push(...files);
            });
        }
    } else {
        // All files
        Object.values(FILE_STRUCTURE).forEach(categoryObj => {
            Object.values(categoryObj).forEach(relativePath => {
                const dirPath = path.join(config.uploadDir, relativePath);
                const files = scanDirectory(dirPath, relativePath, config.baseUrl);
                allFiles.push(...files);
            });
        });
    }
    
    // Sort by created date (newest first)
    allFiles.sort((a, b) => new Date(b.created) - new Date(a.created));
    
    return allFiles;
};

/**
 * Delete file
 */
export const deleteFile = (filePath) => {
    const fullPath = path.join(config.uploadDir, filePath);
    
    if (!fs.existsSync(fullPath)) {
        throw new Error('File not found');
    }
    
    fs.unlinkSync(fullPath);
    
    // Delete thumbnail if exists
    const fileName = path.basename(filePath);
    const thumbnailPath = path.join(config.uploadDir, 'images', 'thumbnails', fileName);
    if (fs.existsSync(thumbnailPath)) {
        fs.unlinkSync(thumbnailPath);
    }
    
    return true;
};

/**
 * Get file statistics by category and purpose
 */
export const getFileStats = () => {
    const fileStats = {};
    
    Object.keys(FILE_STRUCTURE).forEach(category => {
        fileStats[category] = {};
        Object.keys(FILE_STRUCTURE[category]).forEach(purpose => {
            const dirPath = path.join(config.uploadDir, FILE_STRUCTURE[category][purpose]);
            fileStats[category][purpose] = countFiles(dirPath);
        });
    });
    
    return fileStats;
};

export default {
    listFiles,
    deleteFile,
    getFileStats
};
