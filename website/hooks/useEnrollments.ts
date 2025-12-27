/**
 * HOOKS: useEnrollments
 * Custom hooks for Enrollments API
 */

import { useState } from 'react';
import { enrollmentsApi } from '../API';
import type { ApiResponse } from '../API';

/**
 * Hook for getting my enrollments
 */
export function useMyEnrollments(studentId: number) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEnrollments = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await enrollmentsApi.getMyEnrollments(studentId);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.error || 'Failed to fetch enrollments');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, refetch: fetchEnrollments };
}

/**
 * Hook for getting enrollment by ID
 */
export function useEnrollment(id: number) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEnrollment = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await enrollmentsApi.getById(id);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.error || 'Failed to fetch enrollment');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, refetch: fetchEnrollment };
}

/**
 * Hook for getting course progress
 */
export function useCourseProgress(courseId: number, studentId: number) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProgress = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await enrollmentsApi.getCourseProgress(courseId, studentId);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.error || 'Failed to fetch progress');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, refetch: fetchProgress };
}

/**
 * Hook for updating lesson progress
 */
export function useUpdateLessonProgress() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateProgress = async (
        enrollmentId: number,
        lessonId: number,
        isCompleted: boolean
    ): Promise<ApiResponse<any>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await enrollmentsApi.updateLessonProgress(enrollmentId, lessonId, isCompleted);
            if (!response.success) {
                setError(response.error || 'Failed to update progress');
            }
            return response;
        } catch (err: any) {
            const errorMsg = err.message || 'An error occurred';
            setError(errorMsg);
            return {
                success: false,
                data: null,
                error: errorMsg
            };
        } finally {
            setLoading(false);
        }
    };

    return { updateProgress, loading, error };
}

/**
 * Hook for getting certificate
 */
export function useCertificate(courseId: number, studentId: number) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCertificate = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await enrollmentsApi.getCertificate(courseId, studentId);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.error || 'Failed to fetch certificate');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, refetch: fetchCertificate };
}
