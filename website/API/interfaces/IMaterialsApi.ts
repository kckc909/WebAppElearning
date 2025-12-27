/**
 * Class Materials API Interface
 */

import { ApiResponse } from '../config';

export interface Material {
    id: number;
    class_id: number;
    name: string;
    type: 'pdf' | 'doc' | 'ppt' | 'video' | 'link' | 'other';
    url: string;
    size?: number;
    uploaded_at: string;
    uploaded_by: number;
    description?: string;
}

export interface IMaterialsApi {
    getByClass(classId: number): Promise<ApiResponse<Material[]>>;
    getById(id: number): Promise<ApiResponse<Material>>;
    upload(material: Omit<Material, 'id' | 'uploaded_at'>): Promise<ApiResponse<Material>>;
    update(id: number, data: Partial<Material>): Promise<ApiResponse<Material>>;
    delete(id: number): Promise<ApiResponse<void>>;
    download(id: number): Promise<ApiResponse<{ url: string }>>;
}
