import { useQuery } from '@tanstack/react-query';

export interface LearningStats {
    coursesEnrolled: number;
    coursesCompleted: number;
    hoursLearned: number;
    certificatesEarned: number;
    memberSince: string;
}

/**
 * Hook to fetch user learning statistics
 */
export const useMyStats = (userId: number) => {
    const API_BASE_URL = (import.meta as any).env.VITE_BACK_END_API_PATH || 'http://localhost:4000';

    return useQuery<LearningStats>({
        queryKey: ['my-stats', userId],
        queryFn: async () => {
            // Fetch enrollments
            const enrollmentsResponse = await fetch(`${API_BASE_URL}/enrollments/student/${userId}`);
            const enrollments = enrollmentsResponse.ok ? await enrollmentsResponse.json() : [];

            // Fetch certificates
            const certificatesResponse = await fetch(`${API_BASE_URL}/certificates/student/${userId}`);
            const certificates = certificatesResponse.ok ? await certificatesResponse.json() : [];

            // Fetch account to get created_at date
            const accountResponse = await fetch(`${API_BASE_URL}/accounts/${userId}`);
            const account = accountResponse.ok ? await accountResponse.json() : null;

            // Calculate stats
            const enrolledCount = Array.isArray(enrollments) ? enrollments.length : 0;
            const completedCount = Array.isArray(enrollments)
                ? enrollments.filter((e: any) => e.progress >= 100 || e.status === 'completed').length
                : 0;

            // Calculate total hours from all enrolled courses
            const totalHours = Array.isArray(enrollments)
                ? enrollments.reduce((sum: number, enrollment: any) => {
                    const courseDuration = enrollment.courses?.total_duration || 0;
                    const progress = enrollment.progress || 0;
                    // Calculate hours based on progress (duration is in minutes)
                    return sum + Math.floor((courseDuration * progress / 100) / 60);
                }, 0)
                : 0;

            const certificatesCount = Array.isArray(certificates) ? certificates.length : 0;

            // Format member since date
            const memberSince = account?.created_at
                ? new Date(account.created_at).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })
                : 'N/A';

            return {
                coursesEnrolled: enrolledCount,
                coursesCompleted: completedCount,
                hoursLearned: totalHours,
                certificatesEarned: certificatesCount,
                memberSince,
            };
        },
        enabled: !!userId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
