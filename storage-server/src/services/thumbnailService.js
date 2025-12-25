import sharp from 'sharp';
import path from 'path';
import config from '../config/index.js';
import { getFileExtension } from '../utils/fileHelpers.js';

/**
 * Create thumbnail for image
 * @param {string} imagePath - Full path to original image
 * @param {string} fileName - Generated filename
 * @returns {Promise<string|null>} - Thumbnail URL or null if failed
 */
export const createThumbnail = async (imagePath, fileName) => {
    try {
        const ext = getFileExtension(fileName);
        
        // Skip SVG files
        if (ext === 'svg') {
            return null;
        }
        
        const thumbnailDir = path.join(config.uploadDir, 'images', 'thumbnails');
        const thumbnailPath = path.join(thumbnailDir, fileName);
        
        await sharp(imagePath)
            .resize(300, 300, { 
                fit: 'inside', 
                withoutEnlargement: true 
            })
            .jpeg({ quality: 80 })
            .toFile(thumbnailPath);
        
        return `${config.baseUrl}/files/images/thumbnails/${fileName}`;
    } catch (error) {
        console.warn('Thumbnail creation failed:', error.message);
        return null;
    }
};

export default { createThumbnail };
