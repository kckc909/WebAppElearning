export type LessonContentsCreateForm = {
    lesson_id: number;
    position: number;
    order_index: number;
    type: number;
    content_data?: any;
}

export type LessonContentsUpdateForm = {
    id: number;
    lesson_id?: number;
    position?: number;
    order_index?: number;
    type?: number;
    content_data?: any;
}
