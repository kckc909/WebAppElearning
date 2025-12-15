export type ClassExamResultsCreateForm = {
    exam_id: number;
    student_id: number;
    score?: number;
    feedback?: string;
}

export type ClassExamResultsUpdateForm = {
    id: number;
    exam_id?: number;
    student_id?: number;
    score?: number;
    feedback?: string;
}
