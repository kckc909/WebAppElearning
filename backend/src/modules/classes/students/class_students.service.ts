import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import type { ClassStudentsCreateForm, ClassStudentsUpdateForm } from "./class_students.dto.js";

@Injectable()
export class ClassStudents_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll()
        : Promise<any> {

        const enrollmentsFound = await this.prisma.class_students.findMany({
            include: {
                classes: true,
                accounts: true
            }
        });

        return enrollmentsFound;
    }

    async getById(id: number)
        : Promise<any> {

        const enrollmentFound = await this.prisma.class_students.findFirst({
            where: { id: id },
            include: {
                classes: true,
                accounts: true
            }
        })

        return enrollmentFound;
    }

    async getByClassId(classId: number)
        : Promise<any> {

        const studentsFound = await this.prisma.class_students.findMany({
            where: { class_id: classId },
            include: {
                accounts: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        avatar_url: true,
                    }
                }
            }
        })

        return studentsFound;
    }

    async getByStudentId(studentId: number)
        : Promise<any> {

        const classesFound = await this.prisma.class_students.findMany({
            where: { student_id: studentId },
            include: {
                classes: {
                    include: {
                        courses: true,
                        accounts: true
                    }
                }
            }
        })

        return classesFound;
    }

    async create(newEnrollment: ClassStudentsCreateForm)
        : Promise<any> {

        const { id, ...data } = newEnrollment as any;
        const created = await this.prisma.class_students.create({ data })

        return created;
    }

    async update(newEnrollment: ClassStudentsUpdateForm)
        : Promise<any> {

        const { id, class_id, student_id, ...payload } = newEnrollment as any

        const updated = await this.prisma.class_students.update({
            where: { id },
            data: payload
        })

        return updated;
    }

    async delete(deletedId: number)
        : Promise<any> {

        const deleted = await this.prisma.class_students.delete({ where: { id: deletedId } })

        return deleted
    }
}
