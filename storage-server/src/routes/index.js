import express from 'express';
import uploadController from '../controllers/uploadController.js';
import fileController from '../controllers/fileController.js';
import { FILE_STRUCTURE } from '../config/fileStructure.js';

const router = express.Router();

// Home route
router.get('/', (req, res) => {
    res.json({
        message: 'Storage Server - Public File Storage',
        version: '2.0.0',
        features: [
            'Public file access (no auth required)',
            'Organized folder structure',
            'Automatic thumbnail generation',
            'Multiple file upload support'
        ],
        endpoints: {
            upload: 'POST /upload',
            uploadMultiple: 'POST /upload-multiple',
            files: 'GET /files/:category/:purpose/:filename',
            list: 'GET /api/files',
            delete: 'DELETE /api/files',
            info: 'GET /api/info',
            structure: 'GET /api/structure',
            health: 'GET /health'
        },
        fileStructure: FILE_STRUCTURE
    });
});

// Upload routes
router.post('/upload', uploadController.upload);
router.post('/upload-multiple', uploadController.uploadMultiple);

// File management routes
router.get('/api/files', fileController.list);
router.delete('/api/files', fileController.remove);
router.get('/api/info', fileController.info);
router.get('/api/structure', fileController.structure);

// Health check
router.get('/health', fileController.health);

export default router;
