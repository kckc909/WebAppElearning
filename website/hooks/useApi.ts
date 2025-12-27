/**
 * React Hooks for API calls
 * Sử dụng các hooks này thay vì import trực tiếp từ mockData
 */

import { useState, useEffect, useCallback } from 'react';
import { coursesApi, classesApi, enrollmentsApi, notificationsApi, transactionsApi } from '../API';
import type { ApiResponse } from '../API';

// Generic hook for fetching data
export function useApi<T>(
    fetchFn: () => Promise<ApiResponse<T>>,
    dependencies: any[] = []
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchFn();
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.error || 'An error occurred');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [...dependencies]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { data, loading, error, refetch };
}

// Hook for courses (only PUBLISHED courses for students)
export function useCourses(params?: { category_id?: number; search?: string; status?: string }) {
    // Default to PUBLISHED status for student-facing pages
    const queryParams = { ...params, status: params?.status || 'PUBLISHED' };
    return useApi(
        () => coursesApi.getAll(queryParams),
        [params?.category_id, params?.search, params?.status]
    );
}

// Hook for all courses (raw - no status filter)
export function useAllCourses(params?: { category_id?: number; search?: string; status?: string; instructor_id?: number }) {
    return useApi(
        () => coursesApi.getAll(params),
        [params?.category_id, params?.search, params?.status, params?.instructor_id]
    );
}

// Hook for Admin courses (excludes DRAFT - admin shouldn't see instructor's drafts)
export function useAdminCourses(params?: { category_id?: number; search?: string; status?: string }) {
    const [data, setData] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await coursesApi.getAll(params);
            if (response.success) {
                // Filter out DRAFT courses - Admin shouldn't see instructor's drafts
                const filteredData = (response.data || []).filter(
                    (course: any) => course.status !== 'DRAFT'
                );
                setData(filteredData);
            } else {
                setError(response.error || 'An error occurred');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [params?.category_id, params?.search, params?.status]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { data, loading, error, refetch };
}

// Hook for instructor's courses (all statuses: draft, pending, published, rejected)
export function useInstructorCourses(instructorId: number | undefined, params?: { search?: string }) {
    const [data, setData] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refetch = useCallback(async () => {
        // Don't fetch if no valid instructorId
        if (!instructorId) {
            setData([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await coursesApi.getAll({ instructor_id: instructorId, ...params });
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.error || 'An error occurred');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [instructorId, params?.search]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { data, loading, error, refetch };
}

// Hook for single course
export function useCourse(courseId: number) {
    return useApi(
        () => coursesApi.getById(courseId),
        [courseId]
    );
}

// Hook for course sections with lessons
export function useCourseSections(courseId: number) {
    return useApi(
        () => coursesApi.getSections(courseId),
        [courseId]
    );
}

// Hook for course reviews
export function useCourseReviews(courseId: number) {
    return useApi(
        () => coursesApi.getReviews(courseId),
        [courseId]
    );
}

// Hook for categories
export function useCategories() {
    return useApi(() => coursesApi.getCategories(), []);
}

// Hook for featured courses
export function useFeaturedCourses(limit: number = 8) {
    return useApi(
        () => coursesApi.getFeatured(limit),
        [limit]
    );
}

// Hook for my enrollments (student's courses)
export function useMyEnrollments(studentId: number) {
    return useApi(
        () => enrollmentsApi.getMyEnrollments(studentId),
        [studentId]
    );
}

// Hook for course progress
export function useCourseProgress(courseId: number, studentId: number) {
    return useApi(
        () => enrollmentsApi.getCourseProgress(courseId, studentId),
        [courseId, studentId]
    );
}

// Hook for my classes
export function useMyClasses(studentId: number) {
    return useApi(
        () => classesApi.getMyClasses(studentId),
        [studentId]
    );
}

// Hook for class details
export function useClass(classId: number) {
    return useApi(
        () => classesApi.getById(classId),
        [classId]
    );
}

// Hook for notifications
export function useNotifications(userId: number) {
    return useApi(
        () => notificationsApi.getAll(userId),
        [userId]
    );
}

// Hook for unread notification count
export function useUnreadNotificationCount(userId: number) {
    return useApi(
        () => notificationsApi.getUnreadCount(userId),
        [userId]
    );
}

// Hook for transaction history
export function useTransactionHistory(userId: number) {
    return useApi(
        () => transactionsApi.getAll({ user_id: userId }),
        [userId]
    );
}

// Hook for payment methods
export function usePaymentMethods() {
    return useApi(() => transactionsApi.getPaymentMethods(), []);
}

// Hook for course curriculum (sections + lessons)
export function useCurriculum(courseId: number | string) {
    return useApi(
        () => coursesApi.getSections(typeof courseId === 'string' ? parseInt(courseId) : courseId),
        [courseId]
    );
}

// Hook for student certificates - calling certificates API directly
export function useMyCertificates(studentId: number) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refetch = useCallback(async () => {
        if (!studentId) {
            setData([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            // Call certificates API directly
            const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';
            const response = await fetch(`${API_BASE_URL}/certificates/student/${studentId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch certificates');
            }

            const certificatesData = await response.json();

            // Map to expected format
            const certificates = (Array.isArray(certificatesData) ? certificatesData : []).map((cert: any) => ({
                id: cert.id,
                courseId: cert.course_id,
                courseTitle: cert.courses?.title || 'Unknown Course',
                instructor: cert.courses?.accounts?.full_name || 'Unknown',
                instructorName: cert.courses?.accounts?.full_name || 'Unknown Instructor',
                category: cert.courses?.course_categories?.name || 'General',
                completedAt: cert.issued_at,
                issuedDate: cert.issued_at,
                certificateCode: cert.certificate_code,
                certificateUrl: cert.certificate_url || cert.pdf_url || '',
                verificationUrl: cert.verification_url || `${window.location.origin}/verify/${cert.certificate_code}`,
                user_id: studentId,
                // Student info from accounts relation
                studentName: cert.accounts?.full_name || 'Học viên',
                studentId: cert.student_id,
            }));

            setData(certificates);
        } catch (err: any) {
            console.error('Error fetching certificates:', err);
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [studentId]);

    useEffect(() => {
        refetch();
    }, [studentId, refetch]);

    return { data, loading, error, refetch };
}

// Export lesson builder hook
export { useLessonBuilder } from './useLessonBuilder';
