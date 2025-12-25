/**
 * DTO for lesson_blocks table
 * Matches schema: lesson_version_id, slot_id, type (string), order_index, content, settings
 */

export type LessonContentsCreateForm = {
    lesson_version_id: number;
    slot_id: string;
    type: string;
    order_index: number;
    content?: any;
    settings?: any;
}

export type LessonContentsUpdateForm = {
    id: number;
    slot_id?: string;
    type?: string;
    order_index?: number;
    content?: any;
    settings?: any;
}
