import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { CourseSectionCreateForm, CourseSectionUpdateForm } from "./course_sections.dto.js";
import { IdParam } from "../../../types/types.pipe.js";

@Injectable()
export class CourseSections_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(): Promise<any> {
        const sectionsFound = await this.prisma.course_sections.findMany({
            include: {
                courses: {
                    select: {
                        id: true,
                        title: true,
                    }
                },
                course_lessons: {
                    orderBy: {
                        order_index: 'asc'
                    }
                }
            },
            orderBy: {
                order_index: 'asc'
            }
        });

        return sectionsFound;
    }

    async getById(idParam: IdParam): Promise<any> {
        const sectionFound = await this.prisma.course_sections.findFirst({
            where: { id: idParam.id },
            include: {
                courses: true,
                course_lessons: {
                    orderBy: {
                        order_index: 'asc'
                    },
                    include: {
                        lesson_contents: {
                            orderBy: {
                                order_index: 'asc'
                            }
                        }
                    }
                }
            }
        });

        return sectionFound;
    }

    async getByCourseId(courseId: number): Promise<any> {
        const sectionsFound = await this.prisma.course_sections.findMany({
            where: { course_id: courseId },
            include: {
                course_lessons: {
                    orderBy: {
                        order_index: 'asc'
                    },
                    include: {
                        lesson_contents: {
                            orderBy: {
                                order_index: 'asc'
                            }
                        }
                    }
                }
            },
            orderBy: {
                order_index: 'asc'
            }
        });

        return sectionsFound;
    }

    async create(newSection: CourseSectionCreateForm): Promise<any> {
        const created = await this.prisma.course_sections.create({ 
            data: newSection 
        });

        return created;
    }

    async update(newSection: CourseSectionUpdateForm): Promise<any> {
        const { id, ...payload } = newSection;

        const updated = await this.prisma.course_sections.update({
            where: { id },
            data: payload
        });

        return updated;
    }

    async delete(deletedId: number): Promise<any> {
        const deleted = await this.prisma.course_sections.delete({ 
            where: { id: deletedId } 
        });

        return deleted;
    }
}

