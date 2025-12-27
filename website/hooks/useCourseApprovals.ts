/**
 * Course Approvals Hook (Admin)
 */

import { useState, useEffect } from 'react';
import { coursesApi } from '../API';

export function useCourseApprovals(status?: 'pending' | 'approved' | 'rejected') {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Get all courses and filter by status
            const result = await coursesApi.getAll();
            if (result.success) {
                let courses = result.data;
                if (status) {
                    courses = courses.filter((c: any) => c.status === status);
                }
                setData(courses);
            } else {
                setError(result.error || 'Failed to fetch courses');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [status]);

    return { data, loading, error, refetch: fetchData };
}
