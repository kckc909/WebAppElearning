import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { LessonsCreateForm, LessonsUpdateForm } from "./lessons.dto.js";

@Injectable()
export class Lessons_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll()
        : Promise<any> {

        const lessonsFound = await this.prisma.course_lessons.findMany();

        return lessonsFound;
    }

    async getById(id: number)
        : Promise<any> {

        const lessonFound = await this.prisma.course_lessons.findFirst({
            where: { id: id },
        })

        return lessonFound;
    }

    async create(newLesson: LessonsCreateForm)
        : Promise<any> {

        const created = await this.prisma.course_lessons.create({ data: newLesson })

        return created;
    }

    async update(newLesson: LessonsUpdateForm)
        : Promise<any> {

        const { id, ...payload } = newLesson

        const updated = await this.prisma.course_lessons.update({
            where: { id },
            data: payload
        })

        return updated;
    }

    async delete(deletedId: number)
        : Promise<any> {

        const deleted = await this.prisma.course_lessons.delete({ where: { id: deletedId } })

        return deleted
    }
}
