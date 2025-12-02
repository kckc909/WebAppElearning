import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { ClassesCreateForm, ClassesUpdateForm } from "./classes.dto.js";

@Injectable()
export class Classes_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll()
        : Promise<any> {

        const classesFound = await this.prisma.classes.findMany();

        return classesFound;
    }

    async getById(id: number)
        : Promise<any> {

        const classFound = await this.prisma.classes.findFirst({
            where: { id: id },
        })

        return classFound;
    }

    async create(newClass: ClassesCreateForm)
        : Promise<any> {

        const created = await this.prisma.classes.create({ data: newClass })

        return created;
    }

    async update(newClass: ClassesUpdateForm)
        : Promise<any> {

        const { id, ...payload } = newClass

        const updated = await this.prisma.classes.update({
            where: { id },
            data: payload
        })

        return updated;
    }

    async delete(deletedId: number)
        : Promise<any> {

        const deleted = await this.prisma.classes.delete({ where: { id: deletedId } })

        return deleted
    }
}
