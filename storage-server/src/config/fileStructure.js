/**
 * File structure configuration
 * Defines the organized folder structure for different file types
 */
export const FILE_STRUCTURE = {
    videos: {
        courses: 'videos/courses',
        lessons: 'videos/lessons',
        previews: 'videos/previews',
        other: 'videos/other'
    },
    images: {
        avatars: 'images/avatars',
        courses: 'images/courses',
        classes: 'images/classes',
        thumbnails: 'images/thumbnails',
        banners: 'images/banners',
        other: 'images/other'
    },
    documents: {
        pdfs: 'documents/pdfs',
        assignments: 'documents/assignments',
        materials: 'documents/materials',
        certificates: 'documents/certificates',
        other: 'documents/other'
    },
    excels: {
        reports: 'excels/reports',
        data: 'excels/data',
        other: 'excels/other'
    },
    audios: {
        lessons: 'audios/lessons',
        other: 'audios/other'
    },
    archives: {
        backups: 'archives/backups',
        exports: 'archives/exports',
        other: 'archives/other'
    }
};

/**
 * Allowed file extensions by category
 */
export const ALLOWED_EXTENSIONS = {
    videos: ['mp4', 'webm', 'avi', 'mov', 'mkv', 'flv', 'wmv', 'm4v'],
    images: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'],
    documents: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt', 'ppt', 'pptx'],
    excels: ['xls', 'xlsx', 'csv'],
    audios: ['mp3', 'wav', 'ogg', 'aac', 'm4a', 'flac'],
    archives: ['zip', 'rar', '7z', 'tar', 'gz']
};

export default FILE_STRUCTURE;
