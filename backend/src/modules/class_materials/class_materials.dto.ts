export type ClassMaterialsCreateForm = {
    class_id: number;
    title?: string;
    description?: string;
    file_url?: string;
}

export type ClassMaterialsUpdateForm = {
    id: number;
    class_id?: number;
    title?: string;
    description?: string;
    file_url?: string;
}
