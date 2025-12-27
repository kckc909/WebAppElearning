/**
 * MOCK DB - Class Documents
 * Study materials and documents for classes
 */

export interface ClassDocument {
    id: number;
    class_id: number;
    name: string;
    class_name: string;
    size: string;
    uploaded_at: string;
    file_url: string;
    file_type: string;
}

export const CLASS_DOCUMENTS: ClassDocument[] = [
    {
        id: 1,
        class_id: 1,
        name: 'Lecture Notes - Week 6.pdf',
        class_name: 'Web Dev A1',
        size: '2.5 MB',
        uploaded_at: '2024-12-01',
        file_url: '/documents/lecture-notes-6.pdf',
        file_type: 'pdf'
    },
    {
        id: 2,
        class_id: 1,
        name: 'React Hooks Cheatsheet.pdf',
        class_name: 'Web Dev A1',
        size: '1.2 MB',
        uploaded_at: '2024-12-05',
        file_url: '/documents/react-hooks-cheatsheet.pdf',
        file_type: 'pdf'
    },
    {
        id: 3,
        class_id: 1,
        name: 'Project Requirements.docx',
        class_name: 'Web Dev A1',
        size: '850 KB',
        uploaded_at: '2024-11-28',
        file_url: '/documents/project-requirements.docx',
        file_type: 'docx'
    },
    {
        id: 4,
        class_id: 2,
        name: 'Python Basics.pdf',
        class_name: 'Data Science B2',
        size: '3.1 MB',
        uploaded_at: '2024-12-02',
        file_url: '/documents/python-basics.pdf',
        file_type: 'pdf'
    },
];

// Helper to get documents by class
export const getDocumentsByClass = (classId: number): ClassDocument[] => {
    return CLASS_DOCUMENTS.filter(d => d.class_id === classId);
};
