/**
 * MOCK DB - lesson_assets
 * File uploads associated with lessons (images, videos, PDFs, etc.)
 */

export type AssetType = 'image' | 'video' | 'pdf' | 'document' | 'audio';

export interface LessonAsset {
    id: number;
    lesson_id: number;
    lesson_version_id: number;
    type: AssetType;
    filename: string;
    url: string;
    preview_url?: string;
    file_size: number; // bytes
    mime_type: string;
    uploaded_by: number; // instructor_id
    uploaded_at: Date;
}

export const LESSON_ASSETS: LessonAsset[] = [
    {
        id: 1,
        lesson_id: 1,
        lesson_version_id: 1,
        type: 'image',
        filename: 'react-logo.png',
        url: '/assets/lessons/react-logo.png',
        preview_url: '/assets/lessons/react-logo-thumb.png',
        file_size: 45620,
        mime_type: 'image/png',
        uploaded_by: 1,
        uploaded_at: new Date('2024-01-15T10:00:00')
    },
    {
        id: 2,
        lesson_id: 2,
        lesson_version_id: 2,
        type: 'pdf',
        filename: 'react-fundamentals.pdf',
        url: '/assets/lessons/react-fundamentals.pdf',
        preview_url: '/assets/lessons/react-fundamentals-preview.jpg',
        file_size: 1245670,
        mime_type: 'application/pdf',
        uploaded_by: 1,
        uploaded_at: new Date('2024-01-15T11:00:00')
    },
    {
        id: 3,
        lesson_id: 2,
        lesson_version_id: 3,
        type: 'image',
        filename: 'component-lifecycle.png',
        url: '/assets/lessons/component-lifecycle.png',
        preview_url: '/assets/lessons/component-lifecycle-thumb.png',
        file_size: 89430,
        mime_type: 'image/png',
        uploaded_by: 1,
        uploaded_at: new Date('2024-01-16T14:25:00')
    }
];
