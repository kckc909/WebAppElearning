import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { ClassAssignmentsCreateForm, ClassAssignmentsUpdateForm } from "./class_assignments.dto.js";

@Injectable()
export class ClassAssignments_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll()
        : Promise<any> {

        const assignmentsFound = await this.prisma.class_assignments.findMany({
            include: {
                classes: true,
                class_submissions: true
            }
        });

        return assignmentsFound;
    }

    async getById(id: number)
        : Promise<any> {

        const assignmentFound = await this.prisma.class_assignments.findFirst({
            where: { id: id },
            include: {
                classes: true,
                class_submissions: true
            }
        })

        return assignmentFound;
    }

    async getByClassId(classId: number)
        : Promise<any> {

        const assignmentsFound = await this.prisma.class_assignments.findMany({
            where: { class_id: classId },
            include: {
                class_submissions: true
            }
        })

        return assignmentsFound;
    }

    async create(newAssignment: ClassAssignmentsCreateForm)
        : Promise<any> {

        const created = await this.prisma.class_assignments.create({ data: newAssignment })

        return created;
    }

    async update(newAssignment: ClassAssignmentsUpdateForm)
        : Promise<any> {

        const { id, ...payload } = newAssignment

        const updated = await this.prisma.class_assignments.update({
            where: { id },
            data: payload
        })

        return updated;
    }

    async delete(deletedId: number)
        : Promise<any> {

        const deleted = await this.prisma.class_assignments.delete({ where: { id: deletedId } })

        return deleted
    }
}
