import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import { CoursesCreateForm, CoursesUpdateForm } from "./courses.dto.js";

@Injectable()
export class Courses_Service {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    async getAll(filters?: {
        category_id?: number;
        instructor_id?: number;
        search?: string;
        status?: string;
        is_featured?: boolean;
    }) {
        const where: any = { deleted_at: null };

        if (filters?.category_id) where.category_id = filters.category_id;
        if (filters?.instructor_id) where.instructor_id = filters.instructor_id;
        if (filters?.status) where.status = filters.status;
        if (filters?.is_featured !== undefined) where.is_featured = filters.is_featured;

        if (filters?.search) {
            where.OR = [
                { title: { contains: filters.search } },
                { short_description: { contains: filters.search } },
            ];
        }

        const coursesFound = await this.prisma.courses.findMany({
            where,
            include: {
                accounts: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                        email: true,
                    },
                },
                course_categories: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        icon: true,
                    },
                },
                course_sections: {
                    select: {
                        course_lessons: {
                            select: {
                                id: true,
                                duration: true,
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        course_enrollments: true,
                        course_reviews: true,
                        course_sections: true,
                    },
                },
            },
            orderBy: { created_at: 'desc' },
        });

        // Tính toán số lessons và duration thực tế
        const coursesWithStats = coursesFound.map(course => {
            const allLessons = course.course_sections.flatMap(section => section.course_lessons);
            const actualLessonsCount = allLessons.length;
            const actualDuration = allLessons.reduce((sum, lesson) => sum + (lesson.duration || 0), 0);

            // Không trả về course_sections chi tiết, chỉ trả về số liệu
            const { course_sections, ...courseData } = course;

            return {
                ...courseData,
                // Sử dụng giá trị tính toán nếu total_lessons/total_duration là 0
                total_lessons: course.total_lessons > 0 ? course.total_lessons : actualLessonsCount,
                total_duration: course.total_duration > 0 ? course.total_duration : actualDuration,
            };
        });

        return coursesWithStats;
    }

    async getById(id: number) {
        const courseFound = await this.prisma.courses.findUnique({
            where: { id },
            include: {
                accounts: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                        email: true,
                    },
                },
                course_categories: true,
                course_sections: {
                    include: {
                        course_lessons: {
                            orderBy: { order_index: 'asc' },
                        },
                    },
                    orderBy: { order_index: 'asc' },
                },
                _count: {
                    select: {
                        course_enrollments: true,
                        course_reviews: true,
                    },
                },
            },
        });

        return courseFound;
    }

    async create(body: CoursesCreateForm) {
        const slug = this.generateSlug(body.title);

        const created = await this.prisma.courses.create({
            data: {
                instructor_id: body.instructor_id,
                category_id: body.category_id,
                title: body.title,
                slug,
                short_description: body.short_description,
                description: body.description,
                level: (body.level as any) || 'ALL_LEVELS',
                language: body.language || 'vi',
                price: body.price || 0,
                discount_price: body.discount_price || 0,
                thumbnail_url: body.thumbnail,
                status: 'DRAFT',
                is_featured: false,
                total_duration: 0,
                total_lessons: 0,
                total_students: 0,
                average_rating: 0,
                total_reviews: 0,
            },
        });

        return created;
    }

    async update(id: number, body: CoursesUpdateForm) {
        const { id: bodyId, instructor_id, category_id, created_at, updated_at, deleted_at, ...data } = body as any;

        // Map thumbnail to thumbnail_url if provided
        if (data.thumbnail !== undefined) {
            data.thumbnail_url = data.thumbnail;
            delete data.thumbnail;
        }

        const updated = await this.prisma.courses.update({
            where: { id },
            data: {
                ...data,
                updated_at: new Date(),
            },
        });

        return updated;
    }

    async delete(id: number) {
        const deleted = await this.prisma.courses.delete({
            where: { id },
        });

        return deleted;
    }

    async getSections(courseId: number) {
        const sections = await this.prisma.course_sections.findMany({
            where: {
                course_id: courseId,
            },
            include: {
                course_lessons: {
                    orderBy: { order_index: 'asc' },
                    select: {
                        id: true,
                        title: true,
                        duration: true,
                        order_index: true,
                        is_preview: true,
                        status: true,
                        description: true,
                    }
                },
            },
            orderBy: { order_index: 'asc' },
        });

        return sections;
    }

    async getReviews(courseId: number) {
        const reviews = await this.prisma.course_reviews.findMany({
            where: {
                course_id: courseId,
            },
            include: {
                accounts: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    },
                },
            },
            orderBy: { created_at: 'desc' },
        });

        return reviews;
    }

    async addReview(courseId: number, studentId: number, rating: number, comment: string) {
        const review = await this.prisma.course_reviews.create({
            data: {
                course_id: courseId,
                student_id: studentId,
                rating,
                comment,
            },
        });

        // Update course stats
        const stats = await this.prisma.course_reviews.aggregate({
            where: { course_id: courseId },
            _avg: { rating: true },
            _count: true,
        });

        await this.prisma.courses.update({
            where: { id: courseId },
            data: {
                average_rating: stats._avg.rating || 0,
                total_reviews: stats._count,
            },
        });

        return review;
    }

    async enroll(courseId: number, studentId: number) {
        const enrollment = await this.prisma.course_enrollments.create({
            data: {
                student_id: studentId,
                course_id: courseId,
                status: 'active',
                progress: 0,
            },
        });

        // Update course total_students
        await this.prisma.courses.update({
            where: { id: courseId },
            data: {
                total_students: {
                    increment: 1,
                },
            },
        });

        return enrollment;
    }

    async submitForReview(courseId: number, instructorId: number) {
        // Verify instructor owns this course
        const course = await this.prisma.courses.findFirst({
            where: {
                id: courseId,
                instructor_id: instructorId,
            },
        });

        if (!course) {
            throw new Error('Course not found or you do not have permission');
        }

        if (course.status !== 'DRAFT' && course.status !== 'REJECTED') {
            throw new Error('Only DRAFT or REJECTED courses can be submitted');
        }

        const updated = await this.prisma.courses.update({
            where: { id: courseId },
            data: {
                status: 'PENDING',
                submitted_at: new Date(),
                rejection_reason: null, // Clear previous rejection reason
            },
        });

        return updated;
    }

    async approveCourse(courseId: number, adminId: number) {
        const course = await this.prisma.courses.findUnique({
            where: { id: courseId },
        });

        if (!course) {
            throw new Error('Course not found');
        }

        if (course.status !== 'PENDING') {
            throw new Error('Only PENDING courses can be approved');
        }

        const updated = await this.prisma.courses.update({
            where: { id: courseId },
            data: {
                status: 'PUBLISHED',
                published_at: new Date(),
                reviewed_at: new Date(),
                reviewed_by: adminId,
                rejection_reason: null,
            },
        });

        return updated;
    }

    async rejectCourse(courseId: number, adminId: number, reason: string) {
        const course = await this.prisma.courses.findUnique({
            where: { id: courseId },
        });

        if (!course) {
            throw new Error('Course not found');
        }

        if (course.status !== 'PENDING') {
            throw new Error('Only PENDING courses can be rejected');
        }

        if (!reason || reason.trim().length === 0) {
            throw new Error('Rejection reason is required');
        }

        const updated = await this.prisma.courses.update({
            where: { id: courseId },
            data: {
                status: 'REJECTED',
                reviewed_at: new Date(),
                reviewed_by: adminId,
                rejection_reason: reason,
            },
        });

        return updated;
    }

    async getPendingCourses() {
        const courses = await this.prisma.courses.findMany({
            where: {
                status: 'PENDING',
                deleted_at: null,
            },
            include: {
                accounts: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                        email: true,
                    },
                },
                course_categories: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        icon: true,
                    },
                },
                _count: {
                    select: {
                        course_sections: true,
                    },
                },
            },
            orderBy: { submitted_at: 'asc' }, // Oldest first
        });

        return courses;
    }

    private generateSlug(title: string): string {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
}