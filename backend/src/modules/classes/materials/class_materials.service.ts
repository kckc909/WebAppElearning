import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import type { ClassMaterialsCreateForm, ClassMaterialsUpdateForm } from "./class_materials.dto.js";

@Injectable()
export class ClassMaterials_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll()
        : Promise<any> {

        const materialsFound = await this.prisma.class_materials.findMany({
            include: {
                classes: true
            }
        });

        return materialsFound;
    }

    async getById(id: number)
        : Promise<any> {

        const materialFound = await this.prisma.class_materials.findFirst({
            where: { id: id },
            include: {
                classes: true
            }
        })

        return materialFound;
    }

    async getByClassId(classId: number)
        : Promise<any> {

        const materialsFound = await this.prisma.class_materials.findMany({
            where: { class_id: classId },
            orderBy: {
                uploaded_at: 'desc'
            }
        })

        return materialsFound;
    }

    async create(newMaterial: ClassMaterialsCreateForm)
        : Promise<any> {

        const { id, ...data } = newMaterial as any;
        const created = await this.prisma.class_materials.create({ data })

        return created;
    }

    async update(newMaterial: ClassMaterialsUpdateForm)
        : Promise<any> {

        const { id, ...payload } = newMaterial

        const updated = await this.prisma.class_materials.update({
            where: { id },
            data: payload
        })

        return updated;
    }

    async delete(deletedId: number)
        : Promise<any> {

        const deleted = await this.prisma.class_materials.delete({ where: { id: deletedId } })

        return deleted
    }
}
