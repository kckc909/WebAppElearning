export type ClassCalendarCreateForm = {
    class_id: number;
    title?: string;
    description?: string;
    event_date?: Date;
    duration_minutes?: number;
    lesson?: number;
}

export type ClassCalendarUpdateForm = {
    id: number;
    class_id?: number;
    title?: string;
    description?: string;
    event_date?: Date;
    duration_minutes?: number;
    lesson?: number;
}
