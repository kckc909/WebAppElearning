import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { ClassStudentsCreateForm, ClassStudentsUpdateForm } from "./class_students.dto.js";

@Injectable()
export class ClassStudents_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll()
        : Promise<any> {

        const enrollmentsFound = await this.prisma.class_students.findMany({
            include: {
                classes: true,
                users: true
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
                users: true
            }
        })

        return enrollmentFound;
    }

    async getByClassId(classId: number)
        : Promise<any> {

        const studentsFound = await this.prisma.class_students.findMany({
            where: { class_id: classId },
            include: {
                users: {
                    include: {
                        user_profiles: true
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
                        users: true
                    }
                }
            }
        })

        return classesFound;
    }

    async create(newEnrollment: ClassStudentsCreateForm)
        : Promise<any> {

        const created = await this.prisma.class_students.create({ data: newEnrollment })

        return created;
    }

    async update(newEnrollment: ClassStudentsUpdateForm)
        : Promise<any> {

        const { id, ...payload } = newEnrollment

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
