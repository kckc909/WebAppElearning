import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { LessonContentsCreateForm, LessonContentsUpdateForm } from "./lesson_contents.dto.js";

@Injectable()
export class LessonContents_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll()
        : Promise<any> {

        const contentsFound = await this.prisma.lesson_contents.findMany({
            include: {
                course_lessons: true,
                content_ides: true,
                content_ides_starter: true
            }
        });

        return contentsFound;
    }

    async getById(id: number)
        : Promise<any> {

        const contentFound = await this.prisma.lesson_contents.findFirst({
            where: { id: id },
            include: {
                course_lessons: true,
                content_ides: true,
                content_ides_starter: true
            }
        })

        return contentFound;
    }

    async getByLessonId(lessonId: number)
        : Promise<any> {

        const contentsFound = await this.prisma.lesson_contents.findMany({
            where: { lesson_id: lessonId },
            include: {
                content_ides_starter: true
            },
            orderBy: [
                { position: 'asc' },
                { order_index: 'asc' }
            ]
        })

        return contentsFound;
    }

    async create(newContent: LessonContentsCreateForm)
        : Promise<any> {

        const created = await this.prisma.lesson_contents.create({ data: newContent })

        return created;
    }

    async update(newContent: LessonContentsUpdateForm)
        : Promise<any> {

        const { id, ...payload } = newContent

        const updated = await this.prisma.lesson_contents.update({
            where: { id },
            data: payload
        })

        return updated;
    }

    async delete(deletedId: number)
        : Promise<any> {

        const deleted = await this.prisma.lesson_contents.delete({ where: { id: deletedId } })

        return deleted
    }
}
