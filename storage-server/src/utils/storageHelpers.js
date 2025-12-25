import fs from 'fs';
import path from 'path';
import { FILE_STRUCTURE } from '../config/fileStructure.js';
import config from '../config/index.js';
import { formatSize } from './fileHelpers.js';

/**
 * Create all necessary directories
 */
export const createDirectories = () => {
    // Create temp directory
    if (!fs.existsSync(config.tempDir)) {
        fs.mkdirSync(config.tempDir, { recursive: true });
    }

    // Create all structured directories
    Object.values(FILE_STRUCTURE).forEach(category => {
        Object.values(category).forEach(dirPath => {
            const fullPath = path.join(config.uploadDir, dirPath);
            if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath, { recursive: true });
                console.log(`✅ Created directory: ${dirPath}`);
            }
        });
    });
};

/**
 * Calculate directory size recursively
 */
const calculateDirSize = (dirPath) => {
    let size = 0;
    if (!fs.existsSync(dirPath)) return 0;
    
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isDirectory()) {
            size += calculateDirSize(filePath);
        } else {
            size += stats.size;
        }
    });
    
    return size;
};

/**
 * Get storage information
 */
export const getStorageInfo = () => {
    const totalSize = calculateDirSize(config.uploadDir);
    
    return {
        totalSize: formatSize(totalSize),
        totalSizeBytes: totalSize
    };
};

/**
 * Count files in directory
 */
export const countFiles = (dirPath) => {
    let count = 0;
    if (!fs.existsSync(dirPath)) return 0;
    
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);
        if (stats.isFile()) count++;
    });
    return count;
};

/**
 * Scan directory and return file list
 */
export const scanDirectory = (dirPath, relativePath, baseUrl) => {
    const files = [];
    
    if (!fs.existsSync(dirPath)) return files;
    
    const fileList = fs.readdirSync(dirPath);
    
    fileList.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isFile()) {
            files.push({
                name: file,
                path: relativePath,
                size: stats.size,
                created: stats.birthtime,
                modified: stats.mtime,
                url: `${baseUrl}/files/${relativePath}/${file}`
            });
        }
    });
    
    return files;
};
