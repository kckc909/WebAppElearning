/**
 * Mock Enrollments API Implementation
 * Pure mock logic - no if-else statements
 */

import { IEnrollmentsApi } from '../../interfaces/IEnrollmentsApi';
import { simulateDelay, successResponse, errorResponse, ApiResponse } from '../../config';
import { dataSource } from '../../../data/datasources/datasource.router';

export class MockEnrollmentsApi implements IEnrollmentsApi {
    // Helper: Tìm bài học tiếp theo cần học
    private getNextLessonId(courseId: number, lastLessonId: number | null): number | null {
        const sections = dataSource.getAllCourseSections().filter((s: any) => s.course_id === courseId);
        const allLessons = dataSource.getAllCourseLessons()
            .filter((l: any) => sections.some((s: any) => s.id === l.section_id))
            .sort((a: any, b: any) => {
                const sectionA = sections.find((s: any) => s.id === a.section_id);
                const sectionB = sections.find((s: any) => s.id === b.section_id);
                if (sectionA?.order_index !== sectionB?.order_index) {
                    return (sectionA?.order_index || 0) - (sectionB?.order_index || 0);
                }
                return (a.order_index || 0) - (b.order_index || 0);
            });

        if (allLessons.length === 0) return null;
        if (!lastLessonId) return allLessons[0]?.id || null;

        const currentIndex = allLessons.findIndex((l: any) => l.id === lastLessonId);
        if (currentIndex === -1 || currentIndex >= allLessons.length - 1) {
            return lastLessonId;
        }
        return allLessons[currentIndex + 1]?.id || lastLessonId;
    }

    async getMyEnrollments(studentId: number): Promise<ApiResponse<any[]>> {
        await simulateDelay();
        const enrollments = dataSource.getEnrollmentsByStudent(studentId).map((enrollment: any) => {
            const course = dataSource.getCourseById(enrollment.course_id);
            const certificates = dataSource.getAllCertificates();
            const certificate = certificates.find((c: any) => c.course_id === enrollment.course_id && c.student_id === studentId);

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

    async getById(id: number): Promise<ApiResponse<any>> {
        await simulateDelay();
        const enrollment = dataSource.getEnrollmentById(id);
        if (!enrollment) {
            return errorResponse('Enrollment not found', null);
        }

        const course = dataSource.getCourseById(enrollment.course_id);
        const progress = dataSource.getProgressByEnrollment(id);

        return successResponse({
            ...enrollment,
            course,
            progress_details: progress
        });
    }

    async getCourseProgress(courseId: number, studentId: number): Promise<ApiResponse<any>> {
        await simulateDelay();
        const enrollment = dataSource.getEnrollment(courseId, studentId);

        if (!enrollment) {
            return errorResponse('Not enrolled in this course', null);
        }

        const sections = dataSource.getAllCourseSections().filter((s: any) => s.course_id === courseId);
        const lessons = dataSource.getAllCourseLessons().filter((l: any) => sections.some((s: any) => s.id === l.section_id));
        const progress = dataSource.getProgressByEnrollment(enrollment.id);

        const sectionsWithProgress = sections.map((section: any) => {
            const sectionLessons = lessons.filter((l: any) => l.section_id === section.id);
            const lessonsWithProgress = sectionLessons.map((lesson: any) => {
                const lessonProgress = progress.find((p: any) => p.lesson_id === lesson.id);
                return {
                    ...lesson,
                    is_completed: lessonProgress?.is_completed || false,
                    completed_at: lessonProgress?.completed_at || null
                };
            });

            return {
                ...section,
                lessons: lessonsWithProgress,
                completed_count: lessonsWithProgress.filter((l: any) => l.is_completed).length,
                total_count: lessonsWithProgress.length
            };
        });

        return successResponse({
            enrollment,
            sections: sectionsWithProgress,
            overall_progress: enrollment.progress
        });
    }

    async updateLessonProgress(enrollmentId: number, lessonId: number, isCompleted: boolean): Promise<ApiResponse<any>> {
        await simulateDelay();
        const allProgress = dataSource.getAllCourseProgress() as any[];
        const existingProgress = allProgress.find((p: any) => p.enrollment_id === enrollmentId && p.lesson_id === lessonId);

        if (existingProgress) {
            existingProgress.is_completed = isCompleted;
            existingProgress.completed_at = isCompleted ? new Date().toISOString() : null;
            return successResponse(existingProgress, 'Progress updated');
        }

        const newProgress = {
            id: allProgress.length + 1,
            enrollment_id: enrollmentId,
            lesson_id: lessonId,
            is_completed: isCompleted,
            completed_at: isCompleted ? new Date().toISOString() : null
        };
        allProgress.push(newProgress);

        // Update overall progress
        const enrollment = dataSource.getEnrollmentById(enrollmentId);
        if (enrollment) {
            const enrollmentProgress = allProgress.filter((p: any) => p.enrollment_id === enrollmentId);
            const course = dataSource.getCourseById(enrollment.course_id);
            const totalLessons = course?.total_lessons || 10;
            const completedLessons = enrollmentProgress.filter((p: any) => p.is_completed).length;
            (enrollment as any).progress = Math.round((completedLessons / totalLessons) * 100);
        }

        return successResponse(newProgress, 'Progress created');
    }

    async getCertificate(courseId: number, studentId: number): Promise<ApiResponse<any>> {
        await simulateDelay();
        const certificates = dataSource.getAllCertificates();
        const certificate = certificates.find((c: any) => c.course_id === courseId && c.student_id === studentId);
        if (!certificate) {
            return errorResponse('Certificate not found', null);
        }
        return successResponse(certificate);
    }
}
