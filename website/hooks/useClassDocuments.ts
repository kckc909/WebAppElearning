import { useQuery } from '@tanstack/react-query';
import { getApiInstance } from '../API';

export interface ClassDocument {
    id: number;
    class_id: number;
    name: string;
    class_name: string;
    size: string;
    uploaded_at: string;
    file_url: string;
    file_type: string;
}

export const useClassDocuments = (classId: number) => {
    const api = getApiInstance();

    return useQuery<ClassDocument[]>({
        queryKey: ['class-documents', classId],
        queryFn: async () => {
            const materials = await api.materials.getMaterialsByClass(classId);
            return materials;
        },
        enabled: !!classId,
    });
};
