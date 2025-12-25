import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import type { CourseEnrollmentCreateForm, CourseEnrollmentUpdateForm } from "./course_enrollments.dto.js";
import { IdParam } from "../../../../types/types.pipe.js";

@Injectable()
export class CourseEnrollments_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(filters?: { student_id?: number; course_id?: number; status?: string }): Promise<any> {
        const where: any = {};
        if (filters?.student_id) where.student_id = filters.student_id;
        if (filters?.course_id) where.course_id = filters.course_id;
        if (filters?.status) where.status = filters.status;

        const enrollmentsFound = await this.prisma.course_enrollments.findMany({
            where,
            include: {
                courses: {
                    select: {
                        id: true,
                        title: true,
                        thumbnail_url: true,
                        accounts: { select: { id: true, full_name: true } },
                    }
                },
                accounts: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        avatar_url: true,
                    }
                },
                lesson_progress: true
            },
            orderBy: { enrolled_at: 'desc' },
        });

        return enrollmentsFound;
    }

    async getById(idParam: IdParam): Promise<any> {
        const enrollmentFound = await this.prisma.course_enrollments.findFirst({
            where: { id: idParam.id },
            include: {
                courses: true,
                accounts: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        avatar_url: true,
                    }
                },
                lesson_progress: {
                    include: {
                        course_lessons: {
                            select: {
                                id: true,
                                title: true,
                                duration: true,
                            }
                        }
                    }
                }
            }
        });

        return enrollmentFound;
    }

    async getByStudentId(studentId: number): Promise<any> {
        const enrollmentsFound = await this.prisma.course_enrollments.findMany({
            where: { student_id: studentId },
            include: {
                courses: {
                    include: {
                        course_categories: true,
                        accounts: {
                            select: {
                                id: true,
                                full_name: true,
                                avatar_url: true,
                            }
                        },
                        // Include certificates for this course AND student info
                        certificates: {
                            where: { student_id: studentId },
                            take: 1,
                            include: {
                                accounts: {
                                    select: {
                                        id: true,
                                        full_name: true,
                                        email: true,
                                    }
                                }
                            }
                        }
                    }
                },
                lesson_progress: true
            },
            orderBy: { enrolled_at: 'desc' },
        });

        return enrollmentsFound;
    }

    async getByCourseId(courseId: number): Promise<any> {
        const enrollmentsFound = await this.prisma.course_enrollments.findMany({
            where: { course_id: courseId },
            include: {
                accounts: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        avatar_url: true,
                    }
                },
                lesson_progress: true
            },
            orderBy: { enrolled_at: 'desc' },
        });

        return enrollmentsFound;
    }

    async create(newEnrollment: CourseEnrollmentCreateForm): Promise<any> {
        const { id, ...data } = newEnrollment as any;
        const created = await this.prisma.course_enrollments.create({
            data
        });

        return created;
    }

    async update(newEnrollment: CourseEnrollmentUpdateForm): Promise<any> {
        const { id, course_id, student_id, enrolled_at, ...payload } = newEnrollment as any;

        const updated = await this.prisma.course_enrollments.update({
            where: { id },
            data: payload
        });

        return updated;
    }

    async delete(deletedId: number): Promise<any> {
        const deleted = await this.prisma.course_enrollments.delete({
            where: { id: deletedId }
        });

        return deleted;
    }
}

