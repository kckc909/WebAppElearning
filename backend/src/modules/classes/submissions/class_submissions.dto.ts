export type ClassSubmissionsCreateForm = {
    assignment_id: number;
    student_id: number;
    submission_url?: string;
    grade?: number;
    feedback?: string;
}

export type ClassSubmissionsUpdateForm = {
    id: number;
    assignment_id?: number;
    student_id?: number;
    submission_url?: string;
    grade?: number;
    feedback?: string;
}
