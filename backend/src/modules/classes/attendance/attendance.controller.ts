import { Controller, Get, Post, Query, Body, Param } from '@nestjs/common';
import { AttendanceService } from './attendance.service.js';

@Controller('attendance')
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) {}

    @Get('class/:classId')
    async getByClass(
        @Param('classId') classId: string,
        @Query('sessionDate') sessionDate?: string
    ) {
        return await this.attendanceService.getByClass(parseInt(classId), sessionDate);
    }

    @Get('student/:studentId')
    async getByStudent(
        @Param('studentId') studentId: string,
        @Query('classId') classId?: string
    ) {
        return await this.attendanceService.getByStudent(
            parseInt(studentId),
            classId ? parseInt(classId) : undefined
        );
    }

    @Get('class/:classId/stats')
    async getStats(@Param('classId') classId: string) {
        return await this.attendanceService.getStats(parseInt(classId));
    }

    @Post('mark')
    async markAttendance(@Body() data: {
        class_id: number;
        student_id: number;
        session_date: string;
        status: string;
        notes?: string;
        marked_by?: number;
    }) {
        return await this.attendanceService.markAttendance(data);
    }

    @Post('bulk-mark')
    async bulkMarkAttendance(@Body() data: {
        class_id: number;
        session_date: string;
        attendances: Array<{
            student_id: number;
            status: string;
            notes?: string;
        }>;
        marked_by?: number;
    }) {
        return await this.attendanceService.bulkMarkAttendance(data);
    }
}
