import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import type { ContentIdesStarterCreateForm, ContentIdesStarterUpdateForm } from "./content_ides_starter.dto.js";

@Injectable()
export class ContentIdesStarter_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll()
        : Promise<any> {

        const startersFound = await this.prisma.content_ides_starter.findMany();

        return startersFound;
    }

    async getById(id: number)
        : Promise<any> {

        const starterFound = await this.prisma.content_ides_starter.findFirst({
            where: { id: id }
        })

        return starterFound;
    }

    async getByContentId(contentId: number)
        : Promise<any> {

        const startersFound = await this.prisma.content_ides_starter.findMany({
            where: { content_id: contentId }
        })

        return startersFound;
    }

    async getByContentIdAndLanguage(contentId: number, language: string)
        : Promise<any> {

        const starterFound = await this.prisma.content_ides_starter.findFirst({
            where: {
                content_id: contentId,
                language: language
            }
        })

        return starterFound;
    }

    async create(newStarter: ContentIdesStarterCreateForm)
        : Promise<any> {

        const { id, ...data } = newStarter as any;
        const created = await this.prisma.content_ides_starter.create({ data })

        return created;
    }

    async update(newStarter: ContentIdesStarterUpdateForm)
        : Promise<any> {

        const { id, ...payload } = newStarter

        const updated = await this.prisma.content_ides_starter.update({
            where: { id },
            data: payload
        })

        return updated;
    }

    async delete(deletedId: number)
        : Promise<any> {

        const deleted = await this.prisma.content_ides_starter.delete({ where: { id: deletedId } })

        return deleted
    }
}
