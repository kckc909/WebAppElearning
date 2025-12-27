/**
 * Attendance Hooks
 */

import { useState, useEffect } from 'react';
import { attendanceApi } from '../API';
import type { AttendanceSummary, AttendanceRecord } from '../API/interfaces/IAttendanceApi';

export function useAttendanceSummary(classId: number) {
    const [data, setData] = useState<AttendanceSummary[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await attendanceApi.getByClass(classId);
            if (result.success) {
                setData(result.data);
            } else {
                setError(result.error || 'Failed to fetch attendance');
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

export function useSessionAttendance(sessionId: number) {
    const [data, setData] = useState<AttendanceRecord[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await attendanceApi.getBySession(sessionId);
            if (result.success) {
                setData(result.data);
            } else {
                setError(result.error || 'Failed to fetch session attendance');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (sessionId) {
            fetchData();
        }
    }, [sessionId]);

    return { data, loading, error, refetch: fetchData };
}
