import path from 'path';
import config from '../config/index.js';
import { FILE_STRUCTURE } from '../config/fileStructure.js';
import { 
    isValidFileType, 
    getFileCategory, 
    generateFileName 
} from '../utils/fileHelpers.js';
import { createThumbnail } from './thumbnailService.js';

/**
 * Upload single file
 */
export const uploadSingleFile = async (file, purpose = 'other') => {
    // Validate file type
    if (!isValidFileType(file.name)) {
        throw new Error('Invalid file type');
    }
    
    const category = getFileCategory(file.name);
    const purposeDir = purpose || 'other';
    
    // Validate purpose exists in structure
    if (!FILE_STRUCTURE[category] || !FILE_STRUCTURE[category][purposeDir]) {
        throw new Error(`Invalid purpose '${purposeDir}' for category '${category}'`);
    }
    
    const fileName = generateFileName(file.name);
    const relativePath = FILE_STRUCTURE[category][purposeDir];
    const uploadPath = path.join(config.uploadDir, relativePath, fileName);
    
    // Move file
    await file.mv(uploadPath);
    
    // Create thumbnail for images
    let thumbnailUrl = null;
    if (category === 'images') {
        thumbnailUrl = await createThumbnail(uploadPath, fileName);
    }
    
    const fileUrl = `${config.baseUrl}/files/${relativePath}/${fileName}`;
    
    return {
        originalName: file.name,
        fileName: fileName,
        category: category,
        purpose: purposeDir,
        path: relativePath,
        size: file.size,
        url: fileUrl,
        thumbnailUrl: thumbnailUrl,
        uploadedAt: new Date().toISOString()
    };
};

/**
 * Upload multiple files
 */
export const uploadMultipleFiles = async (files, purpose = 'other') => {
    const fileArray = Array.isArray(files) ? files : [files];
    const uploadedFiles = [];
    const errors = [];
    
    for (const file of fileArray) {
        try {
            const result = await uploadSingleFile(file, purpose);
            uploadedFiles.push(result);
        } catch (error) {
            errors.push({ 
                file: file.name, 
                error: error.message 
            });
        }
    }
    
    return { uploadedFiles, errors };
};

export default {
    uploadSingleFile,
    uploadMultipleFiles
};
