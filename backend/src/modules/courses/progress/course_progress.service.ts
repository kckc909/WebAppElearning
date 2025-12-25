import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import type { CourseProgressCreateForm, CourseProgressUpdateForm } from "./course_progress.dto.js";
import { IdParam } from "../../../../types/types.pipe.js";

@Injectable()
export class CourseProgress_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(): Promise<any> {
        const progressFound = await this.prisma.lesson_progress.findMany({
            include: {
                course_enrollments: {
                    include: {
                        courses: {
                            select: {
                                id: true,
                                title: true,
                            }
                        },
                        accounts: {
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
        const progressFound = await this.prisma.lesson_progress.findFirst({
            where: { id: idParam.id },
            include: {
                course_enrollments: {
                    include: {
                        courses: true,
                        accounts: true
                    }
                },
                course_lessons: true
            }
        });

        return progressFound;
    }

    async getByEnrollmentId(enrollmentId: number): Promise<any> {
        const progressFound = await this.prisma.lesson_progress.findMany({
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
            }
        });

        return progressFound;
    }

    async create(newProgress: CourseProgressCreateForm): Promise<any> {
        const { id, ...data } = newProgress as any;
        const created = await this.prisma.lesson_progress.create({ 
            data 
        });

        return created;
    }

    async update(newProgress: CourseProgressUpdateForm): Promise<any> {
        const { id, enrollment_id, lesson_id, completed_at, ...payload } = newProgress as any;

        const updated = await this.prisma.lesson_progress.update({
            where: { id },
            data: payload
        });

        return updated;
    }

    async delete(deletedId: number): Promise<any> {
        const deleted = await this.prisma.lesson_progress.delete({ 
            where: { id: deletedId } 
        });

        return deleted;
    }
}

