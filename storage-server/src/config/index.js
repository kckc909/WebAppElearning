import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
    port: process.env.PORT || 5000,
    uploadDir: path.join(__dirname, '../../', process.env.UPLOAD_DIR || 'uploads'),
    baseUrl: process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`,
    maxFileSize: (process.env.MAX_FILE_SIZE || 100) * 1024 * 1024, // MB to bytes
    tempDir: null, // Will be set after uploadDir is known
};

// Set temp directory
config.tempDir = path.join(config.uploadDir, 'temp');

export default config;
