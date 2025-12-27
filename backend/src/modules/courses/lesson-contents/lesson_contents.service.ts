import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import type { LessonContentsCreateForm, LessonContentsUpdateForm } from "./lesson_contents.dto.js";

@Injectable()
export class LessonContents_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll()
        : Promise<any> {

        const blocksFound = await this.prisma.lesson_blocks.findMany({
            include: {
                lesson_versions: {
                    include: {
                        course_lessons: true
                    }
                }
            }
        });

        return blocksFound;
    }

    async getById(id: number)
        : Promise<any> {

        const blockFound = await this.prisma.lesson_blocks.findFirst({
            where: { id: id },
            include: {
                lesson_versions: {
                    include: {
                        course_lessons: true
                    }
                }
            }
        })

        return blockFound;
    }

    async getByLessonVersionId(lessonVersionId: number)
        : Promise<any> {

        const blocksFound = await this.prisma.lesson_blocks.findMany({
            where: { lesson_version_id: lessonVersionId },
            orderBy: [
                { slot_id: 'asc' },
                { order_index: 'asc' }
            ]
        })

        return blocksFound;
    }

    async create(newBlock: LessonContentsCreateForm)
        : Promise<any> {

        const { id, ...data } = newBlock as any;
        const created = await this.prisma.lesson_blocks.create({ data })

        return created;
    }

    async update(newBlock: LessonContentsUpdateForm)
        : Promise<any> {

        const { id, ...payload } = newBlock as any

        const updated = await this.prisma.lesson_blocks.update({
            where: { id },
            data: payload
        })

        return updated;
    }

    async delete(deletedId: number)
        : Promise<any> {

        // Check if block exists first
        const block = await this.prisma.lesson_blocks.findUnique({ 
            where: { id: deletedId } 
        });

        if (!block) {
            throw new NotFoundException(`Lesson block with id ${deletedId} not found`);
        }

        const deleted = await this.prisma.lesson_blocks.delete({ 
            where: { id: deletedId } 
        });

        return deleted;
    }
}
