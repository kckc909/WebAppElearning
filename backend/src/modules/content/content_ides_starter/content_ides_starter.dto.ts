export type ContentIdesStarterCreateForm = {
    content_id: number;
    language: string;
    content?: string;
}

export type ContentIdesStarterUpdateForm = {
    id: number;
    content_id?: number;
    language?: string;
    content?: string;
}
