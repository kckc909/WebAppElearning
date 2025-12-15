export type ClassExamsCreateForm = {
    class_id: number;
    title?: string;
    exam_type?: 'quiz' | 'written' | 'oral';
    total_score?: number;
}

export type ClassExamsUpdateForm = {
    id: number;
    class_id?: number;
    title?: string;
    exam_type?: 'quiz' | 'written' | 'oral';
    total_score?: number;
}
