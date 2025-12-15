export type ClassAssignmentsCreateForm = {
    class_id: number;
    title?: string;
    description?: string;
    file_url?: string;
    due_date?: Date;
}

export type ClassAssignmentsUpdateForm = {
    id: number;
    class_id?: number;
    title?: string;
    description?: string;
    file_url?: string;
    due_date?: Date;
}
