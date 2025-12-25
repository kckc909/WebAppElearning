import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import type { LessonsCreateForm, LessonsUpdateForm } from "./lessons.dto.js";

@Injectable()
export class Lessons_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(filters?: { course_id?: number; section_id?: number; status?: string }) {
        const where: any = {};
        if (filters?.course_id) where.course_id = filters.course_id;
        if (filters?.section_id) where.section_id = filters.section_id;
        if (filters?.status) where.status = filters.status;

        const lessonsFound = await this.prisma.course_lessons.findMany({
            where,
            include: {
                course_sections: { select: { id: true, title: true } },
            },
            orderBy: [{ section_id: 'asc' }, { order_index: 'asc' }],
        });

        return lessonsFound;
    }

    async getById(id: number) {
        const lessonFound = await this.prisma.course_lessons.findFirst({
            where: { id },
            include: {
                course_sections: true,
                lesson_versions: {
                    // Get draft version first, then published
                    orderBy: [
                        { status: 'desc' }, // 'draft' comes before 'published' alphabetically
                        { version: 'desc' }
                    ],
                    take: 1,
                    include: {
                        lesson_blocks: { orderBy: [{ slot_id: 'asc' }, { order_index: 'asc' }] },
                        lesson_assets: true,
                    },
                },
            },
        });

        return lessonFound;
    }

    async create(newLesson: LessonsCreateForm) {
        const { id, ...data } = newLesson as any;

        // Create lesson and its first version in a transaction
        const result = await this.prisma.$transaction(async (tx) => {
            // 1. Create course_lesson
            const created = await tx.course_lessons.create({
                data: {
                    ...data,
                    status: 'draft',
                    current_version: 1,
                },
            });

            // 2. Create lesson_version (version 1, draft)
            const version = await tx.lesson_versions.create({
                data: {
                    lesson_id: created.id,
                    version: 1,
                    layout_type: 'single', // Default layout
                    status: 'draft',
                },
            });

            return {
                ...created,
                lesson_versions: [version],
            };
        });

        return result;
    }

    async update(id: number, payload: Partial<LessonsUpdateForm>) {
        const { id: _, ...data } = payload as any;
        const updated = await this.prisma.course_lessons.update({
            where: { id },
            data: data,
        });

        return updated;
    }

    async delete(deletedId: number) {
        const deleted = await this.prisma.course_lessons.delete({ where: { id: deletedId } });
        return deleted;
    }

    async getByCourse(courseId: number) {
        const lessons = await this.prisma.course_lessons.findMany({
            where: { course_id: courseId },
            include: {
                course_sections: { select: { id: true, title: true, order_index: true } },
            },
            orderBy: [{ section_id: 'asc' }, { order_index: 'asc' }],
        });
        return lessons;
    }

    /**
     * Update layout_type for a lesson version
     * Prioritizes draft version, falls back to latest version, creates one if none exists
     */
    async updateLayout(lessonId: number, layoutType: string) {
        // Get lesson with versions - draft first, then any version
        const lesson = await this.prisma.course_lessons.findFirst({
            where: { id: lessonId },
            include: {
                lesson_versions: {
                    orderBy: [
                        { status: 'asc' }, // 'draft' comes first alphabetically
                        { version: 'desc' }
                    ],
                    take: 1
                }
            }
        });

        if (!lesson) {
            throw new Error('Lesson not found');
        }

        let versionId: number;

        if (lesson.lesson_versions?.[0]) {
            // Use existing version
            versionId = lesson.lesson_versions[0].id;
        } else {
            // Create a new draft version
            const newVersion = await this.prisma.lesson_versions.create({
                data: {
                    lesson_id: lessonId,
                    version: 1,
                    layout_type: layoutType,
                    status: 'draft',
                }
            });
            return newVersion;
        }

        // Update layout_type
        const updated = await this.prisma.lesson_versions.update({
            where: { id: versionId },
            data: { layout_type: layoutType }
        });

        return updated;
    }

    /**
     * Toggle preview status for a lesson
     * When is_preview is true, the lesson can be viewed without enrollment
     */
    async togglePreview(lessonId: number, isPreview: boolean) {
        const lesson = await this.prisma.course_lessons.findUnique({
            where: { id: lessonId },
        });

        if (!lesson) {
            throw new Error('Lesson not found');
        }

        const updated = await this.prisma.course_lessons.update({
            where: { id: lessonId },
            data: { is_preview: isPreview }
        });

        return updated;
    }
}
