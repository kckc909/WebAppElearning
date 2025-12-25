import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import type { ClassSubmissionsCreateForm, ClassSubmissionsUpdateForm } from "./class_submissions.dto.js";

@Injectable()
export class ClassSubmissions_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll()
        : Promise<any> {

        const submissionsFound = await this.prisma.class_submissions.findMany({
            include: {
                class_assignments: true
            }
        });

        return submissionsFound;
    }

    async getById(id: number)
        : Promise<any> {

        const submissionFound = await this.prisma.class_submissions.findFirst({
            where: { id: id },
            include: {
                class_assignments: true
            }
        })

        return submissionFound;
    }

    async getByAssignmentId(assignmentId: number)
        : Promise<any> {

        const submissionsFound = await this.prisma.class_submissions.findMany({
            where: { assignment_id: assignmentId }
        })

        return submissionsFound;
    }

    async getByStudentId(studentId: number)
        : Promise<any> {

        const submissionsFound = await this.prisma.class_submissions.findMany({
            where: { student_id: studentId },
            include: {
                class_assignments: {
                    include: {
                        classes: true
                    }
                }
            }
        })

        return submissionsFound;
    }

    async create(newSubmission: ClassSubmissionsCreateForm)
        : Promise<any> {

        const { id, ...data } = newSubmission as any;
        const created = await this.prisma.class_submissions.create({ data })

        return created;
    }

    async update(newSubmission: ClassSubmissionsUpdateForm)
        : Promise<any> {

        const { id, ...payload } = newSubmission

        const updated = await this.prisma.class_submissions.update({
            where: { id },
            data: payload
        })

        return updated;
    }

    async delete(deletedId: number)
        : Promise<any> {

        const deleted = await this.prisma.class_submissions.delete({ where: { id: deletedId } })

        return deleted
    }
}
