import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import type { CourseReviewCreateForm, CourseReviewUpdateForm } from "./course_reviews.dto.js";
import { IdParam } from "../../../../types/types.pipe.js";

@Injectable()
export class CourseReviews_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(): Promise<any> {
        const reviewsFound = await this.prisma.course_reviews.findMany({
            include: {
                courses: {
                    select: {
                        id: true,
                        title: true,
                    }
                },
                accounts: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return reviewsFound;
    }

    async getById(idParam: IdParam): Promise<any> {
        const reviewFound = await this.prisma.course_reviews.findFirst({
            where: { id: idParam.id },
            include: {
                courses: true,
                accounts: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    }
                }
            }
        });

        return reviewFound;
    }

    async getByCourseId(courseId: number): Promise<any> {
        const reviewsFound = await this.prisma.course_reviews.findMany({
            where: { course_id: courseId },
            include: {
                accounts: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return reviewsFound;
    }

    async getByStudentId(studentId: number): Promise<any> {
        const reviewsFound = await this.prisma.course_reviews.findMany({
            where: { student_id: studentId },
            include: {
                courses: {
                    select: {
                        id: true,
                        title: true,
                        thumbnail_url: true,
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return reviewsFound;
    }

    async create(newReview: CourseReviewCreateForm): Promise<any> {
        const { id, ...data } = newReview as any;
        const created = await this.prisma.course_reviews.create({ 
            data 
        });

        return created;
    }

    async update(newReview: CourseReviewUpdateForm): Promise<any> {
        const { id, course_id, student_id, created_at, ...payload } = newReview as any;

        const updated = await this.prisma.course_reviews.update({
            where: { id },
            data: payload
        });

        return updated;
    }

    async delete(deletedId: number): Promise<any> {
        const deleted = await this.prisma.course_reviews.delete({ 
            where: { id: deletedId } 
        });

        return deleted;
    }
}

