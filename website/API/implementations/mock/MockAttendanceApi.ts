/**
 * Mock Attendance API Implementation
 */

import { IAttendanceApi, AttendanceRecord, AttendanceSummary } from '../../interfaces/IAttendanceApi';
import { simulateDelay, successResponse, errorResponse, ApiResponse } from '../../config';
import { dataSource } from '../../../data/datasources/datasource.router';

export class MockAttendanceApi implements IAttendanceApi {
    async getByClass(classId: number): Promise<ApiResponse<AttendanceSummary[]>> {
        await simulateDelay();
        try {
            const summary = dataSource.getAttendanceSummaryByClass(classId);
            return successResponse(summary);
        } catch (error) {
            return errorResponse('Failed to fetch attendance summary');
        }
    }

    async getBySession(sessionId: number): Promise<ApiResponse<AttendanceRecord[]>> {
        await simulateDelay();
        try {
            const records = dataSource.getAttendanceBySession(sessionId);
            return successResponse(records);
        } catch (error) {
            return errorResponse('Failed to fetch session attendance');
        }
    }

    async getByStudent(studentId: number, classId: number): Promise<ApiResponse<AttendanceRecord[]>> {
        await simulateDelay();
        try {
            const records = dataSource.getAttendanceByStudent(studentId, classId);
            return successResponse(records);
        } catch (error) {
            return errorResponse('Failed to fetch student attendance');
        }
    }

    async markAttendance(records: Omit<AttendanceRecord, 'id'>[]): Promise<ApiResponse<AttendanceRecord[]>> {
        await simulateDelay();
        try {
            const marked = dataSource.markAttendance(records);
            return successResponse(marked);
        } catch (error) {
            return errorResponse('Failed to mark attendance');
        }
    }

    async updateRecord(id: number, status: AttendanceRecord['status'], notes?: string): Promise<ApiResponse<AttendanceRecord>> {
        await simulateDelay();
        try {
            const updated = dataSource.updateAttendanceRecord(id, status, notes);
            if (!updated) {
                return errorResponse('Attendance record not found');
            }
            return successResponse(updated);
        } catch (error) {
            return errorResponse('Failed to update attendance record');
        }
    }
}
