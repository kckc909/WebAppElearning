/**
 * MOCK IMPLEMENTATION: CoursesApi
 * Pure mock logic - NO if-else, NO database calls
 */

import { ICoursesApi, Course } from '../../interfaces/ICoursesApi';
import { simulateDelay, successResponse, errorResponse, ApiResponse } from '../../config';
import { courseRepository } from '../../../data/repositories/course.repository';
import { dataSource } from '../../../data/datasources/datasource.router';
import { COURSE_REVIEWS, COURSE_CATEGORIES, COURSE_ENROLLMENTS, COURSES } from '../../../mock-db';

export class MockCoursesApi implements ICoursesApi {
    async getAll(params?: {
        category_id?: number;
        instructor_id?: number;
        search?: string;
        status?: string;
        limit?: number;
        page?: number;
    }): Promise<ApiResponse<Course[]>> {
        await simulateDelay();

        // Use repository for enriched data
        let result: any[];
        if (params?.category_id) {
            result = courseRepository.getCoursesByCategory(params.category_id);
        } else if (params?.instructor_id) {
            result = courseRepository.getCoursesByInstructor(params.instructor_id);
        } else {
            result = courseRepository.getAllCourses();
        }

        // Apply status filter
        if (params?.status) {
            result = result.filter(c => c.status === params.status || c.status?.toUpperCase() === params.status?.toUpperCase());
        }

        // Apply search filter
        if (params?.search) {
            const searchLower = params.search.toLowerCase();
            result = result.filter(c =>
                c.title.toLowerCase().includes(searchLower) ||
                (c.short_description && c.short_description.toLowerCase().includes(searchLower))
            );
        }

        // Pagination
        if (params?.limit) {
            const page = params.page || 1;
            const start = (page - 1) * params.limit;
            result = result.slice(start, start + params.limit);
        }

        return successResponse(result);
    }

    async getById(id: number): Promise<ApiResponse<Course | null>> {
        await simulateDelay();
        const course = courseRepository.getCourseDetail(id);
        if (!course) {
            return errorResponse('Course not found', null);
        }
        return successResponse(course as any);
    }

    async getReviews(courseId: number): Promise<ApiResponse<any[]>> {
        await simulateDelay();
        const reviews = COURSE_REVIEWS.filter(r => r.course_id === courseId).map(r => {
            const student = dataSource.getAccountById(r.student_id);
            return {
                ...r,
                student: {
                    id: student?.id,
                    full_name: student?.full_name,
                    avatar_url: student?.avatar_url
                }
            };
        });
        return successResponse(reviews);
    }

    async addReview(
        courseId: number,
        data: { rating: number; comment: string; student_id: number }
    ): Promise<ApiResponse<any>> {
        await simulateDelay();
        const newReview = {
            id: COURSE_REVIEWS.length + 1,
            course_id: courseId,
            ...data,
            created_at: new Date().toISOString()
        };
        COURSE_REVIEWS.push(newReview);
        return successResponse(newReview, 'Review added successfully');
    }

    async getCategories(): Promise<ApiResponse<any[]>> {
        await simulateDelay();
        return successResponse(COURSE_CATEGORIES);
    }

    async enroll(courseId: number, studentId: number): Promise<ApiResponse<any>> {
        await simulateDelay();
        // Check if already enrolled
        const existing = COURSE_ENROLLMENTS.find(
            e => e.course_id === courseId && e.student_id === studentId
        );
        if (existing) {
            return errorResponse('Already enrolled in this course');
        }

        const newEnrollment = {
            id: COURSE_ENROLLMENTS.length + 1,
            course_id: courseId,
            student_id: studentId,
            enrolled_at: new Date().toISOString(),
            progress: 0,
            certificate_url: null,
            status: 1,
            last_lesson_id: null
        };
        COURSE_ENROLLMENTS.push(newEnrollment);
        return successResponse(newEnrollment, 'Enrolled successfully');
    }

    async getFeatured(limit: number = 8): Promise<ApiResponse<Course[]>> {
        await simulateDelay();
        const featured = [...COURSES]
            .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
            .slice(0, limit) as any[];
        return successResponse(featured);
    }

    async getByCategory(categoryId: number): Promise<ApiResponse<Course[]>> {
        await simulateDelay();
        const courses = courseRepository.getCoursesByCategory(categoryId);
        return successResponse(courses as any[]);
    }

    async getSections(courseId: number): Promise<ApiResponse<any[]>> {
        await simulateDelay();

        // Filter sections by course_id
        const courseSections = dataSource.getSectionsByCourse(courseId)
            .map(section => {
                // Get lessons for this section
                const lessons = dataSource.getLessonsBySection(section.id)
                    .sort((a: any, b: any) => a.order_index - b.order_index);

                return {
                    id: section.id,
                    course_id: section.course_id,
                    title: section.title,
                    description: (section as any).description || '',
                    order_index: section.order_index,
                    lessons: lessons.map((lesson: any) => ({
                        id: lesson.id,
                        section_id: lesson.section_id,
                        title: lesson.title,
                        type: lesson.content_type || 'video',
                        duration: lesson.duration || 0,
                        content_url: lesson.content_url,
                        order_index: lesson.order_index
                    }))
                };
            })
            .sort((a, b) => a.order_index - b.order_index);

        return successResponse(courseSections);
    }

    async submitForReview(courseId: number, instructorId: number): Promise<ApiResponse<Course>> {
        await simulateDelay();
        const course = COURSES.find((c: any) => c.id === courseId);
        if (!course) {
            return errorResponse('Course not found') as any;
        }
        (course as any).status = 'PENDING';
        (course as any).submitted_at = new Date().toISOString();
        return successResponse(course as any, 'Course submitted for review');
    }

    async approveCourse(courseId: number, adminId: number): Promise<ApiResponse<Course>> {
        await simulateDelay();
        const course = COURSES.find((c: any) => c.id === courseId);
        if (!course) {
            return errorResponse('Course not found') as any;
        }
        (course as any).status = 'PUBLISHED';
        (course as any).published_at = new Date().toISOString();
        (course as any).reviewed_at = new Date().toISOString();
        (course as any).reviewed_by = adminId;
        return successResponse(course as any, 'Course approved');
    }

    async rejectCourse(courseId: number, adminId: number, reason: string): Promise<ApiResponse<Course>> {
        await simulateDelay();
        const course = COURSES.find((c: any) => c.id === courseId);
        if (!course) {
            return errorResponse('Course not found') as any;
        }
        (course as any).status = 'REJECTED';
        (course as any).rejection_reason = reason;
        (course as any).reviewed_at = new Date().toISOString();
        (course as any).reviewed_by = adminId;
        return successResponse(course as any, 'Course rejected');
    }

    async getPendingCourses(): Promise<ApiResponse<Course[]>> {
        await simulateDelay();
        const pending = COURSES.filter((c: any) => c.status === 'PENDING' || c.status === 'pending');
        return successResponse(pending as any[]);
    }
}
