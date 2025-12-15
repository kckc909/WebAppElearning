import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { ClassExamsCreateForm, ClassExamsUpdateForm } from "./class_exams.dto.js";

@Injectable()
export class ClassExams_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll()
        : Promise<any> {

        const examsFound = await this.prisma.class_exams.findMany({
            include: {
                classes: true,
                class_exam_results: true
            }
        });

        return examsFound;
    }

    async getById(id: number)
        : Promise<any> {

        const examFound = await this.prisma.class_exams.findFirst({
            where: { id: id },
            include: {
                classes: true,
                class_exam_results: {
                    include: {
                        users: true
                    }
                }
            }
        })

        return examFound;
    }

    async getByClassId(classId: number)
        : Promise<any> {

        const examsFound = await this.prisma.class_exams.findMany({
            where: { class_id: classId },
            include: {
                class_exam_results: true
            }
        })

        return examsFound;
    }

    async create(newExam: ClassExamsCreateForm)
        : Promise<any> {

        const created = await this.prisma.class_exams.create({ data: newExam })

        return created;
    }

    async update(newExam: ClassExamsUpdateForm)
        : Promise<any> {

        const { id, ...payload } = newExam

        const updated = await this.prisma.class_exams.update({
            where: { id },
            data: payload
        })

        return updated;
    }

    async delete(deletedId: number)
        : Promise<any> {

        const deleted = await this.prisma.class_exams.delete({ where: { id: deletedId } })

        return deleted
    }
}
