import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { CourseEnrollmentCreateForm, CourseEnrollmentUpdateForm } from "./course_enrollments.dto.js";
import { IdParam } from "../../../types/types.pipe.js";

@Injectable()
export class CourseEnrollments_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(): Promise<any> {
        const enrollmentsFound = await this.prisma.course_enrollments.findMany({
            include: {
                courses: {
                    select: {
                        id: true,
                        title: true,
                        thumbnail: true,
                    }
                },
                users: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                    }
                },
                course_progress: true
            }
        });

        return enrollmentsFound;
    }

    async getById(idParam: IdParam): Promise<any> {
        const enrollmentFound = await this.prisma.course_enrollments.findFirst({
            where: { id: idParam.id },
            include: {
                courses: true,
                users: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                    }
                },
                course_progress: {
                    include: {
                        course_lessons: {
                            select: {
                                id: true,
                                title: true,
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
                        users: {
                            select: {
                                id: true,
                                full_name: true,
                            }
                        }
                    }
                },
                course_progress: true
            }
        });

        return enrollmentsFound;
    }

    async getByCourseId(courseId: number): Promise<any> {
        const enrollmentsFound = await this.prisma.course_enrollments.findMany({
            where: { course_id: courseId },
            include: {
                users: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                    }
                },
                course_progress: true
            }
        });

        return enrollmentsFound;
    }

    async create(newEnrollment: CourseEnrollmentCreateForm): Promise<any> {
        const created = await this.prisma.course_enrollments.create({ 
            data: newEnrollment 
        });

        return created;
    }

    async update(newEnrollment: CourseEnrollmentUpdateForm): Promise<any> {
        const { id, ...payload } = newEnrollment;

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

