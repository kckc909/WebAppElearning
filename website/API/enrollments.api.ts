/**
 * Enrollments API Service (Đăng ký khóa học & Tiến độ học)
 */

import { USE_MOCK_API, simulateDelay, successResponse, errorResponse, ApiResponse } from './config';
import axiosInstance from './api';
import {
    COURSE_ENROLLMENTS,
    COURSE_PROGRESS,
    COURSES,
    COURSE_SECTIONS,
    COURSE_LESSONS,
    CERTIFICATES,
    ACCOUNTS,
} from '../mockData';

class EnrollmentsApiService {
    // Helper: Tìm bài học tiếp theo cần học
    private getNextLessonId(courseId: number, lastLessonId: number | null): number | null {
        // Get all lessons for this course
        const sections = COURSE_SECTIONS.filter(s => s.course_id === courseId);
        const allLessons = COURSE_LESSONS
            .filter(l => sections.some(s => s.id === l.section_id))
            .sort((a, b) => {
                const sectionA = sections.find(s => s.id === a.section_id);
                const sectionB = sections.find(s => s.id === b.section_id);
                if (sectionA?.order_index !== sectionB?.order_index) {
                    return (sectionA?.order_index || 0) - (sectionB?.order_index || 0);
                }
                return (a.order_index || 0) - (b.order_index || 0);
            });

        if (allLessons.length === 0) return null;
        if (!lastLessonId) return allLessons[0]?.id || null; // Chưa học bài nào

        // Tìm bài tiếp theo
        const currentIndex = allLessons.findIndex(l => l.id === lastLessonId);
        if (currentIndex === -1 || currentIndex >= allLessons.length - 1) {
            return lastLessonId; // Đã học bài cuối hoặc không tìm thấy
        }
        return allLessons[currentIndex + 1]?.id || lastLessonId;
    }

    // GET /enrollments/my - Lấy khóa học đã đăng ký của user
    async getMyEnrollments(studentId: number): Promise<ApiResponse<any[]>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const enrollments = COURSE_ENROLLMENTS.filter(e => e.student_id === studentId).map(enrollment => {
                const course = COURSES.find((c: any) => c.id === enrollment.course_id) as any;
                const certificate = CERTIFICATES.find(c => c.course_id === enrollment.course_id && c.student_id === studentId);

                // Tính toán bài học tiếp theo
                const lastLessonId = enrollment.last_lesson_id;
                const nextLessonId = enrollment.progress === 100
                    ? null
                    : this.getNextLessonId(enrollment.course_id, lastLessonId);

                return {
                    ...enrollment,
                    course: course ? {
                        id: course.id,
                        title: course.title,
                        thumbnail: course.thumbnail,
                        instructor: course.instructor,
                        category: course.category,
                        total_lessons: course.total_lessons,
                        total_duration: course.total_duration
                    } : null,
                    certificate: certificate || null,
                    lastAccessed: enrollment.progress === 100 ? '1 month ago' : '2 hours ago',
                    completed: enrollment.progress === 100,
                    last_lesson_id: lastLessonId,
                    next_lesson_id: nextLessonId
                };
            });

            return successResponse(enrollments);
        }

        try {
            const response = await axiosInstance.get('/enrollments/my', { params: { student_id: studentId } });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch enrollments');
        }
    }

    // GET /enrollments/:id - Lấy chi tiết enrollment
    async getById(id: number): Promise<ApiResponse<any>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const enrollment = COURSE_ENROLLMENTS.find(e => e.id === id);
            if (!enrollment) {
                return errorResponse('Enrollment not found', null);
            }

            const course = COURSES.find((c: any) => c.id === enrollment.course_id) as any;
            const progress = COURSE_PROGRESS.filter(p => p.enrollment_id === id);

            return successResponse({
                ...enrollment,
                course,
                progress_details: progress
            });
        }

        try {
            const response = await axiosInstance.get(`/enrollments/${id}`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch enrollment');
        }
    }

    // GET /enrollments/course/:courseId/progress - Lấy tiến độ học
    async getCourseProgress(courseId: number, studentId: number): Promise<ApiResponse<any>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const enrollment = COURSE_ENROLLMENTS.find(e => e.course_id === courseId && e.student_id === studentId);

            if (!enrollment) {
                return errorResponse('Not enrolled in this course', null);
            }

            const sections = COURSE_SECTIONS.filter(s => s.course_id === courseId);
            const lessons = COURSE_LESSONS.filter(l => sections.some(s => s.id === l.section_id));
            const progress = COURSE_PROGRESS.filter(p => p.enrollment_id === enrollment.id);

            const sectionsWithProgress = sections.map(section => {
                const sectionLessons = lessons.filter(l => l.section_id === section.id);
                const lessonsWithProgress = sectionLessons.map(lesson => {
                    const lessonProgress = progress.find(p => p.lesson_id === lesson.id);
                    return {
                        ...lesson,
                        is_completed: lessonProgress?.is_completed || false,
                        completed_at: lessonProgress?.completed_at || null
                    };
                });

                return {
                    ...section,
                    lessons: lessonsWithProgress,
                    completed_count: lessonsWithProgress.filter(l => l.is_completed).length,
                    total_count: lessonsWithProgress.length
                };
            });

            return successResponse({
                enrollment,
                sections: sectionsWithProgress,
                overall_progress: enrollment.progress
            });
        }

        try {
            const response = await axiosInstance.get(`/enrollments/course/${courseId}/progress`, {
                params: { student_id: studentId }
            });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch progress');
        }
    }

    // POST /enrollments/progress - Cập nhật tiến độ bài học
    async updateLessonProgress(enrollmentId: number, lessonId: number, isCompleted: boolean): Promise<ApiResponse<any>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const existingProgress = COURSE_PROGRESS.find(p => p.enrollment_id === enrollmentId && p.lesson_id === lessonId);

            if (existingProgress) {
                existingProgress.is_completed = isCompleted;
                existingProgress.completed_at = isCompleted ? new Date().toISOString() : null;
                return successResponse(existingProgress, 'Progress updated');
            }

            const newProgress = {
                id: COURSE_PROGRESS.length + 1,
                enrollment_id: enrollmentId,
                lesson_id: lessonId,
                is_completed: isCompleted,
                completed_at: isCompleted ? new Date().toISOString() : null
            };
            COURSE_PROGRESS.push(newProgress);

            // Update overall progress
            const enrollment = COURSE_ENROLLMENTS.find(e => e.id === enrollmentId);
            if (enrollment) {
                const allProgress = COURSE_PROGRESS.filter(p => p.enrollment_id === enrollmentId);
                // Calculate based on total lessons in course
                const course = COURSES.find((c: any) => c.id === enrollment.course_id) as any;
                const totalLessons = course?.total_lessons || 10;
                const completedLessons = allProgress.filter(p => p.is_completed).length;
                enrollment.progress = Math.round((completedLessons / totalLessons) * 100);
            }

            return successResponse(newProgress, 'Progress created');
        }

        try {
            const response = await axiosInstance.post('/enrollments/progress', {
                enrollment_id: enrollmentId,
                lesson_id: lessonId,
                is_completed: isCompleted
            });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to update progress');
        }
    }

    // GET /enrollments/certificate/:courseId - Lấy chứng chỉ
    async getCertificate(courseId: number, studentId: number): Promise<ApiResponse<any>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const certificate = CERTIFICATES.find(c => c.course_id === courseId && c.student_id === studentId);
            if (!certificate) {
                return errorResponse('Certificate not found', null);
            }
            return successResponse(certificate);
        }

        try {
            const response = await axiosInstance.get(`/enrollments/certificate/${courseId}`, {
                params: { student_id: studentId }
            });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch certificate');
        }
    }
}

export const enrollmentsApi = new EnrollmentsApiService();
