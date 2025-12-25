import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './config/index.js';
import fileUploadMiddleware from './middleware/fileUpload.js';
import routes from './routes/index.js';
import { createDirectories } from './utils/storageHelpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Create necessary directories
createDirectories();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUploadMiddleware);

// Serve static files publicly (no auth required)
app.use('/files', express.static(config.uploadDir, {
    maxAge: '7d',
    etag: true,
    lastModified: true
}));

// Serve Web UI
app.use('/admin', express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/', routes);

export default app;
