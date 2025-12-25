import fileUpload from 'express-fileupload';
import config from '../config/index.js';

/**
 * File upload middleware configuration
 */
export const fileUploadMiddleware = fileUpload({
    limits: { 
        fileSize: config.maxFileSize 
    },
    abortOnLimit: true,
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: config.tempDir
});

export default fileUploadMiddleware;
