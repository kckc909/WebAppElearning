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

// Hook for courses
export function useCourses(params?: { category_id?: number; search?: string }) {
    return useApi(
        () => coursesApi.getAll(params),
        [params?.category_id, params?.search]
    );
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
