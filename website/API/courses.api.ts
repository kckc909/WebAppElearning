/**
 * Courses API Service
 * Khi chuyển sang Real API, chỉ cần set USE_MOCK_API = false
 */

import { USE_MOCK_API, simulateDelay, successResponse, errorResponse, ApiResponse, handleApiError } from './config';
import axiosInstance from './api';

// NEW: Use mock-db + repository (NOT old mockData)
import { mockDataSource } from '../data/datasources/mock.datasource';
import { courseRepository } from '../data/repositories/course.repository';
import {
    COURSE_REVIEWS,
    COURSE_ENROLLMENTS,
    COURSE_SECTIONS,
    COURSE_LESSONS,
    COURSE_CATEGORIES,
    ACCOUNTS
} from '../mock-db';

export interface Course {
    id: number;
    title: string;
    instructor_id: number;
    category_id: number;
    short_description: string;
    description: string;
    thumbnail: string;
    price: number;
    discount_price: number;
    level: number;
    language: string;
    status: number;
    created_at: string;
    updated_at: string;
    // Computed fields
    instructor?: any;
    category?: string;
    rating?: number;
    reviews_count?: number;
    total_students?: number;
    total_lessons?: number;
    total_duration?: number;
}

class CoursesApiService {
    // GET /courses - Lấy danh sách courses
    async getAll(params?: { category_id?: number; instructor_id?: number; search?: string; limit?: number; page?: number }): Promise<ApiResponse<Course[]>> {
        if (USE_MOCK_API) {
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

        try {
            const response = await axiosInstance.get('/courses', { params });
            // Xử lý trường hợp DB trống
            const data = response.data || [];
            if (Array.isArray(data) && data.length === 0) {
                return successResponse([], 'Chưa có khóa học nào');
            }
            return successResponse(data);
        } catch (error: any) {
            const apiError = handleApiError(error);
            console.error('[Courses API] getAll error:', apiError);
            return errorResponse(apiError.message, []);
        }
    }

    // GET /courses/:id - Lấy chi tiết course
    async getById(id: number): Promise<ApiResponse<Course | null>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const course = courseRepository.getCourseDetail(id);
            if (!course) {
                return errorResponse('Course not found', null);
            }
            return successResponse(course as any);
        }

        try {
            const response = await axiosInstance.get(`/courses/${id}`);
            if (!response.data) {
                return errorResponse('Không tìm thấy khóa học', null);
            }
            return successResponse(response.data);
        } catch (error: any) {
            const apiError = handleApiError(error);
            console.error('[Courses API] getById error:', apiError);
            return errorResponse(apiError.message, null);
        }
    }

    // GET /courses/:id/sections - Lấy sections của course
    async getSections(courseId: number): Promise<ApiResponse<any[]>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const sections = COURSE_SECTIONS.filter(s => s.course_id === courseId);
            const sectionsWithLessons = sections.map(section => ({
                ...section,
                lessons: COURSE_LESSONS.filter(l => l.section_id === section.id)
            }));
            return successResponse(sectionsWithLessons);
        }

        try {
            const response = await axiosInstance.get(`/courses/${courseId}/sections`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch sections');
        }
    }

    // GET /courses/:id/reviews - Lấy reviews của course
    async getReviews(courseId: number): Promise<ApiResponse<any[]>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const reviews = COURSE_REVIEWS.filter(r => r.course_id === courseId).map(r => {
                const student = ACCOUNTS.find(a => a.id === r.student_id);
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

        try {
            const response = await axiosInstance.get(`/courses/${courseId}/reviews`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch reviews');
        }
    }

    // POST /courses/:id/reviews - Thêm review
    async addReview(courseId: number, data: { rating: number; comment: string; student_id: number }): Promise<ApiResponse<any>> {
        if (USE_MOCK_API) {
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

        try {
            const response = await axiosInstance.post(`/courses/${courseId}/reviews`, data);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to add review');
        }
    }

    // GET /courses/categories - Lấy danh sách categories
    async getCategories(): Promise<ApiResponse<any[]>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            return successResponse(COURSE_CATEGORIES);
        }

        try {
            const response = await axiosInstance.get('/course-categories');
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch categories');
        }
    }

    // POST /courses/:id/enroll - Đăng ký khóa học
    async enroll(courseId: number, studentId: number): Promise<ApiResponse<any>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            // Check if already enrolled
            const existing = COURSE_ENROLLMENTS.find(e => e.course_id === courseId && e.student_id === studentId);
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
                status: 1
            };
            COURSE_ENROLLMENTS.push(newEnrollment);
            return successResponse(newEnrollment, 'Enrolled successfully');
        }

        try {
            const response = await axiosInstance.post(`/courses/${courseId}/enroll`, { student_id: studentId });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to enroll');
        }
    }

    // GET /courses/featured - Lấy courses nổi bật
    async getFeatured(limit: number = 8): Promise<ApiResponse<Course[]>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const featured = [...COURSES]
                .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
                .slice(0, limit) as any[];
            return successResponse(featured);
        }

        try {
            const response = await axiosInstance.get('/courses/featured', { params: { limit } });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch featured courses');
        }
    }

    // GET /courses/by-category/:categoryId
    async getByCategory(categoryId: number): Promise<ApiResponse<Course[]>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const courses = courseRepository.getCoursesByCategory(categoryId);
            return successResponse(courses as any[]);
        }

        try {
            const response = await axiosInstance.get(`/courses/category/${categoryId}`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch courses by category');
        }
    }
}

export const coursesApi = new CoursesApiService();
