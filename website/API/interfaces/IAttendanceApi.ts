/**
 * Attendance API Interface
 */

import { ApiResponse } from '../config';

export interface AttendanceRecord {
    id: number;
    class_id: number;
    session_id: number;
    student_id: number;
    student_name: string;
    status: 'present' | 'absent' | 'late' | 'excused';
    date: string;
    notes?: string;
}

export interface AttendanceSummary {
    student_id: number;
    student_name: string;
    present: number;
    absent: number;
    late: number;
    excused: number;
    total_sessions: number;
    attendance_rate: number;
}

export interface IAttendanceApi {
    getByClass(classId: number): Promise<ApiResponse<AttendanceSummary[]>>;
    getBySession(sessionId: number): Promise<ApiResponse<AttendanceRecord[]>>;
    getByStudent(studentId: number, classId: number): Promise<ApiResponse<AttendanceRecord[]>>;
    
    markAttendance(records: Omit<AttendanceRecord, 'id'>[]): Promise<ApiResponse<AttendanceRecord[]>>;
    updateRecord(id: number, status: AttendanceRecord['status'], notes?: string): Promise<ApiResponse<AttendanceRecord>>;
}
