export type ContentIdesCreateForm = {
    user_id: number;
    content_id: number;
    language: string;
    content?: string;
    test_results?: any;
    status?: number;
    editor_config?: any;
}

export type ContentIdesUpdateForm = {
    id: number;
    user_id?: number;
    content_id?: number;
    language?: string;
    content?: string;
    test_results?: any;
    status?: number;
    editor_config?: any;
}
