export type ClassStudentsCreateForm = {
    class_id: number;
    student_id: number;
    status?: number;
}

export type ClassStudentsUpdateForm = {
    id: number;
    class_id?: number;
    student_id?: number;
    status?: number;
}
