/**
 * Assignments Hooks
 */

import { useState, useEffect } from 'react';
import { assignmentsApi } from '../API';
import type { Assignment, AssignmentSubmission } from '../API/interfaces/IAssignmentsApi';

export function useAssignments(classId: number) {
    const [data, setData] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await assignmentsApi.getByClass(classId);
            if (result.success) {
                setData(result.data);
            } else {
                setError(result.error || 'Failed to fetch assignments');
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

export function useAssignmentSubmissions(assignmentId: number) {
    const [data, setData] = useState<AssignmentSubmission[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await assignmentsApi.getSubmissions(assignmentId);
            if (result.success) {
                setData(result.data);
            } else {
                setError(result.error || 'Failed to fetch submissions');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (assignmentId) {
            fetchData();
        }
    }, [assignmentId]);

    return { data, loading, error, refetch: fetchData };
}
