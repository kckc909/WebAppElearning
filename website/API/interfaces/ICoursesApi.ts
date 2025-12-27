/**
 * INTERFACE: ICoursesApi
 * Contract for Courses API implementations
 */

import { ApiResponse } from '../config';

export interface Course {
    id: number;
    title: string;
    instructor_id: number;
    category_id: number | null;
    short_description: string | null;
    description: string | null;
    thumbnail: string | null;
    price: number;
    discount_price: number;
    level: string;
    language: string | null;
    status: string;
    created_at: string;
    updated_at: string;

    // JSON array fields for course content details
    what_you_will_learn?: string[] | null;
    requirements?: string[] | null;
    target_audience?: string[] | null;

    // Computed/Joined fields
    instructor?: any;
    category?: string;
    rating?: number;
    reviews_count?: number;
    total_students?: number;
    total_lessons?: number;
    total_duration?: number;
}

export interface ICoursesApi {
    /**
     * GET /courses - Lấy danh sách courses
     */
    getAll(params?: {
        category_id?: number;
        instructor_id?: number;
        search?: string;
        status?: string;
        limit?: number;
        page?: number;
    }): Promise<ApiResponse<Course[]>>;

    /**
     * GET /courses/:id - Lấy chi tiết course
     */
    getById(id: number): Promise<ApiResponse<Course | null>>;

    /**
     * GET /courses/:id/reviews - Lấy reviews của course
     */
    getReviews(courseId: number): Promise<ApiResponse<any[]>>;

    /**
     * POST /courses/:id/reviews - Thêm review
     */
    addReview(
        courseId: number,
        data: { rating: number; comment: string; student_id: number }
    ): Promise<ApiResponse<any>>;

    /**
     * GET /courses/categories - Lấy danh sách categories
     */
    getCategories(): Promise<ApiResponse<any[]>>;

    /**
     * POST /courses/:id/enroll - Đăng ký khóa học
     */
    enroll(courseId: number, studentId: number): Promise<ApiResponse<any>>;

    /**
     * GET /courses/featured - Lấy courses nổi bật
     */
    getFeatured(limit?: number): Promise<ApiResponse<Course[]>>;

    /**
     * GET /courses/by-category/:categoryId
     */
    getByCategory(categoryId: number): Promise<ApiResponse<Course[]>>;

    /**
     * GET /courses/:id/sections - Get course curriculum (sections + lessons)
     */
    getSections(courseId: number): Promise<ApiResponse<any[]>>;

    /**
     * POST /courses/:id/submit - Submit course for review (Instructor)
     */
    submitForReview(courseId: number, instructorId: number): Promise<ApiResponse<Course>>;

    /**
     * POST /courses/:id/approve - Approve course (Admin)
     */
    approveCourse(courseId: number, adminId: number): Promise<ApiResponse<Course>>;

    /**
     * POST /courses/:id/reject - Reject course (Admin)
     */
    rejectCourse(courseId: number, adminId: number, reason: string): Promise<ApiResponse<Course>>;

    /**
     * GET /courses/pending - Get pending courses for admin approval
     */
    getPendingCourses(): Promise<ApiResponse<Course[]>>;
}
