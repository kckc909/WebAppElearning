/**
 * HOOKS: useClasses
 * Custom hooks for Classes API
 */

import { useState } from 'react';
import { classesApi } from '../API';
import type { ApiResponse } from '../API';

/**
 * Hook for getting all classes
 */
export function useClasses(params?: { course_id?: number; instructor_id?: number; status?: number }) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchClasses = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await classesApi.getAll(params);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.error || 'Failed to fetch classes');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, refetch: fetchClasses };
}

/**
 * Hook for getting class by ID
 */
export function useClass(id: number) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchClass = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await classesApi.getById(id);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.error || 'Failed to fetch class');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, refetch: fetchClass };
}

/**
 * Hook for getting class schedule
 */
export function useClassSchedule(classId: number) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSchedule = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await classesApi.getSchedule(classId);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.error || 'Failed to fetch schedule');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, refetch: fetchSchedule };
}

/**
 * Hook for getting class students
 */
export function useClassStudents(classId: number) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchStudents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await classesApi.getStudents(classId);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.error || 'Failed to fetch students');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, refetch: fetchStudents };
}

/**
 * Hook for creating a class
 */
export function useCreateClass() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createClass = async (classData: any): Promise<ApiResponse<any>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await classesApi.create(classData);
            if (!response.success) {
                setError(response.error || 'Failed to create class');
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

    return { createClass, loading, error };
}

/**
 * Hook for updating a class
 */
export function useUpdateClass() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateClass = async (id: number, classData: any): Promise<ApiResponse<any>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await classesApi.update(id, classData);
            if (!response.success) {
                setError(response.error || 'Failed to update class');
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

    return { updateClass, loading, error };
}

/**
 * Hook for deleting a class
 */
export function useDeleteClass() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteClass = async (id: number): Promise<ApiResponse<any>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await classesApi.delete(id);
            if (!response.success) {
                setError(response.error || 'Failed to delete class');
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

    return { deleteClass, loading, error };
}

/**
 * Hook for enrolling student in class
 */
export function useEnrollStudent() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const enrollStudent = async (classId: number, studentId: number): Promise<ApiResponse<any>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await classesApi.enrollStudent(classId, studentId);
            if (!response.success) {
                setError(response.error || 'Failed to enroll student');
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

    return { enrollStudent, loading, error };
}
