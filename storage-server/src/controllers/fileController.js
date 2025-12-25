import { listFiles, deleteFile, getFileStats } from '../services/fileService.js';
import { getStorageInfo } from '../utils/storageHelpers.js';
import { FILE_STRUCTURE } from '../config/fileStructure.js';
import config from '../config/index.js';

/**
 * List files
 * GET /api/files?category=images&purpose=courses
 */
export const list = (req, res) => {
    try {
        const { category, purpose } = req.query;
        const files = listFiles(category, purpose);
        
        res.json({
            success: true,
            count: files.length,
            files: files
        });
        
    } catch (error) {
        console.error('List files error:', error);
        res.status(500).json({ 
            error: 'Failed to list files', 
            details: error.message 
        });
    }
};

/**
 * Delete file
 * DELETE /api/files
 */
export const remove = (req, res) => {
    try {
        const { path: filePath } = req.body;
        
        if (!filePath) {
            return res.status(400).json({ error: 'File path is required' });
        }
        
        deleteFile(filePath);
        
        res.json({
            success: true,
            message: 'File deleted successfully'
        });
        
    } catch (error) {
        console.error('Delete error:', error);
        
        if (error.message === 'File not found') {
            return res.status(404).json({ error: error.message });
        }
        
        res.status(500).json({ 
            error: 'Delete failed', 
            details: error.message 
        });
    }
};

/**
 * Get storage info
 * GET /api/info
 */
export const info = (req, res) => {
    try {
        const storage = getStorageInfo();
        const fileStats = getFileStats();
        
        res.json({
            success: true,
            storage: storage,
            files: fileStats,
            config: {
                maxFileSize: `${process.env.MAX_FILE_SIZE || 100} MB`,
                baseUrl: config.baseUrl,
                uploadDir: config.uploadDir
            }
        });
        
    } catch (error) {
        console.error('Info error:', error);
        res.status(500).json({ 
            error: 'Failed to get info', 
            details: error.message 
        });
    }
};

/**
 * Get file structure
 * GET /api/structure
 */
export const structure = (req, res) => {
    res.json({
        success: true,
        structure: FILE_STRUCTURE
    });
};

/**
 * Health check
 * GET /health
 */
export const health = (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString() 
    });
};

export default {
    list,
    remove,
    info,
    structure,
    health
};
