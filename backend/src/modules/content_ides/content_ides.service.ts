import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { ContentIdesCreateForm, ContentIdesUpdateForm } from "./content_ides.dto.js";

@Injectable()
export class ContentIdes_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll()
        : Promise<any> {

        const idesFound = await this.prisma.content_ides.findMany({
            include: {
                users: true,
                lesson_contents: true
            }
        });

        return idesFound;
    }

    async getById(id: number)
        : Promise<any> {

        const ideFound = await this.prisma.content_ides.findFirst({
            where: { id: id },
            include: {
                users: true,
                lesson_contents: true
            }
        })

        return ideFound;
    }

    async getByUserId(userId: number)
        : Promise<any> {

        const idesFound = await this.prisma.content_ides.findMany({
            where: { user_id: userId },
            include: {
                lesson_contents: {
                    include: {
                        course_lessons: true
                    }
                }
            }
        })

        return idesFound;
    }

    async getByContentId(contentId: number)
        : Promise<any> {

        const idesFound = await this.prisma.content_ides.findMany({
            where: { content_id: contentId },
            include: {
                users: true
            }
        })

        return idesFound;
    }

    async getByUserAndContent(userId: number, contentId: number)
        : Promise<any> {

        const ideFound = await this.prisma.content_ides.findFirst({
            where: {
                user_id: userId,
                content_id: contentId
            },
            include: {
                lesson_contents: true
            }
        })

        return ideFound;
    }

    async create(newIde: ContentIdesCreateForm)
        : Promise<any> {

        const created = await this.prisma.content_ides.create({ data: newIde })

        return created;
    }

    async update(newIde: ContentIdesUpdateForm)
        : Promise<any> {

        const { id, ...payload } = newIde

        const updated = await this.prisma.content_ides.update({
            where: { id },
            data: payload
        })

        return updated;
    }

    async delete(deletedId: number)
        : Promise<any> {

        const deleted = await this.prisma.content_ides.delete({ where: { id: deletedId } })

        return deleted
    }
}
