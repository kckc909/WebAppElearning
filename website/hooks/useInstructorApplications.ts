/**
 * Instructor Applications Hook (Admin - Verification)
 */

import { useState, useEffect } from 'react';
import { accService } from '../API';

export function useInstructorApplications(status?: 'pending' | 'approved' | 'rejected') {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Get all accounts with instructor role or pending instructor applications
            const result = await accService.getAll({ role: 2 }); // Role 2 = Instructor
            if (result.success) {
                let applications = result.data;
                if (status) {
                    applications = applications.filter((a: any) => a.verification_status === status);
                }
                setData(applications);
            } else {
                setError(result.error || 'Failed to fetch applications');
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

export function useApproveInstructor() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const approveInstructor = async (userId: number) => {
        setLoading(true);
        setError(null);
        try {
            const result = await accService.update(userId, { 
                verification_status: 'approved',
                role: 2 // Instructor role
            } as any);
            return result;
        } catch (err) {
            setError('An error occurred');
            return { success: false, data: null, error: 'An error occurred' };
        } finally {
            setLoading(false);
        }
    };

    return { approveInstructor, loading, error };
}
