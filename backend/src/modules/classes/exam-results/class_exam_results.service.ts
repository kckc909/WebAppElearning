import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import type { ClassExamResultsCreateForm, ClassExamResultsUpdateForm } from "./class_exam_results.dto.js";

@Injectable()
export class ClassExamResults_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll()
        : Promise<any> {

        const resultsFound = await this.prisma.class_exam_results.findMany({
            include: {
                class_exams: true
            }
        });

        return resultsFound;
    }

    async getById(id: number)
        : Promise<any> {

        const resultFound = await this.prisma.class_exam_results.findFirst({
            where: { id: id },
            include: {
                class_exams: true
            }
        })

        return resultFound;
    }

    async getByExamId(examId: number)
        : Promise<any> {

        const resultsFound = await this.prisma.class_exam_results.findMany({
            where: { exam_id: examId }
        })

        return resultsFound;
    }

    async getByStudentId(studentId: number)
        : Promise<any> {

        const resultsFound = await this.prisma.class_exam_results.findMany({
            where: { student_id: studentId },
            include: {
                class_exams: {
                    include: {
                        classes: true
                    }
                }
            }
        })

        return resultsFound;
    }

    async create(newResult: ClassExamResultsCreateForm)
        : Promise<any> {

        const { id, ...data } = newResult as any;
        const created = await this.prisma.class_exam_results.create({ data })

        return created;
    }

    async update(newResult: ClassExamResultsUpdateForm)
        : Promise<any> {

        const { id, ...payload } = newResult

        const updated = await this.prisma.class_exam_results.update({
            where: { id },
            data: payload
        })

        return updated;
    }

    async delete(deletedId: number)
        : Promise<any> {

        const deleted = await this.prisma.class_exam_results.delete({ where: { id: deletedId } })

        return deleted
    }
}
