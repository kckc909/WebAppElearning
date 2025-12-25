import { ALLOWED_EXTENSIONS } from '../config/fileStructure.js';

/**
 * Get file extension from filename
 */
export const getFileExtension = (filename) => {
    return filename.split('.').pop().toLowerCase();
};

/**
 * Generate unique filename: yyyyMMddHHmmss + random(1-100)
 */
export const generateFileName = (originalName) => {
    const ext = getFileExtension(originalName);
    const now = new Date();
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const random = Math.floor(Math.random() * 100) + 1;
    
    return `${year}${month}${day}${hours}${minutes}${seconds}${random}.${ext}`;
};

/**
 * Get file category based on extension
 */
export const getFileCategory = (filename) => {
    const ext = getFileExtension(filename);
    
    for (const [category, extensions] of Object.entries(ALLOWED_EXTENSIONS)) {
        if (extensions.includes(ext)) {
            return category;
        }
    }
    
    return 'documents'; // Default category
};

/**
 * Check if file type is valid
 */
export const isValidFileType = (filename) => {
    const ext = getFileExtension(filename);
    const allAllowedExts = Object.values(ALLOWED_EXTENSIONS).flat();
    return allAllowedExts.includes(ext);
};

/**
 * Format bytes to human readable size
 */
export const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
