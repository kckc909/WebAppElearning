import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service.js';

@Injectable()
export class AttendanceService {
    constructor(private prisma: PrismaService) {}

    async getByClass(classId: number, sessionDate?: string) {
        const where: any = { class_id: classId };
        if (sessionDate) {
            where.session_date = new Date(sessionDate);
        }

        return await this.prisma.class_attendance.findMany({
            where,
            orderBy: { session_date: 'desc' }
        });
    }

    async getByStudent(studentId: number, classId?: number) {
        const where: any = { student_id: studentId };
        if (classId) {
            where.class_id = classId;
        }

        return await this.prisma.class_attendance.findMany({
            where,
            orderBy: { session_date: 'desc' }
        });
    }

    async markAttendance(data: {
        class_id: number;
        student_id: number;
        session_date: string;
        status: string;
        notes?: string;
        marked_by?: number;
    }) {
        return await this.prisma.class_attendance.upsert({
            where: {
                class_id_student_id_session_date: {
                    class_id: data.class_id,
                    student_id: data.student_id,
                    session_date: new Date(data.session_date)
                }
            },
            update: {
                status: data.status,
                notes: data.notes,
                marked_by: data.marked_by,
                marked_at: new Date()
            },
            create: {
                class_id: data.class_id,
                student_id: data.student_id,
                session_date: new Date(data.session_date),
                status: data.status,
                notes: data.notes,
                marked_by: data.marked_by
            }
        });
    }

    async bulkMarkAttendance(data: {
        class_id: number;
        session_date: string;
        attendances: Array<{
            student_id: number;
            status: string;
            notes?: string;
        }>;
        marked_by?: number;
    }) {
        const promises = data.attendances.map(attendance =>
            this.markAttendance({
                class_id: data.class_id,
                student_id: attendance.student_id,
                session_date: data.session_date,
                status: attendance.status,
                notes: attendance.notes,
                marked_by: data.marked_by
            })
        );

        return await Promise.all(promises);
    }

    async getStats(classId: number) {
        const total = await this.prisma.class_attendance.count({
            where: { class_id: classId }
        });

        const byStatus = await this.prisma.class_attendance.groupBy({
            by: ['status'],
            where: { class_id: classId },
            _count: true
        });

        return {
            total,
            byStatus: byStatus.map(item => ({
                status: item.status,
                count: item._count
            }))
        };
    }
}
