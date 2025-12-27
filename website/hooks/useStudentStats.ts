import { useQuery } from '@tanstack/react-query';
import { getApiInstance } from '../API';

export interface StudentStats {
    totalCourses: number;
    completedCourses: number;
    inProgressCourses: number;
    totalHours: number;
    certificates: number;
    averageGrade: number;
    currentStreak: number;
    longestStreak: number;
    recentActivity: ActivityItem[];
    learningProgress: ProgressItem[];
}

export interface ActivityItem {
    id: number;
    type: 'lesson' | 'assignment' | 'quiz' | 'certificate';
    title: string;
    date: string;
    course: string;
}

export interface ProgressItem {
    course_id: number;
    course_title: string;
    progress: number;
    last_accessed: string;
}

export const useStudentStats = (studentId?: number) => {
    const api = getApiInstance();

    return useQuery<StudentStats>({
        queryKey: ['student-stats', studentId],
        queryFn: async () => {
            // Get student statistics from enrollments and progress
            const enrollments = await api.enrollments.getEnrollments({ student_id: studentId });
            const certificates = await api.certificates.getCertificates({ student_id: studentId });
            
            // Calculate stats from data
            const stats: StudentStats = {
                totalCourses: enrollments.length,
                completedCourses: enrollments.filter((e: any) => e.progress === 100).length,
                inProgressCourses: enrollments.filter((e: any) => e.progress > 0 && e.progress < 100).length,
                totalHours: enrollments.reduce((sum: number, e: any) => sum + (e.hours_spent || 0), 0),
                certificates: certificates.length,
                averageGrade: enrollments.reduce((sum: number, e: any) => sum + (e.grade || 0), 0) / enrollments.length || 0,
                currentStreak: 7, // Mock data
                longestStreak: 15, // Mock data
                recentActivity: [], // Will be populated from API
                learningProgress: enrollments.map((e: any) => ({
                    course_id: e.course_id,
                    course_title: e.course_title,
                    progress: e.progress,
                    last_accessed: e.last_accessed,
                })),
            };
            
            return stats;
        },
    });
};
