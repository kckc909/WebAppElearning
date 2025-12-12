import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { CourseProgressCreateForm, CourseProgressUpdateForm } from "./course_progress.dto.js";
import { IdParam } from "../../../types/types.pipe.js";

@Injectable()
export class CourseProgress_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(): Promise<any> {
        const progressFound = await this.prisma.course_progress.findMany({
            include: {
                course_enrollments: {
                    include: {
                        courses: {
                            select: {
                                id: true,
                                title: true,
                            }
                        },
                        users: {
                            select: {
                                id: true,
                                full_name: true,
                            }
                        }
                    }
                },
                course_lessons: {
                    select: {
                        id: true,
                        title: true,
                    }
                }
            }
        });

        return progressFound;
    }

    async getById(idParam: IdParam): Promise<any> {
        const progressFound = await this.prisma.course_progress.findFirst({
            where: { id: idParam.id },
            include: {
                course_enrollments: {
                    include: {
                        courses: true,
                        users: true
                    }
                },
                course_lessons: true
            }
        });

        return progressFound;
    }

    async getByEnrollmentId(enrollmentId: number): Promise<any> {
        const progressFound = await this.prisma.course_progress.findMany({
            where: { enrollment_id: enrollmentId },
            include: {
                course_lessons: {
                    include: {
                        course_sections: {
                            select: {
                                id: true,
                                title: true,
                            }
                        }
                    }
                }
            },
            orderBy: {
                course_lessons: {
                    order_index: 'asc'
                }
            }
        });

        return progressFound;
    }

    async create(newProgress: CourseProgressCreateForm): Promise<any> {
        const created = await this.prisma.course_progress.create({ 
            data: newProgress 
        });

        return created;
    }

    async update(newProgress: CourseProgressUpdateForm): Promise<any> {
        const { id, ...payload } = newProgress;

        const updated = await this.prisma.course_progress.update({
            where: { id },
            data: payload
        });

        return updated;
    }

    async delete(deletedId: number): Promise<any> {
        const deleted = await this.prisma.course_progress.delete({ 
            where: { id: deletedId } 
        });

        return deleted;
    }
}

