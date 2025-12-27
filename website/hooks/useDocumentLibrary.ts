/**
 * Document Library Hook (Admin)
 */

import { useState, useEffect } from 'react';
import { materialsApi } from '../API';

export function useDocumentLibrary(filters?: { category?: string; search?: string }) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Get all materials (documents) - using class_id = 0 for global documents
            const result = await materialsApi.getByClass(0);
            if (result.success) {
                let documents = result.data;
                
                if (filters?.category && filters.category !== 'all') {
                    documents = documents.filter((d: any) => d.type === filters.category);
                }
                
                if (filters?.search) {
                    const searchLower = filters.search.toLowerCase();
                    documents = documents.filter((d: any) => 
                        d.name.toLowerCase().includes(searchLower)
                    );
                }
                
                setData(documents);
            } else {
                setError(result.error || 'Failed to fetch documents');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filters?.category, filters?.search]);

    return { data, loading, error, refetch: fetchData };
}
