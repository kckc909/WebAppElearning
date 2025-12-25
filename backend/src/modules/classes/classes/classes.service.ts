import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import type { ClassesCreateForm, ClassesUpdateForm } from "./classes.dto.js";

@Injectable()
export class Classes_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(filters?: { course_id?: number; instructor_id?: number; status?: string }) {
        const where: any = {};
        if (filters?.course_id) where.course_id = filters.course_id;
        if (filters?.instructor_id) where.instructor_id = filters.instructor_id;
        if (filters?.status) where.status = filters.status;

        const classesFound = await this.prisma.classes.findMany({
            where,
            include: {
                courses: { select: { id: true, title: true, thumbnail_url: true } },
                accounts: { select: { id: true, full_name: true, avatar_url: true } },
                _count: { select: { class_students: true } },
            },
            orderBy: { created_at: 'desc' },
        });

        return classesFound;
    }

    async getById(id: number) {
        const classFound = await this.prisma.classes.findFirst({
            where: { id },
            include: {
                courses: true,
                accounts: { select: { id: true, full_name: true, email: true, avatar_url: true } },
                class_students: {
                    include: {
                        accounts: { select: { id: true, full_name: true, avatar_url: true, email: true } },
                    },
                },
                class_calendar: { orderBy: { session_date: 'asc' } },
                class_materials: { orderBy: { uploaded_at: 'desc' } },
                class_assignments: { orderBy: { created_at: 'desc' } },
            },
        });

        return classFound;
    }

    async create(newClass: ClassesCreateForm) {
        const { id, ...data } = newClass as any;
        const created = await this.prisma.classes.create({
            data: data,
        });

        return created;
    }

    async update(id: number, payload: Partial<ClassesUpdateForm>) {
        const { id: _, ...data } = payload as any;
        const updated = await this.prisma.classes.update({
            where: { id },
            data: data,
        });

        return updated;
    }

    async delete(deletedId: number) {
        const deleted = await this.prisma.classes.delete({ where: { id: deletedId } });
        return deleted;
    }

    async getStudentClasses(studentId: number) {
        const enrollments = await this.prisma.class_students.findMany({
            where: { student_id: studentId },
            include: {
                classes: {
                    include: {
                        courses: { select: { id: true, title: true, thumbnail_url: true } },
                        accounts: { select: { id: true, full_name: true, avatar_url: true } },
                        _count: { select: { class_students: true } },
                    },
                },
            },
        });

        // Return just the classes
        return enrollments.map(e => e.classes);
    }

    async getAssignments(classId: number) {
        const assignments = await this.prisma.class_assignments.findMany({
            where: { class_id: classId },
            orderBy: { created_at: 'desc' },
        });

        return assignments;
    }

    async getStudents(classId: number) {
        const students = await this.prisma.class_students.findMany({
            where: { class_id: classId },
            include: {
                accounts: { select: { id: true, full_name: true, email: true, avatar_url: true } },
            },
        });
        return students;
    }

    async addStudent(classId: number, studentId: number) {
        const existing = await this.prisma.class_students.findUnique({
            where: { class_id_student_id: { class_id: classId, student_id: studentId } },
        });

        if (existing) throw new Error('Student already enrolled in this class');

        const enrollment = await this.prisma.class_students.create({
            data: { class_id: classId, student_id: studentId, status: 'active' },
        });

        await this.prisma.classes.update({
            where: { id: classId },
            data: { current_students: { increment: 1 } },
        });

        return enrollment;
    }
}
