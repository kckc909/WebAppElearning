/**
 * Class Materials Hooks
 */

import { useState, useEffect } from 'react';
import { materialsApi } from '../API';
import type { Material } from '../API/interfaces/IMaterialsApi';

export function useMaterials(classId: number) {
    const [data, setData] = useState<Material[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await materialsApi.getByClass(classId);
            if (result.success) {
                setData(result.data);
            } else {
                setError(result.error || 'Failed to fetch materials');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (classId) {
            fetchData();
        }
    }, [classId]);

    return { data, loading, error, refetch: fetchData };
}

export function useUploadMaterial() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadMaterial = async (material: Omit<Material, 'id' | 'uploaded_at'>) => {
        setLoading(true);
        setError(null);
        try {
            const result = await materialsApi.upload(material);
            return result;
        } catch (err) {
            setError('An error occurred');
            return { success: false, data: null, error: 'An error occurred' };
        } finally {
            setLoading(false);
        }
    };

    return { uploadMaterial, loading, error };
}
