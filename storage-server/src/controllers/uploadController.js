import { uploadSingleFile, uploadMultipleFiles } from '../services/uploadService.js';

/**
 * Upload single file
 * POST /upload
 */
export const upload = async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        const file = req.files.file;
        const { purpose } = req.body;
        
        const result = await uploadSingleFile(file, purpose);
        
        res.json({
            success: true,
            message: 'File uploaded successfully',
            file: result
        });
        
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ 
            error: 'Upload failed', 
            details: error.message 
        });
    }
};

/**
 * Upload multiple files
 * POST /upload-multiple
 */
export const uploadMultiple = async (req, res) => {
    try {
        if (!req.files || !req.files.files) {
            return res.status(400).json({ error: 'No files uploaded' });
        }
        
        const files = req.files.files;
        const { purpose } = req.body;
        
        const { uploadedFiles, errors } = await uploadMultipleFiles(files, purpose);
        
        res.json({
            success: uploadedFiles.length > 0,
            message: `${uploadedFiles.length} files uploaded${errors.length > 0 ? `, ${errors.length} failed` : ''}`,
            files: uploadedFiles,
            errors: errors.length > 0 ? errors : undefined
        });
        
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ 
            error: 'Upload failed', 
            details: error.message 
        });
    }
};

export default {
    upload,
    uploadMultiple
};
