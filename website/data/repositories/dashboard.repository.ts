/**
 * REPOSITORY: Dashboard
 * Aggregates data for student dashboard
 */

import { mockDataSource } from '../datasources/mock.datasource';
import { courseRepository } from './course.repository';

export class DashboardRepository {
    /**
     * Get complete student dashboard data
     */
    getStudentDashboard(studentId: number) {
        // Enrolled courses with progress
        const enrollments = mockDataSource.getEnrollmentsByStudent(studentId);
        const courses = enrollments.map(enrollment => {
            const course = courseRepository.getCourseDetail(enrollment.course_id);
            return course ? {
                ...course,
                progress: enrollment.progress,
                last_lesson_id: enrollment.last_lesson_id
            } : null;
        }).filter(Boolean);

        // Classes
        const classStudents = mockDataSource.getStudentClasses(studentId);
        const classes = classStudents.map(cs => {
            const classData = mockDataSource.getClassById(cs.class_id);
            if (!classData) return null;

            const course = mockDataSource.getCourseById(classData.course_id);
            const instructor = mockDataSource.getAccountById(classData.instructor_id);
            const calendar = mockDataSource.getClassCalendar(classData.id);

            // Find next session
            const now = new Date();
            const upcomingSessions = calendar
                .filter(cal => new Date(cal.event_date!) > now)
                .sort((a, b) => new Date(a.event_date!).getTime() - new Date(b.event_date!).getTime());

            return {
                id: classData.id,
                title: classData.title,
                course_title: course?.title,
                instructor_name: instructor?.full_name,
                schedule: classData.schedule,
                meeting_link: classData.meeting_link,
                progress: Math.floor(Math.random() * 100), // TODO: calculate actual progress
                next_session: upcomingSessions[0] || null
            };
        }).filter(Boolean);

        // Notifications
        const notifications = mockDataSource.getNotificationsByUser(studentId)
            .filter(n => !n.is_read)
            .slice(0, 5);

        // Certificates
        const certificates = mockDataSource.getCertificatesByStudent(studentId);

        return {
            courses,
            classes,
            notifications,
            certificates,
            stats: {
                total_courses: enrollments.length,
                completed_courses: enrollments.filter(e => e.progress === 100).length,
                total_classes: classes.length,
                certificates_earned: certificates.length
            }
        };
    }
}

export const dashboardRepository = new DashboardRepository();
